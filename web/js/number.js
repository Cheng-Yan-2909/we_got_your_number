

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

var operator = {
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

var all_num_combo_list = [];
var enable_logging = false;
function log(msg) {
    if( !enable_logging ) return;
    console.log(msg)
}

function genAllNumberCombo(arr, num = []) {
    if( arr.length == 0 ) {
        all_num_combo_list.push(num)
    }
    else {
        for(var k = 0; k < arr.length; k++) { // starting number
            var curr = arr.slice();
            var next = curr.splice(k, 1);
            log("curr: " + curr);
            log("next: " + next);
            genAllNumberCombo(curr.slice(), num.concat(next));
            if(curr.length > 0) {
                genAllNumberCombo(curr);
            }
        }
    }
}

function flatmap(arr) {
    n = {};
    for( var i in arr ) {
        var k = parseInt(arr[i].join(""));
        n[k] = k;
    }

    flat_list = []
    for( k in n ) {
        flat_list.push(k);
    }

    return flat_list;
}

function solve(elementId) {
    all_num_combo_list = [];
    var answer_box = document.getElementById(elementId);

    genAllNumberCombo(number_list);
    all_num_combo_list = flatmap( all_num_combo_list );

    answer_box.innerHTML = all_num_combo_list.join("<br>\n");
}


