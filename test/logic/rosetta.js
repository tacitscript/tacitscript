import ts from "tacitscript";

const {expect} = chai;

export default () => {

    // tacitscript is a pure language (embedded DSL.)
    // Where the question requests user input and to display/print output, the example will typiocally interpret these as functional inputs and outputs.

    describe("1. Compare the length of two strings", () => {
        /*ts
            solutionSSS         :.#<._.(.(; #)." "$)@."\n"$
            exampleS            "short"solutionSSS"longer"                          equals "longer 6\nshort 5"

            extraAS             #<._." "$
            extraExampleS       extraAS("abcd" "123456789" "abcdef" "1234567")      equals "123456789 1234567 abcdef abcd"
        */
        it("1", () => expect(exampleS).eql("longer 6\nshort 5"));
        it("2", () => expect(extraExampleS).eql("123456789 1234567 abcdef abcd"));
    });

    describe("2. Factors of an integer", () => {
        /*ts
            solutionNA          .(:./$.(; [).-$.! +1^).?$
            exampleA            solutionNA6                     	 equals (1 2 3 6)
        */
        it("1", () => expect(exampleA).eql([1, 2, 3, 6]));
    });

    describe("3. Arithmetic/Integer", () => {
        /*ts
            intQuotientNNN      /.((<0 ]) [)?                                   integers not native type - selected to round towards 0
            divmodNNA           :.(intQuotientNNN$ %$)
            solutionNNA         :.(+$ -$ *$ intQuotientNNN$ %$ ^$ divmodNNA$)   % (remainder) - sign matches first operand
            exampleA            _7solutionNNA3                                  equals (_4 _10 _21 _2 _1 _343 (_2 _1))
        */
        it("1", () => expect(exampleA).eql([-4, -10, -21, -2, -1, -343, [-2, -1]]));
    });

    describe("4. Integer comparison", () => {
        /*ts
            solutionNNS         :.(
                                    (<$ " is less than "$)
                                    (>$ " is greater than "$)
                                    " equals "$
                                )?
            exampleS            5solutionNNS4                       equals "5 is greater than 4"
        */
        it("1", () => expect(exampleS).eql("5 is greater than 4"));
    });

    describe("5. Logical operations", () => {
        /*ts
            solutionTTA         :.(&$ |$ [.!)
            exampleA            0solutionTTA1           equals (0 1 1)
        */
        it("1", () => expect(exampleA).eql([0, 1, 1]));
    });

    describe("6. String concatenation", () => {
        /*ts
            startS          "Hello"                 strings are immutable
            completeS       startS+", world!"       equals "Hello, world!"
        */
        it("1", () => expect(completeS).eql("Hello, world!"));
    });

    describe("7. String comparison", () => {
        /*ts
            toLowerSS           {"s => s.toLowerCase()"             using host language functionality for case-insensitive comparison
            solutionSSA         :.(=$ !=$ <$ <$.! toLowerSS@.<$)
            exampleA            "abc"solutionSSA"DEF"               equals (0 1 0 1 1)
        */
        it("1", () => expect(exampleA).eql([0, 1, 0, 1, 1]));
    });

    describe("8. String interpolation (included)", () => {
        /*ts
            textS           "little"
            solutionS       ("X" textS)@"Mary had a X lamb"
        */
        it("1", () => expect(solutionS).eql("Mary had a little lamb"));
    });

    describe("9. String matching", () => {
        /*ts
            solutionSSA         :._.(@$.([.=0 ;) _@.@$.([.=0 )).+$        second result below is truthy and shows match indices
            exampleA            "ababc"solutionSSA"ab"                    equals (1 (0 2) 0)
        */
        it("1", () => expect(exampleA).eql([1, [0, 2], 0]));
    });

    describe("10. Substring", () => {
        /*ts
            knownCharS          "b"
            knownSubstringS     "cd"
            solutionASA         :.(
                                    %$.1'
                                    ,([ ;).%$.]
                                    ]._1%.[
                                    .(.(].knownCharS@.[ [.]) ]).%$.1'
                                    .(.(].knownSubstringS@.[ [.]) ]).%$.1'
                                )
            exampleA            (3 4)solutionASA"abcdefgh"                    equals ("defg" "defgh" "abcdefg" "bcde" "cdef")
        */
        it("1", () => expect(exampleA).eql(["defg", "defgh", "abcdefg", "bcde", "cdef"]));
    });

    describe("11. Conditional structures", () => {
        /*ts
            condNS      (
                            (<0 +" is negative")
                            (=0 +" is zero")
                            ""+.+" is positive"
                        )?
            exampleS    condNS3                     equals "3 is positive"
        */
        it("1", () => expect(exampleS).eql("3 is positive"));
    });

    describe("12. Loops/While", () => {
        /*ts
            solutionN       >0^({"console.log">./2.[)1024       console log entries: 1024 512 256 128 64 32 16 8 4 2 1
        */
        it("1", () => expect(solutionN).eql(0));
    })

    describe("13. Apply a callback to an array", () => {
        /*ts
            mapA        ^2@(1 2 3 4 5)      equals (1 4 9 16 25)
        */
        it("1", () => expect(mapA).eql([1, 4, 9, 16, 25]));
    });

    describe("14. Associative array/Iteration", () => {
        /*ts
            dictionaryD         \(("a" 1) ("b" 2) ("c" 3))
            dictionaryIterD     +@dictionaryD                   equals \(("a" "a1") ("b" "b2") ("c" "c3"))
            valueIterD          ^2@dictionaryD                  equals \(("a" 1) ("b" 4) ("c" 9))
            pairsA              \dictionaryD                    equals (("a" 1) ("b" 2) ("c" 3)) for array iteration
            keyIterD            pairsA,((0 ) +"'")>@,\          equals \(("a'" 1) ("b'" 2) ("c'" 3))
        */
        it("1", () => expect(dictionaryIterD).eql({a: "a1", b: "b2", c: "c3"}));
        it("2", () => expect(valueIterD).eql({a: 1, b: 4, c: 9}));
        it("3", () => expect(keyIterD).eql({"a'": 1, "b'": 2, "c'": 3}));
    });

    describe("keySuffixSDD", () => {
        /*ts
            keySuffixSDD        :,(.((0 )` ~+).> \).@$.\
        */
        it("1", () => expect(keySuffixSDD("'", {a: 1, b: 2})).eql({"a'": 1, "b'": 2}));
    });

    describe("15. Filter", () => {
        // note, tacitscript does not support destructive operations
        /*ts
            evenA           (%2.!)?(1 2 3 4 5 6 7 8 9)      equals (2 4 6 8)
        */
        it("1", () => expect(evenA).eql([2, 4, 6, 8]));
    });

    describe("16. FizzBuzz", () => {
        /*ts
            fizzBuzzA       +1^100,(((%3.=0)&(%5.=0) "FizzBuzz"`) (%3.=0 "Fizz"`) (%5.=0 "Buzz"`) ;)?@
        */
        it("1", () => expect(fizzBuzzA).eql([1,2,"Fizz",4,"Buzz","Fizz",7,8,"Fizz","Buzz",11,"Fizz",13,14,"FizzBuzz",16,17,"Fizz",19,"Buzz","Fizz",22,23,"Fizz","Buzz",26,"Fizz",28,29,"FizzBuzz",31,32,"Fizz",34,"Buzz","Fizz",37,38,"Fizz","Buzz",41,"Fizz",43,44,"FizzBuzz",46,47,"Fizz",49,"Buzz","Fizz",52,53,"Fizz","Buzz",56,"Fizz",58,59,"FizzBuzz",61,62,"Fizz",64,"Buzz","Fizz",67,68,"Fizz","Buzz",71,"Fizz",73,74,"FizzBuzz",76,77,"Fizz",79,"Buzz","Fizz",82,83,"Fizz","Buzz",86,"Fizz",88,89,"FizzBuzz",91,92,"Fizz",94,"Buzz","Fizz",97,98,"Fizz","Buzz"]));
    });

	describe("17. General FizzBuzz", () => {
		/*ts
            processANV      :._.([ ,(, (.(,(~%.=0 `) ""``).?)@).@$.+$)._.|$
            fizzBuzzAA      1%._,(processANV [.+1^).@$
            exampleA        fizzBuzzAA(20 (3 "Fizz") (5 "Buzz") (7 "Baxx"))     equals (1 2 "Fizz" 4 "Buzz" "Fizz" "Baxx" 8 "Fizz" "Buzz" 11 "Fizz" 13 "Baxx" "FizzBuzz" 16 17 "Fizz" 19 "Buzz")
		*/
        it("1", () => expect(exampleA).eql([1,2,"Fizz",4,"Buzz","Fizz","Baxx",8,"Fizz","Buzz",11,"Fizz",13,"Baxx","FizzBuzz",16,17,"Fizz",19,"Buzz"]));
	});

};