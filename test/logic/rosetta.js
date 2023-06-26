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
    });return;

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

	describe("18. Integer sequence", () => {
		/*ts
			// solutionN		{"console.log">^(+1)1		up to 2^53
		*/
	});

	describe("19. Loop over multiple arrays simultaneously", () => {
		/*ts
			solutionAA		(*.{@)$.+$@											limited to shortest dimension in all arrays
			exampleA		solutionAA(("a" "b" "c") ("A" "B" "C") (1 2 3))
		*/
		it("1", () => expect(exampleA).eql(["aA1", "bB2", "cC3"]));
	});

	describe("20. Loops/Break", () => {
		/*ts
			log				{"console.log">
			solutionN		!=10^(?20.[.(
								(=10 log)
								log.?20.[.log.0`
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
			solutionA		10-^11
		*/
		it("1", () => expect(solutionA).eql([10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]));
	});

	describe("23. Loops/For", () => {
		/*ts
			solutionA		(+1."*"`^.+$)^5
		*/
		it("1", () => expect(solutionA).eql(["*", "**", "***", "****", "*****"]));
	});

    describe("24. Foreach", () => {
        /*ts
            solutionA	    ;^5,{"console.log">@
        */
        it("1", () => expect(solutionA).eql([0, 1, 2, 3, 4]));
    });

    describe("25. Loops/Infinite", () => {
        /*ts
            // solutionS       ;^({"console.log">)"SPAM"
        */
    })

    describe("26. Loops/N plus one half", () => {
        /*ts
            solutionS       +1^10,(:,(; .(; ((=10 ""`) ", "`)?).""$).""$ "")$
        */
        it("1", () => expect(solutionS).eql("1, 2, 3, 4, 5, 6, 7, 8, 9, 10"));
    });

    describe("27. Loops/Nested", () => {
        // use streams to terminate iteration
        /*ts
            randomsA        ((2 12 10) (18 20 9) (1 20 16))
            untilTwentyA    ((].=20 ()`) #.(/3.[ %3).'randomsA)?^( ),{
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

};