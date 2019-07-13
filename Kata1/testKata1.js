/* Imprimiré lo siguiente tal cual:
1 -> 1
2 -> 2
3 -> FooFoo (divisible por 3, contiene 3)
4 -> 4
5 -> BarBar (divisible por 5, contains 5)
6 -> Foo (divisible por 3)
7 -> QuixQuix (divisible por 7, contiene 7)
8 -> 8
9 -> Foo
10 -> Bar
13 -> Foo
15 -> FooBarBar (divisible por 3, divisible por 5, contiene 5)
21 -> FooQuix
33 -> FooFooFoo (divisible por 3, contiene 3)
51 -> FooBar
53 -> BarFoo
75 -> FooBarQuixBar(divisible por 3, divisible por 5, contiene un 7, contiene un 5)
 */

let test = require("./foobarquix");

let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13, 15, 21, 33, 51, 53, 75];

nums.forEach(function(element) {
    console.log(element, ' -> ', test.foobarquix(element));
});


