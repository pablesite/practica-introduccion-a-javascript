/*
1 fichero por objeto

1 fichero main, donde se ejecuta el programa
se crean las cartas, se crea la mano
se empiueza la partida, se ejecuta y se comprueba el resultado.

 */

let Hand = require("./Hand");

/*
let handPlayer1 = new Hand.Hand("2H", "3D", "5S", "9C", "KD");
let handPlayer2 = new Hand.Hand("2C", "3H", "4S", "8C", "AH");
*/
let handPlayer1 = new Hand.Hand("2H", "4D", "4S", "6C", "KD");
let handPlayer2 = new Hand.Hand("2H", "3D", "4S", "6C", "KD");

try {
    if(!handPlayer1.validateHand() || !handPlayer2.validateHand() )
    {
        throw new Error("Una de las cartas no es válida. Por favor, revise la introducción de datos.");
    } else {
        /* Si la jugada del jugador 1 es mejor que la del 2, gana el 1.
        * Si es peor, gana el 2.
        * Si es empate, se comprueba el valor de la jugada.
        *   Si el valor de la jugada X del jugador 1 es mejor que el valor de la jugada X del jugador 2, gana el 1.
        *   Si es peor, gana el 2.
        *   Si es empate...
        *       Se vuelve a calcular la jugada de los dos jugadores con la restricción de que sea menor que la que estaban empatados.
        *       Y así vuelta a empezar hasta llegar a la primera jugada (carta más alta).*
        */
        let restrict = 9;
        let i;

        for (i = 9; i > 0; i--) {
            /* La jugada se calculará con restricciones, para resolver el tema de los empates.
            * Si ha habido un empate con un poker (valor 9), se va a calcular la siguiente jugada con la restricción del 9, es decir,
            * de 8 hacia abajo. En el caso inicial, no hay restricciones, por lo que el parámetro será un 9.
            */

            if (restrict >= i) {
                playPlayer1 = handPlayer1.getPlayHand(restrict);
                playPlayer2 = handPlayer2.getPlayHand(restrict);
                restrict = Math.max(playPlayer1, playPlayer1);

                if (playPlayer1 > playPlayer2 ) {
                    console.log("Gana el jugador 1. " + handPlayer1.getTypeHand(playPlayer1));
                    restrict = 0;
                } else if (playPlayer1  ===  playPlayer2) {
                    /* Cada jugada devuelve un string de 5 símbolos hexadecimales con el orden que ha resultado la puntuación de la mano.
                    Lo único que hay que hacer es comparar esta cadena transformada a decimal (parseInt(hex, 16)) .*/
                    punctuationPlayer1 = parseInt(handPlayer1.getPunctuation(playPlayer1),16);
                    punctuationPlayer2 = parseInt(handPlayer2.getPunctuation(playPlayer2), 16);


                    console.log("PUNTUACIÓN player 1. " + punctuationPlayer1)
                    console.log("PUNTUACIÓN player 2. " + punctuationPlayer2)

                    if (punctuationPlayer1  > punctuationPlayer2 ) {
                        console.log("Gana el jugador 1. " + handPlayer1.getTypeHand(playPlayer1) /*+ handPlayer1.typePunctuationPlayer1(punctuationPlayer1)*/);
                        restrict = 0;
                    } else if (punctuationPlayer1 === punctuationPlayer2 ) {
                        /* Si el valor de la jugada también es empate */
                        if(restrict === 1){
                            console.log("Empate")
                            restrict = 0;
                        } else {
                            restrict -=1;
                        }
                    } else {
                        console.log("Gana el jugador 2. " + handPlayer1.getTypeHand(playPlayer2) /*+ handPlayer1.typePunctuationPlayer1(punctuationPlayer2)*/);
                        restrict = 0;
                    }
                } else {
                    console.log("Gana el jugador 2. " + handPlayer1.getTypeHand(playPlayer2))
                    restrict = 0;
                }
            }

        }


    }

} catch (e) {
    console.log(e.name + ": " + e.message);


}






/*console.log(person.surname);*/