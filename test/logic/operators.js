const {expect} = chai;
import ts from "tacitscript";

export default () => {
	describe("Operators", () => {
		describe(". (dot)", () => {
			describe("pipe (XY)(YZ)(XZ)", () => {
			/*ts
				pipe						.
				calculation					(+2.(*3))4
				pipeToBacktick				+2`
				firstThen					[pipe
				thenDivideByTwo				pipe(/2)
				firstThenDivideByTwo		[pipe(/2)
				sizeLessThanThree			#.<3
				a							+1./2
				b							/0.+1
			*/
				it("/0.+1(2) eql undefined", () => expect(b(2)).eql(undefined));
				it("+1./2(5) eql 3", () => expect(a(5)).eql(3));
				it("pipe(x => x + 2, x => x * 3)(4) eql 18", () => expect(pipe(x => x + 2, x => x * 3)(4)).eql(18));
				it("(+2.(*3))4 eql 18", () => expect(calculation).eql(18));
				it("+2`(3)(4) eql 6", () => expect(pipeToBacktick(3)(4)).eql(6));
				it("[.(value => value * 2)([3, 4, 5]) eql 6", () => expect(firstThen(value => value * 2)([3, 4, 5])).eql(6));
				it(".(/2)(array => array[0])([10, 8, 9]) eql 5", () => expect(thenDivideByTwo(array => array[0])([10, 8, 9])).eql(5));
				it("[./2([4, 5, 7]) eql 4", () => expect(firstThenDivideByTwo([4, 5, 7])).eql(2));
				it('#.<3([4, 5]) eql true', () => expect(sizeLessThanThree([4, 5])).eql(true));
			});

			describe("binaryUnaryPipe (XYZ)(ZW)(XYW)", () => {
			/*ts
				binaryUnaryPipe		.
				calculation			6(/.(*3))2
				pipeToBacktick		+`
				add					:.+$
				addTwoAndThree		2add3
			*/
				it("binaryUnaryPipe((x, y) => x / y, x => x * 3)(6, 2) eql 9", () => expect(binaryUnaryPipe((x, y) => x / y, x => x * 3)(6, 2)).eql(9));
				it("6(/.(*3))2 eql 9", () => expect(calculation).eql(9));
				it("+`(2, 3)(4, 5) eql 9", () => expect(pipeToBacktick(2, 3)(4, 5)).eql(9));
				it('2(:.+$)3 eql 5', () => expect(addTwoAndThree).eql(5));
				it(':.+$(2, 3) eql 5', () => expect(add(2, 3)).eql(5));
			});

			describe("unaryBinaryPipe (XY)(YZW)(X(ZW))", () => {
			/*ts
				unaryBinaryPipe		.
				calculation			((-3./)9)3
			*/

				it("unaryBinaryPipe(x => x - 3, (x, y) => x / y)(9)(3) eql 2", () => expect(unaryBinaryPipe(x => x - 3, (x, y) => x / y)(9)(3)).eql(2));
				it("((-3./)9)3 eql 2", () => expect(calculation).eql(2));
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
				applyToBacktick			+2`
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
				it("+2`(3)(4) eql 6", () => expect(applyToBacktick(3)(4)).eql(6));
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
				fiveMinus			5,-
				// isEqualOne			=1,?
				// calculationB		isEqualOne2
			*/

				it("applyToBinary(12, (x, y) => x / y)(4) eql 3", () => expect(applyToBinary(12, (x, y) => x / y)(4)).eql(3));
				it("(12,/)4 eql 3", () => expect(calculation).eql(3));
				it('(5,-)(2) eql 3', () => expect(fiveMinus(2)).eql(3));
				// it("=1,?(1) eql [1, undefined]", () => expect(isEqualOne(1)).eql([1, undefined]));
				// it("(=1,?)2 eql [undefined, 2]", () => expect(calculationB).eql([undefined, 2]));
			});

			describe("binaryUnaryApply (XYZ)((YZ)W)(XW)", () => {
			/*ts
				contained			=,'(1 2 3)
				calculation			contained2
				applyToBacktick		+`
			*/

				it("=,?(1 2 3)(2) eql 2", () => expect(contained(2)).eql(2));
				it("(=,?(1 2 3))2 eql 2", () => expect(calculation).eql(2));
				it("+`(2)(4, 5) eql 9", () => expect(applyToBacktick(2)(4, 5)).eql(9));
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
				it(',(+2 -),(; 5,)(5 3) eql [7, -2]', () => expect(zipPipeInPlace).eql([7, -2]));
				it('(4 8),(+2 -),(; 5,) eql [6, 3]', () => expect(inlineApplication).eql([6, 3]));
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
			describe("flip (XYZ)(YXZ)", () => {
			/*ts
				flipMinus				~-
				flipPairMinus			(:.-$),~
				flipPairMinusApplied	2flipPairMinus6
				flipPow					~({"Math.pow")				NB: this causes need for js functions to be imported as VV/VVV rather ??/???
			*/
				it('~-(2, 7) eql 5', () => expect(flipMinus(2, 7)).eql(5));
				it('2((:.-$).~)6 eql 4', () => expect(flipPairMinusApplied).eql(4));
				it('(:.-$).~(9, 6) eql -3', () => expect(flipPairMinus(9, 6)).eql(-3));
				it('~({"Math.pow")(2, 3) eql 9', () => expect(flipPow(2, 3)).eql(9));
			});

			describe("transpose AA", () => {
			/*ts
				transposedMatrix				~((1 2 3) (4 5 6) (7 8 9))
				unequalTransposition			~((1 2 3) (4 5) (6 7 8))
			*/
				it('~((1 2 3) (4 5 6) (7 8 9)) eql [[1, 4, 7], [2, 5, 8], [3, 6, 9]]', () => expect(transposedMatrix).eql([[1, 4, 7], [2, 5, 8], [3, 6, 9]]));
				it('~((1 2 3) (4 5) (6 7 8)) eql [[1, 4, 6], [2, 5, 7]]', () => expect(unequalTransposition).eql([[1, 4, 6], [2, 5, 7]]));
			});
		});

		describe("_ (underscore)", () => {
			/*ts
				reverse						_
			*/

			describe("negative NN", () => {
			/*ts
				negative                    _
				negativeFive				_5
			*/
				it("_(4) eql -4", () => expect(negative(4)).eql(-4));
				it("_(-4) eql 4", () => expect(negative(-4)).eql(4));
				it('_5 eql 5', () => expect(negativeFive).eql(-5));
			});

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
				it('\\(("a" 1) ("b" \\(("ba" 2) ))) eql {a: 1, b: {ba: 2}} type O', () => expect([compoundObject, ts.typeOf(compoundObject)]).eql([{a: 1, b: {ba: 2}}, "O"]));
			});

			describe("toPairs OA", () => {
			/*ts
				fromSimpleObject			\(\(("a" 1) ("b" 2)))
				fromEmptyObject				\(\( ))
				fromCompoundObject			\(\(("a" 1) ("b" \(("ba" 2) ))))
			*/
				it('\\(\\(("a" 1) ("b" 2))) eql [["a", 1], ["b", 2]] type A', () => expect([fromSimpleObject, ts.typeOf(fromSimpleObject)]).eql([[["a", 1], ["b", 2]], "A"]));
				it('\\(\\( )) eql [] type A', () => expect([fromEmptyObject, ts.typeOf(fromEmptyObject)]).eql([[], "A"]));
				it('\\(\\(("a" 1) ("b" \\(("ba" 2) )))) eql [["a", 1], ["b", {ba: 2}]] type A', () => expect([fromCompoundObject, ts.typeOf(fromCompoundObject)]).eql([[["a", 1], ["b", {ba: 2}]], "A"]));
			});
		});

		describe("? (question)", () => {
			describe("cond AVV", () => {
			/*ts
				tens			((<10 /2) (<20 *2) "error"`)?
				tensFive		tens5
				tensFifteen		tens15
				tensThirty		tens30
			*/
				it('((<10 /2) (<20 *2) "error"`)?(5) eql 2.5', () => expect(tensFive).eql(2.5));
				it('((<10 /2) (<20 *2) "error"`)?(15) eql 30', () => expect(tensFifteen).eql(30));
				it('((<10 /2) (<20 *2) "error"`)?(30) eql "error"', () => expect(tensThirty).eql("error"));
			});
			
			describe("random NNN", () => {
			/*ts
				random					1?10
			*/
				it("1?10 lt 10 gte 1", () => expect(random).lt(10).gte(1));
			});

			describe("findIndex (VV)AN", () => {
			/*ts
				findEven				(%2.=0)?(1 2 3 4)
			*/
				it("(%2.=0)?(1 2 3 4) eql 1", () => expect(findEven).eql(1));
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

			// describe("mapBinary (VVV)AA", () => {
			// /*ts
			// 	contains					:._,(=@.|$ ;).?$.[
			// 	calculation					2contains(1 2 3)
			// */
			// 	it(":.~,(=@.|$ ;).?$.[(2, [1, 2, 3]) eql 2", () => expect(contains(2, [1, 2, 3])).eql(2));
			// 	it("2(:._,(=@.|$ ;).?$.[)(1 2 3) eql 2", () => expect(calculation).eql(2));
			// });

			describe("mapObject (VV)OO", () => {
			/*ts
				mapObject					@
				calculation					*2@({"{a: 1, b: 2, c: 3}")
			*/
				it("@(x => x * 2, {a: 1, b: 2, c: 3})", () => expect(mapObject(x => x * 2, {a: 1, b: 2, c: 3})).eql({a: 2, b: 4, c: 6}));
				it('*2@({"{a: 1, b: 2, c: 3}") eql {a: 2, b: 4, c: 6}', () => expect(calculation).eql({a: 2, b: 4, c: 6}));
			});

			describe("replaceString ASS", () => {
			/*ts
				replace		("_" "-")@"1 _2 0 _1"
			*/
				it(`("_" "-")@"1 _2 0 _1" eql "1 -2 0 -1"`, () => expect(replace).eql("1 -2 0 -1"));
			});

			describe("indexOf VAN", () => {
			/*ts
				containsValue		2@(1 2 3)
				notContainsValue	"4"@(2 3 4)
			*/
				it("2@(1 2 3) eql 1", () => expect(containsValue).eql(1));
				it('"4"@(2 3 4) eql undefined', () => expect(notContainsValue).eql(undefined));
			});

			describe("indexOf SSN", () => {
				/*ts
					containsValue		"b"@"abc"
					notContainsValue	"b"@"cde"
				*/
					it(`"b"@"abc" eql 1`, () => expect(containsValue).eql(1));
					it(`"b"@"cde" eql undefined`, () => expect(notContainsValue).eql(undefined));
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
			describe("add NVN", () => {
			/*ts
				plusThree		+3
				calculation		3+"5"
			*/
				it("+3(4) eql 7", () => expect(plusThree(4)).eql(7));
				it(`3+"5" eql 8`, () => expect(calculation).eql(8));
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
				constNumber			3`
				constObject			(\(("a" 3) ))`
			*/
				it('3`("hello") eql 3', () => expect(constNumber("hello")).eql(3));
				it('(\(("a" 3) )`([1, 2]) eql {a: 3}', () => expect(constObject([1, 2])).eql({a: 3}));
			});
		});

		describe("[ (bracketleft)", () => {
			describe("first A? SS", () => {
			/*ts
				first                       [
			*/
				it("first([1, 2, 3]) eql 1", () => expect(first([1, 2, 3])).eql(1));
				it("first(\"abcd\") eql \"a\"", () => expect(first("abcd")).eql("a"));
			});

			describe("floor NN", () => {
			/*ts
				floor						[1.8
			*/
				it("[1.8 eql 1", () => expect(floor).eql(1));
			})
		});

		describe("] (bracketright)", () => {
			describe("last A? SS", () => {
			/*ts
				last                        ]
			*/
				it("last([1, 2, 3]) eql 3", () => expect(last([1, 2, 3])).eql(3));
				it("last(\"abcd\") eql \"d\"", () => expect(last("abcd")).eql("d"));
			});

			describe("ceiling NN", () => {
				/*ts
					ceiling					]1.2
				*/
					it("]1.2 eql 2", () => expect(ceiling).eql(2));
				})
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
			describe("round NNN", () => {
			/*ts
				pi				3'3.14196
			*/
				it("3'3.14196 eql 3.142", () => expect(pi).eql(3.142));
			});

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
				typeMismatch		2="2"
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
				it('2="2" eql false', () => expect(typeMismatch).eql(false));
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

		describe("- (minus)", () => {
			describe("subtract NNN", () => {
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

			describe("splice AAA ASS", () => {
			/*ts
				result					(1 2 3 4)-(5 6 7 8)
				noInsert				(1 2)-(5 6 7 8)
				string					(3 2 "le")-"nucular"
				noInsertString			(3 2)-"nucular"
			*/
				it("(1 2 3 4)-(5 6 7 8) eql [5, 3, 4, 8]", () => expect(result).eql([5, 3, 4, 8]));
				it("(1 2)-(5 6 7 8) eql [5, 8]", () => expect(noInsert).eql([5, 8]));
				it('(3 2 "le")-"nucular" eql "nuclear"', () => expect(string).eql("nuclear"));
				it('(3 2)-"nucular" eql "nucar"', () => expect(noInsertString).eql("nucar"));
			})
		});

		describe("/ (slash)", () => {
			describe("divide NNN", () => {
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

			describe("groupBy (VS)AO", () => {
			/*ts
				groupByFirst	[/("ann" "ben" "ade")
				groupByEmpty	[/( )
			*/
				it('[/("ann" "ben" "ade") eql {a: ["ann", "ade"], b: ["ben"]}', () => expect(groupByFirst).eql({a: ["ann", "ade"], b: ["ben"]}));
				it('[/( ) eql {}', () => expect(groupByEmpty).eql({}));
			});
		});

		describe("# (hash)", () => {
			describe("arrayLength stringLength keyLength AN SN ON", () => {
			/*ts
				length					#
				lengthOfArray			#(3 4 5 6 7)
				calculation				#"abcd"
				calculationB			#({"{a: 1, b: 2}")
			*/
				it("length([5, 6, 7, 8]) eql 4", () => expect(length([5, 6, 7, 8])).eql(4));
				it("#(3 4 5 6 7) eql [5, [N]]", () => expect([lengthOfArray, ts.typeOf(lengthOfArray)]).eql([5,  "N"]));
				it('#"abcd" eql 4', () => expect(calculation).eql(4));
				it('#({"a": 1, "b": 2}) eql 2', () => expect(calculationB).eql(2));
			});

			describe("modulus NN", () => {
			/*ts
				abs						#(_1.5)
			*/
				it("#(_1.5) eql 1.5", () => expect(abs).eql(1.5));
			});
		});

		describe("< (less)", () => {
			describe("lessThan NNB", () => {
				/*ts
					passedLessThan			2<3
					failedLessThan			3<2
				*/
					it("2<3 eql true", () => expect(passedLessThan).eql(true));
					it("3<2 eql false", () => expect(failedLessThan).eql(false));
			});

			describe("lessThanString SSB", () => {
				/*ts
					passedLessThan			"ab"<"bc"
					failedLessThan			"b"<"a"
				*/
					it('"ab"<"bc" eql true', () => expect(passedLessThan).eql(true));
					it('"b"<"a" eql false', () => expect(failedLessThan).eql(false));
				});

			describe("sort (VN)AA (VS)AA", () => {
			/*ts
				sortArray	{"Math.abs"<(_7 3 _1 4)
				sortStrings	[<("tom" "ann" "sam")
			*/
				it('{"Math.abs"<(_7 3 _1 4) eql [-1, 3, 4, -7]', () => expect(sortArray).eql([-1, 3, 4, -7]));
				it('[<("tom" "ann" "sam") eql ["ann", "sam", "tom"]', () => expect(sortStrings).eql(["ann", "sam", "tom"]));
			});
		});

		describe("> (greater)", () => {
			describe("greaterThan NNB", () => {
			/*ts
				failedGreaterThan			2>3
				passedGreaterThan			3>2
			*/
				it("2>3 eql false", () => expect(failedGreaterThan).eql(false));
				it("3>2 eql true", () => expect(passedGreaterThan).eql(true));
			});

			describe("greaterThanString SSB", () => {
			/*ts
				failedGreaterThan			"ab">"bc"
				passedGreaterThan			"b">"a"
			*/
				it('"ab">"bc" eql false', () => expect(failedGreaterThan).eql(false));
				it('"b">"a" eql true', () => expect(passedGreaterThan).eql(true));
			});

			describe("over AOO AAA", () => {
			/*ts
				applyAtIndex			((1 ) +1)>(3 5 7)
				applyAtNegativeIndex	((_2 ) *2)>
				applyAtKey				(("b" ) +" John")>
				applyAtInvalidIndex		((3 ) +1)>(0 1 2)
				applyAtInvalidKey		(("c" ) "hi"`)>
				applyAtPath				((_2 "a" 1) -2)>
				createAtPath			(("a" "b" "c") "created"`)>
			*/
				it(`(1 )>(+1)(3 5 7) eql [3, 6, 7]`, () => expect(applyAtIndex).eql([3, 6, 7]));
				it(`(_2 )>(*2)([1, 2, 3, 4, 5]) eql [1, 2, 3, 8, 5]`, () => expect(applyAtNegativeIndex([1, 2, 3, 4, 5])).eql([1, 2, 3, 8, 5]));
				it(`("b" )>(+" John")({a: "Hello", b: "Bye", c: "Welcome"}) eql {a: "Hello", b: "Bye John", c: "Welcome"}`, () => expect(applyAtKey({a: "Hello", b: "Bye", c: "Welcome"})).eql({a: "Hello", b: "Bye John", c: "Welcome"}));
				it(`(3 )>(+1)(0 1 2) eql [0, 1, 2]`, () => expect(applyAtInvalidIndex).eql([0, 1, 2]));
				it(`("c" )>("hi"\`)({a: "hello", b: "morning"}) eql {a: "hello", b: "morning", c: "hi"}`, () => expect(applyAtInvalidKey({a: "hello", b: "morning"})).eql({a: "hello", b: "morning", c: "hi"}));
				it(`(_2 "a" 1)>(-2)([1, 2, {a: [0, 1, 2]}, 3]) eql [1, 2, {a: [0, -1, 2]}, 3]`, () => expect(applyAtPath([1, 2, {a: [0, 1, 2]}, 3])).eql([1, 2, {a: [0, -1, 2]}, 3]));
				it(`(_2 "a" 1)>(-2)([0]) eql [0]`, () => expect(applyAtPath([0])).eql([0]));
				it(`("a" "b" "c")>("created"\`)({}) eql {a: {b: {c: "created"}}}`, () => expect(createAtPath({})).eql({a: {b: {c: "created"}}}));
			});

			describe("tap V(VV)V", () => {
			/*ts
				tap						"tap test">({"console.log")
			*/
				it('"tap test">({"console.log") eql "tap test"', () => expect(tap).eql("tap test"));
			});
		});

		describe("% (percent)", () => {
		/*ts
			split						%
		*/
			describe("remainder NNN", () => {
			/*ts
				remainderTwo		%2
			*/
				it("%2(3) eql 1", () => expect(remainderTwo(3)).eql(1));
			});

			describe("split NAA NSA", () => {
			/*ts
				splitTwo					2split
				splitMinusTwo				_2split
				splitZero					0split(1 2 3)
			*/
				it("2split([1, 2, 3, 4, 5]) eql [[1, 2], [3, 4, 5]]", () => expect(splitTwo([1, 2, 3, 4, 5])).eql([[1, 2], [3, 4, 5]]));
				it('2split("abcde") eql ["ab", "cde"]', () => expect(splitTwo("abcde")).eql(["ab", "cde"]));
				it("_2split([1, 2, 3, 4, 5]) eql [[1, 2, 3], [4, 5]]", () => expect(splitMinusTwo([1, 2, 3, 4, 5])).eql([[1, 2, 3], [4, 5]]));
				it('_2split("abcde") eql ["abc", "de"]', () => expect(splitMinusTwo("abcde")).eql(["abc", "de"]));
				it("0split(1 2 3) eql [[], [1, 2, 3]]", () => expect(splitZero).eql([[], [1, 2, 3]]));
			});

			describe("chunk AAA ASA", () => {
			/*ts
				threeChunk			(3 )%
				threeTwoChunk		(3 2)%
				threeTwoZeroChunk	(3 2 0)%
				initialZeroChunk	(0 2 0)%(1 2 3 4 5)
			*/
				it('(3 )%([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) eql [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9]]', () => expect(threeChunk([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).eql([[0, 1, 2], [3, 4, 5], [6, 7, 8], [9]]));
				it('(3 2)%([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) eql [[0, 1, 2], [3, 4], [5, 6, 7], [8, 9]]', () => expect(threeTwoChunk([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).eql([[0, 1, 2], [3, 4], [5, 6, 7], [8, 9]]));
				it('(3 2 0)%([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) eql [[0, 1, 2], [3, 4], [5, 6, 7, 8, 9]]', () => expect(threeTwoZeroChunk([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).eql([[0, 1, 2], [3, 4], [5, 6, 7, 8, 9]]));
				it('(3 )%"abcdefghij" eql ["abc", "def", "ghi", "j]', () => expect(threeChunk("abcdefghij")).eql(["abc", "def", "ghi", "j"]));
				it('(3 2)%"abcdefghij" eql ["abc", "de", "fgh", "ij"]', () => expect(threeTwoChunk("abcdefghij")).eql(["abc", "de", "fgh", "ij"]));
				it('(3 2 0)%"abcdefghij" eql ["abc", "de", "fgh", "ij"]', () => expect(threeTwoZeroChunk("abcdefghij")).eql(["abc", "de", "fghij"]));
				it("(0 2 0)%(1 2 3 4 5) eql [[], [1, 2], [3, 4, 5]]", () => expect(initialZeroChunk).eql([[], [1, 2], [3, 4, 5]]));
			});

			describe("chunkWithDelimiter SSA", () => {
			/*ts
				splitCsv			", "%"1, 2, 3, 4"
			*/
				it(`", "%"1, 2, 3, 4" eql ["1", "2", "3", "4"]`, () => expect(splitCsv).eql(["1", "2", "3", "4"]));
			});

			describe("chunkWhenPredicate (VB)AA (SB)SA", () => {
			/*ts
				calculationA		=2%(1 2 3 2 1)
				calculationB		="b"%"abcba"
				calculationC		=2%(2 1 3 1 2)
				calculationD		="b"%"bacab"
			*/
				it("=2%(1 2 3 2 1) eql [[1], [2, 3], [2, 1]]", () => expect(calculationA).eql([[1], [2, 3], [2, 1]]));
				it('="b"%"abcba" eql ["a", "bc", "ba"]', () => expect(calculationB).eql(["a", "bc", "ba"]));
				it("=2%(2 1 3 1 2) eql [[], [2, 1, 3, 1], [2]]", () => expect(calculationC).eql([[], [2, 1, 3, 1], [2]]));
				it('="b"%"bacab" eql ["", "baca", "b"]', () => expect(calculationD).eql(["", "baca", "b"]));
			});

			describe("chunkWhenComparator (VVB)AA (SSB)SA", () => {
			/*ts
				chunkWhenLessThan		<%
			*/
				it('<%([9, 6, 4, 8, 5, 2, 7, 4, 0, 1]) eql [[9, 6, 4], [8, 5, 2], [7, 4, 0], [1]]', () => expect(chunkWhenLessThan([9, 6, 4, 8, 5, 2, 7, 4, 0, 1])).eql([[9, 6, 4], [8, 5, 2], [7, 4, 0], [1]]));
				it('<%("jgeifcheab") eql ["jge", "ifc", "hea" "b"]', () => expect(chunkWhenLessThan("jgeifcheab")).eql(["jge", "ifc", "hea", "b"]));
			});
		});

		describe("} (braceright)", () => {
			describe("typeOf ?S", () => {
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
			describe("power NNN", () => {
			/*ts
				cube		^3
			*/
				it("^3(2) eql 8", () => expect(cube(2)).eql(8));
			});

			describe("generate (N?)NA", () => {
			/*ts
				timesTwoGenerate	*2^
			*/
				it('*2^(5) eql [0, 2, 4, 6, 8]', () => expect(timesTwoGenerate(5)).eql([0, 2, 4, 6, 8]));
			});

			describe("while AAA", () => {
			/*ts
				firstFiveNaturalNumbers	(#.<5 #.+1)^( )
				firstFiveFibonacci	(#.<5 _2%.].+$)^(1 1)
			*/
				it('(#.<5 #.+1)^( ) eql [1, 2, 3, 4, 5]', () => expect(firstFiveNaturalNumbers).eql([1, 2, 3, 4, 5]));
				it('(#.<5 _2%.].+$)^(1 1) eql [1, 1, 2, 3, 5]', () => expect(firstFiveFibonacci).eql([1, 1, 2, 3, 5]));
			});
		});

		describe("& (ampersand)", () => {
			describe("andValue VVV", () => {
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

			describe("andPredicate (VB)(VB)(VB)", () => {
			/*ts
				greaterAndLessThan				>3&(<6)
			*/
				it('>3&(<6)(4) eql true', () => expect(greaterAndLessThan(4)).eql(true));
				it('>3&(<6)(7) eql false', () => expect(greaterAndLessThan(7)).eql(false));
				it('>3&(<6)(3) eql false', () => expect(greaterAndLessThan(3)).eql(false));
			});
		})

		describe("_ (underscore)", () => {
			describe("reverse AA SS", () => {
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

		describe("! (bang)", () => {
			describe("not VB (XY)(XY) (XYZ)(XYZ)", () => {
			/*ts
				notNumber					!4
				notZero						!0
				notUndefined				!()
				notArray					!(1 2 3)
				notEmptyArray				!( )
				notString					!"hello"
				notEqual					!=
				notLessThanThree			!(<3)
				not							!
				notDivideByZero				!(1/0)
				notObject					!({"{a: 1}")
				notEmptyObject				\( ),!
			*/
				it("!4 eql false", () => expect(notNumber).eql(false));
				it('!0 eql true', () => expect(notZero).eql(false));
				it('!() eql true', () => expect(notUndefined).eql(true));
				it('!(1 2 3) eql false', () => expect(notArray).eql(false));
				it("!( ) eql true", () => expect(notEmptyArray).eql(true));
				it('!"hello" eql false', () => expect(notString).eql(false));
				it('!=(2, 3) eql true', () => expect(notEqual(2, 3)).eql(true));
				it('!=(3, 3) eql false', () => expect(notEqual(3, 3)).eql(false));
				it('!(<3)(4) eql true', () => expect(notLessThanThree(4)).eql(true));
				it('!(<3)(2) eql false', () => expect(notLessThanThree(2)).eql(false));
				it('!("hello") eql false', () => expect(not("hello")).eql(false));
				it('!(x => x)({a: 2}) eql false', () => expect(not(x => x)({a: 2})).eql(false));
				it('!(x => undefined)(3) eql true', () => expect(not(x => undefined)(3)).eql(true));
				it('!(1/0) eql true', () => expect(notDivideByZero).eql(true));
				it(`!({"{a: 1}") eql false`, () => expect(notObject).eql(false));
				it("\( ),! eql true", () => expect(notEmptyObject).eql(true));
			});
		});
	});

	// describe("logic operators", () => {
	// /*ts
	// 	//q		(:.`"")|(:.`1)
	// 	r		(:.`0)|(:.`1)
	// 	s		(:.`())|(:.`1)
	// 	t		(:.`(1/0))|(:.`1)
	// 	m		`""|(`1)
	// 	n		`0|(`1)
	// 	o		`()|(`1)
	// 	//p		`(1/0)|(`1) TODO
	// 	i		""|1
	// 	j		0|1
	// 	k		()|1
	// 	l		1/0|1
	// 	e		`0&(`1)
	// 	f		`""&(`1)
	// 	g		`()&(`1)
	// 	h		`(1/0)&(`1)
	// 	a		""&1
	// 	b		0&1
	// 	c		()&1
	// 	d		1/0&1
	// */
	// 	//it('2(:.`"")|(:.`1)3 eql ""', () => expect(q(2, 3)).eql(""));
	// 	it('`""|(`1)(1) eql ""', () => expect(m(1)).eql(""));
	// 	it("`0|(`1)(1) eql 0", () => expect(n(1)).eql(0));
	// 	it("`()|(`1)(2) eql 1", () => expect(o(2)).eql(1));
	// 	//it("`(1/0)|(`1) eql undefined", () => expect(p(1)).eql(undefined));
	// 	it('""|1 eql ""', () => expect(i).eql(""));
	// 	it("0|1 eql 0", () => expect(j).eql(0));
	// 	it("()|1 eql 1", () => expect(k).eql(1));
	// 	it("1/0|1 eql 1", () => expect(l).eql(1));
	// 	it("`0&(`1)(1) eql 1", () => expect(e(1)).eql(1));
	// 	it('`""&(`1)(1) eql 1', () => expect(f(1)).eql(1));
	// 	it("`()&(`1)(1) eql false", () => expect(g(1)).eql(false));
	// 	it("`(1/0)&(`1) eql undefined", () => expect(h).eql(undefined));
	// 	it(`""&1 eql 1`, () => expect(a).eql(1));
	// 	it("0&1 eql 1", () => expect(b).eql(1));
	// 	it("()&1 eql false", () => expect(c).eql(false));
	// 	it("1/0&1 eql undefined", () => expect(d).eql(undefined));
	// });

	// describe("undefined handling", () => {
	// /*ts
	// 	u		!()
	// 	v		!(1/0)
	// 	w		!(!())
	// 	q		((<3 `"less") `"greaterEqual")?
	// 	r		q2
	// 	s		q4
	// 	t		(1/0 1/0),(`() +2)
	// 	p		`()(1/0)
	// 	m		(1/0)|2
	// 	n		3|(1/0)
	// 	o		(1/0)|(1/0)
	// 	j		(1/0)/4
	// 	k		[/(1/0)
	// 	l		(1/0)/(1/0)
	// 	g		(1/0)+3
	// 	h		""+(1/0)
	// 	i		(1/0)+(1/0)
	// 	d		(1/0)./
	// 	e		[.(1/0)
	// 	f		(1/0).(1/0)
	// 	a		(1/0),+1
	// 	b		3,(1/0)
	// 	c		(1/0),(1/0)
	// */
	// 	it("!() eql true", () => expect(u).eql(true));
	// 	it("!(1/0) eql undefined", () => expect(v).eql(undefined));
	// 	it("!(!()) eql false", () => expect(w).eql(false));
	// 	it('((<3 `"less") `"greaterEqual")?(2) eql "less"', () => expect(r).eql("less"));
	// 	it('((<3 `"less") `"greaterEqual")?(4) eql "greaterEqual"', () => expect(s).eql("greaterEqual"));
	// 	it("(1/0 1/0),(`() +2) eql [undefined, undefined]", () => expect(t).eql([undefined, undefined]));
	// 	it("`()(1/0) eql undefined", () => expect(p).eql(undefined));
	// 	it("(1/0)|2 eql 2", () => expect(m).eql(2));
	// 	it("3|(1/0) eql 3", () => expect(n).eql(3));
	// 	it("(1/0)|(1/0) eql undefined", () => expect(o).eql(undefined));
	// 	it("(1/0)/4 eql undefined", () => expect(j).eql(undefined));
	// 	it("[/(1/0) eql undefined", () => expect(k).eql(undefined));
	// 	it("(1/0)/(1/0) eql undefined", () => expect(l).eql(undefined));
	// 	it("(1/0)+3 eql undefined", () => expect(g).eql(undefined));
	// 	it("''+(1/0) eql undefined", () => expect(h).eql(undefined));
	// 	it("(1/0)+(1/0) eql undefined", () => expect(i).eql(undefined));
	// 	it("(1/0)./ eql undefined", () => expect(d).eql(undefined));
	// 	it("[.(1/0) eql undefined", () => expect(e).eql(undefined));
	// 	it("(1/0).(1/0) eql undefined", () => expect(f).eql(undefined));
	// 	it("(1/0),+1 eql undefined", () => expect(a).eql(undefined));
	// 	it("3,(1/0) eql undefined", () => expect(b).eql(undefined));
	// 	it("(1/0),(1/0) eql undefined", () => expect(c).eql(undefined));
	// });
};