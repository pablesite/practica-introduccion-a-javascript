let Hand = require("./Hand");


/** Clase Game **/

class Game {

    constructor (player1, player2){
        this.card1Player1 = player1[0];
        this.card2Player1 = player1[1];
        this.card3Player1 = player1[2];
        this.card4Player1 = player1[3];
        this.card5Player1 = player1[4];

        this.card1Player2 = player2[0];
        this.card2Player2 = player2[1];
        this.card3Player2 = player2[2];
        this.card4Player2 = player2[3];
        this.card5Player2 = player2[4];

        if (player1.length === 5 && player2.length === 5 ) {
            this.handPlayer1 = new Hand.Hand(this.card1Player1, this.card2Player1, this.card3Player1, this.card4Player1, this.card5Player1);
            this.handPlayer2 = new Hand.Hand(this.card1Player2, this.card2Player2, this.card3Player2, this.card4Player2, this.card5Player2);
        }
        else {
            throw new Error("El número de cartas para una de las manos no es correcto.");
        }

    }
    validateRepeatsCards(){
        /** Recorro todas las cartas y almaceno un array con los valores de las 10 cartas.
         * Después busco si hay repetidos. Si no, perfecto. De lo contrario, hay una carta repetida.
          */

        let cards = [this.card1Player1, this.card2Player1, this.card3Player1, this.card4Player1, this.card5Player1
            , this.card1Player2, this.card2Player2, this.card3Player2, this.card4Player2, this.card5Player2];
        let uniqs = cards.filter(function(item, index, array) {
            return array.indexOf(item) === index;
        });

        if (uniqs.length < 10){
            return false;
        } else {
            return true;
        }
    }

    validateGame () {
        if(!this.validateRepeatsCards()){
            return false;
        } else {
            if(!this.handPlayer1.validateHand() || !this.handPlayer2.validateHand()){
                return false;
            }else {
                return true;
            }
        }
    }

    playGame () {
        /** Si la jugada del jugador 1 es mejor que la del 2, gana el 1.
        * Si es peor, gana el 2.
        * Si es empate, se comprueba el valor de la jugada.
        *   Si el valor (NOTA) de la jugada X del jugador 1 es mejor que el valor de la jugada X del jugador 2, gana el 1.
        *   Si es peor, gana el 2.
        *   Si es empate, han empatado.
        * (NOTA): El valor de la jugada cuenta todas las cartas.
        * Por ejemplo: En el caso de un trio, el valor se compondría por:
        *   1. el valor del trio
        *   2. el valor de la carta individual más alta.
        *   3. el valor de la carta individual siguiente
        **/
        let playPlayer1 = this.handPlayer1.getPlayHand();
        let playPlayer2 = this.handPlayer2.getPlayHand();

        if (playPlayer1 > playPlayer2 ) {
            console.log("Gana el jugador 1. " + this.handPlayer1.getTypeHand(playPlayer1));

        } else if (playPlayer1  ===  playPlayer2) {
            /** Para desempatar:
            Se compara la puntuación de cada jugada de la siguiente forma:
            Cada jugada devuelve un string de hasta 5 símbolos hexadecimales con el orden que ha resultado la puntuación de la mano.
            .**/
            let punctuationPlayer1 = parseInt(this.handPlayer1.getPunctuation(playPlayer1),16);
            let punctuationPlayer2 = parseInt(this.handPlayer2.getPunctuation(playPlayer2),16);

            if (punctuationPlayer1  > punctuationPlayer2 ) {
                console.log("Gana el jugador 1. " + this.handPlayer1.getTypeHand(playPlayer1) /*+ handPlayer1.typePunctuationPlayer1(punctuationPlayer1)*/);
                console.log("Para el desempate se ha calculado la puntuación de la mano de cada jugador y se ha encadenado en un string de carácteres hexadecimales para facilitar su comparación.")
                console.log("La puntuación del jugador 1 es: " + punctuationPlayer1.toString(16))
                console.log("La puntuación del jugador 2 es: " + punctuationPlayer2.toString(16))
            } else if (punctuationPlayer1 === punctuationPlayer2 ) {
                /* Si el valor de la jugada también es empate */
                console.log("Empate")
            } else {
                console.log("Gana el jugador 2. " + this.handPlayer1.getTypeHand(playPlayer2) /*+ handPlayer1.typePunctuationPlayer1(punctuationPlayer2)*/);
                console.log("Para el desempate se ha calculado la puntuación de la mano de cada jugador y se ha encadenado en un string de carácteres hexadecimales para facilitar su comparación.")
                console.log("La puntuación del jugador 1 es: " + punctuationPlayer1.toString(16))
                console.log("La puntuación del jugador 2 es: " + punctuationPlayer2.toString(16))
            }
        } else {
            console.log("Gana el jugador 2. " + this.handPlayer1.getTypeHand(playPlayer2))
        }
    }

}
exports.Game = Game;