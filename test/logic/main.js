const {expect, assert} = chai;
import ts from "tacitscript";

mocha.setup('bdd');



describe("Operators", () => {
	describe(". (dot)", () => {
		describe("pipe (XY)(YZ)(XZ)", () => {
		/*ts
			pipe						.
			calculation					(+2.(*3))4
			pipeToBacktick				+2.`
			firstThen					[pipe
			thenDivideByTwo				pipe(/2)
			firstThenDivideByTwo		[pipe(/2)
			sizeLessThanThree			#.<3
		*/

			it("pipe(x => x + 2, x => x * 3)(4) eql 18", () => expect(pipe(x => x + 2, x => x * 3)(4)).eql(18));
			it("(+2.(*3))4 eql 18", () => expect(calculation).eql(18));
			it("+2.`(3)(4) eql 5", () => expect(pipeToBacktick(3)(4)).eql(5));
			it("[.(value => value * 2)([3, 4, 5]) eql 6", () => expect(firstThen(value => value * 2)([3, 4, 5])).eql(6));
			it(".(/2)(array => array[0])([10, 8, 9]) eql 5", () => expect(thenDivideByTwo(array => array[0])([10, 8, 9])).eql(5));
			it("[./2([4, 5, 7]) eql 4", () => expect(firstThenDivideByTwo([4, 5, 7])).eql(2));
			it('#.<3([4, 5]) eql true', () => expect(sizeLessThanThree([4, 5])).eql(true));
		});

		describe("binaryUnaryPipe (XYZ)(ZW)(XYW)", () => {
		/*ts
			binaryUnaryPipe		.
			calculation			6(/.(*3))2
			pipeToBacktick		+.`
			add					:.+$
			addTwoAndThree		2add3
		*/

			it("binaryUnaryPipe((x, y) => x / y, x => x * 3)(6, 2) eql 9", () => expect(binaryUnaryPipe((x, y) => x / y, x => x * 3)(6, 2)).eql(9));
			it("6(/.(*3))2 eql 9", () => expect(calculation).eql(9));
			it("+.`(2, 3)(4, 5) eql 5", () => expect(pipeToBacktick(2, 3)(4, 5)).eql(5));
			it('2(:.+$)3 eql 5', () => expect(addTwoAndThree).eql(5));
			it(':.+$(2, 3) eql 5', () => expect(add(2, 3)).eql(5));
		});

		describe("binaryUnaryApply (XYZ)((YZ)W)(XW)", () => {
		/*ts
			contained			=.'(1 2 3)
			calculation			contained2
		*/

			it("=.'(1 2 3)(2) eql 2", () => expect(contained(2)).eql(2));
			it("(=.'(1 2 3))2 eql 2", () => expect(calculation).eql(2));
		});

		describe("unaryBinaryPipe (XY)(YZW)(X(ZW))", () => {
		/*ts
			unaryBinaryPipe		.
			calculation			((-3./)9)3
		*/

			it("unaryBinaryPipe(x => x - 3, (x, y) => x / y)(9)(3) eql 2", () => expect(unaryBinaryPipe(x => x - 3, (x, y) => x / y)(9)(3)).eql(2));
			it("((-3./)9)3 eql 2", () => expect(calculation).eql(2));
		});

		describe("unaryBinaryApply (XY)((XY)ZW)(ZW)", () => {
		/*ts
			isEqualOne			=1.?
			calculation			isEqualOne2
		*/
			it("=1.?(1) eql [1, undefined]", () => expect(isEqualOne(1)).eql([1, undefined]));
			it("(=1.?)2 eql [undefined, 2]", () => expect(calculation).eql([undefined, 2]));
		});

		describe("pipeToArray (VV)A(VA)", () => {
		/*ts
			arrayPipe			.
			calculation			(10/.(10- 3*))2
		*/

			it("arrayPipe(x => 10 / x, [x => 10 - x, x => 3 * x])(2) eql [5, 15]", () => expect(arrayPipe(x => 10 / x, [x => 10 - x, x => 3 * x])(2)).eql([5, 15]));
			it("(10/.(10- 3*))2 eql [5, 15]", () => expect(calculation).eql([5, 15]));
		});

		describe("binaryPipeToArray (VVV)A(VVA)", () => {
		/*ts
			binaryPipeToArray	.
			calculation			5(-.(10- 3*))2
		*/

			it("binaryPipeToArray((x, y) => x - y, [x => 10 - x, x => 3 * x])(5, 2) eql [7, 9]", () => expect(binaryPipeToArray((x, y) => x - y, [x => 10 - x, x => 3 * x])(5, 2)).eql([7, 9]));
			it("5(-.(10- 3*))2 eql [7, 9]", () => expect(calculation).eql([7, 9]));
		});
		
		describe("applyToArray VAA", () => {
		/*ts
			applyToArray			.
			calculation				2.(10/ 5-)
			calculationB			(4 5 6).(# ])
			sevenApplyToArray		7.(+2 -)
			sixApplyToArray			6.
			stringApplyToArray		"hello".
			applyToArrayArray		.(# ])
			arrayApplyToArray		(5 6).(# [)
		*/
			it("applyToArray(2, [x => 10 / x, x => 5 - x]) eql [5, 3]", () => expect(applyToArray(2, [x => 10 / x, x => 5 - x])).eql([5, 3]));
			it("2.(10/ 5-) eql [5, 3]", () => expect(calculation).eql([5, 3]));
			it("(4 5 6).(# ]) eql [3, 6]", () => expect(calculationB).eql([3, 6]));
			it('7.(+2 -)[0] eql 9', () => expect(sevenApplyToArray[0]).eql(9));
			it('7.(+2 -)[1](3) eql 4', () => expect(sevenApplyToArray[1](3)).eql(4));
			it("6.([x => x + 3, x => x * 3]) eql [5, 6]", () => expect(sixApplyToArray([x => x + 3, x => x * 3])).eql([9, 18]));
			it("\"hello\".([x => x.length, x => x[0]]) eql [5, \"h\"]", () => expect(stringApplyToArray([x => x.length, x => x[0]])).eql([5, "h"]));
			it(".(# ])([7, 8, 9]) eql [3, 9]", () => expect(applyToArrayArray([7, 8, 9])).eql([3, 9]));
			it("(5 6).(# [) eql [2, 5]", () => expect([arrayApplyToArray, ts.typeOf(arrayApplyToArray)]).eql([[2, 5], "A"]));
		});
	});

	describe(", (comma)", () => {
		describe("applyTo X(XY)Y", () => {
		/*ts
			applyTo					,
			calculation				3,(12/)
			applyToBacktick			+2,`
			twoApplyTo				2,
			stringApplyTo			"hello",
			arrayApplyTo			(1 2 3),
			twoApplyToThreePlus		2,(3+)
			stringApplyToLength		"hello",#
			arrayApplyToFirst		(1 2 3),[
			twoDotPlusThree			2,+3
			twoApplyToPlusThree		2applyTo(+3)
			invertedSense			-1,(7,)
		*/

			it("applyTo(3, x => 12 / x) eql 4", () => expect(applyTo(3, x => 12 / x)).eql(4));
			it("3,(12/) eql 4", () => expect(calculation).eql(4));
			it("+2,`(3)(4) eql 6", () => expect(applyToBacktick(3)(4)).eql(6));
			it("2,(x => 3 + x) eql 5", () => expect(twoApplyTo(x => 3 + x)).eql(5));
			it("\"hello\",(x => x.length) eql 6", () => expect(stringApplyTo(x => x.length)).eql(5));
			it("(1 2 3),(x => x[0]) eql 6", () => expect(arrayApplyTo(x => x[0])).eql(1));
			it("2,(3+) eql 5", () => expect(twoApplyToThreePlus).eql(5));
			it("\"hello\",# eql 5", () => expect(stringApplyToLength).eql(5));
			it("(1 2 3),[ eql 1]", () => expect(arrayApplyToFirst).eql(1));
			it("2,+3 eql 5", () => expect(twoDotPlusThree).eql(5));
			it("2applyTo(+3) eql 5", () => expect(twoApplyToPlusThree).eql(5));
			it('-1,(7,) eql 6', () => expect(invertedSense).eql(6));
		});

		describe("applyToBinary X(XYZ)(YZ)", () => {
		/*ts
			applyToBinary		,
			calculation			(12,/)4
			applyToBacktick		+,`
			fiveMinus			5,-
		*/

			it("applyToBinary(12, (x, y) => x / y)(4) eql 3", () => expect(applyToBinary(12, (x, y) => x / y)(4)).eql(3));
			it("(12,/)4 eql 3", () => expect(calculation).eql(3));
			it("+,`(2, 3)(4, 5) eql 9", () => expect(applyToBacktick(2, 3)(4, 5)).eql(9));
			it('(5,-)(2) eql 3', () => expect(fiveMinus(2)).eql(3));
		});

		describe("zipApplyTo AAA", () => {
		/*ts
			zipApplyTo			,
			calculation			(2 3),(10/ 7-)
			topHeavy			(1 2 3),(*3 +7)
			bottomHeavy			(4 5),(/2 -1 *8)
			commaArray			,(-1 )
			chainedComma		,(- ),(5, )
			zipPipe				,(+2 -),(; 5,)
			zipPipeInPlace		zipPipe(5 3)
			inlineApplication	(4 8),(+2 -),(; 5,)
		*/

			it(',(-1 )([5]) eql [4]', () => expect(commaArray([5])).eql([4]));
			it("zipApplyTo([2, 3], [x => 10 / x, x => 7 - x]) eql [5, 4]", () => expect(zipApplyTo([2, 3], [x => 10 / x, x => 7 - x])).eql([5, 4]));
			it("(2 3),(10/ 7-) eql [5, 4]", () => expect(calculation).eql([5, 4]));
			it('(1 2 3),(*3 +7) eql [3, 9]', () => expect(topHeavy).eql([3, 9]));
			it('(4 5),(/2 -1 *8) eql [2, 4]', () => expect(bottomHeavy).eql([2, 4]));
			it(',(- ),(5, )([9]) eql 4', () => expect(chainedComma([9])).eql([4]));
			it(',(+2 -),(; 5,)([7, 9]) eql [9, 4]', () => expect(zipPipe([7, 9])).eql([9, 4]));
			it(',(+2 -),(; 5.)(5 3) eql [7, -2]', () => expect(zipPipeInPlace).eql([7, -2]));
			it('(4 8),(+2 -),(; 5.) eql [6, 3]', () => expect(inlineApplication).eql([6, 3]));
		});

		describe("unaryZipApplyTo (XA)A(XA)", () => {
		/*ts
			addOneAndZipApply				+1@,(*2 /2)
			calculation						(+1@,(*2 /2))(3 5)
		*/
		
			it("+1@,(*2 /2)([3, 5]) eql [8, 3]", () => expect(addOneAndZipApply([3, 5])).eql([8, 3]));
			it("(+1@,(*2 /2))(3 5) eql [8, 3]", () => expect(calculation).eql([8, 3]));
		});

		describe("binaryZipApplyTo (XYA)A(XYA)", () => {
		/*ts
			pairAndArray			:,(+1 -1)
			calculation				3pairAndArray4
		*/
		
			it(":,(+1 -1)(3, 4) eql [4, 3]", () => expect(pairAndArray(3, 4)).eql([4, 3]));
			it("3(:,(+1 -1))4 eql [4, 3]", () => expect(calculation).eql([4, 3]));
		});
	});

	describe("~ (tilde)", () => {
		describe("negative NN", () => {
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

		describe("flip (XYZ)(YXZ)", () => {
		/*ts
			flipMinus				~-
			flipPairMinus			(:.-$).~
			flipPairMinusApplied	2flipPairMinus6
			flipPow					~({"Math.pow")				NB: this causes need for js functions to be imported as VV/VVV rather ??/???
		*/
			it('~-(2, 7) eql 5', () => expect(flipMinus(2, 7)).eql(5));
			it('2((:.-$).~)6 eql 4', () => expect(flipPairMinusApplied).eql(4));
			it('(:.-$).~(9, 6) eql -3', () => expect(flipPairMinus(9, 6)).eql(-3));
			it('~({"Math.pow")(2, 3) eql 9', () => expect(flipPow(2, 3)).eql(9));
		});
	});

	describe("_ (underscore)", () => {
		/*ts
			reverse						_
		*/

		describe("reverseArray AA", () => {
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

	describe(": (colon)", () => {
		describe("pair ??A", () => {
		/*ts
			numberAndString		4:"hello"
		*/
			it('4:"hello" eql [4, "hello"]', () => expect(numberAndString).eql([4, "hello"]));
		});
	});

	describe("\\ (backslash)", () => {
		describe("fromPairs AO", () => {
		/*ts
			simpleObject			\(("a" 1) ("b" 2))
			emptyObject				\( )
			compoundObject			\(("a" 1) ("b" \(("ba" 2) )))
		*/
			it('\\(("a" 1) ("b" 2)) eql {a: 1, b: 2} type O', () => expect([simpleObject, ts.typeOf(simpleObject)]).eql([{a: 1, b: 2}, "O"]));
			it('\\( ) eql {} type O', () => expect([emptyObject, ts.typeOf(emptyObject)]).eql([{}, "O"]));
			it('\\(("a" 1) ("b" \(("ba" 2) ))) eql {a: 1, b: {ba: 2}} type O', () => expect([compoundObject, ts.typeOf(compoundObject)]).eql([{a: 1, b: {ba: 2}}, "O"]));
		});

		describe("toPairs OA", () => {
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

	describe("? (question)", () => {
		describe("if (VB)VA", () => {
		/*ts
			yes				<3?2
			no				<3?4
		*/
			it("<3?2 eql [2, undefined]", () => expect(yes).eql([2, undefined]));
			it("<3?4 eql [undefined, 4]", () => expect(no).eql([undefined, 4]));
		});

		describe("cond AVA", () => {
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

	describe("@ (atsign)", () => {
		describe("map (VV)AA", () => {
		/*ts
			timesTwoMapArray			*2@(3 4 5)
			indexedSum					.(; #.;^).~.+$@
		*/
			it("*2@(3 4 5) eql [6, 8, 10]", () => expect(timesTwoMapArray).eql([6, 8, 10]));
			it('.(; #.;^).~.+$@(4 5 6) = [4, 6, 8]', () => expect(indexedSum([4, 5, 6])).eql([4, 6, 8]))
		});

		describe("mapBinary (VVV)AA", () => {
		/*ts
			contains					:._,(=@.|$ ;).?$.[
			calculation					2contains(1 2 3)
		*/
			it(":.~,(=@.|$ ;).?$.[(2, [1, 2, 3]) eql 2", () => expect(contains(2, [1, 2, 3])).eql(2));
			it("2(:._,(=@.|$ ;).?$.[)(1 2 3) eql 2", () => expect(calculation).eql(2));
		});
	});

	describe("* (asterisk)", () => {
		describe("times NNN", () => {
		/*ts
			timesSix		*6
		*/
			it('*6(4) eql 24', () => expect(timesSix(4)).eql(24));
		});

		describe("pick AOO", () => {
		/*ts
			pickedObject ("a" "c" "d")*(\(("a" 1) ("b" 2) ("c" 3)))
		*/
			it('("a" "c" "d")*(\(("a" 1) ("b" 2) ("c" 3))) eql {a: 1, c: 3}', () => expect(pickedObject).eql({a: 1, c: 3}));
		});

		describe("filter (VB)AA", () => {
		/*ts
			lessThanFilter		<5*(4 9 2 7 3)
			emptyFilter			;*( )
		*/
			it("<5*(4 9 2 7 3) eql [4, 2, 3]", () => expect(lessThanFilter).eql([4, 2, 3]));
			it(";*( ) eql []", () => expect(emptyFilter).eql([]));
		});	
	});

	describe("+ (plus)", () => {
		describe("add NNN", () => {
		/*ts
			plusThree		+3
		*/
			it("+3(4) eql 7", () => expect(plusThree(4)).eql(7));
		});

		describe("arrayConcat AAA", () => {
		/*ts
			concatArray				(1 2 3)+("hello" (4 5))
			emptyConcatArray		( )+(1 2 3)
		*/
			it('(1 2 3)+("hello" (4 5)) eql [1, 2, 3, "hello", [4, 5]]', () => expect(concatArray).eql([1, 2, 3, "hello", [4, 5]]));
			it('( )+(1 2 3) eql [1, 2, 3]', () => expect(emptyConcatArray).eql([1, 2, 3]));
		});

		describe("merge OOO", () => {
			/*ts
				mergedObjects			\(("a" 1) ("b" \(("b1" 2) ("b3" (1 2)))) ("c" 3))+(\(("b" \(("b2" 2.5) ("b3" (4 )))) ("c" \(("c1" 3.5) ))))
			*/
			it(
				'\\(("a" 1) ("b" \\(("b1" 2) ("b3" (1 2)))) ("c" 3))+(\\(("b" \\(("b2" 2.5) ("b3" (4 )))) ("c" \\(("c1" 3.5) )))) eql {a: 1, b: {b1: 2, b3: [4], b2: 2.5}, c: {c1: 3.5}}',
				() => expect(mergedObjects).eql({a: 1, b: {b1: 2, b3: [4], b2: 2.5}, c: {c1: 3.5}})
			);
		});

		describe("stringConcat SVS", () => {
		/*ts
			numberString				"me"+1
			stringString				"me"+"hello"
			arrayString					"me"+(1 2 3)
			singleArrayString			""+(9 )
			emptyArrayString			"me"+( )
			objectString				"me"+(\(("a" 1) ))
			mixedString					""+(\(("a" (1 "hello")) ))
		*/
			it('"me"+1 eql "me1"', () => expect(numberString).eql("me1"));
			it('"me"+"hello" eql "mehello"', () => expect(stringString).eql("mehello"));
			it('"me"+(1 2 3) eql "me(1 2 3)"', () => expect(arrayString).eql("me(1 2 3)"));
			it('""+(9 ) eql "(9 )"', () => expect(singleArrayString).eql("(9 )"));
			it('"me"+( ) eql "me( )"', () => expect(emptyArrayString).eql("me( )"));
			it('"me"+(\\(("a" 1) )) eql "me(\\(("a" 1) ))"', () => expect(objectString).eql('me(\\(("a" 1) ))'));
			it('""+(\\(("a" (1 "hello")) )) eql "(\\(("a" (1 "hello")) ))"', () => expect(mixedString).eql('(\\(("a" (1 "hello")) ))'));
		});
	});

	describe("$ (dollar)", () => {
		describe("join SAS", () => {
		/*ts
			csv			","$(1 2 3)
		*/
			it('","$(1 2 3) eql "1,2,3"', () => expect(csv).eql("1,2,3"));
		});
	
		describe("insert (??X)AX", () => {
		/*ts
			insert						$
			timesInsert					*$
			timesInsertSingle			*$(4 )
			insertEmpty					$( )
			timesInsertEmpty			*$( )
			timesInsertArray			*$(5 6 7)
		*/
			it("*$([4, 5, 6]) eql 120", () => expect(timesInsert([4, 5, 6])).eql(120));
			it("*$(4 ) eql 4", () => expect(timesInsertSingle).eql(4));
			it("$( )((x, y) => x + y) eql undefined", () => expect(insertEmpty((x, y) => x + y)).eql(undefined));
			it("*$( ) eql undefined", () => expect(timesInsertEmpty).eql(undefined));
			it("*$(5 6 7) eql [210, N]", () => expect([timesInsertArray, ts.typeOf(timesInsertArray)]).eql([210,  "N"]));
		});
	
		describe("reduce AA?", () => {
		/*ts
			sum					(+ 0)$
		*/
			it('(+ 0)$([2, 3, 4]) eql 9', () => expect(sum([2, 3, 4])).eql(9));
		});
	});

	describe("` (backtick)", () => {
		describe("constant X(?X)", () => {
		/*ts
			constNumber			`3
			constObject			`(\(("a" 3) ))
		*/
			it('`3("hello") eql 3', () => expect(constNumber("hello")).eql(3));
			it('`(\(("a" 3) )([1, 2]) eql {a: 3}', () => expect(constObject([1, 2])).eql({a: 3}));
		});
	});

	describe("] (bracketright)", () => {
		describe("last A?", () => {
		/*ts
			last                        ]
		*/
			it("last([1, 2, 3]) eql 3", () => expect(last([1, 2, 3])).eql(3));
		});

		describe("lastInString SS", () => {
		/*ts
			lastInString                ]
		*/
			it("lastInString(\"abcd\") eql \"d\"", () => expect(lastInString("abcd")).eql("d"));
		});
	});

	describe("{ (braceleft)", () => {
		describe("eval S?", () => {
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

	describe("; (semicolon)", () => {
		describe("identity XX", () => {
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

	describe("' (apostrophe)", () => {
		describe("at NA? NSS", () => {
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

		describe("prop SO?", () => {
		/*ts
			prop			"key"'(\(("a" 2) ("key" 4)))
		*/
			it(`"key"'(\(("a" 2) ("key" 4))) eql 4`, () => expect(prop).eql(4));
		});

		describe("path AA? AO?", () => {
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

		describe("over AOO AAA", () => {
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

		describe("find (VB)AV", () => {
			/*ts
				calculation				(%2.=0)'(1 2 3 4 5 6)
			*/

			it("(%2.=0)'(1 2 3 4 5 6) eql 2", () => expect(calculation).eql(2));
		});
	});

	describe("= (equal)", () => {
		describe("equals XXX", () => {
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


	describe("| (bar)", () => {
		describe("orValue VVV", () => {
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

		describe("orPredicate (??)(??)(??)", () => {
		/*ts
			lessThanFiveOrEven				<5|(%2.=0)
		*/
			it('<5|(%2.=0)(3) eql true', () => expect(lessThanFiveOrEven(3)).eql(true));
			it('<5|(%2.=0)(10) not eql undefined', () => expect(lessThanFiveOrEven(10)).not.eql(undefined));
			it('<5|(%2.=0)(7) eql false', () => expect(lessThanFiveOrEven(7)).eql(false));
		});

		describe("orBinary (???)(???)(???)", () => {
		/*ts
			lessThanOrEqual						<|=
			fiveLessThanOrEqualSeven			5lessThanOrEqual7
			sevenLessThanOrEqualFive			7(<|=)5
		*/
			it('5(<|=)7 eql true', () => expect(fiveLessThanOrEqualSeven).eql(true));
			it('7(<|=)5 eql false', () => expect(sevenLessThanOrEqualFive).eql(false));
			it('<|=(5, 5) eql true', () => expect(lessThanOrEqual(5, 5)).eql(true));
			it('<|=(6, 4) eql false', () => expect(lessThanOrEqual(6, 4)).eql(false));
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

		describe("omitKey SOO", () => {
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


});

mocha.run();