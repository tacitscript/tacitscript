import ts from "tacitscript";

const {expect} = chai;

export default () => {

    // tacitscript is a predominantly pure language (embedded DSL.)
    // Where the question requests user input, the example will assume functional inputs.

    describe("1. Arithmetic/Integer", () => {
        /*ts
            intQuotientNNN      /.((<0 ]) [)?                                   integers not native type - selected to round towards 0
            divmodNNA           :.(intQuotientNNN$ %$)
            solutionNNA         :.(+$ -$ *$ intQuotientNNN$ %$ ^$ divmodNNA$)   % (remainder) - sign matches first operand
            exampleA            _7solutionNNA3,~                                prints (_4 _10 _21 _2 _1 _343 (_2 _1))
        */
        it("1", () => expect(exampleA).eql([-4, -10, -21, -2, -1, -343, [-2, -1]]));
    });

    describe("2. Compare the length of two strings", () => {
        /*ts
            solutionSSA         :.#>.(.(; #)." "$.~)@
            exampleA            "short"solutionSSA"longer"                          prints "longer 6" then "short 5"

            extraAA             #>.~
            extraExampleA       extraAA("abcd" "123456789" "abcdef" "1234567")      prints ("123456789" "1234567" "abcdef" "abcd")
        */
        it("1", () => expect(exampleA).eql(["longer 6", "short 5"]));
        it("2", () => expect(extraExampleA).eql(["123456789", "1234567", "abcdef", "abcd"]));
    });

    describe("3. Factors of an integer", () => {
        /*ts
            solutionNA          .(:./$.(; [).-$.! +1^).?$
            exampleA            solutionNA6                     	 equals (1 2 3 6)
        */
        it("1", () => expect(exampleA).eql([1, 2, 3, 6]));
    });

    describe("4. Integer comparison", () => {
        /*ts
            solutionNNS         :.(
                                    (<$ " is less than "$)
                                    (=$ " equals "$)
                                    (>$ " is greater than "$)
                                    " is an unknown relationship to "$
                                )?.~
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
            toLowerSS           {"s => s.toLowerCase()"             requires host language functionality for case-insensitive comparison
            solutionSSA         :.(=$ !=$ <$ <$.! toLowerSS@.<$)    string comparison via unicode codepoint dictionary order
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
                                ).~
            exampleA            (3 4)solutionASA"abcdefgh"                    prints ("defg" "defgh" "abcdefg" "bcde" "cdef")
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
            solutionN       >0^(;.~./2.[)1024       prints 1024 512 256 128 64 32 16 8 4 2 1
        */
        it("1", () => expect(solutionN).eql(0));
    });

    describe("13. Apply a callback to an array", () => {
        /*ts
            mapA        ^2@(1 2 3 4 5)      equals (1 4 9 16 25)
        */
        it("1", () => expect(mapA).eql([1, 4, 9, 16, 25]));
    });

    describe("14. Associative array/Iteration", () => {
        /*ts
            dictionaryD         \(("a" 1) ("b" 2) ("c" 3))
            dictionaryIterD     (:.~)@dictionaryD               prints ("a" "1") ("b" "2") ("c" "3")
            valueIterD          ^2@dictionaryD                  equals \(("a" 1) ("b" 4) ("c" 9))
            pairsA              \dictionaryD                    equals (("a" 1) ("b" 2) ("c" 3)) for array iteration
            keyIterD            pairsA,((0 ) +"'")>@,\          equals \(("a'" 1) ("b'" 2) ("c'" 3))
        */
        it("1", () => expect(dictionaryIterD).eql({a: ["a", 1], b: ["b", 2], c: ["c", 3]}));
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
        // note, tacitscript does not support destructive operations natively
        /*ts
            evenA           (%2.!)?(1 2 3 4 5 6 7 8 9)      equals (2 4 6 8)
        */
        it("1", () => expect(evenA).eql([2, 4, 6, 8]));
    });

    describe("16. FizzBuzz", () => {
        /*ts
            fizzBuzzA       +1^100,(((%3.=0)&(%5.=0) "FizzBuzz"`) (%3.=0 "Fizz"`) (%5.=0 "Buzz"`) ;)?@,~
        */
        it("1", () => expect(fizzBuzzA).eql([1,2,"Fizz",4,"Buzz","Fizz",7,8,"Fizz","Buzz",11,"Fizz",13,14,"FizzBuzz",16,17,"Fizz",19,"Buzz","Fizz",22,23,"Fizz","Buzz",26,"Fizz",28,29,"FizzBuzz",31,32,"Fizz",34,"Buzz","Fizz",37,38,"Fizz","Buzz",41,"Fizz",43,44,"FizzBuzz",46,47,"Fizz",49,"Buzz","Fizz",52,53,"Fizz","Buzz",56,"Fizz",58,59,"FizzBuzz",61,62,"Fizz",64,"Buzz","Fizz",67,68,"Fizz","Buzz",71,"Fizz",73,74,"FizzBuzz",76,77,"Fizz",79,"Buzz","Fizz",82,83,"Fizz","Buzz",86,"Fizz",88,89,"FizzBuzz",91,92,"Fizz",94,"Buzz","Fizz",97,98,"Fizz","Buzz"]));
    });

	describe("17. General FizzBuzz", () => {
		/*ts
            processANV      :._.([ ,(, (.(,(~%.=0 `) ""``).?)@).@$.+$)._.|$
            fizzBuzzAA      1%._,(processANV [.+1^).@$
            exampleA        fizzBuzzAA(20 (3 "Fizz") (5 "Buzz") (7 "Baxx")),~     prints (1 2 "Fizz" 4 "Buzz" "Fizz" "Baxx" 8 "Fizz" "Buzz" 11 "Fizz" 13 "Baxx" "FizzBuzz" 16 17 "Fizz" 19 "Buzz")
		*/
        it("1", () => expect(exampleA).eql([1,2,"Fizz",4,"Buzz","Fizz","Baxx",8,"Fizz","Buzz",11,"Fizz",13,"Baxx","FizzBuzz",16,17,"Fizz",19,"Buzz"]));
	});

	describe("18. Integer sequence", () => {
		/*ts
			// solutionN		(;.~)^(+1)1		up to 2^53
		*/
	});

	describe("19. Loop over multiple arrays simultaneously", () => {
		/*ts
			solutionAA		(*.{@)$.+$@											    limited to shortest dimension in all arrays
			exampleA		solutionAA(("a" "b" "c") ("A" "B" "C") (1 2 3)),~       prints ("aA1" "bB2" "cC3")
		*/
		it("1", () => expect(exampleA).eql(["aA1", "bB2", "cC3"]));
	});

	describe("20. Loops/Break", () => {
		/*ts
			solutionN		!=10^(?20.[.(
								(=10 ~)
								;.~.?20.[.~.0`
							)?)0
		*/
	});

	describe("21. Loops/continue", () => {
		/*ts
			solutionS		+1^10,(:.((].=6 "\n"$) ", "$)?)$
		*/
		it("1", () => expect(solutionS).eql("1, 2, 3, 4, 5\n6, 7, 8, 9, 10"));
	});

    describe("22. Loops/Downward for", () => {
		/*ts
			solutionA		10-^11,~
		*/
		it("1", () => expect(solutionA).eql([10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]));
	});

	describe("23. Loops/For", () => {
		/*ts
			solutionA		(+1."*"`^.+$.~)^5
		*/
		it("1", () => expect(solutionA).eql(["*", "**", "***", "****", "*****"]));
	});

    describe("24. Foreach", () => {
        /*ts
            solutionA	    ;^5,(;.~)@
        */
        it("1", () => expect(solutionA).eql([0, 1, 2, 3, 4]));
    });

    describe("25. Loops/Infinite", () => {
        /*ts
            // solutionS       (;.~)^;"SPAM"
        */
    });

    describe("26. Loops/N plus one half", () => {
        /*ts
            solutionS       +1^10,((!=10 ""+.+", ") ;)?@,""$,~
        */
        it("1", () => expect(solutionS).eql("1, 2, 3, 4, 5, 6, 7, 8, 9, 10"));
    });

    describe("27. Loops/Nested", () => {
        // use streams to terminate iteration
        /*ts
            randomsA        ((2 12 10) (18 20 9) (1 20 16))
            untilTwentyA    ((].=20 ()`) #.(/3.[ %3).'randomsA)?^( ),{,~    prints (2 12 10 18 20)
        */
        it("1", () => expect(untilTwentyA).eql([2, 12, 10, 18, 20]));
    });

    describe("28. Singly-linked list/Traversal", () => {
        /*ts
            solutionA       *2@(1 2 3)      equals (2 4 6)
        */
        it("1", () => expect(solutionA).eql([2, 4, 6]));
    });

    describe("29. Sum and product of an array", () => {
        /*ts
            solutionAA      .(+$ *$)
            exampleA        solutionAA(1 2 3 4)     equals (10 24)
        */
        it("1", () => expect(exampleA).eql([10, 24]));
    });

    describe("30. Extend your language", () => {
        /*ts
            isFirstConditionTrueAT      .(] [.[).(,$)
            isSecondConditionTrueAT     .(] [.1').(,$)
            onBothConditionsTrueAV      .(] [.2').(,$)
            onFirstConditionTrueAV      .(] [.3').(,$)
            onSecondConditionTrueAV     .(] [.4').(,$)
            onNoConditionTrueAV         .(] [.5').(,$)
            ifTwoAVV                    :.(
                                            (isFirstConditionTrueAT (
                                                (isSecondConditionTrueAT onBothConditionsTrueAV)
                                                onFirstConditionTrueAV
                                            )?)
                                            (isSecondConditionTrueAT onSecondConditionTrueAV)
                                            onNoConditionTrueAV
                                        )?
            fizzBuzzNV                  (%3.! %5.! "FizzBuzz"` "Fizz"` "Buzz"` ;)ifTwoAVV
            exampleA                    fizzBuzzNV@(6 10 15 16)                                         equals ("Fizz" "Buzz" "FizzBuzz" 16)
        */
        it("1", () => expect(exampleA).eql(["Fizz", "Buzz", "FizzBuzz", 16]));
    });

    describe("31. Arrays", () => {
        /*ts
            arrayA              (1 2 3)
            modifySecondA       ((1 ) 4`)>arrayA    equals (1 4 3)
            secondElemN         1'arrayA            equals 2
            extendedArrayA      arrayA+(4 )         equals (1 2 3 4)
        */
        it("1", () => expect(modifySecondA).eql([1, 4, 3]));
        it("2", () => expect(secondElemN).eql(2));
        it("3", () => expect(extendedArrayA).eql([1, 2, 3, 4]));
    });

    describe("32. Associative array/Creation", () => {
        /*ts
            dictionaryD     \(("a" 1) ("b" 2) ("c" 3))
        */
        it("1", () => expect(dictionaryD).eql({a: 1, b: 2, c: 3}));
    });

    describe("33. Boolean values", () => {
        /*ts
            trueT                   1
            falseT                  0
            conditionalFalseyA      (0 () "" ( ) \( ))      0, undefined, and empty string, array and dictionary are falsey. all other values are truthy.
            testA                   ;?conditionalFalseyA    equals ( )
        */
        it("1", () => expect(testA).eql([]));
    });

    describe("34. Call an object method", () => {
        // object orientation is by message passing to an instance, following a revealing module pattern
        // there are no classes, and therefore, no static methods
        // static methods, as a form of namespacing code, is achieved through dictionaries
        /*ts
            complexASN		:.(
                                (].="real" [.[)
                                (].="imag" [.])
                                (].="mag" [.^2@.+$.^0.5)
                                ()`
                            )?
            exampleSN       (3 4)complexASN
            realN           exampleSN"real"                     equals 3
            magN            exampleSN"mag"                      equals 5
        */
        it("1", () => expect(realN).eql(3));
        it("2", () => expect(magN).eql(5));
    });

    describe("recursive objects", () => {
        /*ts
			vectorAU   		.(: (
                                (].="xN" [.[)
                                (].="yN" [.])
                                (].="magN" [.^2@.+$.^0.5)
                                (].="addUU" :,([ @("xN" "yN")).*$.+$@.vectorAU)
                                ()`
                            )?`).(.$)
            magN            vectorAU(1 2)"addUU"(vectorAU(2 2))"magN"
            boundsAU        .(: (
                                (].="detailsA" [)
                                (].="unionUU" :,([ "detailsA",).*$.;<@,([ ] ] [).boundsAU)
                            )?`).(.$)
            exampleU        boundsAU(3 5 9 2)"unionUU"(boundsAU(4 8 7 1))
        */
        it("1", () => expect(magN).eql(5));
        it("2", () => expect(exampleU("detailsA")).eql([3, 8, 9, 1]));
    });

    describe("bounds", () => {
        /*ts
            vectorASN       :.(
                                (].="xN" [.[)
                                (].="yN" [.])
                                (].="magN" [.^2@.+$.^0.5)
                                (].="dotProductUN" :,([ @("xN" "yN")).*$.*$@.+$)
                                ()\`
                            )?
            boundsASX		:.(
                                (].="widthN" [.(1' ]).-$)
                                (].="heightN" [.(2' [).-$)
                                (].="boundedUT" :._,(@("xN" "yN") [,(<|= >|= >|= <|=).(.(1' ]).&$ .([ 2').&$)).*$.(,$)@.&$)
                                ()`
                            )?
            exampleSX		(2 9 7 1)boundsASX
            boundedT        exampleSX"boundedUT"((5 5)vectorASN)
            unboundedaT     exampleSX"boundedUT"((0 5)vectorASN)
            unboundedbT     exampleSX"boundedUT"((5 8)vectorASN)
            unboundedcT     exampleSX"boundedUT"((0 8)vectorASN)
        */
        it("1", () => expect(exampleSX("widthN")).eql(8));
        it("2", () => expect(exampleSX("heightN")).eql(5));
        it("3", () => expect(boundedT).eql(1));
        it("4", () => expect(unboundedaT).eql(0));
        it("5", () => expect(unboundedbT).eql(0));
        it("6", () => expect(unboundedcT).eql(0));
    });

    describe("vectors", () => {
        /*ts
            vectorASN       :.(
                                (].="x" [.[)
                                (].="y" [.])
                                (].="mag" [.^2@.+$.^0.5)
                                (].="dotProduct" :,([ @("x" "y")).*$.*$@.+$)
                                ()\`
                            )?
            dotProductN     (3 4)vectorASN"dotProduct"((2 _1)vectorASN)
        */
        it("1", () => expect(dotProductN).eql(2));
    });

    describe("complex dictionary", () => {
        /*ts
            complexAD       .(
                                .("real"` [)
                                .("imag"` ])
                                .("mag"` ^2@.+$.^0.5)
                            ).\
        */
        it("1", () => expect(complexAD([3, 4]).real).eql(3));
        it("2", () => expect(complexAD([3, 4]).mag).eql(5));
    });

    describe("bounds dictionary", () => {
        /*ts
            boundsAD		.(
                                .("width"` .(1' ]).-$)
                                .("height"` .(2' [).-$)
                            ).\
            exampleD		boundsAD(2 9 7 1)
        */
        it("1", () => expect(exampleD.width).eql(8));
        it("2", () => expect(exampleD.height).eql(5));
    });

    describe("35. Collections", () => {
		/*ts
			// operations are non-destructive
			arrayaA		( )
			arraybA		arrayaA+(1 )			equals (1 )
			arraycA		arraybA+(2 )			equals (1 2)
			dictaD		\( )
			dictbD		dictaD+(\(("a" 1) ))	equals \(("a" 1) )
			dictcD		dictbD+(\(("b" 2) ))	equals \(("a" 1) ("b" 2))
		*/
		it("1", () => expect(arraycA).eql([1, 2]));
		it("2", () => expect(dictcD).eql({a: 1, b: 2}));
	});

    describe("36. Comments", () => {
        /*ts
            numN        2           anything here is a comment
            // line comments appear like this
        */
    });

    describe("37. Copy a string", () => {
        /*ts
            stringS     "Hello"
            copyS       stringS         strings are immutable, copies share reference
        */
        it("1", () => expect(copyS).eql("Hello"));
    });

    describe("38. Create a two-dimensional array at runtime", () => {
        /*ts
            arrayTwoAA      .(.(0`` ]).^$.` [).^$
            exampleA        arrayTwoAA(2 3)             equals ((0 0 0) (0 0 0))
        */
        it("1", () => expect(exampleA).eql([[0, 0, 0], [0, 0, 0]]));
    });

    describe("39. Define a primitive data type", () => {
		/*ts
			boundedNN		(((%1.!=0)|(<1)|(>10) ()`) ;)?
			boundedaN		boundedNN5.5						equals ()
			boundedbN		boundedNN0							equals ()
			boundedcN		boundedNN11							equals ()
			boundeddN		boundedNN5							equals 5
		*/
		it("1", () => expect(boundedaN).eql(undefined));
		it("2", () => expect(boundedbN).eql(undefined));
		it("3", () => expect(boundedcN).eql(undefined));
		it("4", () => expect(boundeddN).eql(5));
	});

    describe("40. Empty program", () => {
        // empty block is valid (no name-value pairs)
        /*ts

        */
    });

    describe("41. Enumerations", () => {
        /*ts
            enumD       \(("apple" 0) ("banana" 1) ("cherry" 2))    requires explicit values
        */
    });

    describe("42. Formatted numeric output", () => {
		/*ts
			padLeftNNS		:.(,(; ""+.#).-$.((=0 ""`) "0"`^.+$)? ]).+$
			exampleS		9padLeftNNS7.125							    equals "00007.125"
		*/
		it("1", () => expect(exampleS).eql("00007.125"));
	});

    describe("43. Function definition", () => {
        /*ts
            multiply        *
        */
    });

    describe("44. Hash from two arrays", () => {
        /*ts
            hashAAD     *.\
            exampleD    ("a" "b" "c")hashAAD(1 2 3)     equals \(("a" 1) ("b" 2) ("c" 3))
        */
        it("1", () => expect(exampleD).eql({a: 1, b: 2, c: 3}));
    });

    describe("45. Hello world/Text", () => {
        /*ts
            stringS     ~"Hello world!"     stringS is also equal to the "Hello world!"
        */
    });

    describe("46. Implicit type conversion", () => {
        /*ts
            stringS     ""+5        equals "5"
            numN        0+"5"       equals 5
        */
    });

    describe("47. Literals/Floating point", () => {
		/*ts
			decimalN	2.3
			standardN	0.3*(10^34)
		*/
		it("1", () => expect(standardN).eql(0.3e+34));
	});

    describe("48. Literals/String", () => {
        /*ts
            stringS     "line 1
line 2\nline 3\t\"\u03A9\\"                   \ used to escape characters (\u03A9 is omega)
        */
    });

    describe("49. Named parameters", () => {
        // pass parameters as dictionary
        /*ts
            namedParamSDX       '
            exampleN            "a"namedParamSDX(\(("a" 1) ("b" 2)))        equals 1
        */
        it("1", () => expect(exampleN).eql(1));
    });

    describe("50. Null object", () => {
        /*ts
            nullO       ()          formally known as undefined
        */
    });

    describe("51. Optional parameters", () => {
        /*ts
            sortImplementationAA    ;                                                                                       TODO: Implement
            sorterDA		        +(\(("ordering" "lexicographic") ("column" 0) ("reverse" 0))).sortImplementationAA
			exampleA		        \(("table" ((4 5 6) (2 5 3))) ("column" 1)),sorterDA
        */
    });

    describe("52. Pick random element", () => {
        /*ts
            randomAX        .(#.()? ;).'$
            exampleN        randomAX(1 2 3)     in range [1, 3]
        */
        it("1", () => expect(exampleN).to.be.gte(1).and.lte(3));
    });

    describe("53. Real constants and functions", () => {
        /*ts
            sqrtNN          ^0.5                sqrtNN9=3
            absNN           #                   absNN(_4)=4
            floorNN         [                   floorNN(_2.3)=_3
            ceilNN          ]                   ceilNN(_2.3)=_2
            powNNN          ^                   2powNNN3=8
        */
        it("1", () => expect(sqrtNN(9)).eql(3));
        it("2", () => expect(absNN(-4)).eql(4));
        it("3", () => expect(floorNN(-2.3)).eql(-3));
        it("4", () => expect(ceilNN(-2.3)).eql(-2));
        it("5", () => expect(powNNN(2, 3)).eql(8));
    });

    describe("54. Return multiple values", () => {
        // typically return as an array
        /*ts
            arrayXA     (1 2)`          arrayXA()=(1 2)
        */
        it("1", () => expect(arrayXA()).eql([1, 2]));
    });

    describe("55. Scope modifiers", () => {
        // no modifiers. lexical scoping.
        /*ts
            cN      aN+3        equals ()
            aN      2
            bN      aN+3        equals 5
        */
        it("1", () => expect(cN).to.be.undefined);
        it("2", () => expect(bN).eql(5));
    });

    describe("56. Special characters", () => {
        // Only alphabetic characters (upper and lower cases) can be used for identifiers.
        // For string escape sequences, see host language.
    });

    describe("57. Special variables", () => {
        // See host language.
    });

    describe("58. String length", () => {
        /*ts
            lengthSN        #       see host language for specifications
        */
        it("1", () => expect(lengthSN("møøse")).eql(5));
    });

    describe("59. Strip comments from a string", () => {
        /*ts
            stripSS     .(.("#"@ ";"@).|$ ;).%$.[
            exaS        stripSS"apples, pears # and bananas"        equals "apples, pears "
            exbS        stripSS"apples, pears ; and bananas"        equals "apples, pears "
        */
        it("1", () => expect(exaS).eql("apples, pears "));
        it("2", () => expect(exbS).eql("apples, pears "));
    });

    describe("60. Array concatenation", () => {
        /*ts
            concatA     (1 2 3)+(4 5 6)     equals (1 2 3 4 5 6)
        */
        it("1", () => expect(concatA).eql([1, 2, 3, 4, 5, 6]));
    });

    describe("61. Array length", () => {
        /*ts
            lengthA     #
            exampleN    lengthA("apple" "orange")     equals 2
        */
        it("1", () => expect(exampleN).eql(2));
    });

    describe("62. Determine if a string is numeric", () => {
        /*ts
            numericST       0+.}.="N"
        */
        it("1", () => expect(numericST("23")).eql(1));
        it("2", () => expect(numericST("hello")).eql(0));
        it("3", () => expect(numericST("2.4")).eql(1));
        it("4", () => expect(numericST("_3")).eql(1));
    });

    describe("63. Empty string", () => {
        /*ts
            emptyS      ""          falsey
            emptyST     !           non-empty strings are truthy
            notEmptyST  ;           use identity
        */
        it("1", () => expect(emptyST("")).eql(1));
        it("2", () => expect(notEmptyST("")).is.falsey);
    });

    describe("64. Even or odd", () => {
        /*ts
            evenNT      %2.!        evenNT3=0
            oddNT       %2          oddNT3=1
        */
        it("1", () => expect(evenNT(3)).eql(0));
        it("2", () => expect(oddNT(3)).eql(1));
    });

    describe("65. Factorial", () => {
        /*ts
            factorialNN         +1^.*$         factorialNN3=6
        */
        it("1", () => expect(factorialNN(3)).eql(6));
        it("3", () => expect(factorialNN(1)).eql(1));
    });

    describe("66. Find square difference", () => {
		/*ts
			resultN		(.(; -1).^2@.-$.<1000)^(+1)1
            solutionNN  .((.(; -1).^2@.-$)` >).(.$).^(+1).(1,)
		*/
		it("1", () => expect(resultN).eql(501));
        it("2", () => expect(solutionNN(1000)).eql(501));
	});

    describe("power of two", () => {
        /*ts
            tempN       <101^(*2)1
        */
        it("1", () => expect(tempN).eql(128));
    });

    describe("67. Greatest element of a list", () => {
        /*ts
            greatestAN      ;<.]
            exampleN        greatestAN(3 6 4 1 7 2)     equals 7
        */
        it("1", () => expect(exampleN).eql(7));
    });

    describe("68. Increment a numeric string", () => {
        /*ts
            incrementSS     0+.+1.""+
            exampleS        incrementSS"67"     equals "68"
        */
        it("1", () => expect(exampleS).eql("68"));
    });
};