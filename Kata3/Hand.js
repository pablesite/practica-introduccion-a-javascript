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

    /* Funciones para evaluar qué jugada hay en la mano de cartas */
    getReps(cardValues) {
        // Función auxiliar para validar gran parte de las jugadas.
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

        return [reps, rest];
    }

    existStraightflush () {

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

    getPlayHand(restrict) {
        /* Aquí pondremos las comprobaciones para saber qué mano tiene el juegador.
        * Devuelve un valor de 1 a 9, siendo el 1 el valor de carta más alta, y el 9 la escalera de color.
        * ¿Tiene escalera de color? No
        * ¿Tiene poker? Sí --> devuelve 8.
        * */
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


    /* Revisar los nombres de las funciones */
    getTypeHand(playHand) {
        /* Devolvemos el tipo de jugada, para escribir en consola al ejecutar testPoker */
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
    getPunctuation(playHand){
        /* Llama a la función de conseguir la puntuación de la jugada que toque, entre las 9 funciones siguientes.*/
        switch (playHand) {
            case 1:
                /* Puntuación de la carta más alta. Igual al valor de las cartas ordenadas de mayor a menor.
                (5 símbolos en Hexadecimal. ejemplo: 0xA8632) */
                return this.getGeneralPunctuation();
            case 2:
                /* Puntuación de la pareja. Igual al valor de la pareja. Si es igual, valor de la carta más alta ordenada de mayor a menor.
                (4 símbolos en Hexadecimal (1 para la pareja, y otros 3 para las otras tres cartas ordenadas de mayor a menor.))*/
                return this.getGeneralPunctuation();
            case 3:
                /* Puntuación de las dobles parejas. Igual al valor de la primera pareja + el valor de la segunda pareja + el valor de la última carta
                (3 símbolos en Hexadecimal (1 para la pareja más alta, 1 para la pareja más baja y otro para la carta restante)) */
                return this.getGeneralPunctuation();
            case 4:
                /* Puntuación del trio. Igual al valor del trio + valor de las otras dos cartas ordenadas de mayor a menor.
                (3 símbolos en Hexadecimal (1 para el valor del trio, y dos para las cartas restantes ordenadas de mayor a menor)) */
                return this.getGeneralPunctuation();
            case 5:
                /* Puntuación de la escalera. Valor de la carta más alta de la escalera
                * 1 símbolo en Hexadecimal */
                return this.getGeneralPunctuation();
            case 6:
                /* Puntuación de la carta más alta (todas de color). Igual al valor de las cartas ordenadas de mayor a menor
                * (5 símbolos en Hexadecimal. ejemplo: 0xA8632) */
                return this.getFlushPunctuation();
            case 7:
                /* Puntuación de un Full (trio + pareja). Igual al valor del trio + el valor de la pareja
                * (2 símbolos en Hexadecimal */
                return this.getGeneralPunctuation();
            case 8:
                /* Puntuación del poker (4 cartas iguales). Igual al valor del poker + el valor de la carta restante. */
                return this.getGeneralPunctuation();
            case 9:
                /* Puntuación de la carta más alta */
                return this.getGeneralPunctuation();
        }
    }


    /* Funciones para obtener las puntuaciones que hay en una jugada concreta */
    getGeneralPunctuation (){

        let cardValues = [this.card1.value, this.card2.value, this.card3.value, this.card4.value, this.card5.value];

        /* buscar repeticiones de cartas y cartas individuales */
        let reps = this.getReps(cardValues);

        /* bloque para ordenar el valor de las repeticiones */
        let repsValues = this.orderValues(reps[0]);
        /* bloque para ordenar el valor de las cartas individuales */
        let restValues = this.orderValues(reps[1]);

        console.log("Puntuación hex: " + repsValues.concat(restValues));

        return repsValues.concat(restValues);
    }
    getFlushPunctuation (){

        let cardValues = [this.card1.value, this.card2.value, this.card3.value, this.card4.value, this.card5.value];

        let orderValues = this.orderValues(cardValues);
        console.log("Puntuación hex post: " + orderValues);

        return orderValues;
    }
    orderValues(Values) {
        // función auxiliar para ordenar el valor de un array de mayor a menor con valor de cartas o jugadas
        let punct = "";

        let valuesUpdated = this.updateValues(Values.sort((a, b) => b - a));

        valuesUpdated.forEach(function(element){
            punct += element.toString(16);
        });

        return punct;
    }
    updateValues(Values) {
        // Función auxiliar
        cardValues.forEach(function(element, index){
            if ( element === "10"){
                Values[index] = "A";
            }
            if ( element === "11"){
                Values[index] = "B";
            }
            if ( element === "12"){
                Values[index] = "C";
            }
            if ( element === "13"){
                Values[index] = "D";
            }
            if ( element === "14"){
                Values[index] = "E";
            }
        });
        return(Values);
    }


}

exports.Hand = Hand;