let Card = require("./Card");

/* Clase Mano */

class Hand {

    constructor (card1, card2, card3, card4, card5){

        let card1Split = card1.split("");
        let card2Split = card2.split("");
        let card3Split = card3.split("");
        let card4Split = card4.split("");
        let card5Split = card5.split("");
        this.card1 = new Card.Card(card1Split[0], card1Split[1]);
        this.card2 = new Card.Card(card2Split[0], card2Split[1]);
        this.card3 = new Card.Card(card3Split[0], card3Split[1]);
        this.card4 = new Card.Card(card4Split[0], card4Split[1]);
        this.card5 = new Card.Card(card5Split[0], card5Split[1]);

    }

    validateHand () {
        if(!this.card1.validateCard() || !this.card2.validateCard() || !this.card3.validateCard() || !this.card4.validateCard() || !this.card5.validateCard()){
            return false;
        }else {
            return true;

        }
    }

    /** Funciones para evaluar qué jugada hay en la mano de cartas **/
    getReps(cardValues) {
        /** Función auxiliar para validar gran parte de las jugadas. **/
        let temp = [];
        let reps = [];
        let rest = [];

        // bloque para buscar nº de repeticiones de cartas y nº de cartas individuales
        cardValues.forEach((value,index)=>{
            temp = Object.assign([],cardValues);
            temp.splice(index,1);
            if(temp.indexOf(value)!=-1 && reps.indexOf(value)==-1) {
                reps.push(value.toString(16));
            }else if (temp.indexOf(value)===-1){
                rest.push(value.toString(16));
            }
        });

        return [reps, rest];
    }
    existStraightFlush () {
        if (this.existFlush() && this.existStraight()){
            return true;
        } else {
            return false;
        }
    }
    existFourOfAKind () {
        let cardValues = [this.card1.value, this.card2.value, this.card3.value, this.card4.value, this.card5.value];

        let reps = this.getReps(cardValues);

        if (reps[0].length === 1 && reps[1].length === 1 ) {
            return true;
        } else {
            return false;
        }
    }
    existFullHouse () {
        let cardValues = [this.card1.value, this.card2.value, this.card3.value, this.card4.value, this.card5.value];

        let reps = this.getReps(cardValues);

        if (reps[0].length === 2 && reps[1].length === 0 ) {
            return true;
        } else {
            return false;
        }
    }
    existFlush () {
        let cardSuites = [this.card1.suite, this.card2.suite, this.card3.suite, this.card4.suite, this.card5.suite];
        let output = true;
        cardSuites.forEach(function(element, index){
            if (index !== 0) {
                if (element !== cardSuites[index - 1]){
                    output = false;
                }
            }
        });
        return output;
    }
    existStraight () {
        let cardValues = [this.card1.value, this.card2.value, this.card3.value, this.card4.value, this.card5.value];
        let output = true;

        cardValues.sort((a, b) => a - b).forEach(function(element, index) {
            if (index != 0){
                /* si la diferencia entre un número y el siguiente no es 1 o si
                la diferencia no es 9 (escalera de 2 a A), entonces false */
                if ((element -1) != cardValues[index-1] && ((element -9) != cardValues[index-1])) {

                        output = false;
                }
            }
        });

        return output;

    }
    existThreeOfAKind () {
        let cardValues = [this.card1.value, this.card2.value, this.card3.value, this.card4.value, this.card5.value];

        let reps = this.getReps(cardValues);

        if (reps[0].length === 1 && reps[1].length === 2 ) {
            return true;
        } else {
            return false;
        }
    }
    existTwoPairs () {
        let cardValues = [this.card1.value, this.card2.value, this.card3.value, this.card4.value, this.card5.value];

        let reps = this.getReps(cardValues);

        if (reps[0].length === 2 && reps[1].length === 1 ) {
            return true;
        } else {
            return false;
        }
    }
    existPair () {
        let cardValues = [this.card1.value, this.card2.value, this.card3.value, this.card4.value, this.card5.value];

        let reps = this.getReps(cardValues);

        if (reps[0].length === 1 && reps[1].length === 3 ) {
            return true;
        } else {
            return false;
        }
    }
    // Main
    getPlayHand() {
        /** Aquí pondremos las comprobaciones para saber qué mano tiene el juegador.
        * Devuelve un valor de 1 a 9, siendo el 1 la jugada "carta más alta", y el 9 la "escalera de color".
        * ¿Tiene escalera de color? No
        * ¿Tiene poker? Sí --> devuelve 8.
        * **/
        let playHand = 1;
        // Se calcula de mayor a menor si la mano cumple las condiciones.
        // Cuando cumple se añade a un array el valor de lo que ha cumplido.

        if(this.existStraightFlush()) {
            playHand = 9;
        } else if (this.existFourOfAKind()) {
            playHand = 8;
        } else if (this.existFullHouse()) {
            playHand = 7;
        } else if (this.existFlush()) {
            playHand = 6;
        }else if (this.existStraight()) {
            playHand = 5;
        }else if (this.existThreeOfAKind()) {
            playHand = 4;
        }else if (this.existTwoPairs()) {
            playHand = 3;
        }else if (this.existPair()) {
            playHand = 2;
        }
        return playHand;
    }

