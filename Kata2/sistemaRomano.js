/*## Sistema Romano
Vamos a hacer un ejercicio clásico y es jugar con los números romanos y árabes.
Como refresco, vamos a ver sus símbolos y reglas.

#### Símbolos

Romano | Árabe
--------|-------
    I | 1
V | 5
    X | 10
L | 50
    C | 100
D | 500
    M | 1000

### Reglas

Sólo se contemplan números entre el 1 y el 3999

* Los símbolos I, X, C y M se pueden repetir hasta tres veces.
* Los símbolos V, L y D no pueden repetirse.
* Los símbolos I, X y C se suman si están a la derecha de otro mayor o igual.
* Los símbolos I, X y C se restan si están a la izquierda de otro mayor y solamente pueden anteponerse a los dos símbolos que le siguen en la sucesión.
* I se resta de V y X
* X se resta de L y C
* C se resta de D y M
* Los símbolos V, L y D no pueden colocarse a la izquierda de otro mayor.

### Ejercicios

* Crear una función para pasar de número romanos a árabes
* Crear una función para pasar de árabes a romanos
* Hacer un validador de números romanos
*/


function validateRepetitions (arrayStr, simbol) {
    let newArray = [];
    let i = -1;
    let output = true;
    arrayStr.forEach(function(element, index) {
        if (element === simbol && index === i + 1){
            newArray.push(element);
            if (newArray.length > 3){
                output = false;
            }
            i = index;
        }
    });
    return output;

}



function romanToArabic (romanStr) {


}

function arabicToRoman (arabicNum) {


}

function validateRomanNum (romanStr) {

    let arrayStr = romanStr.split("");

    /* Si se repite un simbolo más de 3 veces seguidas debe dar error */
     if (!validateRepetitions(arrayStr, "I") ||
         !validateRepetitions(arrayStr, "X") ||
         !validateRepetitions(arrayStr, "C") ||
         !validateRepetitions(arrayStr, "M")) {
         console.log ("El número romano no es correcto. Repite uno de los símbolos I, X, C o M más de tres veces");
     }

     /* */
     else if(true){

     }

     /* */
     else if (true){

     }

     /* El número es correcto*/
     else {
         console.log ("El número romano introducido es correcto.")
     }





}





validateRomanNum ("XXXIXX");

