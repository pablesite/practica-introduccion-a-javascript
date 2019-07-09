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

* Los símbolos I, X, C y M se pueden repetir hasta tres veces (CONSECUTIVAS).
* Los símbolos V, L y D no pueden repetirse.
* Los símbolos I, X y C se suman si están a la derecha de otro mayor o igual.
* Los símbolos I, X y C se restan (SÓLO UNA VEZ) si están a la izquierda de otro mayor y solamente pueden anteponerse a los dos símbolos que le siguen en la sucesión.
* I se resta de V y X
* X se resta de L y C
* C se resta de D y M
* Los símbolos V, L y D no pueden colocarse a la izquierda de otro mayor.

### Ejercicios

* Crear una función para pasar de número romanos a árabes
* Crear una función para pasar de árabes a romanos
* Hacer un validador de números romanos
*/

// está mal, porque el if primero evita comprobar la posible repetición cuando no se produce en el inicio
function validateRepetitionsIXCM (arrayStr, simbol) {
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

function validateAnteSucesion (arrayStr, simbol) {
    let i = -1;
    let output = true;

    arrayStr.forEach(function(element, index) {
        if (element === simbol){
            i = index;
        }

        if (index === i + 1 && index !== 0) {
            switch (simbol) {
                case 'I':
                    if ((element === "L" || element === "C" || element === "D" || element === "M")) {output = false;}
                    break;
                case 'X':
                    if ((element === "D" || element === "M")) {output = false;}
                    break;
            }
        }
    });

    return output;

}

function validateAnteSucesion1 (arrayStr, simbol) {
    let newArray = [];
    let newArray2 = [];
    let i = -1;
    let count = 0;
    let element2 = "";
    let output = true;

    let found = arrayStr.findIndex(function(element) {return element === simbol;});

    arrayStr.forEach(function(element, index) {
        if (index >= found){
            newArray.push(element);
        }
    });

    console.log(newArray);

    newArray.forEach(function(element, index) {
        //Puede que esto tenga un problema si se repiten 3 simbolos iguales tras la primera sucesión de ese mismo simbolo.
        if (index === i + 1) {
            newArray2.push(element);
            if (element === simbol) {
                i = index;
            }
        }
    });

    console.log(newArray2);

    if (newArray2.length > 4){
        output = false;
    } else if (newArray2.length === 4){
        element2 = newArray2[3];
        //comprobación 1
        if (element2 != null) {output = false;}
    }else if (newArray2.length === 3){
        element2 = newArray2[2];
        //comprobación 2
        if ((element2 === "V" || element2 === "X" || element2 === "L" || element2 === "C" || element2 === "D" || element2 === "M")) {output = false;}

    }else if (newArray2.length === 2){
        element2 = newArray2[1];
        //comprobación 3
        if ((element2 === "L" || element2 === "C" || element2 === "D" || element2 === "M")) {output = false;}
    }

    return output;

}


function validateAnteMayor (arrayStr, simbol) {
    let i = -1;
    let output = true;

    arrayStr.forEach(function(element, index) {
        if (element === simbol){
            i = index;
        }

        if (index === i + 1 && index !== 0) {
            switch (simbol) {
                case 'V':
                    if (element === "X" || element === "L" || element === "C" || element === "D" || element === "M") {output = false;}
                    break;
                case 'L':
                    if (element === "C" || element === "D" || element === "M") {output = false;}
                    break;
                case 'D':
                    if (element === "M" ) {output = false;}
                    break;
            }
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
     if (!validateRepetitionsIXCM(arrayStr, "I") ||
         !validateRepetitionsIXCM(arrayStr, "X") ||
         !validateRepetitionsIXCM(arrayStr, "C") ||
         !validateRepetitionsIXCM(arrayStr, "M"))
     {
         console.log ("El número romano no es correcto. Repite uno de los símbolos I, X, C o M más de tres veces");
     }

     /* Los símbolos V, L y D no pueden repetirse. */
     else if(arrayStr.filter(simbol => simbol === "V").length > 1 ||
             arrayStr.filter(simbol => simbol === "L").length > 1 ||
             arrayStr.filter(simbol => simbol === "D").length > 1 )
     {
         console.log ("El número romano no es correcto. Repite uno de los símbolos V, L o D");
     }

     /* Los símbolos I, X y C solamente pueden anteponerse a los dos símbolos que le siguen en la sucesión (I-->V-X  X->-L-C  C-->D-M) */
     else if (!validateAnteSucesion1(arrayStr, "I"))
              /*!validateAnteSucesion(arrayStr, "X") )*/
     {
         console.log ("El número romano no es correcto. Los símbolos I, X y C solamente pueden anteponerse a los dos símbolos que le siguen en la sucesión");
     }

     /* Los símbolos V, L y D no pueden colocarse a la izquierda de otro mayor */
     else if (!validateAnteMayor(arrayStr, "V") ||
              !validateAnteMayor(arrayStr, "L") ||
              !validateAnteMayor(arrayStr, "D"))
     {
         console.log ("El número romano no es correcto. Los símbolos V, L y D no pueden colocarse a la izquierda de otro mayor");
     }

       /* El número es correcto*/
     else {
         console.log ("El número romano introducido es correcto.")
     }

}





validateRomanNum ("ASFASFSAXIIIX");

/* Ahora mismo hay cosas que aun no funcionan.

Para empezar, sólo estoy comprobando en la función validateAnteSucesion1, el símbolo I. Me falta hacer un switch con  la X y la C también.

Por otra parte, he detectado que si pongo por ejemplo el número IXV sí funcionaría según mi lógica. Eso no es correcto. Si la X tiene a la izq un símbolo restando, el de la derecha no puede estar sumando.

Además, la función para ver los repetidos ya no haría falta, porque con la de validateAnteSucesion1 se soluciona esa parte.

Por último, falta añadir la comprobación de cuando se introduce una letra que no es de las permitidas...
 */