    /** Función auxiliar que devuelve el nombre de las jugadas. Es útil para escribir en consola con qué jugada ha ganado
     * el jugador. */
    getTypeHand(playHand) {
        switch (playHand) {
            case 1:
                return "High Card";
                break;
            case 2:
                return "Pair";
                break;
            case 3:
                return "Two Pairs";
                break;
            case 4:
                return "Three of a Kind";
                break;
            case 5:
                return "Straight";
                break;
            case 6:
                return "Flush";
                break;
            case 7:
                return "Full House";
                break;
            case 8:
                return "Four of a Kind";
                break;
            case 9:
                return "Straight flush";
                break;
        }
    }

    /** Funciones para obtener las puntuaciones que hay en una jugada concreta. Sólo usado en el desempate. **/
    updateValues(values) {
        /** Función auxiliar que convierte los valores decimales del 10 en adelante a hexadecimales. Importante para poder
         * comparar las puntuaciones de cada jugada. **/
        values.forEach(function(element, index){
            if ( element === "10"){
                values[index] = "A";
            }
            if ( element === "11"){
                values[index] = "B";
            }
            if ( element === "12"){
                values[index] = "C";
            }
            if ( element === "13"){
                values[index] = "D";
            }
            if ( element === "14"){
                values[index] = "E";
            }
        });


        return(values);
    }
    orderValues(values) {
        /** Función auxiliar para ordenar el valor de un array de mayor a menor con valor de cartas o jugadas**/
        let punct = "";
        let valuesUpdated = this.updateValues(values.sort((a, b) => b - a));
        valuesUpdated.forEach(function(element){
            punct += element.toString(16);
        });
        return punct;
    }
    // Main
    getPunctuation(playHand){
        /** Función genérica que calcula la puntuación de cada jugada. Es apropiada para todas las jugadas excepto para
         * "color" o "flush" (6). Por la sencillez de esta, se devuelve la puntuación directamente con una llamada a ordenar
         * las cartas.
         */
        let cardValues = [this.card1.value, this.card2.value, this.card3.value, this.card4.value, this.card5.value];

        if (playHand === 6) {
            return this.orderValues(cardValues);
        } else {
            // buscar repeticiones de cartas y cartas individuales
            let reps = this.getReps(cardValues);

            // bloque para ordenar el valor de las repeticiones
            let repsValues = this.orderValues(reps[0]);
            // bloque para ordenar el valor de las cartas individuales
            let restValues = this.orderValues(reps[1]);

            return repsValues.concat(restValues);
        }

    }

}

exports.Hand = Hand;