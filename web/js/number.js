

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
    return a^b;
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

var enable_logging = false;
function log(msg) {
    if( !enable_logging ) return;
    console.log(msg)
}

function genPermutations(arr, singleLevel=true,  num = [], all_num_combo_list = []) {
    if( arr.length == 0 ) {
        all_num_combo_list.push(num)
    }
    else {
        for(var k = 0; k < arr.length; k++) { // starting number
            var curr = arr.slice();
            var next = curr.splice(k, 1);
            log("curr: " + curr);
            log("next: " + next);
            genPermutations(curr.slice(), singleLevel, num.concat(next), all_num_combo_list);
            if( !singleLevel ) {
                if(curr.length > 0) {
                    genPermutations(curr, singleLevel, [], all_num_combo_list);
                }
            }
        }
    }
    return all_num_combo_list;
}

function flatmap(arr, isInt = false) {
    n = {};
    for( var i in arr ) {
        var k = arr[i];
        if( isInt ) {
            k = parseInt(k.join(""));
        }
        n[k] = k;
    }

    flat_list = []
    for( k in n ) {
        flat_list.push(k);
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

function solve(num_div, answer_div) {
    var num_box = document.getElementById(num_div);
    var answer_box = document.getElementById(answer_div);

    var input_num_list = genPermutations(number_list);
    input_num_list = flatmap( input_num_list );

    num_box.innerHTML = input_num_list.join("<br>\n");
    
    var operator_keys = genPermutations(getAllOperatorKeys(), false);
    operator_keys = flatmap(operator_keys, false);
    answer_box.innerHTML = operator_keys.join("<br>\n");
}


