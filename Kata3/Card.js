
/* Clase Carta */

class Card {
    constructor (value,suit){

        this.value = value;
        this.suite = suit;

    }

    validateCard(){
        let output = true;

        let validValues  = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
        let validSimbols  = ["S", "H", "C", "D"];

        if (validValues.find(value => value === this.value) === undefined) {
            output = false;
        }

        if (validSimbols.find(suite => suite === this.suite) === undefined) {
            output = false;
        }
        return output;
    }
}


exports.Card = Card;

