/*
# Primera Kata
## FooBarQuix

Nos dan un número entre el 1 y 100, y tenemos que devolver por orden lo siguiente:

    * Si el número es divisible por 3, escribiremos “Foo” en lugar del número
* Si el número es divisible por 5, añadimos “Bar”
* Si el número es divisible por 7, añadimos “Quix”.
* Por cada dígito 3,5 o 7, añadiremos “Foo”, “Bar”, “Quix” respectivamente y en orden de aparición.
*/  

function foobarquix (num) {
    let output;

    if(num % 3 === 0){
        //Foo
        }
    if(num % 5 === 0){
        //Bar
    }
    if(num % 7 === 0){
        //Quix
    }

    //divido el numero en cifras
    let cifra = num.toString();

    for (let i =0; i <num.length; i++)
    {

        switch (num) {
            case 3:
                //Foo

            case 5:
                //Bar

            case 7:
                //Quix
        }
    }
}


/* Ejecución de prueba */