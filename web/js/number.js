

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


///////////////////////////

var number_list = []

function create_number(elementId) {
    var num_element = document.getElementById(elementId);
    number_list = [];
    for( var i = 0; i < 4; i++) {
        number_list.push(
            Math.floor(Math.random() * 10)
        );
    }
    number_list = [2,4,7,9];   // debug -- to be removed
    num_element.innerHTML = number_list.join(", ");
}

function getNumber(elementId) {
    var num_element = document.getElementById(elementId);
    number_list = [];
    n = prompt("Enter comma (,) separated list of 4 numbers: ");
    if( n != null ) {
        n_list = n.split(",");
        for( i in n_list ) {
            var v = parseInt(n_list[i]);
            number_list.push(v);
        }
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
            /*
            log("=====================");
            log("curr: " + curr);
            log("next: " + next);
            log("num: ");
            log(num);
            log("---------------------");
            */
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

function calculate(input_num_list, operator_keys) {
    var ans_list = {};
    var operators_1 = [];
    var operators_2 = [];
    var operators_3 = [];
    var operators_4 = [];
    log("======= extract operators ======");
    for( i in operator_keys ) {
        var o = operator_keys[i];
        //log("operator key: " + o);
        //log("operator length: " + o.length)
        if( o.length == 1 ) {
            log(o)
            operators_1.push(o);
        }
        else if( o.length == 2 ) {
            operators_2.push(o);
        }
        else if(o.length == 3 ) {
            operators_3.push(o);
        }
        else if(o.length == 4 ) {
            operators_4.push(o);
        }
    }
    log("==================================");

    for( i in input_num_list ) {
        n = input_num_list[i];
        var ans = null;
        if( n > -1 && n < 10 ) {
            ans = singleDigit(n)
        }
        else if( n.length == 2 ) {
            //log("doubleDigit(")
            //log( n );
            //log( operators_1 )
            ans = doubleDigit(n, operators_1)
        }
        else if( n.length == 3 ) {
            ans = trippleDigit(n, operators_2);
        }

        for(i in ans) {
            var a = ans[i];
            ans_list[a[0]] = a[1];
        }
    }
    return ans_list;
}

function singleDigit(n) {
    var operator = operators["!"];
    var ans = operator(n);
    if( ans > -1 && ans < 101 ) {
        return [
            ["" + n + "!", ans]
        ];
    }
    return [];
}

function doubleDigit(n, operators_1, filter=true) {
    var ans_list = [];
    for( k in operators_1 ) {
        var operator_key = operators_1[k];
        var operator = operators[operator_key];
        var ans = operator(n[0], n[1]);
        var pre_n1 = "";
        var post_n1 = "";

        //log("Operator k: " + k);
        //log("Operator key: " + operator_key);

        if( operator_key == "!") {
            pre_n1 = "(";
            post_n1 = ")";
            var f = fact(n[0]);
            ans = mul(f, n[1]);
        }

        var log_result = true
        if( filter ) {
            log_result = false;
            if(isInt(ans)) {
                if( ans > -1 && ans < 101 ) {
                    log_result = true;
                }
            }
        }
        
        if( log_result ) {
            ans_list.push(
                 ["" + n[0] + operator_key + pre_n1 + n[1] + post_n1, ans]
            );
        }
    }
    return ans_list;
}

function calAll(operator_list, num_list, ans=null) {
    // returns: [operator, argument count]
    var operator_key = null;
    var operator_index = 0;
    var operand_count = 2;
    for(k in operator_list) {
        var o = operator_list[k];
        if( o == "!" ) {
            operator_key = operator_list.splice(k, 1);
            operand_count = 1;
            operator_index = o;
            break;
        }
    }

    if(operator_key == null) {
        for(k in operator_list) {
            var o = operator_list[k];
            if( o == "^" ) {
                operator_key = operator_list.splice(k, 1);
                operator_index = o;
                break;
            }
        }
    }

    if(operator_key == null) {
        for(k in operator_list) {
            var o = operator_list[k];
            if( o == "*" || o == "/") {
                operator_key = operator_list.splice(k, 1);
                operator_index = o;
                break;
            }
        }
    }

    if(operator_key == null) { // +, -
        operator_key = operator_list.splice(0, 1);
        operator_index = 0;
    }

    var operands = null;
    if( ans == null ) {
        operands = num_list.splice(operator_index, operand_count);
        ans = operands[operand_count - 1];
    }
    else {
        if( operand_count > 1 ) {
            operands = num_list.splice(operator_index, operand_count - 1);
        }
    }

    if( operator_key != "" ) {
        log("operator_key: '" + operator_key + "'");
        if( operand_count == 1 ) {
            ans = operators[operator_key](ans);
        }
        else {
            ans = operators[operator_key](operands[0], ans);
        }

        if(operator_list.length > 0) {
            calAll(operator_list.slice(), num_list.slice(), ans)
        }
    }
    return ans;
}

function trippleDigit(n, operators_2, filter=false) {
    var ans_list = [];
    for( k in operators_2 ) {
        var operator_key_list = operators_2[k];

        /*
            +, *
            2, 3, 5
            plus(2, mul(3, 5))
        */
        ans = calAll(operator_key_list, n.slice());
        ans_list.push(["blah", ans]);
    }
    return ans_list;
}

function solve(num_div, answer_div) {
    var num_box = document.getElementById(num_div);
    var answer_box = document.getElementById(answer_div);

    var input_num_list = genPermutations(number_list, false);
    input_num_list = flatmap( input_num_list );

    num_box.innerHTML = input_num_list.join("<br>\n");
    
    var operator_keys = genPermutations(getAllOperatorKeys(), false);
    operator_keys = flatmap(operator_keys, false);
    //answer_box.innerHTML = operator_keys.join("<br>\n");

    var ans_list = calculate(input_num_list, operator_keys);

    var s = "";
    for( k in ans_list) {
        s += k + " = " + ans_list[k] + "<br>\n";
    }
    answer_box.innerHTML = s;
}


