/* Algoritmo Árabes a Romanos
* 1 Divido el número árabe original entre mil.
*     1.a Si el resto (redondeado inferior) es = 0, no hago nada y paso a la siguiente.
*     1.b Si el resto (redondeado inferior) es >= 1 y <= 3, asigno "M.." a la cadena), y resto numero * 1000 al original
*
* 2 Divido el numero restante entre cien.
*     2.a Si el resto (redondeado inferior) es = 0, no hago nada y paso a la siguiente.
*     2.b Si el resto (redondeado inferior) es >= 1 y <= 3, asigno "CCC" a la cadena y resto numero * 100 al original.
*     2.c Si el resto (redondeado inferior) es == 4, asigno "CD" a la cadena y resto numero * 100 al original.
*     2.d Si el resto (redondeado inferior) es == 5, asigno "D" a la cadena y resto numero * 100 al original.
*     2.e Si el resto (redondeado inferior) es >=6 y <=8, asigno "DC.." a la cadena y resto numero * 100 al original.
*     2.f Si el resto (redondeado inferior) es == 9, asigno "CM" a la cadena y resto numero * 100 al original.
* 3 Lo mismo dividiendo entre 10
* 4 Lo mismo con el resto que quede.
* */

/* para testear */
let arabicNum = 1427;


let rest = 0;
let str = "";

let equivalence  = {
    1    : "I",
    5    : "V",
    10   : "X",
    50   : "L",
    100  : "C",
    500  : "D",
    1000 : "M"
};


let count = [1000, 100, 10, 1];
count.forEach(function(element) {
    rest = Math.floor(arabicNum/element);
    arabicNum -= rest * element;
    if (rest > 0 && rest <= 3) {
        str += equivalence[element].repeat(rest);
    }else if (rest === 4 && element !== 1000) {
        str += equivalence[element] + equivalence[element*5];
    }else if (rest === 5 && element !== 1000) {
        str += equivalence[element * 5];
    }else if (rest >= 6 && rest <= 8 && element !== 1000) {
        str += equivalence[element * 5] + equivalence[element].repeat(rest-5);
    }else if (rest === 9 && element !== 1000) {
        str += equivalence[element] + equivalence[element * 10] ;
    }

});



/* para testear */

console.log(str);

/*MCMLXXXVIII*/