/*## Sistema Romano
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

### Reglas - Instrucciones

Sólo se contemplan números entre el 1 y el 3999

* Los símbolos I, X, C y M se pueden repetir hasta tres veces (CONSECUTIVAS).
* Los símbolos V, L y D no pueden repetirse.
* Los símbolos I, X y C se suman si están a la derecha de otro mayor o igual.
* Los símbolos I, X y C se restan (SÓLO UNA VEZ) si están a la izquierda de otro mayor y solamente pueden anteponerse a los dos símbolos que le siguen en la sucesión.
* I se resta de V y X
* X se resta de L y C
* C se resta de D y M
* ADEMÁS, después de que uno de estos símbolos haga su función de resta, en el símbolo siguiente no puede volver a ir ni él mismo ni ninguno de los mayores a él.
* Los símbolos V, L y D no pueden colocarse a la izquierda de otro mayor.
*/

function validateSimbols(arrayStr) {

    let output = true;
    let validSimbols  = ["I", "V", "X", "L", "C", "D", "M"];

    arrayStr.forEach(function(element) {
        if (validSimbols.find(simbol => simbol === element) === undefined) {
            output = false;
        }
    });
    return output;
}

function validateRepetitionsIXCM (arrayStr, simbol) {
    let newArray = [];
    let output = true;
    arrayStr.forEach(function(element) {
        if (element === simbol){
            newArray.push(element);
            if (newArray.length > 3){
                output = false;
            }

        } else {
            newArray = [];
        }
    });
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

/*
* Recorro los símbolos de izquierda a derecha.
* compruebo que sea más pequeño que el siguiente para que todo sea ok.
* Si el siguiente es igual -->  el símbolo siguiente no puede ser mayor en ningún caso. Una vez repite, ya no puede restar
* Si el siguiente no es más pequeño, quiere decir que está restando en el que estoy. Entonces,
* se ccomprueba qué sea uno de los signos que pueden restar (I, X o C). Si no, número incorrecto.
* Si es uno de esos, se hace un switch que comprueba que cada símbolo que resta se corresponde con uno de los siguientes:
* I se resta de V y X --> Si la comprobación es buena, entonces la cadena de números debe terminar tras la V o la X.
* X se resta de L y C --> Si la comprobación es buena, entonces después sólo pueden venir símbolos V o I. (para esto jugaré con el array allowsimbols)
* C se resta de D y M --> Si la comprobación es buena, entonces después sólo pueden venir símbolos L, X, V o I (para esto jugaré con el array allowsimbols)
* */
function validateBehaviourIXC (arrayStr) {

    let equivalence  = {
        "I": 1,
        "V": 5,
        "X": 10,
        "L": 50,
        "C": 100,
        "D": 500,
        "M": 1000
    };

    let simbolTemp = arrayStr[0];
    let output = true;

    arrayStr.forEach(function(element, n) {
        if (n !== 0) {
            if (equivalence[simbolTemp] > equivalence[element]) {
                //el símbolo siguiente es más grande o igual, por lo tanto no hay que hacer nada especial.
                simbolTemp = element;
            } else if (equivalence[simbolTemp] === equivalence[element]){
                /* el símbolo siguiente no puede ser mayor en ningún caso. Una vez repite, ya no puede restar */
                if (equivalence[arrayStr[n + 1]] > equivalence[simbolTemp]) {
                    output = false;

                }
            } else {
                if (arrayStr[n-1] !== "I" && arrayStr[n-1] !== "X" && arrayStr[n-1] !== "C") {
                    output = false;

                } else {
                    switch (simbolTemp) {
                        case 'I':
                            if (element !== "V" && element !== "X") {
                                output = false;

                            } else {
                                if (arrayStr[n + 1] !== undefined) {
                                    output = false;

                                }
                            }
                            break;
                        case 'X':
                            if (element !== "L" && element !== "C") {
                                output = false;

                            } else {
                                if (arrayStr[n + 1] !== "V" && arrayStr[n + 1] !== "I" && arrayStr[n + 1] !== undefined) {
                                    output = false;
                                }
                            }
                            break;
                        case 'C':
                            if (element !== "D" && element !== "M") {
                                output = false;
                            } else {
                                if (arrayStr[n + 1] !== "L" && arrayStr[n + 1] !== "X" && arrayStr[n + 1] !== "V" && arrayStr[n + 1] !== "I" && arrayStr[n + 1] !== undefined) {
                                    output = false;
                                }
                            }
                            break;
                    }
                }
                simbolTemp = element;
            }

        }

    });
    return output;

}

/* Función principal para validar números romanos */
function validateRomanNum (romanStr) {

    let arrayStr = romanStr.split("");

    /* Si se introduce un símbolo que no se corresponde con los símbolos romanos, da error */
    if(!validateSimbols(arrayStr))
    {
        console.log ("En el número hay símbolos no reconocidos.");
        return false;
    }

    /* Si se repite un simbolo más de 3 veces seguidas debe dar error */
     else if (!validateRepetitionsIXCM(arrayStr, "I") ||
         !validateRepetitionsIXCM(arrayStr, "X") ||
         !validateRepetitionsIXCM(arrayStr, "C") ||
         !validateRepetitionsIXCM(arrayStr, "M"))
     {
         console.log ("El número romano no es correcto. Repite uno de los símbolos I, X, C o M más de tres veces");
     }

     /* Los símbolos I, X y C solamente pueden anteponerse a los dos símbolos que le siguen en la sucesión (I-->V-X  X->-L-C  C-->D-M)
     * Además, después de que uno de estos símbolos haga su función de resta, después no puede volver a ir  ni él mismo ni ninguno de los mayores a él. */
     else if (!validateBehaviourIXC(arrayStr))
     {
         console.log ("El número romano no es correcto. Los símbolos I, X y C solamente pueden anteponerse a los dos símbolos que le siguen en la sucesión. Puede que haya introducido valores mayores de lo que corresponde tras una resta");
     }

     /* Los símbolos V, L y D no pueden repetirse. */
     else if(arrayStr.filter(simbol => simbol === "V").length > 1 ||
             arrayStr.filter(simbol => simbol === "L").length > 1 ||
             arrayStr.filter(simbol => simbol === "D").length > 1 )
     {
         console.log ("El número romano no es correcto. Repite uno de los símbolos V, L o D");
         return false;
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
         return true;
     }

}


exports.validateRomanNum = validateRomanNum;



