const {expect, assert} = chai;
import ts from "tacitscript";

mocha.setup('bdd');

describe("Operators", () => {
	describe(".", () => {
		describe("pipe (XY)(YZ)(XZ)", () => {
		/*ts
			pipe						.
			firstThen					[pipe
			thenDivideByTwo				pipe(/2)
			firstThenDivideByTwo		[pipe(/2)
			sizeLessThanThree			#.<3
		*/
			it("([pipe)(value => value * 2)([3, 4, 5]) eql 6", () => expect(firstThen(value => value * 2)([3, 4, 5])).eql(6));
			it("(pipe(/2))(array => array[0])([10, 8, 9]) eql 5", () => expect(thenDivideByTwo(array => array[0])([10, 8, 9])).eql(5));
			it("([pipe(/2))([4, 5, 7]) eql 4", () => expect(firstThenDivideByTwo([4, 5, 7])).eql(2));
			it('(#.<3)([4, 5]) eql true', () => expect(sizeLessThanThree([4, 5])).eql(true));
		});

		describe("applyTo 34", () => {
		/*ts
			applyTo					.
			twoApplyTo				2.
			stringApplyTo			"hello".
			arrayApplyTo			(1 2 3).
			twoApplyToThreePlus		2.(3+)
			stringApplyToLength		"hello".#
			arrayApplyToFirst		(1 2 3).[
			twoDotPlusThree			2.+3
			twoApplyToPlusThree		2applyTo(+3)
			fiveMinus				5.-
			sevenApplyToArray		7.(+2 -)
		*/
			it("2.(x => 3 + x) eql 5", () => expect(twoApplyTo(x => 3 + x)).eql(5));
			it("\"hello\".(x => x.length) eql 6", () => expect(stringApplyTo(x => x.length)).eql(5));
			it("(1 2 3).(x => x[0]) eql 6", () => expect(arrayApplyTo(x => x[0])).eql(1));
			it("2.(3+) eql 5", () => expect(twoApplyToThreePlus).eql(5));
			it("\"hello\".# eql 5", () => expect(stringApplyToLength).eql(5));
			it("(1 2 3).[ eql 1]", () => expect(arrayApplyToFirst).eql(1));
			it("2.+3 eql 5", () => expect(twoDotPlusThree).eql(5));
			it("2applyTo(+3) eql 5", () => expect(twoApplyToPlusThree).eql(5));
			it('(5.-)(2) eql 3', () => expect(fiveMinus(2)).eql(3));
			it('7.(+2 -)[0] eql 9', () => expect(sevenApplyToArray[0]).eql(9));
			it('7.(+2 -)[1](3) eql 4', () => expect(sevenApplyToArray[1](3)).eql(4));
		});

		describe("applyToArray", () => {
		/*ts
			applyToArray			.
			sixApplyToArray			6.
			stringApplyToArray		"hello".
			applyToArrayArray		.(# ])
			arrayApplyToArray		(5 6).(# [)
		*/
			it("6.([x => x + 3, x => x * 3]) eql [5, 6]", () => expect(sixApplyToArray([x => x + 3, x => x * 3])).eql([9, 18]));
			it("\"hello\".([x => x.length, x => x[0]]) eql [5, \"h\"]", () => expect(stringApplyToArray([x => x.length, x => x[0]])).eql([5, "h"]));
			it(".(# ])([7, 8, 9]) eql [3, 9]", () => expect(applyToArrayArray([7, 8, 9])).eql([3, 9]));
			it("(5 6).(# [) eql [2, 5]", () => expect([arrayApplyToArray, ts.typeOf(arrayApplyToArray)]).eql([[2, 5], "A"]));
		});

		describe("binaryPipe (XYZ ZW XYW)", () => {
		/*ts
			add						:.+$
			addTwoAndThree			2add3
		*/
			it('2(:.+$)3 eql 5', () => expect(addTwoAndThree).eql(5));
			it(':.+$(2, 3) eql 5', () => expect(add(2, 3)).eql(5));
		});
	});

	describe("~", () => {
		describe("negative 1", () => {
		/*ts
			negative                    ~
			negativeFive				~5
		*/
			it("~(4) eql -4", () => expect(negative(4)).eql(-4));
			it("~(-4) eql 4", () => expect(negative(-4)).eql(4));
			it('~5 eql 5', () => expect(negativeFive).eql(-5));
		});

		describe("transpose AA", () => {
		/*ts
			transposedMatrix				~((1 2 3) (4 5 6) (7 8 9))
			unequalTransposition			~((1 2 3) (4 5) (6 7 8))
		*/
			it('~((1 2 3) (4 5 6) (7 8 9)) eql [[1, 4, 7], [2, 5, 8], [3, 6, 9]]', () => expect(transposedMatrix).eql([[1, 4, 7], [2, 5, 8], [3, 6, 9]]));
			it('~((1 2 3) (4 5) (6 7 8)) eql [[1, 4, 6], [2, 5, 7]]', () => expect(unequalTransposition).eql([[1, 4, 6], [2, 5, 7]]));
		});

		describe("flip 22", () => {
		/*ts
			flipMinus				~-
			flipPairMinus			(:.-$).~
			flipPairMinusApplied	2flipPairMinus6
			flipPow					~({"Math.pow")
		*/
			it('~-(2, 7) eql 5', () => expect(flipMinus(2, 7)).eql(5));
			it('2((:.-$).~)6 eql 4', () => expect(flipPairMinusApplied).eql(4));
			it('(:.-$).~(9, 6) eql -3', () => expect(flipPairMinus(9, 6)).eql(-3));
			it('~({"Math.pow")(2, 3) eql 9', () => expect(flipPow(2, 3)).eql(9));
		});
	});

	describe("-", () => {
		/*ts
			reverse						_
		*/

		describe("reverseArray 3", () => {
		/*ts
			reversedArray				_(7 8 9)
		*/
			it("_([3, 4, 5]) eql [5, 4, 3]", () => expect(reverse([3, 4, 5])).eql([5, 4, 3]));
			it("_(7 8 9) eql [9, 8, 7]", () => expect(reversedArray).eql([9, 8, 7]));
		});

		describe("reverseString SS", () => {
		/*ts
			reversedString				_"Howdy!"
		*/
			it("reverse(\"Hello!\") eql \"!olleH\"", () => expect(reverse("Hello!")).eql("!olleH"));
			it("_\"Howdy!\" eql \"!ydwoH\"", () => expect(reversedString).eql("!ydwoH"));
		});
	});

	describe(":", () => {
		describe("pair (? ? A)", () => {
		/*ts
			numberAndString		4:"hello"
		*/
			it('4:"hello" eql [4, "hello"]', () => expect(numberAndString).eql([4, "hello"]));
		});
	});

	describe("\\", () => {
		describe("fromPairs (A O) 8", () => {
		/*ts
			simpleObject			\(("a" 1) ("b" 2))
			emptyObject				\( )
			compoundObject			\(("a" 1) ("b" \(("ba" 2) )))
		*/
			it('\\(("a" 1) ("b" 2)) eql {a: 1, b: 2} type O', () => expect([simpleObject, ts.typeOf(simpleObject)]).eql([{a: 1, b: 2}, "O"]));
			it('\\( ) eql {} type O', () => expect([emptyObject, ts.typeOf(emptyObject)]).eql([{}, "O"]));
			it('\\(("a" 1) ("b" \(("ba" 2) ))) eql {a: 1, b: {ba: 2}} type O', () => expect([compoundObject, ts.typeOf(compoundObject)]).eql([{a: 1, b: {ba: 2}}, "O"]));
		});

		describe("toPairs (O A) 8", () => {
		/*ts
			fromSimpleObject			\(\(("a" 1) ("b" 2)))
			fromEmptyObject				\(\( ))
			fromCompoundObject			\(\(("a" 1) ("b" \(("ba" 2) ))))
		*/
			it('\\(\\(("a" 1) ("b" 2))) eql [["a", 1], ["b", 2]] type A', () => expect([fromSimpleObject, ts.typeOf(fromSimpleObject)]).eql([[["a", 1], ["b", 2]], "A"]));
			it('\\(\\( )) eql [] type A', () => expect([fromEmptyObject, ts.typeOf(fromEmptyObject)]).eql([[], "A"]));
			it('\\(\\(("a" 1) ("b" \(("ba" 2) )))) eql [["a", 1], ["b", {ba: 2}]] type A', () => expect([fromCompoundObject, ts.typeOf(fromCompoundObject)]).eql([[["a", 1], ["b", {ba: 2}]], "A"]));
		});
	});

	describe("?", () => {
		describe("if (X? X N) 6", () => {
		/*ts
			yes				<3?2
			no				<3?4
		*/
			it("<3?2 eql [2, undefined]", () => expect(yes).eql([2, undefined]));
			it("<3?4 eql [undefined, 4]", () => expect(no).eql([undefined, 4]));
		});

		describe("cond", () => {
		/*ts
			tens			(<10 <20)?
			tensTwelve		tens12
		*/
			it('(<10 <20)?(5) eql [5, undefined, undefined]', () => expect(tens(5)).eql([5, undefined, undefined]));
			it('(<10 <20)?(15) eql [undefined, 15, undefined]', () => expect(tens(15)).eql([undefined, 15, undefined]));
			it('(<10 <20)?(25) eql [undefined, undefined, 25]', () => expect(tens(25)).eql([undefined, undefined, 25]));
			it('(<10 <20)?12 eql [undefined, 12, undefined]', () => expect(tensTwelve).eql([undefined, 12, undefined]));
		});

	});

	describe("@", () => {
		describe("map (?? A A) 17", () => {
		/*ts
			timesTwoMapArray			*2@(3 4 5)
			indexedSum					.(; #.;^).~.+$@
		*/
			it("*2@(3 4 5) eql [6, 8, 10]", () => expect(timesTwoMapArray).eql([6, 8, 10]));
			it('.(; #.;^).~.+$@(4 5 6) = [4, 6, 8]', () => expect(indexedSum([4, 5, 6])).eql([4, 6, 8]))
		});
	});

	describe("*", () => {
		describe("times (0 0 0)", () => {
		/*ts
			timesSix		*6
		*/
			it('*6(4) eql 24', () => expect(timesSix(4)).eql(24));
		});

		describe("pick (A O O) 3", () => {
		/*ts
			pickedObject ("a" "c" "d")*(\(("a" 1) ("b" 2) ("c" 3)))
		*/
			it('("a" "c" "d")*(\(("a" 1) ("b" 2) ("c" 3))) eql {a: 1, c: 3}', () => expect(pickedObject).eql({a: 1, c: 3}));
		});

		describe("filter (?? A A) 7", () => {
		/*ts
			lessThanFilter		<5*(4 9 2 7 3)
			emptyFilter			;*( )
		*/
			it("<5*(4 9 2 7 3) eql [4, 2, 3]", () => expect(lessThanFilter).eql([4, 2, 3]));
			it(";*( ) eql []", () => expect(emptyFilter).eql([]));
		});	
	});

	describe("+", () => {
		describe("plus (N N N) 1", () => {
		/*ts
			plusThree		+3
		*/
			it("+3(4) eql 7", () => expect(plusThree(4)).eql(7));
		});

		describe("arrayConcat (A A A) |||", () => {
		/*ts
			concatArray				(1 2 3)+("hello" (4 5))
			//undefinedConcatArray	()+(1 2 3)
			//arrayConcatUndefined	(1 2 3)+()
		*/
			it('(1 2 3)+("hello" (4 5)) eql [1, 2, 3, "hello", [4, 5]]', () => expect(concatArray).eql([1, 2, 3, "hello", [4, 5]]));
			//it('(1 2 3)+() eql undefined', () => expect(undefinedConcatArray).eql(undefined));
			//it('()+(1 2 3) eql undefined', () => expect(arrayConcatUndefined).eql(undefined));
		});

		describe("merge (O O O) 3", () => {
			/*ts
				mergedObjects			\(("a" 1) ("b" \(("b1" 2) ("b3" (1 2)))) ("c" 3))+(\(("b" \(("b2" 2.5) ("b3" (4 )))) ("c" \(("c1" 3.5) ))))
			*/
			it(
				'\\(("a" 1) ("b" \\(("b1" 2) ("b3" (1 2)))) ("c" 3))+(\\(("b" \\(("b2" 2.5) ("b3" (4 )))) ("c" \\(("c1" 3.5) )))) eql {a: 1, b: {b1: 2, b3: [4], b2: 2.5}, c: {c1: 3.5}}',
				() => expect(mergedObjects).eql({a: 1, b: {b1: 2, b3: [4], b2: 2.5}, c: {c1: 3.5}})
			);
		});

		describe("stringConcat (S ? S) 3", () => {
		/*ts
			//undefinedString				"me"+()
			numberString				"me"+1
			stringString				"me"+"hello"
			arrayString					"me"+(1 2 3)
			singleArrayString			""+(9 )
			emptyArrayString			"me"+( )
			objectString				"me"+(\(("a" 1) ))
			//functionString			me+(+2)
			mixedString					""+(\(("a" (1 "hello")) ))
		*/
			//it('"me"+() eql undefined', () => expect(undefinedString).eql(undefined));
			it('"me"+1 eql "me1"', () => expect(numberString).eql("me1"));
			it('"me"+"hello" eql "mehello"', () => expect(stringString).eql("mehello"));
			it('"me"+(1 2 3) eql "me(1 2 3)"', () => expect(arrayString).eql("me(1 2 3)"));
			it('""+(9 ) eql "(9 )"', () => expect(singleArrayString).eql("(9 )"));
			it('"me"+( ) eql "me( )"', () => expect(emptyArrayString).eql("me( )"));
			it('"me"+(\\(("a" 1) )) eql "me(\\(("a" 1) ))"', () => expect(objectString).eql('me(\\(("a" 1) ))'));
			it('""+(\\(("a" (1 "hello")) )) eql "(\\(("a" (1 "hello")) ))"', () => expect(mixedString).eql('(\\(("a" (1 "hello")) ))'));
		});
	});

	describe("$", () => {
		describe("join (S A S) 4", () => {
		/*ts
			csv			","$(1 2 3)
		*/
			it('","$(1 2 3) eql "1,2,3"', () => expect(csv).eql("1,2,3"));
		});

		describe("insert (??Y A Y) 7", () => {
		/*ts
			insert						$
			timesInsert					*$
			timesInsertSingle			*$(4 )
			insertEmpty					$( )
			//timesInsertUndefined		*$()
			timesInsertArray			*$(5 6 7)
		*/
			it("*$([4, 5, 6]) eql 120", () => expect(timesInsert([4, 5, 6])).eql(120));
			it("*$(4 ) eql 4", () => expect(timesInsertSingle).eql(4));
			it("$( )((x, y) => x + y) eql undefined", () => expect(insertEmpty((x, y) => x + y)).eql(undefined));
			//it("*$() eql undefined", () => expect(timesInsertUndefined).eql(undefined));
			it("*$(5 6 7) eql [210, N]", () => expect([timesInsertArray, ts.typeOf(timesInsertArray)]).eql([210,  "N"]));
		});

		describe("reduce (A A ?) 1", () => {
		/*ts
			sum					(+ 0)$
		*/
			it('(+ 0)$([2, 3, 4]) eql 9', () => expect(sum([2, 3, 4])).eql(9));
		});
	});

	describe("`", () => {
		describe("constant (X ?X) 13", () => {
		/*ts
			constNumber			`3
			constObject			`(\(("a" 3) ))
		*/
			it('`3("hello") eql 3', () => expect(constNumber("hello")).eql(3));
			it('`(\(("a" 3) )([1, 2]) eql {a: 3}', () => expect(constObject([1, 2])).eql({a: 3}));
		});
	});

	describe("]", () => {
		describe("last (A ?) 7", () => {
		/*ts
			last                        ]
		*/
			it("last([1, 2, 3]) eql 3", () => expect(last([1, 2, 3])).eql(3));
			it("last(\"abcd\") eql \"d\"", () => expect(last("abcd")).eql("d"));
		});
	});

	describe("{", () => {
		describe("eval (S ?) 2", () => {
		/*ts
			evalFunctionApplied	{"Math.sqrt"4
			evalObject			{"({a: 4})"
			evalNumber			{"2"
			evalString			{"\"hello\""
			evalArray			{"[4, 5, 6]"
			evalFunction		{"x => Math.max.apply(Math, x)"
			binaryFunction		2({"Math.pow")3
		*/
			it('{"2" eql 2', () => expect(evalNumber).eql(2));
			it('{"\\"hello\\"" eql "hello"', () => expect(evalString).eql("hello"));
			it('{"[4, 5, 6]" eql [4, 5, 6]', () => expect(evalArray).eql([4, 5, 6]));
			it('{"({a: 4})" eql {a: 4}', () => expect(evalObject).eql({a: 4}));
			it('{"x => Math.max.apply(Math, x)"([2, 3, 7, 4]) eql 7', () => expect(evalFunction([2, 3, 7, 4])).eql(7));
			it('{"Math.sqrt"4 eql 2', () => expect(evalFunctionApplied).eql(2));
			it('2({"Math.pow")3 eql 8', () => expect(binaryFunction).eql(8));
		});

		describe("unnest AA", () => {
		/*ts
			unnest				{
			calculation			{(1 (2 (3 4)) (5) ((6 7) ))
		*/

			it("unnest([1, [2, [3, 4]], [5], [[6, 7]]]) eql [1, 2, [3, 4], 5, [6, 7]]", () => expect(unnest([1, [2, [3, 4]], [5], [[6, 7]]])).eql([1, 2, [3, 4], 5, [6, 7]]));
			it("{(1 (2 (3 4)) (5) ((6 7) )) eql [1, 2, [3, 4], 5, [6, 7]]", () => expect(calculation).eql([1, 2, [3, 4], 5, [6, 7]]));
		});
	});

	describe(";", () => {
		describe("identity (X X) 6", () => {
			const fn = x => x + 3;

		/*ts
			identity			;
			mixedTypes			;(3 "hello" (4 5 6))
		*/
			it("identity(76) eql 76", () => expect(identity(76)).eql(76));
			it("\;(3 \"hello\" (4 5 6)) eql [3, \"hello\", [4, 5, 6]]", () => expect(mixedTypes).eql([3, "hello", [4, 5, 6]]));
			it("identity(<fn>) eql <fn>", () => expect(identity(fn)).eql(fn));
		});
	});

	describe("'", () => {
		describe("at (N A ?) (N S S) 3", () => {
		/*ts
			at				'
			twoAt			2at
			atArray			at(1 2 3 4)
			atString		at"help"
		*/
			it("2at([1, 2, 3]) eql 3", () => expect(twoAt([1, 2, 3])).eql(3));
			it("2at(\"help\") eql \"l\"", () => expect(twoAt("help")).eql("l"));
			it("at(1 2 3 4)(1) eql 2", () => expect(atArray(1)).eql(2));
			it("at\"help\"(1) eql \"e\"", () => expect(atString(1)).eql("e"));
		});
	
		describe("prop (S O ?) 22", () => {
		/*ts
			prop			"key"'(\(("a" 2) ("key" 4)))
		*/
			it(`"key"'(\(("a" 2) ("key" 4))) eql 4`, () => expect(prop).eql(4));
		});

		describe("path AA?, AO?", () => {
		/*ts
			singleArrayArrayPath					(1 )'(5 6 7)
			singleArrayObjectPath					("key1" )'(\(("key0" 3) ("key1" 4) ("key3" 5)))
			multiArrayArrayPath						(1 "mykey" 0)'
			multiArrayObjectPath					("mykey" 1)'
		*/
			it(`(1 )'(5 6 7) eql 6`, () => expect(singleArrayArrayPath).eql(6));
			it(`("key1" )'(\(("key0" 3) ("key1" 4) ("key3" 5))) eql 4`, () => expect(singleArrayObjectPath).eql(4));
			it(`(1 "mykey" 0)'([3, {mykey: ["hello", "bye"]}]) eql "hello"`, () => expect(multiArrayArrayPath([3, {mykey: ["hello", "bye"]}])).eql("hello"));
			it(`("mykey" 1)'({no: "hello", mykey: [5, 44]}) eql 44`, () => expect(multiArrayObjectPath({no: "hello", mykey: [5, 44]})).eql(44));
			it(`("mykey" 1)'({no: [2, 3]}) eql undefined`, () => expect(multiArrayObjectPath({no: [2, 3]})).eql(undefined));
		});

		describe("over (A ?? 00)", () => {
		/*ts
			applyAtIndex			((1 ) +1)'(3 5 7)
			applyAtNegativeIndex	((~2 ) *2)'
			applyAtKey				(("b" ) +" John")'
			applyAtInvalidIndex		((3 ) +1)'(0 1 2)
			applyAtInvalidKey		(("c" ) `"hi")'
			applyAtPath				((~2 "a" 1) -2)'
			createAtPath			(("a" "b" "c") `"created")'
		*/
			it(`(1 )'(+1)(3 5 7) eql [3, 6, 7]`, () => expect(applyAtIndex).eql([3, 6, 7]));
			it(`(~2 )'(*2)([1, 2, 3, 4, 5]) eql [1, 2, 3, 8, 5]`, () => expect(applyAtNegativeIndex([1, 2, 3, 4, 5])).eql([1, 2, 3, 8, 5]));
			it(`("b" )'(+" John")({a: "Hello", b: "Bye", c: "Welcome"}) eql {a: "Hello", b: "Bye John", c: "Welcome"}`, () => expect(applyAtKey({a: "Hello", b: "Bye", c: "Welcome"})).eql({a: "Hello", b: "Bye John", c: "Welcome"}));
			it(`(3 )'(+1)(0 1 2) eql [0, 1, 2]`, () => expect(applyAtInvalidIndex).eql([0, 1, 2]));
			it(`("c" )'(\`"hi")({a: "hello", b: "morning"}) eql {a: "hello", b: "morning", c: "hi"}`, () => expect(applyAtInvalidKey({a: "hello", b: "morning"})).eql({a: "hello", b: "morning", c: "hi"}));
			it(`(~2 "a" 1)'(-2)([1, 2, {a: [0, 1, 2]}, 3]) eql [1, 2, {a: [0, -1, 2]}, 3]`, () => expect(applyAtPath([1, 2, {a: [0, 1, 2]}, 3])).eql([1, 2, {a: [0, -1, 2]}, 3]));
			it(`(~2 "a" 1)'(-2)([0]) eql [0]`, () => expect(applyAtPath([0])).eql([0]));
			it(`("a" "b" "c")'(\`"created")({}) eql {a: {b: {c: "created"}}}`, () => expect(createAtPath({})).eql({a: {b: {c: "created"}}}));
		});

	});

	describe(",", () => {
		describe("zipApplyTo (A A A) 8", () => {
		/*ts
			topHeavy		(1 2 3),(*3 +7)
			bottomHeavy		(4 5),(/2 -1 *8)
		*/
			it('(1 2 3),(*3 +7) eql [3, 9]', () => expect(topHeavy).eql([3, 9]));
			it('(4 5),(/2 -1 *8) eql [2, 4]', () => expect(bottomHeavy).eql([2, 4]));
		});

		describe("zipPipe 000", () => {
		/*ts
			commaArray			,(-1 )
			invertedSense		-1.(7.)
			chainedComma		,(- ),(5. )
			zipPipe				,(+2 -),(; 5.)
			zipPipeInPlace		zipPipe(5 3)
			inlineApplication	(4 8),(+2 -),(; 5.)
		*/
			it(',(-1 )([5]) eql [4]', () => expect(commaArray([5])).eql([4]));
			it('-1.(7.) eql 6', () => expect(invertedSense).eql(6));
			it(',(- ),(5. )([9]) eql 4', () => expect(chainedComma([9])).eql([4]));
			it(',(+2 -),(; 5.)([7, 9]) eql [9, 4]', () => expect(zipPipe([7, 9])).eql([9, 4]));
			it(',(+2 -),(; 5.)(5 3) eql [7, -2]', () => expect(zipPipeInPlace).eql([7, -2]));
			it('(4 8),(+2 -),(; 5.) eql [6, 3]', () => expect(inlineApplication).eql([6, 3]));
		});

	});

	describe("=", () => {
		describe("equals (X X X) 4", () => {
		/*ts
			equals				=
			equalsSeven			=7
			peterEquals			"Peter"=
			mixedEqualsMixed	(2 "Jane" (3 4))=(2 "Jane" (3 4))
			failedEquality		2=4
			arrayEqualsArray	(1 2 3)=(1 2 3)
			numberEqualsArray	=(1 2 3)
			inequality			1=2
			equalsUndefined		1=()
			mixedEquality		(1 "hello")=(1 "hello")
			undefinedEquality	()=()
		*/
			it("=7(\"Dan\") eql false", () => expect(equalsSeven("Dan")).eql(false));
			it("\"Peter\"=(\"Peter\") eql true", () => expect(peterEquals("Peter")).eql(true));
			it("(2 \"Jane\" (3 4))=(2 \"Jane\" (3 4)) eql true", () => expect(mixedEqualsMixed).eql(true));
			it("2=4 eql false", () => expect(failedEquality).eql(false));
			it('(1 2 3)=(1 2 3) eql true', () => expect(arrayEqualsArray).eql(true));
			it('=(1 2 3)(1) eql false', () => expect(numberEqualsArray(1)).eql(false));
			it('1=2 eql false', () => expect(inequality).eql(false));
			it('1=() eql false', () => expect(equalsUndefined).eql(false));
			it('(1 "hello")=(1 "hello") eql true', () => expect(mixedEquality).eql(true));
			it('()=() eql true', () => expect(undefinedEquality).eql(true));
		});
	});

	describe("|", () => {
		describe("orValue (? N ?), (? A ?) 7", () => {
		/*ts
			oneOrTwo			1|2
			arrayOrArray		(1 2 3)|(4 5)
			oneOrNull			1|()
			nullOrOne			()|1
			nullOr				()|
			orNull				|()
			helloOrBye			"hello"|"bye"
			nullOrHello			()|(1 2 3)
		*/
			it('1|2 eql 1', () => expect(oneOrTwo).eql(1));
			it("(1 2 3)|(4 5) eql [1, 2, 3]", () => expect(arrayOrArray).eql([1, 2, 3]));
			it('1|() eql 1', () => expect(oneOrNull).eql(1));
			it('()|1 eql 1', () => expect(nullOrOne).eql(1));
			it('()|(2) eql 2', () => expect(nullOr(2)).eql(2));
			it('|()(3) eql 3', () => expect(orNull(3)).eql(3));
			it('"hello"|"bye" eql "hello"', () => expect(helloOrBye).eql("hello"));
			it('()|(1 2 3) eql [1, 2, 3]', () => expect(nullOrHello).eql([1, 2, 3]));
		});

		describe("orPredicate 111", () => {
		/*ts
			lessThanFiveOrEven				<5|(%2.=0)
		*/
			it('<5|(%2.=0)(3) eql true', () => expect(lessThanFiveOrEven(3)).eql(true));
			it('<5|(%2.=0)(10) not eql undefined', () => expect(lessThanFiveOrEven(10)).not.eql(undefined));
			it('<5|(%2.=0)(7) eql false', () => expect(lessThanFiveOrEven(7)).eql(false));
		});

		describe("orOperator 222", () => {
		/*ts
			lessThanOrEqual						<|=
			fiveLessThanOrEqualSeven			5lessThanOrEqual7
			sevenLessThanOrEqualFive			7(<|=)5
			sevenLessThanOrEqualUndefined		7(<|=)()
		*/
			it('5(<|=)7 eql true', () => expect(fiveLessThanOrEqualSeven).eql(true));
			it('7(<|=)5 eql false', () => expect(sevenLessThanOrEqualFive).eql(false));
			it('<|=(5, 5) eql true', () => expect(lessThanOrEqual(5, 5)).eql(true));
			it('<|=(6, 4) eql false', () => expect(lessThanOrEqual(6, 4)).eql(false));
			it('7(<|=)() eql false', () => expect(sevenLessThanOrEqualUndefined).eql(false));
		});

	});

	describe("-", () => {
		describe("minus NNN", () => {
		/*ts
			minusFive			4-9
			minusSix			-6
			nineMinus			9-
		*/
			it('4-9 eql -5', () => expect(minusFive).eql(-5));
			it('-6(10) eql 4', () => expect(minusSix(10)).eql(4));
			it('9-(-5) eql 14', () => expect(nineMinus(-5)).eql(14));
		});

		describe("omitKey (S O O) |", () => {
		/*ts
			removedKey			"key1"-(\(("key1" 1) ("key2" 2)))
		*/
			it('"key1"-(\\(("key1" 1) ("key2" 2))) eql {key1: 1}', () => expect(removedKey).eql({key2: 2}));
		});

		describe("omitKeys AOO", () => {
		/*ts
			keysOmitted				("a" "no" "hen")-(\(("a" 4) ("be" "hello") ("hen" (1 2 3))))
			omitTheseKeys			("c" "ex")-
		*/
			it('("a" "no" "hen")-(\(("a" 4) ("be" "hello") ("hen" (1 2 3)))) eql {be: "hello"}', () => expect(keysOmitted).eql({be: "hello"}));
			it('("c" "ex")-({a: "head", ex: 4}) eql {a: "head}', () => expect(omitTheseKeys({a: "head", ex: 4})).eql({a: "head"}));
		});
	});

	describe("/", () => {
		describe("divide 000", () => {
		/*ts
			basicDivide				9/2
			numeratorDivide			8/
			divideByDenominator		/2
			divideByZero			/0
		*/
			it('9/2 eql 4.5', () => expect(basicDivide).eql(4.5));
			it('8/(4) eql 2', () => expect(numeratorDivide(4)).eql(2));
			it('/2(10) eql 5', () => expect(divideByDenominator(10)).eql(5));
			it('/0(8) eql undefined', () => expect(divideByZero(8)).eql(undefined));
		});

		describe("groupBy (?? A O) |", () => {
		/*ts
			groupByFirst	[/("ann" "ben" "ade")
			groupByEmpty	[/( )
		*/
			it('[/("ann" "ben" "ade") eql {a: ["ann", "ade"], b: ["ben"]}', () => expect(groupByFirst).eql({a: ["ann", "ade"], b: ["ben"]}));
			it('[/( ) eql {}', () => expect(groupByEmpty).eql({}));
		});
	});

	describe("#", () => {
		describe("length (A N) 3", () => {
		/*ts
			length					#
			lengthOfArray			#(3 4 5 6 7)
		*/
			it("length([5, 6, 7, 8]) eql 4", () => expect(length([5, 6, 7, 8])).eql(4));
			it("#(3 4 5 6 7) eql [5, [N]]", () => expect([lengthOfArray, ts.typeOf(lengthOfArray)]).eql([5,  "N"]));
		});
	});

	describe("<", () => {
		describe("lessThan (N N N)", () => {
			/*ts
				passedLessThan			2<3
				failedLessThan			3<2
			*/
				it("2<3 eql true", () => expect(passedLessThan).eql(true));
				it("3<2 eql false", () => expect(failedLessThan).eql(false));
		});

		describe("lessThan (S S S)", () => {
			/*ts
				passedLessThan			"ab"<"bc"
				failedLessThan			"b"<"a"
			*/
				it('"ab"<"bc" eql true', () => expect(passedLessThan).eql(true));
				it('"b"<"a" eql false', () => expect(failedLessThan).eql(false));
			});

		describe("ascendingSort (?? A A) |", () => {
		/*ts
			sortArray	{"Math.abs"<(~7 3 ~1 4)
			sortStrings	[<("tom" "ann" "sam")
		*/
			it('{"Math.abs"<(~7 3 _~1 4) eql [-1, 3, 4, -7]', () => expect(sortArray).eql([-1, 3, 4, -7]));
			it('[<("tom" "ann" "sam") eql ["ann", "sam", "tom"]', () => expect(sortStrings).eql(["ann", "sam", "tom"]));
		});
	});

	describe(">", () => {
		describe("greaterThan (N N N)", () => {
		/*ts
			failedGreaterThan			2>3
			passedGreaterThan			3>2
		*/
			it("2>3 eql false", () => expect(failedGreaterThan).eql(false));
			it("3>2 eql true", () => expect(passedGreaterThan).eql(true));
		});

		describe("greaterThan (S S S)", () => {
		/*ts
			failedGreaterThan			"ab">"bc"
			passedGreaterThan			"b">"a"
		*/
			it('"ab">"bc" eql false', () => expect(failedGreaterThan).eql(false));
			it('"b">"a" eql true', () => expect(passedGreaterThan).eql(true));
		});
	});

	describe("%", () => {
	/*ts
		split						%
	*/

		describe("modulo (N N N)", () => {
		/*ts
			moduloTwo		%2
		*/
			it("%2(3) eql 1", () => expect(moduloTwo(3)).eql(1));
		});

		describe("split (N A A) (N S A)", () => {
		/*ts
			splitTwo					2split
			splitMinusTwo				~2split
		*/
			it("2split([1, 2, 3, 4, 5]) eql [[1, 2], [3, 4, 5]]", () => expect(splitTwo([1, 2, 3, 4, 5])).eql([[1, 2], [3, 4, 5]]));
			it('2split("abcde") eql ["ab", "cde"]', () => expect(splitTwo("abcde")).eql(["ab", "cde"]));
			it("~2split([1, 2, 3, 4, 5]) eql [[1, 2, 3], [4, 5]]", () => expect(splitMinusTwo([1, 2, 3, 4, 5])).eql([[1, 2, 3], [4, 5]]));
			it('~2split("abcde") eql ["abc", "de"]', () => expect(splitMinusTwo("abcde")).eql(["abc", "de"]));
		});

		/*ts
			threeChunk			(3 )%
			threeTwoChunk		(3 2)%
			threeTwoZeroChunk	(3 2 0)%
		*/

		describe("chunkArray (A A A)", () => {
			it('(3 )%([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) eql [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9]]', () => expect(threeChunk([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).eql([[0, 1, 2], [3, 4, 5], [6, 7, 8], [9]]));
			it('(3 2)%([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) eql [[0, 1, 2], [3, 4], [5, 6, 7], [8, 9]]', () => expect(threeTwoChunk([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).eql([[0, 1, 2], [3, 4], [5, 6, 7], [8, 9]]));
			it('(3 2 0)%([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) eql [[0, 1, 2], [3, 4], [5, 6, 7, 8, 9]]', () => expect(threeTwoZeroChunk([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).eql([[0, 1, 2], [3, 4], [5, 6, 7, 8, 9]]));
		});

		describe("chunkString (A S A)", () => {
			it('(3 )%"abcdefghij" eql ["abc", "def", "ghi", "j]', () => expect(threeChunk("abcdefghij")).eql(["abc", "def", "ghi", "j"]));
			it('(3 2)%"abcdefghij" eql ["abc", "de", "fgh", "ij"]', () => expect(threeTwoChunk("abcdefghij")).eql(["abc", "de", "fgh", "ij"]));
			it('(3 2 0)%"abcdefghij" eql ["abc", "de", "fgh", "ij"]', () => expect(threeTwoZeroChunk("abcdefghij")).eql(["abc", "de", "fghij"]));
		});

		/*ts
			chunkWhenLessThan		<%
		*/

		describe("chunkArrayWhen (??? A A)", () => {
			it('<%([9, 6, 4, 8, 5, 2, 7, 4, 1, 0]) eql [[9, 6, 4], [8, 5, 2], [7, 4, 1, 0]]', () => expect(chunkWhenLessThan([9, 6, 4, 8, 5, 2, 7, 4, 1, 0])).eql([[9, 6, 4], [8, 5, 2], [7, 4, 1, 0]]));
		});

		describe("chunkStringWhen (SS? S A)", () => {
			it('<%("jgeifcheba") eql ["jge", "ifc", "heba"]', () => expect(chunkWhenLessThan("jgeifcheba")).eql(["jge", "ifc", "heba"]));
		});
	});

	describe("[", () => {
		describe("first (A ?) 3", () => {
		/*ts
			first                       [
		*/
			it("first([1, 2, 3]) eql 1", () => expect(first([1, 2, 3])).eql(1));
			it("first(\"abcd\") eql \"a\"", () => expect(first("abcd")).eql("a"));
		});
	});

	describe("}", () => {
		describe("typeOf (? S) 1", () => {
		/*ts
			typeOf					}
			typeOfUndefined			}()
			typeOfNumber			}4.5
			typeOfString			}"hello"
			typeOfArray				}(7 8 9)
			typeOfObject			}(\(("a" 4) ))
			typeOfPow				}({"Math.pow")
			typeOfPlus				}+
			typeOfFirst				}[
		*/
			it('}(undefined) eql "U"', () => expect(typeOf(undefined)).eql("U"));
			it('}() eql false', () => expect(typeOfUndefined).eql("B"));
			it('}(4) eql "N"', () => expect(typeOf(4)).eql("N"));
			it('}4.5 eql "N"', () => expect(typeOfNumber).eql("N"));
			it('}("hello") eql "S"', () => expect(typeOf("hello")).eql("S"));
			it('}"hello" eql "S"', () => expect(typeOfString).eql("S"));
			it('}([1, 2, 3]) eql "A"', () => expect(typeOf([1, 2, 3])).eql("A"));
			it('}(7 8 9) eql "A"', () => expect(typeOfArray).eql("A"));
			it('}({a: 3}) eql "O"', () => expect(typeOf({a: 3})).eql("O"));
			it('}(\\(("a" 4) )) eql "O"', () => expect(typeOfObject).eql("O"));
			it('}(Math.random) eql 1 (0 arity functions returned as 1)', () => expect(typeOf(Math.random)).eql(1));
			it('}(Math.sin) eql 1', () => expect(typeOf(Math.sin)).eql(1));
			it('}(Math.pow) eql 2', () => expect(typeOf(Math.pow)).eql(2));
			it('}({"Math.pow") eql 2', () => expect(typeOfPow).eql(2));
			it('}+ eql 2', () => expect(typeOfPlus).eql(2));
			it('}[ eql 1', () => expect(typeOfFirst).eql(1));
		});
	});

	describe("^", () => {
		describe("power (N N N)", () => {
		/*ts
			cube		^3
		*/
			it("^3(2) eql 8", () => expect(cube(2)).eql(8));
		});

		describe("generate (N? N A)", () => {
		/*ts
			timesTwoGenerate	*2^
		*/
			it('*2^(5) eql [0, 2, 4, 6, 8]', () => expect(timesTwoGenerate(5)).eql([0, 2, 4, 6, 8]));
		});

		describe("while (A A A)", () => {
		/*ts
			firstFiveNaturalNumbers	(#.<5 #.+1)^( )
			firstFiveFibonacci	(#.<5 ~2%.].+$)^(1 1)
		*/
			it('(#.<5 #.+1)^( ) eql [1, 2, 3, 4, 5]', () => expect(firstFiveNaturalNumbers).eql([1, 2, 3, 4, 5]));
			it('(#.<5 ~2%.].+$)^(1 1) eql [1, 1, 2, 3, 5]', () => expect(firstFiveFibonacci).eql([1, 1, 2, 3, 5]));
		});
	});

	describe("&", () => {
		describe("andValue (0 0 0)", () => {
		/*ts
			fiveAndUndefined			5&()
			undefinedAndFive			()&5
			andHello					&"hello"
			helloAnd					"hello"&
		*/
			it('5&() eql false', () => expect(fiveAndUndefined).eql(false));
			it('()&5 eql false', () => expect(undefinedAndFive).eql(false));
			it('&"hello"([4, 5, 6]) eql "hello"', () => expect(andHello([4, 5, 6])).eql("hello"));
			it('"hello"&([7, 8, 9]) eql [7, 8, 9]', () => expect(helloAnd([7, 8, 9])).eql([7, 8, 9]));
		});

		describe("andPredicate (X? X? X?)", () => {
		/*ts
			greaterAndLessThan				>3&(<6)
		*/
			it('>3&(<6)(4) eql true', () => expect(greaterAndLessThan(4)).eql(true));
			it('>3&(<6)(7) eql false', () => expect(greaterAndLessThan(7)).eql(false));
			it('>3&(<6)(3) eql false', () => expect(greaterAndLessThan(3)).eql(false));
		});
	})

	describe("_", () => {
		describe("reverse AA, SS", () => {
		/*ts
			reversedArray			_(1 2 3)
			reversedString			_"Hello"
			reverse					_
		*/
			it('_(1 2 3) eql [3, 2, 1]', () => expect(reversedArray).eql([3, 2, 1]));
			it('_"Hello" eql "olleH"', () => expect(reversedString).eql("olleH"));
			it('_([4, 5, 6]) eql [6, 5, 4]', () => expect(reverse([4, 5, 6])).eql([6, 5, 4]));
			it('_("Bye") eql "eyB"', () => expect(reverse("Bye")).eql("eyB"));
		});
	});

	describe("!", () => {
		describe("not 00, 11, 22", () => {
		/*ts
			notNumber					!4
			notZero						!0
			notUndefined				!()
			notArray					!( )
			notString					!"hello"
			notEqual					!=
			notLessThanThree			!(<3)
			not							!
			notDivideByZero				!(1/0)
		*/
			it("!4 eql false", () => expect(notNumber).eql(false));
			it('!0 eql false', () => expect(notZero).eql(false));
			it('!() eql true', () => expect(notUndefined).eql(true));
			it('!(1 2 3) eql false', () => expect(notArray).eql(false));
			it('!"hello" eql false', () => expect(notString).eql(false));
			it('!=(2, 3) eql true', () => expect(notEqual(2, 3)).eql(true));
			it('!=(3, 3) eql false', () => expect(notEqual(3, 3)).eql(false));
			it('!(<3)(4) eql true', () => expect(notLessThanThree(4)).eql(true));
			it('!(<3)(2) eql false', () => expect(notLessThanThree(2)).eql(false));
			it('!("hello") eql false', () => expect(not("hello")).eql(false));
			it('!(x => x)({a: 2}) eql false', () => expect(not(x => x)({a: 2})).eql(false));
			it('!(x => undefined)(3) eql true', () => expect(not(x => undefined)(3)).eql(true));
			it('!(1/0) eql undefined', () => expect(notDivideByZero).eql(undefined));
		});
	});
});

mocha.run();