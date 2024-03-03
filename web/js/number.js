

function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function mul(a, b) {
    return a * b
}

function div(a, b) {
    return a / b;
}

function power(a, b) {
    return a**b;
}

function fact(a) {
    if( a < 0 ) {
        throw "Error: negative number is not allowed"
    }
    if( a == 0 ) {
        return 1
    }

    return a * fact(a - 1)
}

var operators = {
    "+": add,
    "-": sub,
    "*": mul,
    "/": div,
    "^": power,
    "!": fact
}


var number_list = []

function create_number(elementId) {
    var num_element = document.getElementById(elementId);
    number_list = [];
    for( var i = 0; i < 4; i++) {
        number_list.push(
            Math.floor(Math.random() * 10)
        );
    }
    num_element.innerHTML = number_list.join(", ");
}

/////////////

var enable_logging = true;
function log(msg) {
    if( !enable_logging ) return;
    console.log(msg)
}

function genPermutations(arr, singleLevel=true,  num = [], all_num_combo_list = []) {
    if( arr.length == 0 ) {
        all_num_combo_list.push(num);
    }
    else {
        for(var k = 0; k < arr.length; k++) { // starting number
            var curr = arr.slice();
            var next = curr.splice(k, 1);
            log("=====================");
            log("curr: " + curr);
            log("next: " + next);
            log("num: ");
            log(num);
            log("---------------------");
            all_num_combo_list.concat(
                genPermutations(curr.slice(), singleLevel, num.concat(next), all_num_combo_list)
            );
            if( !singleLevel ) {
                if(curr.length > 0) {
                    all_num_combo_list.concat(
                        genPermutations(curr.slice(), singleLevel, [], all_num_combo_list)
                    );
                }
            }
        }
    }
    return all_num_combo_list;
}

function flatmap(arr, isInt = false) {
    n = {};
    for( var i in arr ) {
        var val = arr[i];
        var k = val.join(",");
        if( isInt ) {
            val = parseInt(val.join(""));
        }
        n[k] = val;
    }

    flat_list = []
    for( k in n ) {
        flat_list.push(n[k]);
    }

    return flat_list;
}

function getAllOperatorKeys() {
    var operater_keys = []
    for( var k in operators ) {
        operater_keys.push( k );
    }
    return operater_keys;
}

function isInt(value) {
    var x;
    return isNaN(value) ? false : (x = parseFloat(value), (0 | x) === x);
}

function singleDigit(input_num_list) {
    var ans_list = {};
    for( i in input_num_list ) {
        n = input_num_list[i];
        if( n > -1 && n < 10 ) {
            var operator = operators["!"];
            var ans = operator(n);
            if( ans > -1 && ans < 101 ) {
                ans_list["" + n + "!"] = ans;
            }
        }
    }
    return ans_list;
}

function doubleDigit(input_num_list) {
    var ans_list = {};
    for( i in input_num_list ) {
        n = input_num_list[i];
        if( n.length == 2 ) {
            for( k in operators ) {
                var operator = operators[k];
                var ans = operator(n[0], n[1]);
                var pre_n1 = "";
                var post_n1 = "";
                if( k == "!") {
                    pre_n1 = "(";
                    post_n1 = ")";
                    var f = fact(n[0]);
                    ans = mul(f, n[1]);
                }
                if(isInt(ans)) {
                    if( ans > -1 && ans < 101 ) {
                        ans_list["" + n[0] + k + pre_n1 + n[1] + post_n1] = ans;
                    }
                }
            }
        }
    }
    return ans_list;
}

function solve(num_div, answer_div) {
    var num_box = document.getElementById(num_div);
    var answer_box = document.getElementById(answer_div);

    var input_num_list = genPermutations(number_list, false);
    input_num_list = flatmap( input_num_list );

    num_box.innerHTML = input_num_list.join("<br>\n");
    
    //var operator_keys = genPermutations(getAllOperatorKeys(), false);
    //operator_keys = flatmap(operator_keys, false);
    //answer_box.innerHTML = operator_keys.join("<br>\n");

    var ans_list = singleDigit(input_num_list);
    var double_digit_ans_list = doubleDigit(input_num_list);

    var s = "";
    for( k in ans_list) {
        s += k + " = " + ans_list[k] + "<br>\n";
    }
    for( k in double_digit_ans_list) {
        s += k + " = " + double_digit_ans_list[k] + "<br>\n";
    }
    answer_box.innerHTML = s;
}


