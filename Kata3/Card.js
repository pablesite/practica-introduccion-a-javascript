
/* Clase Carta */

class Card {
    constructor (value,suit){

        this.value = value;
        this.suite = suit;

    }

    updateValues() {

        if (this.value === "T") {
            this.value = "10";
        }
        if (this.value === "J") {
            this.value = "11";
        }
        if (this.value === "Q") {
            this.value = "12";
        }
        if (this.value === "K") {
            this.value = "13";
        }
        if (this.value === "A") {
            this.value = "14";
        }
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

        //Aprovecho y actualizo los símbolos que no son números.
        this.updateValues();

        return output;
    }


}




exports.Card = Card;

