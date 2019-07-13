/**
Este es el fichero main, desde donde:
 - se crea la partida
    - se crean las manos de cada jugador
        - se crean las cartas

- se simula la partida.

 Instrucciones:

 Las cartas pueden aceptar los siguientes palos (suits):
 * picas/spades (S)
 * corazones/hearts (H)
 * tréboles/clubs (C)
 * diamantes/diamonds (D).

 Las cartas pueden aceptar los siguientes valores de carta:
 * 2
 * 3
 * 4
 * 5
 * 6
 * 7
 * 8
 * 9
 * 10 /Ten (T)
 * dama/Jack (J)
 * reina/Queen (Q)
 * rey/King (K)
 * as/Ace (A).
 *
 * La partida la ganará aquel jugador que tenga mejor "mano" de acuerdo a las reglas del poker clásico (5 CARD STUD)
 **/

let Game = require("./Game");

let game = new Game.Game (["3H", "3C", "7H", "5H", "KH"], ["9D", "9C", "8C", "5C", "AC"]);

    try {
        if(!game.validateGame() )
        {
            throw new Error("Una de las cartas no es válida, o bien, hay alguna carta repetida. Por favor, revise la introducción de datos.");
        } else {
            //mi juego
            game.playGame();
        }

    } catch (e) {
        console.log(e.name + ": " + e.message);
}
