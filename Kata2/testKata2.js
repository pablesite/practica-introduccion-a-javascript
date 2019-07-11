
let testRTA = require("./romanToArabic");
let testATR = require("./arabicToRoman");



console.log("PRUEBA NÚMEROS ROMANOS A ÁRABES")

// Introduce aquí tu número romano.
let roman = "MMXIX"

console.log("Has introducido el número romano: " + roman)
let arabicNum = testRTA.romanToArabic(roman);
console.log("Su valor es: " + arabicNum);



console.log("PRUEBA NÚMEROS ÁRABES A ROMANOS")

// Introduce aquí tu número árabe.
let arabic = 219;

let romanNum = testATR.arabicToRoman(arabic);
console.log("Has introducido el número árabe: " + arabic)
console.log("El número romano correspondiente es: " +romanNum);

