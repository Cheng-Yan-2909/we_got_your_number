

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
            Math.floor(Math.random() * 11)
        );
    }
    num_element.innerHTML = number_list.join(", ");
}

/////////////

function genAllNumberCombo() {
    var num_list = [];
    for(var k = 0; k < 4; k++) { // starting number
        num_list.push(number_list[k])
        var n = number_list[k];
        for( var i = 1; i < 4; i++ ) {
            var a = (k + i) % 4;
            n = (n * 10) + number_list[a];
            num_list.push(n)
        }
    }

    return num_list;
}

function solve(elementId) {
    var answer_box = document.getElementById(elementId);
    var all_numbers = genAllNumberCombo();

    answer_box.innerHTML = all_numbers.join("<br>\n");
}


