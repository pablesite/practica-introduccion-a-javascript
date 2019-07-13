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

    getReps(cardValues) {

        let temp = [];
        let reps = [];
        let rest = [];

        /* bloque para buscar nº de repeticiones de cartas y nº de cartas individuales */
        cardValues.forEach((value,index)=>{
            temp = Object.assign([],cardValues); //Copiado de elemento
            temp.splice(index,1); //Se elimina el elemnto q se compara
            /* Se busca en temp el elemento, y en repetido para ver si esta ingresado al array.
             * indexOf devuelve -1 si el elemento no se encuetra
             */
            if(temp.indexOf(value)!=-1 && reps.indexOf(value)==-1) {
                reps.push(value.toString(16));
            }else if (temp.indexOf(value)===-1){
                rest.push(value.toString(16));
            }
        });

        return [reps.length, rest.length];
    }

    existStraightflush () {
        return false;
    }
    existFourOfAKind () {
        let cardValues = [this.card1.value, this.card2.value, this.card3.value, this.card4.value, this.card5.value];

        let reps = this.getReps(cardValues);

        if (reps[0] === 1 && reps[1] === 1 ) {
            return true;
        } else {
            return false;
        }
    }
    existFullHouse () {
        let cardValues = [this.card1.value, this.card2.value, this.card3.value, this.card4.value, this.card5.value];

        let reps = this.getReps(cardValues);

        if (reps[0] === 2 && reps[1] === 0 ) {
            return true;
        } else {
            return false;
        }
    }
    existFlush () {
        return false;
    }
    existStraight () {
        return false;
    }
    existThreeOfAKind () {
        let cardValues = [this.card1.value, this.card2.value, this.card3.value, this.card4.value, this.card5.value];

        let reps = this.getReps(cardValues);

        if (reps[0] === 1 && reps[1] === 2 ) {
            return true;
        } else {
            return false;
        }
    }

    existTwoPairs () {
        let cardValues = [this.card1.value, this.card2.value, this.card3.value, this.card4.value, this.card5.value];

        let reps = this.getReps(cardValues);

        if (reps[0] === 2 && reps[1] === 1 ) {
            return true;
        } else {
            return false;
        }
    }

    existPair () {
        let cardValues = [this.card1.value, this.card2.value, this.card3.value, this.card4.value, this.card5.value];

        let reps = this.getReps(cardValues);

        if (reps[0] === 0 && reps[1] === 5 ) {
            return true;
        } else {
            return false;
        }
    }


    /* Aquí pondremos las comprobaciones para saber qué mano tiene el juegador.
    * Devuelve un valor de 1 a 9, siendo el 1 el valor de carta más alta, y el 9 la escalera de color.
    * ¿Tiene escalera de color? No
    * ¿Tiene poker? Sí --> devuelve 8.
    * */
    getPlayHand(restrict) {
        let playHand = [];

        // Se calcula de mayor a menor si la mano cumple las condiciones.
        // Cuando cumple se añade a un array el valor de lo que ha cumplido.
        if(this.existStraightflush()) {
            playHand.push(9);
        }
        if (this.existFourOfAKind()) {
            playHand.push(8);
        }
        if (this.existFullHouse()) {
            playHand.push(7);
        }
        if (this.existFlush()) {
            playHand.push(6);
        }
        if (this.existStraight()) {
            playHand.push(5);
        }
        if (this.existThreeOfAKind()) {
            playHand.push(4);
        }
        if (this.existTwoPairs()) {
            playHand.push(3);
        }
        if (this.existPair()) {
            playHand.push(2);
        }
            playHand.push(1);

        // El array se compara con restrict, y devuelve hasta el valor restrict
        return playHand.find(value => value <= restrict);

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

    updateValues(cardValues) {
        if (cardValues.find(value => value === "10") !== undefined){
            cardValues[cardValues.indexOf("10")] = "A";
        }
        if (cardValues.find(value => value === "11") !== undefined){
            cardValues[cardValues.indexOf("11")] = "B";
        }
        if (cardValues.find(value => value === "12") !== undefined){
            cardValues[cardValues.indexOf("12")] = "B";
        }
        if (cardValues.find(value => value === "13") !== undefined){
            cardValues[cardValues.indexOf("13")] = "D";
        }
        if (cardValues.find(value => value === "14") !== undefined){
            cardValues[cardValues.indexOf("14")] = "E";
        }
        return(cardValues);

    }


    /* bloque para ordenar el valor de un array con valor de cartas o jugadas */
    orderValues(Values) {
        let punct = "";
        let valuesUpdated = this.updateValues(Values.sort((a, b) => b - a));
        valuesUpdated.forEach(function(element){
            punct += element.toString(16);
        })
        return punct;
    }

    getHighCardPuntc(){
        /* Puntuación de la carta más alta. Igual al valor de las cartas ordenadas de mayor a menor.
        (5 símbolos en Hexadecimal. ejemplo: 0xA8632) */

        let cardValues = [this.card1.value, this.card2.value, this.card3.value, this.card4.value, this.card5.value];
        /* bloque para ordenar el valor de las cartas */

        console.log("Puntuación hex: " + this.orderValues(cardValues));

        return this.orderValues(cardValues);
    }

    getPairPuntc(){
        /* Puntuación de la pareja. Igual al valor de la pareja. Si es igual, valor de la carta más alta ordenada de mayor a menor.
        (4 símbolos en Hexadecimal (1 para la pareja, y otros 3 para las otras tres cartas ordenadas de mayor a menor.))*/

        let cardValues = [this.card1.value, this.card2.value, this.card3.value, this.card4.value, this.card5.value];

        let reps = [];
        let temp = [];
        let rest = [];

        /* bloque para buscar parejas y cartas individuales */
        cardValues.forEach((value,index)=>{
            temp = Object.assign([],cardValues); //Copiado de elemento
            temp.splice(index,1); //Se elimina el elemnto q se compara
            /* Se busca en temp el elemento, y en repetido para ver si esta ingresado al array.
             * indexOf devuelve -1 si el elemento no se encuetra
             */
            if(temp.indexOf(value)!=-1 && reps.indexOf(value)==-1) {
                reps.push(value.toString(16));
            }else if (temp.indexOf(value)===-1){
                rest.push(value.toString(16));
            }
        });

        /* bloque para ordenar el valor de las parejas */
        let pairValues = this.orderValues(reps);
        /* bloque para ordenar el valor de las cartas sueltas */
        let restValues = this.orderValues(rest);

        console.log("Puntuación hex: " + pairValues.concat(restValues));

        return pairValues.concat(restValues);
    }

    getTwoPairsPuntc(){
        /* Puntuación de las dobles parejas. Igual al valor de la primera pareja + el valor de la segunda pareja + el valor de la última carta
        (3 símbolos en Hexadecimal (1 para la pareja más alta, 1 para la pareja más baja y otro para la carta restante)) */
        return this.getPairPuntc();
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