

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

function flatmap() {
    n = {};
    for( var i in all_num_combo_list ) {
        var k = parseInt(all_num_combo_list[i].join(""));
        n[k] = k;
    }

    all_num_combo_list = []
    for( k in n ) {
        all_num_combo_list.push(k);
    }
}

function solve(elementId) {
    all_num_combo_list = [];
    var answer_box = document.getElementById(elementId);

    genAllNumberCombo(number_list);
    flatmap();

    answer_box.innerHTML = all_num_combo_list.join("<br>\n");
}


