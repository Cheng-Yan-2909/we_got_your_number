

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

function contains(the_list, val) {
    for( var i in the_list  ) {
        console.log(" -- contains -- checking " + i + " / " + val);
        if( the_list[i] == val ) {
            return true
        }
    }
    return false;
}

function getCombWithPrefix(index_list = [], num) {
    console.log(" --> getCombWithPrefix( " + index_list.join(",") + ", " + num + " )");
    num = num * 10;
    for( var k = 0; k < 4; k++ ) {
        console.log("getCombWithPrefix: k=" + k);
        if( contains(index_list, k) ) {
            console.log(" -- already processed");
            continue;
        }
        index_list.push(k);
        num += number_list[k]
        console.log(" -- num = " + num);
        console.log(" -- index_list = " + index_list.join(", "))
        all_num_combo_list.push(num);
        getCombWithPrefix(index_list, num);
        
    }
}

function genAllNumberCombo() {
    all_num_combo_list = [];
    for(var k = 0; k < 4; k++) { // starting number
        all_num_combo_list.push(number_list[k]);
        console.log("===== genAllNumberCombo: k => " + k + " / " + number_list[k] + "  ========");
        getCombWithPrefix([k], number_list[k]);
    }
}

function solve(elementId) {
    var answer_box = document.getElementById(elementId);
    genAllNumberCombo();

    answer_box.innerHTML = all_num_combo_list.join("<br>\n");
}


