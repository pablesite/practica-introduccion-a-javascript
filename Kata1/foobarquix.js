/*
# Primera Kata
## FooBarQuix

Nos dan un número entre el 1 y 100, y tenemos que devolver por orden lo siguiente:

* Si el número es divisible por 3, escribiremos “Foo” en lugar del número
* Si el número es divisible por 5, añadimos “Bar”
* Si el número es divisible por 7, añadimos “Quix”.
* Por cada dígito 3,5 o 7, añadiremos “Foo”, “Bar”, “Quix” respectivamente y en orden de aparición.
*/

export function foobarquix (num) {
    let output = "";

    if(num % 3 === 0){
        //Foo
        output += "Foo";
        }
    if(num % 5 === 0){
        //Bar
        output += "Bar";
    }
    if(num % 7 === 0){
        //Quix
        output += "Quix";
    }

    //divido el numero en cifras
    let cifras = num.toString().split('');

    cifras.forEach(function(element) {

        switch (element) {
            case '3':
                //Foo
                output += "Foo";
                break;
            case '5':
                //Bar
                output += "Bar";
                break;
            case '7':
                //Quix
                output += "Quix";
                break;
        }

    });

    if (output === "")
        output = num;

    return output;
}


