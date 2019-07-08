/*function Person(name, surname, age){
    this.name = name;
    this.surname = surname;
    this.age = age;
}

let person =new Person("Alejandro", "Martínez", 24);

*/

/* Cartas y Mano son objetos */

class Person {
    constructor (name, surname){
        this.name = name;
        this.surname = surname;
    }
sayHi(){
        console.log("Hola, me llamo " + this.name);

}
}


exports.Person = Person;

/*
1 fichero por objeto

1 fichero main, donde se ejecuta el programa
se crean las cartas, se crea la mano
se empiueza la partida, se ejecuta y se comprueba el resultado.

 */