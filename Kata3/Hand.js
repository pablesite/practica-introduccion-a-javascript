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

    /* Aquí pondremos las comprobaciones para saber qué mano tiene el juegador.
    * Devuelve un valor de 1 a 9, siendo el 1 el valor de carta más alta, y el 9 la escalera de color.
    * ¿Tiene escalera de color? No
    * ¿Tiene poker? Sí --> devuelve 8.
    * */
    getPlayHand(restrict) {
        //let x = this.card1;
        return 1;

    }

    /* Devolvemos el tipo de jugada, para escribir en consola al ejecutar testPoker */
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


    /* Llama a la función de conseguir la puntuación de la jugada que toque, entre las 9 funciones siguientes.*/
    getPunctuation(playHand){
        switch (playHand) {
            case 1:
                return this.getHighCardPuntc();
            case 2:
                return this.getPairPuntc();
            case 3:
                return this.getTwoPairsPuntc();
            case 4:
                return this.getThreeOfAKindPuntc();
            case 5:
                return this.getStraightPuntc();
            case 6:
                return this.getFlushPuntc();
            case 7:
                return this.getFullHousePuntc();
            case 8:
                return this.getFourOfAKindPuntc();
            case 9:
                return this.getStraightflushPuntc();
        }
    }


    getHighCardPuntc(){
        /* Puntuación de la carta más alta. Igual al valor de las cartas ordenadas de mayor a menor.
        (5 símbolos en Hexadecimal. ejemplo: 0xA8632) */

        let punctuation = "";
        let cardValues = [this.card1.value, this.card2.value, this.card3.value, this.card4.value, this.card5.value];

        let cardValuesSort = cardValues.sort((a, b) => b - a);
        console.log(cardValuesSort)

        cardValuesSort.forEach(function(element){
            punctuation += element.toString(16);
        })

        return punctuation;
    }

    getPairPuntc(){
        /* Puntuación de la pareja. Igual al valor de la pareja. Si es igual, valor de la carta más alta ordenada de mayor a menor.
        (4 símbolos en Hexadecimal (1 para la pareja, y otros 3 para las otras tres cartas ordenadas de mayor a menor.))*/

    }

    getTwoPairsPuntc(){
        /* Puntuación de las dobles parejas. Igual al valor de la primera pareja + el valor de la segunda pareja + el valor de la última carta
        (3 símbolos en Hexadecimal (1 para la pareja más alta, 1 para la pareja más baja y otro para la carta restante)) */
    }

    getThreeOfAKindPuntc(){
        /* Puntuación del trio. Igual al valor del trio + valor de las otras dos cartas ordenadas de mayor a menor.
        (3 símbolos en Hexadecimal (1 para el valor del trio, y dos para las cartas restantes ordenadas de mayor a menor)) */
    }

    getStraightPuntc(){
        /* Puntuación de la escalera. Valor de la carta más alta de la escalera
        * 1 símbolo en Hexadecimal */
    }

    getFlushPuntc(){
        /* Puntuación de la carta más alta (todas de color). Igual al valor de las cartas ordenadas de mayor a menor
        * (5 símbolos en Hexadecimal. ejemplo: 0xA8632) */
        return this.getHighCardPuntc();

    }

    getFullHousePuntc(){
        /* Puntuación de un Full (trio + pareja). Igual al valor del trio + el valor de la pareja
        * (2 símbolos en Hexadecimal */
    }

    getFourOfAKindPuntc(){
        /* Puntuación del poker (4 cartas iguales). Igual al valor del poker + el valor de la carta restante. */
    }

    getStraightflushPuntc(){
        /* Puntuación de la carta más alta */
    }



}

exports.Hand = Hand;