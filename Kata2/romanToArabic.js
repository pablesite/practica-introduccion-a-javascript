/** Algoritmo Romanos a Árabes
* - Leo de derecha a izquierda los símbolos
* 1. El primero siempre se suma
* 2. Leo el segundo (n), y comparo con el anterior (n-1)
*   2. a Si n es igual o más grande que n-1, el n se suma al total.
*   2. b Si n es más pequeño que n-1, n se resta al total.
**/

let testValidate = require("./validateRomanNumber");

function romanToArabic (romanStr) {

    if (!testValidate.validateRomanNum (romanStr)) {
        return undefined;
    } else {

    let equivalence  = {
        "I": 1,
        "V": 5,
        "X": 10,
        "L": 50,
        "C": 100,
        "D": 500,
        "M": 1000
    };

    let sum = 0;

    let arrayStr = romanStr.split("").reverse();

    arrayStr.forEach(function(element, n) {
        if (n === 0 ){
            sum += equivalence[element];
        }
        else{
            if (equivalence[element] >= equivalence[arrayStr[n-1]]){
                sum += equivalence[element];
            } else {
                sum -= equivalence[element];
            }
        }
    });
    return sum;
    }
}

exports.romanToArabic = romanToArabic;



