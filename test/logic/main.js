const {expect} = chai;
import ts from "tacitscript";

mocha.setup('bdd');

describe("Problems 5", () => {
	describe("", () => {
	/*ts
		leftPad			:.(.([ ].#).-$."0"`^.""$ ]).+$
		iterate			^2.""+.8leftPad.(2 4)%.1'.0+
		contains		:,([.= ;).?$
		converge		.(; ).(_1%._.contains$.! ].iterate)^.#.-1
		solution		converge@." "$
		result			solution(4100 5761)
	*/
		it("solved", () => expect(result).eql("2 4 88"));
		it(`^2.""+.8leftPad.(2 4)%.1'.0+(1891) eql 5758`, () => expect(iterate(1891)).eql(5758));
		it(".(; ).(_1%._.contains$.! ].iterate)^.#.-1(4100) eql 4", () => expect(converge(4100)).eql(4));
	});

	describe('(3 )%.(.(] 2%.[.^2@.+$.^0.5).((<$ "A"`) (>$ "O"`) "R"`)?)@." "$', () => {
	/*ts
		hyp				2%.[.^2@.+$.^0.5
		nature			.(] hyp).((<$ "A"`) (>$ "O"`) "R"`)?
		solution		(3 )%.nature@." "$
		result			solution(6 8 9
9 12 15
16 12 22)
	*/
		it("solved", () => expect(result).eql("A R O"));
	});

	describe('(2 )%.(%._.+$)$@." "$', () => {
	/*ts
		rotate			%._.+$
		solution		(2 )%.rotate$@." "$
		result			solution(3 "forwhomthebelltolls"
_6 "verycomplexnumber")
	*/
		it("solved", () => expect(result).eql("whomthebelltollsfor numberverycomplex"));
	});

	describe('(""%.(>|="a"&(<|="z")|(>|="A"&(<|="Z")))*.""$.{"x => x.toLowerCase()".(; _).((=$ "Y"`) "N"`)?)@." "$', () => {
	/*ts
		toLowerCase		{"x => x.toLowerCase()"
		isPalim			""%.(>|="a"&(<|="z")|(>|="A"&(<|="Z")))*.""$.toLowerCase.(; _).((=$ "Y"`) "N"`)?
		solution		isPalim@." "$
		result			solution("Stars"
"O, a kak Uwakov lil vo kawu kakao!"
"Some men interpret nine memos")
	*/
		it('{"x => x.toLowerCase()""AbC" eql "abc', () => expect(toLowerCase("AbC")).eql("abc"));
		it("solved", () => expect(result).eql("N Y Y"));
	});

	describe('(:.(([.[ ((.([.[.] ]).>$ .(.([.[._1% .(] )).([.[ ] [.]).+$ [.].+1)) .(.([.[ .(] )).+$ [.]))?) .(.(] ) [.]))? (( ) 0))$.(] [.(+.*113.%10000007 0)$)." "$', () => {
	/*ts
		checksum		(+.*113.%10000007 0)$
		append			.(.([.[ .(] )).+$ [.])
		swap			.(.([.[._1% .(] )).([.[ ] [.]).+$ [.].+1)
		needsSwap		.([.[.] ]).>$
		fullStep		((needsSwap swap) append)?
		step			:.(([.[ fullStep) .(.(] ) [.]))?
		pass			(step (( ) 0))$
		solution		pass.(] [.checksum)." "$
		result			solution(1 4 3 2 6 5)
	*/
		it("solved", () => expect(result).eql("3 5242536"));
	});

	describe('.(; #.+1^).~.[<.~.]." "$', () => {
	/*ts
		solution		.(; #.+1^).~.[<.~.]." "$
		result			solution(50 98 17 79)
	*/
		it("solved", () => expect(result).eql("3 1 4 2"));
	});
	
	describe('(2 )%.(:.(].+1.>.(#.) .(;` [./).(].).:(+$./2).(.$)).^(1 ).])$@." "$', () => {
	/*ts
		test			.(+ ).([.)
		testPipe		.(test ).[
		size			#.(; ).[
		intTwo			[./
		intermediate	.(;` [./).([.)
		intermediateB	.(;` [./).([.).:(+$).(.$)
		root			:.(].+1.>.(#.) .(;` [./).(].).:(+$./2).(.$)).^(1 ).]
		solution		(2 )%.root$@." "$
		result			solution(150 0
5 1
10 3)
	*/
		it(".(+ ).([.)(2)([3, 4]) eql [3]", () => expect(test(2)([3, 4])).eql([5]));
		it("#.(; ).[([1, 2, 3]) eql 3", () => expect(size([1, 2, 3])).eql(3));
		it("[./([10, 3])(2) eql 5", () => expect(intTwo([10, 3])(5)).eql(2));
		it(".(;` [./).([.).+$([10, 3])([5, 6]) eql 7", () => expect(intermediateB([10, 3])([5, 6])).eql(7));
		it(".(;` [./).([.)([10, 3])([5, 6]) eql [5, 2]", () => expect(intermediate([10, 3])([5, 6])).eql([5, 2]));
		it("10root3 eql 3.196", () => expect(root(10, 3).toFixed(3)).eql("3.196"));
		it("solved", () => expect(result).eql("1 3 3.196005081874647"));
	});

	describe(`(2 )%.((:.((:.(; ).(].!=$ ].;<.([ _.-$))^.].[)$ [ ]).([ .(.(1' ]).*$ [)./$))$.""+)@." "$`, () => {
	/*ts
		gcd				:.(; ).(].!=$ ].;<.([ _.-$))^.].[
		gdcLcm			:.(gcd$ [ ]).([ .(.(1' ]).*$ [)./$)
		solution		(2 )%.(gdcLcm$.""+)@." "$
		result			solution(2 3
4 10)
	*/
		it("2gdcLcm3 eql [1, 6]", () => expect(gdcLcm(2, 3)).eql([1, 6]));
		it("solved", () => expect(result).eql("(1 6) (2 20)"));
		it("(20 35) => 5", () => expect(gcd(20, 35)).eql(5));
	});

	describe(".((_2%.].!=$ ].(.((:.(([.[ ((.([.[.] ]).>$ .(.([.[._1% .(] )).([.[ ] [.]).+$ [.].+1)) .(.([.[ .(] )).+$ [.]))?) .(.(] ) [.]))?)` .(( )` ])) [).$$)` .(.(; 0`) )).^$.(#.-1 ].]).\" \"$", () => {
	/*ts
		append			.(.([.[ .(] )).+$ [.])
		swap			.(.([.[._1% .(] )).([.[ ] [.]).+$ [.].+1)
		needsSwap		.([.[.] ]).>$
		fullStep		((needsSwap swap) append)?
		step			:.(([.[ fullStep) .(.(] ) [.]))?
		initial			.(.(; 0`) )
		makePass		].(.(step` .(( )` ])) [).$$
		solution		.((_2%.].!=$ makePass)` initial).^$.(#.-1 ].])." "$
		result			solution(3 1 4 1 5 9 2 6)

		pass			(step (( ) 0))$
		test			solution(3 1 4 1)
		setup			(3 1 4 1).(3` initial)
		firstCheck		(_2%.=$)((3 1 4 1) )
		passOne			pass(3 1 4 1)
		thirdStep		((1 3) 1)step4
		firstFull		fullStep(((3 ) 0) 1)
		checkNeedsSwap	needsSwap(((3 ) 0) 1)
		negSplit		_1%(3 )
		firstStep		(( ) 0)step3
		secondStep		((3 ) 0)step1
		firstSwap		swap(((3 ) 0) 1)
	*/
		it("solved", () => expect(result).eql("5 8"));
		it(".(.(; 0`) )([1, 2, 3, 4]) eql [[[1, 2, 3, 4], 0]]", () => expect(initial([1, 2, 3, 4])).eql([[[1, 2, 3, 4], 0]]));
		it("(3 1 4 1).(3` .(.(; 0`) )) eql [3, [[3, 1, 4, 1], 0]]", () => expect(setup).eql([3, [[[3, 1, 4, 1], 0]]]));
		it("(_2%.=$)((3 1 4 1) ) eql false", () => expect(firstCheck).eql(false));
		it("solution(3 1 4 1) eql [2, 3]", () => expect(test).eql("3 3"));
		it("pass(3 1 4 1 5 9 2 6) eql [[1, 3, 1, 4], 2]", () => expect(passOne).eql([[1, 3, 1, 4], 2]));
		it("((1 3) 1)step4 eql [[1, 3, 4], 1]", () => expect(thirdStep).eql([[1, 3, 4], 1]));
		it("fullStep(((3 ) 0) 1) eql [[1, 3], 1]", () => expect(firstFull).eql([[1, 3], 1]));
		it("needsSwap(((3 ) 0) 1) eql true", () => expect(checkNeedsSwap).eql(true));
		it("_1%(3 ) eql [[], [3]]", () => expect(negSplit).eql([[], [3]]));
		it("swap(((3 ) 0) 1) eql [[1, 3], 1]", () => expect(firstSwap).eql([[1, 3], 1]));
		it("(( ) 0)step3 eql [[3], 0]", () => expect(firstStep).eql([[3], 0]));
		it("((3 ) 0)step1 eql ((1 3) 1)", () => expect(secondStep).eql([[1, 3], 1]));
	});
});

describe("mutual recursive language embedding", () => {
/*ts
	embed			"/*ts 1"+.+" */".{
*/
	it(`"/*ts 1"+.+" */".{("") eql 1`, () => expect(embed("")).eql(1));
})

describe("Problems 4", () => {
	describe(`"\\n"%._1%.([ .(].[.(\` ).[ [.#).^$).~.+$.""$.(" " "")@.("\\t" "")@."/*ts "+.+" */".{`, () => {
	/*ts
		interleave		"\n"%._1%.([ .(].[.(` ).[ [.#).^$).~.+$.""$
		solution		interleave.(" " "")@.("\t" "")@."/*ts "+.+" */".{
		data			"5
		+ 3
		* 7
		+ 10
		* 2
		* 3
		+ 1
		% 11"
		intermediate	interleave(data)
		result			solution(data)
	*/
		it("solved", () => expect(result).eql(1));
	});

	describe(`(8 )%.(4%._.(:(86400 3600 60 1).~.*$@.+$)@.-$.0:.(; ).(].].>0 .(].] #.-1.'(86400 3600 60 1)).(/$.[ %$))^.1%.].[@.""+)@." "$`, () => {
	/*ts
		divisors		(86400 3600 60 1)
		toSeconds		:divisors.~.*$@.+$
		fromSeconds		0:.(; ).(].].>0 .(].] #.-1.'divisors).(/$.[ %$))^.1%.].[@
		solution		(8 )%.(4%._.toSeconds@.-$.fromSeconds.""+)@." "$
		result			solution(1 0 0 0 2 3 4 5
5 3 23 22 24 4 20 45
8 4 6 47 9 11 51 13)
	*/
		it("solved", () => expect(result).eql("(1 3 4 5) (19 0 57 23) (1 7 44 26)"));
	});

	describe("(.(; ).(].!=1 ].((%2.=0 /2) *3.+1)?)^.#.-1)@", () => {
	/*ts
		collatz			.(; ).(].!=1 ].((%2.=0 /2) *3.+1)?)^
		solution		(collatz.#.-1)@
		result			solution(2 15 97)
	*/
		it("solved", () => expect(result).eql([1, 17, 118]));
	});
});

describe("toString", () => {
/*ts
	array		""+(1 _2 "string" () !() (4 5) \(("a" 7) ("b" 8)))
*/
	it(`""+(1 _2 "string" () !() (4 5) \(("a" 7) ("b" 8))) eql "(1 _2 "string" () !() (4 5) (\\(("a" 7) ("b" 8))))"`, () => expect(array).eql(`(1 _2 "string" () !() (4 5) (\\(("a" 7) ("b" 8))))`));
});

describe("Problems 3", () => {
	describe(`(4 )%.(.([ 1' .(.(] 1').-$ .(2' [).-$)./$).(] .(1' .(] [).*$).-$)." "$."("+.+")")@." "$`, () => {
	/*ts
		a			.(.(] 1').-$ .(2' [).-$)./$
		c			.(1' .(] [).*$).-$
		ac			.([ 1' a).(] c)
		solution	(4 )%.(ac." "$."("+.+")")@." "$.("_" "-")@
		result		solution(0 0 1 1
1 0 0 1)
	*/
		it("solved", () => expect(result).eql("(1 0) (-1 1)"));
	});
});

describe("apply/pipe to const", () => {
/*ts
	applyEval		2.(` ),[
	constTwo		2`
	constEval		2`3
	applyToConst	.(` ).[
	pipeToConst		[.(` ).[
*/
	it("2`(3) eql 2", () => expect(constTwo(3)).eql(2));
	it("2`3 eql 2", () => expect(constEval).eql(2));
	it(".(` ).[(4)(5) eql 4", () => expect(applyToConst(4)(5)).eql(4));
	it("2.(` ),[(3) eql 2", () => expect(applyEval(3)).eql(2));
	it("[.(` ).[([2, 3, 4])(6) eql 2", () => expect(pipeToConst([2, 3, 4])(6)).eql(2));
});

describe("Problems 2", () => {
	describe(`:,(.((:._,(.(-1.(; ) +1\`) ;).'$)\` 0\`^) ;).$$." "$`, () => {
	/*ts
		dummy			:,(.(:` 0`^) ;)
		returnPlusOne	+1`
		update			:._,(.(-1.(; ) +1`) ;).'$
		intermediateB	((update (0 0 0)) (3 2 1 2 3 1 1 1 1 3)),$$
		intermediate	(update (0 0 0))$(3 2 1 2 3 1 1 1 1 3)
		array			3,0`^
		arrayB			3.(; 0`^)
		solution		:,(.(update` 0`^) ;).$$." "$
		result			3solution(3 2 1 2 3 1 1 1 1 3)
	*/
		it("((update (0 0 0)) (3 2 1 2 3 1 1 1 1 3)).$$ eql [5, 2, 3]", () => expect(intermediateB).eql([5, 2, 3]));
		it("3.(; 0`^) eql [3, [0, 0, 0]]", () => expect(arrayB).eql([3, [0, 0, 0]]));
		it("3,0`^ eql [0, 0, 0]", () => expect(array).eql([0, 0, 0]));
		it("(:._,(.(-1.(; ) +1`) ;).'$ (0 0 0))$(3 2 1 2 3 1 1 1 1 3) eql [5, 2, 3]", () => expect(intermediate).eql([5, 2, 3]));
		it(":._,(.(-1.(; ) +1`) ;).'$([0, 0, 0], 3) eql [0, 0, 1]", () => expect(update([0, 0, 0], 3)).eql([0, 0, 1]));
		it("solved", () => expect(result).eql("5 2 3"));
	});

	describe("(+.*113.%10000007 0)$", () => {
	/*ts
		solution		(+.*113.%10000007 0)$
		result			solution(3 1 4 1 5 9)
	*/
		it("solved", () => expect(result).eql(8921379));
	});

	describe('_', () => {
	/*ts
		solution		_
		result			solution"four score and seven years ago"
	*/
		it("solved", () => expect(result).eql("oga sraey neves dna erocs ruof"));
	});

	describe('(*6.{"Math.floor".+1)@." "$', () => {
	/*ts
		solution		(*6.{"Math.floor".+1)@." "$
		result			solution(0.59558786964
0.861037873663
0.385597702116
0.246237673331
0.808033385314
0.0544673665427)
	*/
		it("solved", () => expect(result).eql("4 6 3 2 5 1"));
	});
});

describe("Tutorial tests", () => {
/*ts
	a	2+3*4
	b	(2+3)*4
	c	2+(3*4)
	d	"\"Make things as simple as possible but no simpler.\"
	- Albert Einstein"
	e	(("top"		7.5)
 ("side"	2+3))
	f	( )
	g	("alone" )
*/
	it("2+3*4 eql 20", () => expect(a).eql(20));
	it("(2+3)*4 eql 20", () => expect(b).eql(20));
	it("2+(3*4) eql 14", () => expect(c).eql(14));
	it(`"\"Make things as simple as possible but no simpler.\"
	- Albert Einstein" eql "Make things as simple as possible but no simpler."\n\t- Albert Einstein"`, () => expect(d).eql(`\"Make things as simple as possible but no simpler.\"
	- Albert Einstein`));
	it(`(("top"		7.5)
	("side"	2+3)) eql [["top", 7.5], ["side", 5]]`, () => expect(e).eql([["top", 7.5], ["side", 5]]));
	it("( ) eql []", () => expect(f).eql([]));
	it(`("alone" ) eql ["alone"]`, () => expect(g).eql(["alone"]));
});

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
			contained			=,?(1 2 3)
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
		// describe("if (VB)VA", () => {
		// /*ts
		// 	yes				<3?2
		// 	no				<3?4
		// */
		// 	it("<3?2 eql [2, undefined]", () => expect(yes).eql([2, undefined]));
		// 	it("<3?4 eql [undefined, 4]", () => expect(no).eql([undefined, 4]));
		// });

		// describe("cond AVV", () => {
		// /*ts
		// 	tens			(<10 <20)?
		// 	tensTwelve		tens12
		// */
		// 	it('(<10 <20)?(5) eql [5, undefined, undefined]', () => expect(tens(5)).eql([5, undefined, undefined]));
		// 	it('(<10 <20)?(15) eql [undefined, 15, undefined]', () => expect(tens(15)).eql([undefined, 15, undefined]));
		// 	it('(<10 <20)?(25) eql [undefined, undefined, 25]', () => expect(tens(25)).eql([undefined, undefined, 25]));
		// 	it('(<10 <20)?12 eql [undefined, 12, undefined]', () => expect(tensTwelve).eql([undefined, 12, undefined]));
		// });
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

		describe("contains VAB", () => {
		/*ts
			containsValue		2*(1 2 3)
			notContainsValue	"4"*(2 3 4)
		*/
			it("2*(1 2 3) eql true", () => expect(containsValue).eql(true));
			it('"4"*(2 3 4) eql false', () => expect(notContainsValue).eql(false));
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
			applyAtInvalidKey		(("c" ) "hi"`)'
			applyAtPath				((~2 "a" 1) -2)'
			createAtPath			(("a" "b" "c") "created"`)'
		*/
			it(`(1 )'(+1)(3 5 7) eql [3, 6, 7]`, () => expect(applyAtIndex).eql([3, 6, 7]));
			it(`(~2 )'(*2)([1, 2, 3, 4, 5]) eql [1, 2, 3, 8, 5]`, () => expect(applyAtNegativeIndex([1, 2, 3, 4, 5])).eql([1, 2, 3, 8, 5]));
			it(`("b" )'(+" John")({a: "Hello", b: "Bye", c: "Welcome"}) eql {a: "Hello", b: "Bye John", c: "Welcome"}`, () => expect(applyAtKey({a: "Hello", b: "Bye", c: "Welcome"})).eql({a: "Hello", b: "Bye John", c: "Welcome"}));
			it(`(3 )'(+1)(0 1 2) eql [0, 1, 2]`, () => expect(applyAtInvalidIndex).eql([0, 1, 2]));
			it(`("c" )'("hi"\`)({a: "hello", b: "morning"}) eql {a: "hello", b: "morning", c: "hi"}`, () => expect(applyAtInvalidKey({a: "hello", b: "morning"})).eql({a: "hello", b: "morning", c: "hi"}));
			it(`(~2 "a" 1)'(-2)([1, 2, {a: [0, 1, 2]}, 3]) eql [1, 2, {a: [0, -1, 2]}, 3]`, () => expect(applyAtPath([1, 2, {a: [0, 1, 2]}, 3])).eql([1, 2, {a: [0, -1, 2]}, 3]));
			it(`(~2 "a" 1)'(-2)([0]) eql [0]`, () => expect(applyAtPath([0])).eql([0]));
			it(`("a" "b" "c")'("created"\`)({}) eql {a: {b: {c: "created"}}}`, () => expect(createAtPath({})).eql({a: {b: {c: "created"}}}));
		});

		describe("find (VB)AV", () => {
			/*ts
				calculation				(%2.=0)?(1 2 3 4 5 6)
			*/

			it("(%2.=0)?(1 2 3 4 5 6) eql 2", () => expect(calculation).eql(2));
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

		describe("round NN", () => {
		/*ts
			round					#1.5
		*/
			it("#1.5 eql 2", () => expect(round).eql(2));
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
	});

	describe("% (percent)", () => {
	/*ts
		split						%
	*/
		describe("modulo NNN", () => {
		/*ts
			moduloTwo		%2
		*/
			it("%2(3) eql 1", () => expect(moduloTwo(3)).eql(1));
		});

		describe("split NAA NSA", () => {
		/*ts
			splitTwo					2split
			splitMinusTwo				~2split
		*/
			it("2split([1, 2, 3, 4, 5]) eql [[1, 2], [3, 4, 5]]", () => expect(splitTwo([1, 2, 3, 4, 5])).eql([[1, 2], [3, 4, 5]]));
			it('2split("abcde") eql ["ab", "cde"]', () => expect(splitTwo("abcde")).eql(["ab", "cde"]));
			it("~2split([1, 2, 3, 4, 5]) eql [[1, 2, 3], [4, 5]]", () => expect(splitMinusTwo([1, 2, 3, 4, 5])).eql([[1, 2, 3], [4, 5]]));
			it('~2split("abcde") eql ["abc", "de"]', () => expect(splitMinusTwo("abcde")).eql(["abc", "de"]));
		});

		describe("chunk AAA ASA", () => {
		/*ts
			threeChunk			(3 )%
			threeTwoChunk		(3 2)%
			threeTwoZeroChunk	(3 2 0)%
		*/
			it('(3 )%([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) eql [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9]]', () => expect(threeChunk([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).eql([[0, 1, 2], [3, 4, 5], [6, 7, 8], [9]]));
			it('(3 2)%([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) eql [[0, 1, 2], [3, 4], [5, 6, 7], [8, 9]]', () => expect(threeTwoChunk([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).eql([[0, 1, 2], [3, 4], [5, 6, 7], [8, 9]]));
			it('(3 2 0)%([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) eql [[0, 1, 2], [3, 4], [5, 6, 7, 8, 9]]', () => expect(threeTwoZeroChunk([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).eql([[0, 1, 2], [3, 4], [5, 6, 7, 8, 9]]));
			it('(3 )%"abcdefghij" eql ["abc", "def", "ghi", "j]', () => expect(threeChunk("abcdefghij")).eql(["abc", "def", "ghi", "j"]));
			it('(3 2)%"abcdefghij" eql ["abc", "de", "fgh", "ij"]', () => expect(threeTwoChunk("abcdefghij")).eql(["abc", "de", "fgh", "ij"]));
			it('(3 2 0)%"abcdefghij" eql ["abc", "de", "fgh", "ij"]', () => expect(threeTwoZeroChunk("abcdefghij")).eql(["abc", "de", "fghij"]));
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
			firstFiveFibonacci	(#.<5 ~2%.].+$)^(1 1)
		*/
			it('(#.<5 #.+1)^( ) eql [1, 2, 3, 4, 5]', () => expect(firstFiveNaturalNumbers).eql([1, 2, 3, 4, 5]));
			it('(#.<5 ~2%.].+$)^(1 1) eql [1, 1, 2, 3, 5]', () => expect(firstFiveFibonacci).eql([1, 1, 2, 3, 5]));
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
			notArray					!( )
			notString					!"hello"
			notEqual					!=
			notLessThanThree			!(<3)
			not							!
			notDivideByZero				!(1/0)
		*/
			it("!4 eql false", () => expect(notNumber).eql(false));
			it('!0 eql true', () => expect(notZero).eql(true));
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
			it('!(1/0) eql true', () => expect(notDivideByZero).eql(true));
		});
	});
});

describe("logic operations", () => {
/*ts
*/
	it("", () => {});
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

describe("operator bounds", () => {
/*ts
	equalsFunction		(1 2*)=(1 2*)
	joinFunction		", "$(1 2 3*)
	modZero				7%0
*/
	it("(1 2*)=(1 2*) eql undefined", () => expect(equalsFunction).eql(undefined));
	it(`", "$(1 2 3*) eql undefined`, () => expect(joinFunction).eql(undefined));
	it("7%0 eql undefined", () => expect(modZero).eql(undefined));
});

describe("equality checking", () => {
/*ts
	undefCheck			(1/0)=(1/0)
	deepCheck			("abc" (1 2 3))=("abc" (1 2 4))
	mixedType			"string"=4
	fnInclusion			(2* 1)=(2* 1)
*/
	it("(1/0)=(1/0) eql undefined", () => expect(undefCheck).eql(undefined));
	it(`("abc" (1 2 3))=("abc" (1 2 4)) eql false`, () => expect(deepCheck).eql(false));
	it(`"string"=4 eql false`, () => expect(mixedType).eql(false));
	it("(2* 1)=(2* 1) eql undefined", () => expect(fnInclusion).eql(undefined));
});

describe("array indexing", () => {
/*ts
	array		1'(5 6 7)
	string		1'"abc"
	zeroA		0'( )
	zeroS		0'""
	outA		3'(5 6 7)
	outS		3'"abc"
	backA		_1'(5 6 7)
	backS		_1'"abc"
	backOutA	_4'(5 6 7)
	backOutS	_4'"abc"
*/
	it("1'(5 6 7) eql 6", () => expect(array).eql(6));
	it(`1'"abc" eql "b"`, () => expect(string).eql("b"));
	it("0'( ) eql undefined", () => expect(zeroA).eql(undefined));
	it(`0'"" eql undefined`, () => expect(zeroS).eql(undefined));
	it("3'(5 6 7) eql undefined", () => expect(outA).eql(undefined));
	it(`3'"abc" eql undefined`, () => expect(outS).eql(undefined));
	it("_1'(5 6 7) eql 7", () => expect(backA).eql(7));
	it(`_1'"abc" eql "c"`, () => expect(backS).eql("c"));
	it("_4'(5 6 7) eql undefined", () => expect(backOutA).eql(undefined));
	it(`_4'"abc" eql undefined`, () => expect(backOutS).eql(undefined));
});

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

describe("Problems", () => {
	describe(`_1%._.+$.=0%.1%.].(1%.].(+$ #)./$.{"Math.round")@`, () => {
	/*ts
		avg			.(+$ #)./$
		solution	_1%._.+$.=0%.1%.].(1%.].avg.{"Math.round")@
	*/
		it("solution([2, 3, 7, 0, 20, 10, 0, 1, 0]) eql [4, 15, 1]", () => expect(solution([2, 3, 7, 0, 20, 10, 0, 1, 0])).eql([4, 15, 1]));
	});

	describe('(.((].[.>0 ].[.(/10.{"Math.floor" %10))` .(.(; 0`) )).^$.1%.]._.]@.(; .(+1` #).^$).~.*$@.+$)@', () => {
	/*ts
		digits					.((].[.>0 ].[.(/10.{"Math.floor" %10))` .(.(; 0`) )).^$.1%.]._.]@
		weightedSumOfDigits		digits.(; .(+1` #).^$).~.*$@.+$
		solution				weightedSumOfDigits@
	*/
		it('solution([9, 15, 1776]) eql [9, 11, 60]', () => expect(solution([9, 15, 1776])).eql([9, 11, 60]));
	});

	describe('(2 )%.(,(; ^2)./$.((<18.5 "under"`) (<25 "normal"`) (<30 "over"`) "obese"`)?)@', () => {
	/*ts
		category		((<18.5 "under"`) (<25 "normal"`) (<30 "over"`) "obese"`)?
		bmi				,(; ^2)./$
		solution		(2 )%.(bmi.category)@
		example			solution(80 1.73 55 1.58 49 1.91)
	*/
		it("solution(80 1.73 55 1.58 49 1.91) eql ['over', 'normal', 'under']", () => expect(example).eql(["over", "normal", "under"]));
	});

	describe('(3 )%.(;<.2%,(+$ [).((!<$ 1`) 0`)?)@', () => {
	/*ts
		isValid			;<.2%,(+$ [).((!<$ 1`) 0`)?
		solution		(3 )%.isValid@
		example			solution(3 4 5 1 2 4)
	*/
		it("solution(3 4 5 1 2 4) eql [1, 0]", () => expect(example).eql([1, 0]));
	});

	describe("(3 )%.(;<.1')@", () => {
	/*ts
		solution		(3 )%.(;<.1')@
		example			solution(7 3 5 15 20 40 300 550 137)
	*/
		it("(3 )%.(;<.1')@(7 3 5 15 20 40 300 550 137) eql [5, 20, 300]", () => expect(example).eql([5, 20, 300]));
	});

	describe("(3 )%.(1%,([.+ ,(* ;).^$).@$.+$)@", () => {
	/*ts
		sequence		1%,([.+ ,(* ;).^$).@$
		solution		(3 )%.(sequence.+$)@
		intermediateD	,(* ;)
		intermediateC	,(* ;).^$
		intermediateB	(2* 3),^$
		intermediate	(2 3),(* ;),^$
	*/
		it(",(* ;).^$(2, 3) eql [0, 2, 4]", () => expect(intermediateC([2, 3])).eql([0, 2, 4]));
		it("(2* 3)^$ eql [0, 2, 4]", () => expect(intermediate).eql([0, 2, 4]));
		it("(2 3),(* ;).^$ eql [0, 2, 4]", () => expect(intermediate).eql([0, 2, 4]));
		it("1%,(+ ,(* ;).^$).@$([5, 2, 3]) eql [5, 7, 9]", () => expect(sequence([5, 2, 3])).eql([5, 7, 9]));
		it("solution([5, 2, 3, 3, 0, 10]) eql [21, 30]", () => expect(solution([5, 2, 3, 3, 0, 10])).eql([21, 30]));
	});

	describe('(3 )%.(2%.([.*$ ]).+$.((].[.>0 ].[.(/10.{"Math.floor" %10))` .(.(; 0`) )).^$.]@.+$)@', () => {
	/*ts
		sumOfDigits		.((].[.>0 ].[.(/10.{"Math.floor" %10))` .(.(; 0`) )).^$.]@.+$
		solution		(3 )%.(2%.([.*$ ]).+$.sumOfDigits)@
	*/
		it('.((].>0 ]./10.{"Math.floor")` .(; )).^$.#(1492) eql 16', () => expect(sumOfDigits(1492)).eql(16));
		it("solution([11,9,1,14,90,232,111,15,111]) eql [1, 16, 21]", () => expect(solution([11,9,1,14,90,232,111,15,111])).eql([1, 16, 21]));
	});

	describe('"\n"%.(""%.(=@("a" "e" "i" "o" "u" "y"),|$)*.#)@', () => {
	/*ts
		isVowel		=@("a" "e" "i" "o" "u" "y"),|$
		solution	"\n"%.(""%.isVowel*.#)@
		result		solution"iorbikcgf qbh h gzpydg rmllrzctid g ensjvk
fryeietdjbibtpsmnuhsgoe    qqehovn z udcf kyucrrgylrbpm
k e fmcb kbo ldxxtioet kafcbotqlots  unnmwqyhae t
haucki sgnnu qxaifusappqveral ba fcejwwtllxsc
s bvycmvaharhmfqmzovilso f fivbwck jsggs  lczvzmvoham ozlp
plm tu dvspnmuytuutnzvuzhdohvqsmcgyihm ffizx y 
cnwbkabzdc ya rcmxgok gvxf eln  cdo dc nmbtmh
talbooo wzsred lipvyk hdvolq adjatquwsjtscmwmahqpfw 
gkh ueaujjid y zporznnlnicfjylolukxynzbijghplppbq  g
so u qczs ocs xsjucvkxh npxowdeqggssuorvv
epouhlyr qptwdltgjylylwxfaaivwxomzeoldsxaj x fs txrakpzvq
z wxnkwsmhif et upmvv tn fd bo bndydtiu 
 szf y dsdy e nkeoryhatsye cboth tsho r lxaprnywqxi
xxxeumhfncshemwy naf oagq c egmiflbhepsszlb
eecx dd ffsolojqho   obrqalpmssrwuqqgaeqfw
wzb hdhbwjjpykbvuaptxrlpel twrntqvjeywgigv mgohjoidavtpa
kvfbk z pemmkqz klslac emnahfavtv i  u ib psinyn
x    f jgb gipcfspsvkviwmvobophavpbqouy da h
u hsmfcjj ofbc xqht plhrrturnl rfvkxb  qohocrjbjwuv nf"
	*/
		it('"\\n"%.(""%.(=@("a" "e" "i" "o" "u" "y"),|$)*.#)@', () => expect(result).eql([6,14,12,12,10,11,6,12,13,8,14,7,14,10,10,12,10,9,6]));
	});

	describe('(-32./9.*5.{"Math.round")@', () => {
	/*ts
		solution	(-32./9.*5.{"Math.round")@
		result		solution(252 88 260 462 40 167 372 131 566 187 357 596 369 332 514 204 492 139 576 393 570 269 44 175 572 529 95 421 600 503 288 252 559 517 114 567 83 454)
	*/
		it('(-32./9.*5.{"Math.round")@', () => expect(result).eql([122,31,127,239,4,75,189,55,297,86,181,313,187,167,268,96,256,59,302,201,299,132,7,79,300,276,35,216,316,262,142,122,293,269,46,297,28,234]));
	});

	describe('(2 )%.(/$.{"Math.round")@', () => {
	/*ts
		solution	(2 )%.(/$.{"Math.round")@
		result		solution(5992507 247 3950322 866 3446203 4385519 14 4 7373253 370 5624298 _3125699 844559 _1690772 6877455 801 14 4 6667 1730 _3888168 _1150238 10341 1540 14425 1016 1220338 1020425 16783 896 5 2 5665515 633 15265 858 3064099 _108763 _6899092 1557793 1665442 4613709 8139 972 6009446 _4909093 50 4 7882577 _1310345 18045 1188 3 2 1012452 2143361 17667 988 3638032 523 28 8)
	*/
		it('(2 )%.(/$.{"Math.round")@', () => expect(result).eql([24261,4562,1,4,19928,-2,-0,8586,4,4,3,7,14,1,19,3,8950,18,-28,-4,0,8,-1,13,-6,15,2,0,18,6956,4]));
	});

	describe(';<.(] [)', () => {
	/*ts
		solution	;<.(] [)
		result		solution(_10632 5581 _42270 31268 77120 32680 _13419 _39979 10007 29274 _27131 _78780 36696 28024 29786 72263 41564 _53871 57484 _8013 _31163 50889 26073 _39717 _27047 _64555 _58483 _70906 35999 16182 48081 _54633 _58237 _74189 56634 _61117 38491 _36785 _21096 _31502 72489 31773 _30283 29186 _20203 79503 21449 _58639 _54368 _1067 13348 _5531 _30178 _40579 34752 22775 _25135 56268 31869 _69135 _7550 _50 _43769 14213 5761 _67134 33096 _35748 _23919 _67999 12749 _31430 43773 62465 77755 _56429 61969 19205 _35068 _72398 _61862 58279 2070 _12040 _62299 _43178 _69265 _7434 _66909 42603 3430 5541 _37446 39661 _60246 48314 52526 52850 _67434 _51393 64850 25315 _2824 28624 7781 _5068 52195 _10250 _65863 _62873 _2649 _47726 75406 79421 20234 _66892 _43756 30969 5673 _30666 _6427 _70896 54875 36126 48764 74628 4441 21290 47479 17006 49896 32329 _37678 _32927 _19046 50102 42004 _46851 _40148 56140 _29725 37203 _71585 _34318 36624 28649 _21211 72867 _20382 64462 _37799 53191 73565 _62924 9317 42329 _68295 _66242 _16380 59183 30764 _46484 11513 73085 589 72466 43188 _37407 _54385 _76960 _61266 _4110 40242 _52851 41572 _3134 55797 _59639 _10267 _44584 _75177 31934 _71393 78387 49010 17924 40717 60714 31682 _55663 39898 _17553 _22147 _28588 _24468 58441 _36122 _61280 _58965 _10507 _58240 _40231 65383 62002 _13083 26955 _21131 _37285 47316 48601 _1869 52138 536 6738 50526 _30454 _55338 11244 _49739 56344 35580 70159 _41209 _66567 _38429 14323 71874 5449 33043 _67091 74942 54803 _27323 60325 36805 39594 7281 _64326 _77691 _25403 64275 439 _53264 _15188 _72823 77262 34357 _48161 8506 64618 _71816 _35914 54777 _33026 _22481 _63651 61297 _30607 21797 14340 _17698 16739 _10857 34979 _2935 _54051 _5427 _75653 _38378 _3118 _21056 _54102 77321 5680 10709 _75501 2942 _34933 _43663 _68552 _50315 _35480 _24466 _75537 11494 33053 _59189 _7209 _77553 42608 _72868 _15252 _20652 _3726 _60272 56413 22222 14301 60759 63844)
	*/
		it(";<.(] [)", () => expect(result).eql([79503,-78780]));
	});

	describe("(3 )%.(;<.[)@", () => {
	/*ts
		solution	(3 )%.(;<.[)@
		result		solution(_5736433 _6507265 4137218 6934565 315940 4290973 _6640420 9140331 8243864 _2183497 834907 _8304631 _8474017 _360798 _7496087 _8303239 _6336871 708034 3997681 7011683 6556172 _6565027 _7931546 _3105172 _4844364 4159534 2102511 8941524 _3033595 _7028141 _7500216 1229971 _3535406 6637001 _1835463 6780533 927975 1524117 5920864 _828160 9340620 _3244229 867208 _9133397 6394972 3371121 _7436637 _9941898 _5920844 6561044 7069785 _9364672 9996016 9138238 _2469845 _4848348 3297772 9632666 _5906823 _9735822 _7395474 _3407040 1494149)
	*/
		it("(3 )%.(;<.[)@", () => expect(result).eql([-6507265,315940,-6640420,-8304631,-8474017,-8303239,3997681,-7931546,-4844364,-7028141,-7500216,-1835463,927975,-3244229,-9133397,-9941898,-5920844,-9364672,-4848348,-9735822,-7395474]));
	});


	describe("(2 )%.(;<.[)@", () => {
	/*ts
		solution	(2 )%.(;<.[)@
		result		solution(9832798 _4814536 8819877 _4120785 2761394 1311039 _3452954 2096241 _4270034 4918540 6331564 _6412346 7224917 6039577 _224011 _7868812 _454871 2454591 _8805254 4751352 1653735 1011844 4677861 6966042 _1014686 _5824679 _8838357 9153809 _6382937 3876611 1434699 _6550138 9062074 254576 _670924 1823468 _8434384 5876121 _6080291 _2704418 794661 _9748726 883235 _1980421 6290850 _9340775 150767 _4164020 3113815 1345512 _9412667 _5232450)
	*/
		it("(2 )%.(;<.[)@", () => expect(result).eql([-4814536,-4120785,1311039,-3452954,-4270034,-6412346,6039577,-7868812,-454871,-8805254,1011844,4677861,-5824679,-8838357,-6382937,-6550138,254576,-670924,-8434384,-6080291,-9748726,-1980421,-9340775,-4164020,1345512,-9412667]));
	});

	describe("%.+$@", () => {
	/*ts
		result		(992270 350010 456747 303770 248390 607460 969243 71786 369004 627666 823332 538815 83603 449626 692531 363364 718618 390143 114018 50275 954460 204997 249325 963654 304556 945257 929184 969612 355572 729079),((2 )%.+$@)
	*/
		it("(2 )%.+$@", () => expect(result).eql([1342280,760517,855850,1041029,996670,1362147,533229,1055895,1108761,164293,1159457,1212979,1249813,1898796,1084651]));
	});

	describe("+$", () => {
	/*ts
		result		+$(968 868 72 712 1022 1278 685 851 671 947 195 1181 380 465 1239 1053 1168 1206 904 925 136 1034 1284 363 416 1250 1094 1201 390 37 647 58 895 710 761 617 687 145 167 57 1083)
	*/
		it("+$", () => expect(result).eql(29822));
	});
});

describe("Rosetta Code", () => {
	describe("Strip comments from a string", () => {
	/*ts
		strip			%.[
	*/
		it('%.[("#", "hello # comment") eql "hello "', () => expect(strip("#", "hello # comment")).eql("hello "));
	});

	describe("Hash from two arrays", () => {
	/*ts
		hash				:.~
	*/
		it(":.~(['a', 'b', 'c'], [1, 2, 3]) eql [['a', 1], ['b', 2], ['c', 3]]", () => expect(hash(['a', 'b', 'c'], [1, 2, 3])).eql([['a', 1], ['b', 2], ['c', 3]]));
	});

	describe("flip tests", () => {
	/*ts
		flipDivide			~/
		flipLess			~<
		flipRight			~>
		flipMinus			~-
		flipQuestion		~?
		//flipMap				~@		cannot flip map as we can map binary
		flipInsert			~$
		flipAt				~'
		flipSplit			~%
		flipHat				~^
	*/
		it("~^(3, x => x) eql [0, 1, 2]", () => expect(flipHat(3, x => x)).eql([0, 1, 2]));
		it("~%([1, 2, 3, 4, 5], 2) eql [[1, 2], [3, 4, 5]]", () => expect(flipSplit([1, 2, 3, 4, 5], 2)).eql([[1, 2], [3, 4, 5]]));
		it("~'([1, 2, 3], 1) eql 2", () => expect(flipAt([1, 2, 3], 1)).eql(2));
		it("~$([1, 2, 3], (x, y) => x + y) eql 6", () => expect(flipInsert([1, 2, 3], (x, y) => x + y)).eql(6));
		//it("~@([1, 2, 3], x => x * 2) eql [2, 4, 6]", () => expect(flipMap([1, 2, 3], x => x * 2)).eql([2, 4, 6])); cannot flip map
		//it("~?(2, [[x => x > 3, () => 1], () => 2]) eql 1", () => expect(flipQuestion(2, [[x => x > 3, () => 1], () => 2])).eql(1));
		it("~/(2, 10) eql 5", () => expect(flipDivide(2, 10)).eql(5));
		it("~<(2, 10) eql false", () => expect(flipLess(2, 10)).eql(false));
		it("~>(2, 10) eql true", () => expect(flipRight(2, 10)).eql(true));
		it("~-(2, 10) eql 8", () => expect(flipMinus(2, 10)).eql(8));
	});
	
	describe("Factors of an integer", () => {
	/*ts
		divides				.(/ /2.{"Math.floor".+1^).@$.(%1.=0)*
		inverted			.(/ divides).@$
		factors				.(inverted .(; )).+$
	*/
		it("inverted(24) eql [1, 2, 3, 4, 6, 8, 12]", () => expect(inverted(24)).eql([1, 2, 3, 4, 6, 8, 12]));
		it('.(/ /2.{"Math.floor".-1.+1^).@$.(%1.=0)*(24) eql [24, 12, 8, 6, 4, 3, 2]', () => expect(divides(24)).eql([24, 12, 8, 6, 4, 3, 2]));
		it("factors(24) eql [1, 2, 3, 4, 6, 8, 12, 24]", () => expect(factors(24)).eql([1, 2, 3, 4, 6, 8, 12, 24]));
		it("factors(11) eql [1, 11]", () => expect(factors(11)).eql([1, 11]));
	});

	describe("Create a two-dimensional array at runtime", () => {
	/*ts
		generate			:._,(0`^.(` ).[ ;).^$
	*/
		it("generate(3, 2) eql [[0, 0], [0, 0], [0, 0]]", () => expect(generate(3, 2)).eql([[0, 0], [0, 0], [0, 0]]));
	});

	describe("Binary digits", () => {
	/*ts
		binaryDigits		.((].[.>0 ].[.(/2.{"Math.floor" %2))` .(.(; ) )).^$.1%.].]@._.("" )+.+$
	*/
		it(`binaryDigits(5) eql "101"`, () => expect(binaryDigits(5)).eql("101"));
		it(`binaryDigits(50) eql "110010"`, () => expect(binaryDigits(50)).eql("110010"));
		it(`binaryDigits(9000) eql "10001100101000"`, () => expect(binaryDigits(9000)).eql("10001100101000"));
	});
	
	describe("Zero to the zero power", () => {
	/*ts
		calculation			0^0
	*/
		it("0^0 eql 1", () => expect(calculation).eql(1));
	});

	describe("Tokenize a string", () => {
	/*ts
		tokenize			","%."."$
	*/
		it(`tokenize("Hello,How,Are,You,Today") eql "Hello.How.Are.You.Today`, () => expect(tokenize("Hello,How,Are,You,Today")).eql("Hello.How.Are.You.Today"));
	});

	describe("Substring", () => {
	/*ts
		indexOfSubstring	%.((#.=1 ()`) [.#)?
		substring			:.(.([.2%.[ ]).%$.1'
							.([.[ ]).%$.]
							.(_1` ]).%$.[
							.(.(.([.2' ]).indexOfSubstring$ [.1') ]).%$.1'
							.(.(.([.3' ]).indexOfSubstring$ [.1') ]).%$.1')
	*/
		it(`indexOfSubstring("d", "abcdefgh") eql 3`, () => expect(indexOfSubstring("d", "abcdefgh")).eql(3));
		it(`substring([2, 4, "d", "bc"], "abcdefgh") eql ["cdef", "cdefgh", "abcdefg", "defg", "bcde"]`, () => expect(substring([2, 4, "d", "bc"], "abcdefgh")).eql(["cdef", "cdefgh", "abcdefg", "defg", "bcde"]));
		it('indexOfSubstring("ab", "babababa") eql 1', () => expect(indexOfSubstring("ab", "babababa")).eql(1));
		//it('indexOfSubstring("cab", "babababa") eql undefined', () => expect(indexOfSubstring("cab", "babababa")).eql(undefined));
	});

	// describe("String matching", () => {
	// /*ts
	// 	match				:._.%$.([.#.=0 (#.=1)?,(`() .(`(!()) [.# #.>2)).|$ (].#.=0)?,(`(!()) `()).|$)
	// */
	// 	it('match("abcdef", "abc") eql [true, [true, 0, false], false]', () => expect(match("abcdef", "abc")).eql([true, [true, 0, false], false]));
	// 	it('match("bababa", "ab") eql [false, [true, 1, true], false]', () => expect(match("bababa", "ab")).eql([false, [true, 1, true], false]));
	// 	it('match("abcdef", "def") eql [false, [true, 3, false], true]', () => expect(match("abcdef", "def")).eql([false, [true, 3, false], true]));
	// });
	describe("String interpolation (included)", () => {
	/*ts
		interpolate			:,(; "X"%).$$
	*/
		it(`:,(; "X"%).$$("little", "Mary had a X lamb") eql "Mary had a little lamb"`, () => expect(interpolate("little", "Mary had a X lamb")).eql("Mary had a little lamb"));
	});

	describe("Split a character string based on change of character", () => {
	/*ts
		split				!=%.", "$
	*/
		it(`!=%.", "$("gHHH5YY++///\\") eql "g, HHH, 5, YY, ++, ///, \\"`, () => expect(split("gHHH5YY++///\\")).eql("g, HHH, 5, YY, ++, ///, \\"));
	});

	describe("RPG attributes generator", () => {
	/*ts
		generate			.(({"Math.random".*6.{"Math.floor".+1)` 4`).^$
		sumLargest			generate.;<.1%.].+$
		getSet				.(sumLargest` 6`).^$
		isSetValid			.(+$.>75 ((>15 1`) 0`)?@.+$.>2).&$
		finalSet			(].!isSetValid getSet)^((1 ) ),]
	*/
		it(`${JSON.stringify(finalSet)}: six numbers are generated`, () => expect(finalSet.length).eql(6));
		it(`${JSON.stringify(finalSet)}: the sum of the numbers is greater than 75`, () => expect(reduce((acc, x) => acc + x)(0)(finalSet) > 75).eql(true));
		it(`${JSON.stringify(finalSet)}: at least two of the numbers are greater than 15`, () => expect(reduce((acc, x) => (x > 15) ? (acc + 1) : acc)(0)(finalSet) > 2).eql(true));
	});

	describe("Nth root", () => {
	/*ts
		intermediate		:.(,(~^,(#.) >).(.$) #`).^( ).#
		floorInteger		.(,(~^,(#.) >).(.$) #`).^( ).#.-1
		nthRoot				:.(floorInteger [).([ .([ .(] ,(; -1).^$).*$)./$).+$
	*/
		it(":.(.(,(~^,(#.) >).(.$) #`).^( ).#.-1 [).([ .([ .(] ,(; -1).^$).*$)./$).+$(5, 34) eql 2.025", () => expect(nthRoot(5, 34)).eql(2.025));
		it(":.(,(~^,(#.) >).(.$) #`).^( ).#(5, 34) eql 3", () => expect(intermediate(5, 34)).eql(3));
	});

	describe("Loops/While", () => {
	/*ts
		calculation			(].>0 ]./2.{"Math.floor")^(1024 )
	*/
		it(`(].>0 ]./2.{"Math.floor")^(1024 ) eql [1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0]`, () => expect(calculation).eql([1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0]));
	});

	describe("Loops/For", () => {
	/*ts
		calculation			(+1."*"`^.""$)^5
	*/
		it('(+1."*"`^.""$)^5 eql ["*", "**", "***", "****", "*****"]', () => expect(calculation).eql(["*", "**", "***", "****", "*****"]));
	});

	describe("Loops/Downward for", () => {
	/*ts
		calculation			(].!=0 ].-1)^(10 )
	*/
		it("(].!=0 ].-1)^(10 ) eql [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]", () => expect(calculation).eql([10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]));
	});

	describe("Loops/Do-while", () => {
	/*ts
		calculation			((].%6.!=0)|(#.=1) ].+1)^(0 )
	*/
		it("((].%6.!=0)|(#.=1) ].+1)^(0 ) eql [0, 1, 2, 3, 4, 5, 6]", () => expect(calculation).eql([0, 1 ,2 ,3 ,4 ,5 ,6]));
	});

	describe("Logical operations", () => {
	/*ts
		logical				:.(&$ |$ [.!)
		calculation			!()logical()
	*/
		it("!()(:.(&$ |$ [.!))() eql [false, true, false]", () => expect(calculation).eql([false, true, false]));
	});

	describe("Integer comparison", () => {
	/*ts
		comparison			((<$ "less"`) (=$ "equal"`) "greater"`)?
		calculation			comparison@((1 2) (2 2) (2 1))
	*/
		it('((<$ "less"`) (=$ "equal"`) "greater"`)?@((1 2) (2 2) (2 1)) eql ["less", "equal", "greater"]', () => expect(calculation).eql(["less", "equal", "greater"]));
	});

	describe("Increment a numerical string", () => {
	/*ts
		increment			0+.+1.""+
		calculation			increment"22.5"
	*/
		it(`(0+.+1.""+)"22.5" eql "23.5"`, () => expect(calculation).eql("23.5"));
	});

	describe("Formatted numeric output", () => {
	/*ts
		fixed				:,(; ""+.(; #)).(.([ ].]).-$.0`^.""$ ].[).+$
		calculation			9fixed7.125
		fixedB				:.([._ ,(0`^.""$ ""+).+$).%$.]
	*/
		it('9(:,(; ""+.(; #)).(.([ ].]).-$.0`^.""$ ].[).+$)7.125 eql "00007.125"', () => expect(calculation).eql("00007.125"));
		it(':.([._ ,(0`^.""$ ""+).+$).%$.](9, 7.125) eql "00007.125"', () => expect(fixedB(9, 7.125)).eql("00007.125"));
	});

	describe("FizzBuzz", () => {
	/*ts
		fizzBuzz			+1^100,(((%3.=0)&(%5.=0) "FizzBuzz"`) (%3.=0 "Fizz"`) (%5.=0 "Buzz"`) ;)?@
	*/
		it('+1^100,((%3.=0)&(%5.=0) "FizzBuzz"`) (%3.=0 "Fizz"`) (%5.=0 "Buzz"`) ;)?@ eql [1,2,"Fizz",4,"Buzz","Fizz",7,8,"Fizz","Buzz",11,"Fizz",13,14,"FizzBuzz",16,17,"Fizz",19,"Buzz","Fizz",22,23,"Fizz","Buzz",26,"Fizz",28,29,"FizzBuzz",31,32,"Fizz",34,"Buzz","Fizz",37,38,"Fizz","Buzz",41,"Fizz",43,44,"FizzBuzz",46,47,"Fizz",49,"Buzz","Fizz",52,53,"Fizz","Buzz",56,"Fizz",58,59,"FizzBuzz",61,62,"Fizz",64,"Buzz","Fizz",67,68,"Fizz","Buzz",71,"Fizz",73,74,"FizzBuzz",76,77,"Fizz",79,"Buzz","Fizz",82,83,"Fizz","Buzz",86,"Fizz",88,89,"FizzBuzz",91,92,"Fizz",94,"Buzz","Fizz",97,98,"Fizz","Buzz"]',
			() => expect(fizzBuzz).eql([1,2,"Fizz",4,"Buzz","Fizz",7,8,"Fizz","Buzz",11,"Fizz",13,14,"FizzBuzz",16,17,"Fizz",19,"Buzz","Fizz",22,23,"Fizz","Buzz",26,"Fizz",28,29,"FizzBuzz",31,32,"Fizz",34,"Buzz","Fizz",37,38,"Fizz","Buzz",41,"Fizz",43,44,"FizzBuzz",46,47,"Fizz",49,"Buzz","Fizz",52,53,"Fizz","Buzz",56,"Fizz",58,59,"FizzBuzz",61,62,"Fizz",64,"Buzz","Fizz",67,68,"Fizz","Buzz",71,"Fizz",73,74,"FizzBuzz",76,77,"Fizz",79,"Buzz","Fizz",82,83,"Fizz","Buzz",86,"Fizz",88,89,"FizzBuzz",91,92,"Fizz",94,"Buzz","Fizz",97,98,"Fizz","Buzz"]));
	});

	describe("Arithmetic/Integer", () => {
	/*ts
		fn					:.(+$ -$ *$ /$.({"Math.floor") %$ ^$)
		calculation			3fn2
	*/
		it(`3(:.(+$ -$ *$ /$.({"Math.floor") %$ ^$))2 eql [5, 1, 6, 1, 1, 9]`, () => expect(calculation).eql([5, 1, 6, 1, 1, 9]));
	});
});

describe("Underscore", () => {
	// describe("intersection _1%,(~?@.&$ [),(=, ;).*$", () => {
	// /*ts
	// 	intermediateF		((1 2 3) (2 3 4)),~?@
	// 	intermediateL		&$
	// 	intermediateJ		&$(<2 <3 <4)
	// 	intermediateI		<2&(>0)
	// 	intermediateE		((1 2 3) (2 3 4)),(~?@.&$),(=,)
	// 	intermediateH		((1 2 3) (2 3 4)),~?@,&$
	// 	intermediateG		(2 3 4),~?
	// 	intermediateD		=,?(1 2 3)
	// 	intermediateC		=2?(1 2 3)
	// 	intermediateB		(=,?(1 2 3))*(2 3 4 5)
	// 	intermediateA		_1%((1 2 3) (101 2 1 10) (2 1))
	// 	intersection		_1%,(~?@.&$ [),(=, ;).*$
	// 	calculation			intersection((1 2 3) (101 2 1 10) (2 1))
	// */

	// 	it("((1 2 3) (2 3 4)),~?@,&$,(=,)(2) eql 2", () => expect(intermediateE(2)).eql(2));
	// 	it("((1 2 3) (2 3 4)),~?@,&$(x => x === 2) eql 2", () => expect(intermediateH(x => x === 2)).eql(2));
	// 	it("((1 2 3) (2 3 4)),~?@[1](x => x === 2) eql 2", () => expect(intermediateF[1](x => x === 2)).eql(2));
	// 	it("(2 3 4),~?(x => x === 2) eql 2", () => expect(intermediateG(x => x === 2)).eql(2));
	// 	it("=,?(1 2 3)(2) eql 2", () => expect(intermediateD(2)).eql(2));
	// 	it("=2?(1 2 3) eql 2", () => expect(intermediateC).eql(2));
	// 	it("(=,?(1 2 3))*(2 3 4 5) eql [2, 3]", () => expect(intermediateB).eql([2, 3]));
	// 	it("_1%((1 2 3) (101 2 1 10) (2 1)) eql [[[1, 2, 3], [101, 2, 1, 10]], [[2, 1]]]", () => expect(intermediateA).eql([[[1, 2, 3], [101, 2, 1, 10]], [[2, 1]]]));
	// 	it("intersection([[1, 2, 3], [101, 2, 1, 10], [2, 1]]) eql [2, 1]", () => expect(intersection([[1, 2, 3], [101, 2, 1, 10], [2, 1]])).eql([2, 1]));
	// 	it("intersection((1 2 3) (101 2 1 10) (2 1)) eql [2, 1]", () => expect(calculation).eql([2, 1]));
	// });

	describe("has '.!.!", () => {
	/*ts
		has					'.((; !()`) ()`)?
		calculation			"b"has({"{a: 1, b: 2, c: 3}")
	*/
		it(`"b"has({"{a: 1, b: 2, c: 3}") eql true`, () => expect(calculation).eql(true));
		it(`has("b", {a: 1, b: 2, c: 3}) eql true`, () => expect(has("b", {a: 1, b: 2, c: 3})).eql(true));
	});

	describe("defaults +", () => {
	/*ts
		defaults			+
		calculation			{"{flavor: 'vanilla', sprinkles: 'lots'}"defaults({"{flavor: 'chocolate'}")
	*/
		it(`defaults({flavor: 'vanilla', sprinkles: 'lots'}, {flavor: 'chocolate'}) eql {flavor: "chocolate", sprinkles: "lots"}`, () => expect(defaults({flavor: 'vanilla', sprinkles: 'lots'}, {flavor: 'chocolate'})).eql({flavor: "chocolate", sprinkles: "lots"}));
		it(`{"{flavor: 'vanilla', sprinkles: 'lots'}"defaults({"{flavor: 'chocolate'}") eql {flavor: "chocolate", sprinkles: "lots"}`, () => expect(calculation).eql({flavor: "chocolate", sprinkles: "lots"}));
	});

	describe("omit -", () => {
	/*ts
		omit				-
		calculation			("userid" )omit({"{name: 'moe', age: 50, userid: 'moe1'}")
	*/
		it(`omit(["userid"], {name: 'moe', age: 50, userid: 'moe1'}) eql {name: 'moe', age: 50}`, () => expect(omit(["userid"], {name: 'moe', age: 50, userid: 'moe1'})).eql({name: 'moe', age: 50}));
		it(`("userid" )omit({"{name: 'moe', age: 50, userid: 'moe1'}") eql {name: 'moe', age: 50}`, () => expect(calculation).eql({name: 'moe', age: 50}));
	});

	describe("pick *", () => {
	/*ts
		pick				*
		calculation			("name" "age")pick({"{name: 'moe', age: 50, userid: 'moe1'}")
	*/
		it(`pick(["name", "age"], {name: 'moe', age: 50, userid: 'moe1'}) eql {name: 'moe', age: 50}`, () => expect(pick(["name", "age"], {name: 'moe', age: 50, userid: 'moe1'})).eql({name: 'moe', age: 50}));
		it(`("name" "age")pick({"{name: 'moe', age: 50, userid: 'moe1'}") eql {name: 'moe', age: 50}`, () => expect(calculation).eql({name: 'moe', age: 50}));
	});

	describe("extend +$", () => {
	/*ts
		extend				+$
		calculation			extend({"{name: \"moe\"}" {"{age: 50}")
	*/
		it(`extend({"{name: \"moe\"}" {"{age: 50}") eql {name: "moe", age: 50}`, () => expect(calculation).eql({name: "moe", age: 50}));
		it(`extend([{name: "moe"}, {age: 50}]) eql {name: "moe", age: 50}`, () => expect(extend([{name: "moe"}, {age: 50}])).eql({name: "moe", age: 50}));
	});

	describe("invert \\._@.\\", () => {
	/*ts
		invert				\._@.\
		calculation			invert({"{Moe: 'Moses', Larry: 'Louis', Curly: 'Jerome'}")
	*/
		it(`invert({Moe: 'Moses', Larry: 'Louis', Curly: 'Jerome'}) eql {Moses: "Moe", Louis: "Larry", Jerome: "Curly"}`, () => expect(invert({Moe: 'Moses', Larry: 'Louis', Curly: 'Jerome'})).eql({Moses: "Moe", Louis: "Larry", Jerome: "Curly"}));
		it(`invert({"{Moe: 'Moses', Larry: 'Louis', Curly: 'Jerome'}") eql {Moses: "Moe", Louis: "Larry", Jerome: "Curly"}`, () => expect(calculation).eql({Moses: "Moe", Louis: "Larry", Jerome: "Curly"}));
	});

	describe("pairs \\", () => {
	/*ts
		pairs				\
		calculation			pairs({"{one: 1, two: 2, three: 3}")
	*/
		it("pairs({one: 1, two: 2, three: 3}) eql [['one', 1], ['two', 2], ['three', 3]]", () => expect(pairs({one: 1, two: 2, three: 3})).eql([['one', 1], ['two', 2], ['three', 3]]));
		it(`pairs({"{one: 1, two: 2, three: 3}") eql [['one', 1], ['two', 2], ['three', 3]]`, () => expect(calculation).eql([['one', 1], ['two', 2], ['three', 3]]));
	});

	describe("mapObject @", () => {
	/*ts
		mapObject			@
		calculation			+5mapObject({"{start: 5, end: 12}")
	*/
		it("mapObject(x => x + 5, {start: 5, end: 12}) eql {start: 10, end: 17}", () => expect(mapObject(x => x + 5, {start: 5, end: 12})).eql({start: 10, end: 17}));
		it(`+5mapObject({"{start: 5, end: 12}") eql {start: 10, end: 17}`, () => expect(calculation).eql({start: 10, end: 17}));
	});

	describe("values \\.]@", () => {
	/*ts
		values				\.]@
		calculation			values({"{one: 1, two: 2, three: 3}")
	*/
		it("values({one: 1, two: 2, three: 3}) eql [1, 2, 3]", () => expect(values({one: 1, two: 2, three: 3})).eql([1, 2, 3]));
		it(`values({"{one: 1, two: 2, three: 3}") eql [1, 2, 3]`, () => expect(calculation).eql([1, 2, 3]));
	});

	describe("keys \\.[@", () => {
	/*ts
		keys				\.[@
		calculation			keys({"{one: 1, two: 2, three: 3}")
	*/
		it("keys({one: 1, two: 2, three: 3}) eql ['one', 'two', 'three']", () => expect(keys({one: 1, two: 2, three: 3})).eql(["one", "two", "three"]));
		it(`keys({"{one: 1, two: 2, three: 3}") eql ['one', 'two', 'three']`, () => expect(calculation).eql(["one", "two", "three"]));
	});

	describe("compose _.(.$)", () => {
	/*ts
		compose				_.(.$)
		calculation			compose(+1 *2)3
	*/
		it("compose([x => x + 1, x => x * 2])(3) eql 7", () => expect(compose([x => x + 1, x => x * 2])(3)).eql(7));
		it("compose(+1 *2)3 eql 7", () => expect(calculation).eql(7));
	});

	describe("negate !", () => {
	/*ts
		negate				!
		calculation			negate(%2.=0)?(0 1 2 3)
	*/
		it("negate(%2.=0)?(0 1 2 3) eql 1", () => expect(calculation).eql(1));
	});

	describe(`range (}.="N" #.=2)?,(;^ .([.+ _.-$).^$ .(.(].* [.+).(.$) .(.(1' [).-$ ])./$).^$).|$`, () => {
	/*ts
		rangeStop			;^
		rangeLimits			.([.+ _.-$).^$
		rangeStep			.(.(].* [.+).(.$) .(.(1' [).-$ ])./$).^$
		range				((}.="N" rangeStop) (#.=2 rangeLimits) rangeStep)?
	*/
		it("range(0) eql []", () => expect(range(0)).eql([]));
		it("range([0, -10, -1) eql [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]", () => expect(range([0, -10, -1])).eql([0, -1, -2, -3, -4, -5, -6, -7, -8, -9]));
		it("range([0, 30, 5]) eql [0, 5, 10, 15, 20, 25]", () => expect(range([0, 30, 5])).eql([0, 5, 10, 15, 20, 25]));
		it("range([1, 11]) eql [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]", () => expect(range([1, 11])).eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
		it("range(10) eql [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]", () => expect(range(10)).eql([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
		it(";^(4) eql [0, 1, 2, 3]", () => expect(rangeStop(4)).eql([0, 1, 2, 3]));
		it(".([.+ _.-$).^$([1, 4]) eql [1, 2, 3]", () => expect(rangeLimits([1, 4])).eql([1, 2, 3]));
		it(".(.(].* [.+).(.$) .(.(1' [).-$ ])./$).^$([10, 25, 5]) eql [10, 15, 20]", () => expect(rangeStep([10, 25, 5])).eql([10, 15, 20]));
	});

	describe("findLastIndex :.(%$ ].#).(([.#.=1 ()`) .(] [.].#).-$)?", () => {
	/*ts
		findLastIndex		:.(%$ ].#).(([.#.=1 ()`) .(] [.].#).-$)?
		calculation			(%2.=1)findLastIndex(1 2 3 4)
	*/
		//it("findLastIndex(x => (x % 2) === 1, [2, 4]) eql undefined", () => expect(findLastIndex(x => (x % 2) === 1, [2, 4])).eql(undefined));
		it("findLastIndex(x => (x % 2) === 1, [1, 2, 3, 4]) eql 2", () => expect(findLastIndex(x => (x % 2) === 1, [1, 2, 3, 4])).eql(2));
		it("(%2.=1)findLastIndex(1 2 3 4) eql 2", () => expect(calculation).eql(2));
	});

	describe("findIndex :.(%$.[.# ].#).((=$ ()`) [)?", () => {
	/*ts
		findIndex			:.(%$.[.# ].#).((=$ ()`) [)?
		calculation			(%2.=0)findIndex(1 2 3 4)
	*/
		//it("findIndex(x => (x % 2) === 0, [1, 5, 3]) eql undefined", () => expect(findIndex(x => (x % 2) === 0, [1, 3, 5])).eql(undefined));
		it("findIndex(x => (x % 2) === 0, [1, 2, 3, 4]) eql 1", () => expect(findIndex(x => (x % 2) === 0, [1, 2, 3, 4])).eql(1));
		it("(%2.=0)findIndex(1 2 3 4) eql 1", () => expect(calculation).eql(1));
	});

	// describe("sortedIndex :,(.(>.(].).(?,([.+1 [).|$).(:.) `0) ;).$$", () => {
	// /*ts
	// 	intermediateE		>,(].).(?,([.+1 [).|$).(:.)
	// 	intermediateF		>,(].).?.(:.)
	// 	intermediateD		>,(:.].)
	// 	intermediateC		35>,([.)
	// 	intermediateB		35>,(:.[.)
	// 	sortedIndex			:,(.(.(.(>,(].) `([.+1)) `[).?.(:.) `0) ;).$$
	// 	calculation			35sortedIndex(10 20 30 40 50)
	// */
	// 	it(">,(].).(?,([.+1 ].[).|$).(:.)(35)(2, 30) eql 3", () => expect(intermediateE(35)(2, 30)).eql(3));
	// 	it(">,(].).?.(:.)(35)(2, 30) eql [[2, 30], undefined]", () => expect(intermediateF(35)(2, 30)).eql([[2, 30], undefined]));
	// 	it("(>,(:.].))(35)(2, 40) eql false", () => expect(intermediateD(35)(2, 40)).eql(false));
	// 	it("(>,(:.].))(35)(2, 30) eql true", () => expect(intermediateD(35)(2, 30)).eql(true));
	// 	it("35>,([.)([20, 50]) eql true", () => expect(intermediateC([20, 50])).eql(true));
	// 	it("35>,(:.[.)(20, 50) eql true", () => expect(intermediateB(20, 50)).eql(true));
	// 	it("sortedIndex(35, [10, 20, 30, 40, 50]) eql 3", () => expect(sortedIndex(35, [10, 20, 30, 40, 50])).eql(3));
	// 	it("35sortedIndex(10 20 30 40 50) eql 3", () => expect(calculation).eql(3));
	// });

	describe("lastIndexOf :,(= ;).%$._1%.([.#.=0)?,(()` [.+$.#).|$", () => {
	/*ts
		intermediate		_1%((1 2 3) )
		lastIndexOf			:,(= ;).%$._1%.(([.#.=0 ()`) [.+$.#)?
		calculation			2lastIndexOf(1 2 3 1 2 3)
	*/
		it("_1%((1 2 3) ) eql [[], [[1, 2, 3]]]", () => expect(intermediate).eql([[], [[1, 2, 3]]]));
		it("lastIndexOf(2, [1, 2, 3, 1, 2, 3]) eql 4", () => expect(lastIndexOf(2, [1, 2, 3, 1, 2, 3])).eql(4));
		it("2lastIndexOf(1 2 3 1 2 3) eql 4", () => expect(calculation).eql(4));
		it("lastIndexOf(1, [1, 2, 3, 4, 2, 3]) eql 0", () => expect(lastIndexOf(1, [1, 2, 3, 4, 2, 3])).eql(0));
		it("lastIndexOf(3, [1, 2, 3, 4, 2, 3]) eql 5", () => expect(lastIndexOf(3, [1, 2, 3, 4, 2, 3])).eql(5));
		//it("lastIndexOf(5, [1, 2, 3, 4, 2, 3]) eql undefined", () => expect(lastIndexOf(5, [1, 2, 3, 4, 2, 3])).eql(undefined));
	});

	describe("indexOf :.(].#.= ,(= ;).%$.[.#).?$,(()` ;).|$", () => {
	/*ts
		indexOf				:.(.(.(].#.= (()`)`) ;`) ,(= ;).%$.[.#).?$
		calculation			2indexOf(1 2 3)
		calculationB		4indexOf(1 2 3)
	*/
		it("indexOf(2, [1, 2, 3]) eql 1", () => expect(indexOf(2, [1, 2, 3])).eql(1));
		it("2indexOf(1 2 3) eql 1", () => expect(calculation).eql(1));
		//it("indexOf(4, [1, 2, 3]) eql undefined", () => expect(indexOf(4, [1, 2, 3])).eql(undefined));
		//it("4indexOf(1 2 3) eql undefined", () => expect(calculationB).eql(undefined));
	});

	describe("chunk :,(.(; ) ;).%$", () => {
	/*ts
		chunk				:,(.(; ) ;).%$
		calculation			2chunk("Tyrone" "Elie" "Aidan" "Sam" "Katrina" "Billie" "Little Timmy")
	*/
		it(`chunk(2, ["Tyrone", "Elie", "Aidan", "Sam", "Katrina", "Billie", "Little Timmy"]) eql [["Tyrone", "Elie"], ["Aidan", "Sam"], ["Katrina", "Billie"], ["Little Timmy"]]`,
			() => expect(chunk(2, ["Tyrone", "Elie", "Aidan", "Sam", "Katrina", "Billie", "Little Timmy"])).eql([["Tyrone", "Elie"], ["Aidan", "Sam"], ["Katrina", "Billie"], ["Little Timmy"]]));
		it(`2chunk("Tyrone" "Elie" "Aidan" "Sam" "Katrina" "Billie" "Little Timmy") eql [["Tyrone", "Elie"], ["Aidan", "Sam"], ["Katrina", "Billie"], ["Little Timmy"]]`,
			() => expect(calculation).eql([["Tyrone", "Elie"], ["Aidan", "Sam"], ["Katrina", "Billie"], ["Little Timmy"]]));
	});

	describe("object \\", () => {
	/*ts
		object				\
		calculation			object(("moe" 30) ("larry" 40) ("curly" 50))
	*/
		it("object([['moe', 30], ['larry', 40], ['curly', 50]]) eql {moe: 30, larry: 40, curly: 50}", () => expect(object([['moe', 30], ['larry', 40], ['curly', 50]])).eql({moe: 30, larry: 40, curly: 50}));
		it(`object(("moe" 30) ("larry", 40) ("curly" 50)) eql {moe: 30, larry: 40, curly: 50}`, () => expect(calculation).eql({moe: 30, larry: 40, curly: 50}));
	});

	describe("zip unzip ~", () => {
	/*ts
		zip					~
		calculation			~(("moe" "larry" "curly") (30 40 50) (!() () ()))
	*/
		it("zip([['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]]) eql [['moe', 30, true], ['larry', 40, false], ['curly', 50, false]]",
			() => expect(zip([['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]])).eql([['moe', 30, true], ['larry', 40, false], ['curly', 50, false]]));
		it(`~(("moe" "larry" "curly") (30 40 50) (!() () ())) eql [['moe', 30, true], ['larry', 40, false], ['curly', 50, false]]`,
			() => expect(calculation).eql([['moe', 30, true], ['larry', 40, false], ['curly', 50, false]]));
	});

	describe("uniq (:.([ .([.(#.=0)?,(((!())`)` !=@.&$).|$ .(] )).*$).+$ ( ))$", () => {
	/*ts
		intermediateA		((#.=0 ((!())`)`) !=@.&$)?
		uniq				(:.([ .([.intermediateA .(] )).*$).+$ ( ))$
		calculation			uniq(1 2 1 4 1 3)
	*/
		it("!=@.&$([])(3) eql true", () => expect(intermediateA([])(3)).eql(true));
		it("!=@.&$([2, 4])(3) eql true", () => expect(intermediateA([2, 4])(3)).eql(true));
		it("!=@.&$([2, 4])(4) eql false", () => expect(intermediateA([2, 4])(4)).eql(false));
		it("uniq([1, 2, 1, 4, 1, 3]) eql [1, 2, 4, 3]", () => expect(uniq([1, 2, 1, 4, 1, 3])).eql([1, 2, 4, 3]));
		it("uniq(1 2 1 4 1 3) eql [1, 2, 4, 3]", () => expect(calculation).eql([1, 2, 4, 3]));
	});

	describe("difference :._,(+$.;/.\\.(1 0)'@.!=@.&$ ;).*$", () => {
	/*ts
		difference			:._,(+$.;/.\.(1 0)'@.!=@.&$ ;).*$
		intermediateA		:._,(+$.;/.\.(1 0)'@ ;)
		intermediateB		:._,(+$.;/ ;)
		intermediateC		:._,(+$ ;)
		intermediateD		:._
		calculation			(1 2 3 4 5)difference((5 2 10) )
	*/
		it("(1 2 3 4 5)difference((5 2 10) ) eql [1, 3, 4]", () => expect(calculation).eql([1, 3, 4]));
		it(":._([1, 2, 3, 4, 5], [[5, 2, 10]]) eql [[[5, 2, 10]], [1, 2, 3, 4, 5]]", () => expect(intermediateD([1, 2, 3, 4, 5], [[5, 2, 10]])).eql([[[5, 2, 10]], [1, 2, 3, 4, 5]]));
		it(":._,(+$ ;)([1, 2, 3, 4, 5], [[5, 2, 10]]) eql [[5, 2, 10], [1, 2, 3, 4, 5]]", () => expect(intermediateC([1, 2, 3, 4, 5], [[5, 2, 10]])).eql([[5, 2, 10], [1, 2, 3, 4, 5]]));
		it(":._,(+$.;/.\ ;)([1, 2, 3, 4, 5], [[5, 2, 10]]) eql [{5: [5], 2: [2], 10: [10]}, [1, 2, 3, 4, 5]]", () => expect(intermediateB([1, 2, 3, 4, 5], [[5, 2, 10]])).eql([{5: [5], 2: [2], 10: [10]}, [1, 2, 3, 4, 5]]));
		it(":._,(+$.;/.\.(1 0)'@ ;)([1, 2, 3, 4, 5], [[5, 2, 10]]) eql [[5, 2, 10], [1, 2, 3, 4, 5]]", () => expect(intermediateA([1, 2, 3, 4, 5], [[5, 2, 10]])).eql([[2, 5, 10], [1, 2, 3, 4, 5]]));
		it("difference([1, 2, 3, 4, 5], [[5, 2, 10]]) eql [1, 3, 4]", () => expect(difference([1, 2, 3, 4, 5], [[5, 2, 10]])).eql([1, 3, 4]));
	});

	/*ts
		leftPad				:.(.([ ].#).-$."0"`^.""$ ]).+$
	*/

	describe('leftPad :.(.([ ].#).-$."0"`^.""$ ]).+$', () => {
	/*ts
		calculation			6leftPad"123"
	*/

		it("leftPad(6, '123') eql '000123'", () => expect(leftPad(6, "123")).eql("000123"));
		it('6leftPad"123" eql "000123"', () => expect(calculation).eql("000123"));
	});

	describe(`union +$.(""+.6leftPad)/.\\.(1 0)'@`, () => {
	/*ts
		union				+$.(""+.6leftPad)/.\.(1 0)'@
		calculation			union((1 2 3) (101 2 1 10) (2 1))
	*/

		it("union([[1, 2, 3], [101, 2, 1, 10], [2, 1]]) eql [1, 2, 3, 101, 10]", () => expect(union([[1, 2, 3], [101, 2, 1, 10], [2, 1]])).eql([1, 2, 3, 101, 10]));
		it("union((1 2 3) (101 2 1 10) (2 1)) eql [1, 2, 3, 101, 10]", () => expect(calculation).eql([1, 2, 3, 101, 10]));
	});

	describe("without :,(!=@.&$ ;).*$", () => {
	/*ts
		intermediateF		!=$
		intermediateE		!=@
		intermediateD		(!=0&(!=1))*(1 2 1 0 3 1 4)
		intermediateC		&$(<2 <3 <4)
		intermediateB		&$
		intermediateA		!=@.&$
		without				:,(!=@.&$ ;).*$
		calculation			(0 1)without(1 2 1 0 3 1 4)
	*/
		it("!=$(1 2 3) eql true", () => expect(intermediateF([1, 2, 3])).eql(true));
		it("!=@([1, 2, 3])[1](3) eql true", () => expect(intermediateE([1, 2, 3])[1](3)).eql(true));
		it("(0 1)without(1 2 1 0 3 1 4) eql [2, 3, 4]", () => expect(calculation).eql([2, 3, 4]));
		it("(!=0&(!=1))*(1 2 1 0 3 1 4) eql [2, 3, 4]", () => expect(intermediateD).eql([2, 3, 4]));
		it("&$(<2 <3 <4)(1) eql true", () => expect(intermediateC(1)).eql(true));
		it("&$([1, 2, 3]) eql 3", () => expect(intermediateB([1, 2, 3])).eql(3));
		it("(!=@.&$)([2, 3, 4])(5) eql true", () => expect(intermediateA([2, 3, 4])(5)).eql(true));
		it("without([0, 1], [1, 2, 1, 0, 3, 1, 4]) eql [2, 3, 4]", () => expect(without([0, 1], [1, 2, 1, 0, 3, 1, 4])).eql([2, 3, 4]));
	});

	describe('flatten :,(.(+1.>.(#.) (].{)`) .(; )).^$.]', () => {
	/*ts
		flatten				:,(.(+1.>.(#.) (].{)`) .(; )).^$.]
		intermediateC		+1.>.(#.)
		constLast			]`
		endIntoConst		].(` ).[
		flattenAll			.((~2%.].!=$ ].{)` .(; )).^$.]
		intermediate		.(1` .(; ))
		intermediateB		].{
		calculation			flattenAll(1 (2 ) (3 ((4 ) )))
		calculationB		2flatten(1 (2 ) (3 ((4 ) )))
	*/

		it("flatten(2, [1, [2], [3, [[4]]]]) eql [1, 2, 3, [4]]", () => expect(flatten(2, [1, [2], [3, [[4]]]])).eql([1, 2, 3, [4]]));
		it("2flatten(1 (2 ) (3 ((4 ) ))) eql [1, 2, 3, [4]]", () => expect(calculationB).eql([1, 2, 3, [4]]));
		it("+1.>.(#.)(2)([1, 2, 3, 4]) eql false", () => expect(intermediateC(2)([1, 2, 3, 4])).eql(false));
		it("+1.>.(#.)(5)([1, 2, 3, 4]) eql true", () => expect(intermediateC(5)([1, 2, 3, 4])).eql(true));
		it("].(` ).[([1, 2, 3])([3, 2, 1]) eql 3", () => expect(endIntoConst([1, 2, 3])([3, 2, 1])).eql(3));
		it("]`([1, 2, 3])([3, 2, 1]) eql 1", () => expect(constLast([1, 2, 3])([3, 2, 1])).eql(1));
		it(".((~2%.].!=$ ].{)` .(; )).^$.](1 (2 ) (3 ((4 ) ))) eql [1, 2, 3, 4]", () => expect(calculation).eql([1, 2, 3, 4]));
		it(".((~2%.].!=$ ].{)` .(; )).^$.]([1, [2], [3, [[4]]]]) eql [1, 2, 3, 4]", () => expect(flattenAll([1, [2], [3, [[4]]]])).eql([1, 2, 3, 4]));
		it("].{([1, [1, [2, [3, 4]]]]) eql [1, 2, [3, 4]]", () => expect(intermediateB([1, [1, [2, [3, 4]]]])).eql([1, 2, [3, 4]]));
		it(".(1` .(; ))([1, 2, 3]) eql [1, [[1, 2, 3]]]", () => expect(intermediate([1, 2, 3])).eql([1, [[1, 2, 3]]]));
	});

	describe("rest %.]", () => {
	/*ts
		rest				%.]
		calculation			1rest(5 4 3 2 1)
	*/

		it("rest(1, [5, 4, 3, 2, 1]) eql [4, 3, 2, 1]", () => expect(rest(1, [5, 4, 3, 2, 1])).eql([4, 3, 2, 1]));
		it("1rest(5 4 3 2 1) eql [4, 3, 2, 1]", () => expect(calculation).eql([4, 3, 2, 1]));
	});

	describe("last :,(_1* ;).%$.]", () => {
	/*ts
		last				:,(_1* ;).%$.]
		calculation			2last(5 4 3 2 1)
	*/

		it("last(2, [5, 4, 3, 2, 1]) eql [2, 1]", () => expect(last(2, [5, 4, 3, 2, 1])).eql([2, 1]));
		it("2last(5 4 3 2 1) eql [2, 1]", () => expect(calculation).eql([2, 1]));
	});

	describe("initial :,(_1* ;).%$.[", () => {
	/*ts
		initial				:,(_1* ;).%$.[
		calculation			2initial(5 4 3 2 1)
	*/

		it("initial(2, [5, 4, 3, 2, 1]) eql [5, 4, 3]", () => expect(initial(2, [5, 4, 3, 2, 1])).eql([5, 4, 3]));
		it("2initial(5 4 3 2 1) eql [5, 4, 3]", () => expect(calculation).eql([5, 4, 3]));
	});

	describe("first [", () => {
	/*ts
		first				[
		calculation			first(5 4 3 2 1)
	*/

		it("first([5, 4, 3, 2, 1]) eql 5", () => expect(first([5, 4, 3, 2, 1])).eql(5));
		it("[(5 4 3 2 1) eql 5", () => expect(calculation).eql(5));
	});

	describe("compact ;*", () => {
	/*ts
		compact				;*
		calculation			compact(0 1 false 2 "" 3 ( ) \( ))
	*/
		it('compact(0 1 false 2 "" 3 ( ) \\( )) eql [1, 2, 3]', () => expect(calculation).eql([1, 2, 3]));
		it("compact([0, undefined, 1, false, 2, '', 3]) eql [1, 2, 3]", () => expect(compact([0, undefined, 1, false, 2, '', 3])).eql([1, 2, 3]));
	});
	// describe("partition :,(? ;).@$.~.;*@", () => {
	// /*ts
	// 	isEqualToOne		=1,?
	// 	partition			:,(.(.(; `(`())) .(`(`()) ;)).? ;).@$.~.;*@
	// 	calculation			(%2.=1)partition(0 1 2 3 4 5)
	// 	calculationB		(%2.=0)partition(0 1 2 3 4 5)
	// 	intermediate		:,(? ;).@$.~
	// 	intermediateB		:,(? ;).@$
	// 	intermediateC		(%2.=1)?@(1 2 3)
	// 	intermediateD		((%2.=1)? (1 2 3)),@$
	// 	intermediateE		((%2.=1),?)1
	// 	intermediateF		(=1,?)1
	// */

	// 	it("(%2.=0)partition(0 1 2 3 4 5) eql [[0, 2, 4], [1, 3, 5]]", () => expect(calculationB).eql([[0, 2, 4], [1, 3, 5]]));
	// 	it("partition(num => (num % 2) === 0, [0, 1, 2, 3, 4, 5]) eql [[0, 2, 4], [1, 3, 5]]", () => expect(partition(num => (num % 2) === 0, [0, 1, 2, 3, 4, 5])).eql([[0, 2, 4], [1, 3, 5]]));
	// 	it("=1,?(1) eql [1, undefined]", () => expect(isEqualToOne(1)).eql([1, undefined]));
	// 	it("(=1,?)1 eql [1, undefined]", () => expect(intermediateF).eql([1, undefined]));
	// 	it("((%2.=1),?)1 eql [1, undefined]", () => expect(intermediateE).eql([1, undefined]));
	// 	it("((%2.=1)? (1 2 3)),@$ eql [[1, undefined], [undefined, 2], [3, undefined]]", () => expect(intermediateD).eql([[1, undefined], [undefined, 2], [3, undefined]]));
	// 	it("(%2.=1)?@(1 2 3) eql [[1, undefined], [undefined, 2], [3, undefined]]", () => expect(intermediateC).eql([[1, undefined], [undefined, 2], [3, undefined]]));
	// 	it(":,(? ;).@$(num => (num % 2) === 1, [1, 2 3]) eql [[1, undefined], [undefined, 2], [3, undefined]]", () => expect(intermediateB(num => (num % 2) === 1, [1, 2, 3])).eql([[1, undefined], [undefined, 2], [3, undefined]]));
	// 	it(":,(? ;).@$.~(num => (num % 2) === 1, [1, 2 3]) eql [[1, undefined, 3], [undefined, 2, undefined]]", () => expect(intermediate(num => (num % 2) === 1, [1, 2, 3])).eql([[1, undefined, 3], [undefined, 2, undefined]]));
	// 	it("(%2.=1)partition(0 1 2 3 4 5) eql [[1, 3, 5], [0, 2, 4]]", () => expect(calculation).eql([[1, 3, 5], [0, 2, 4]]));
	// 	it("partition(num => (num % 2) === 1, [0, 1, 2, 3, 4, 5]) eql [[1, 3, 5], [0, 2, 4]]", () => expect(partition(num => (num % 2) === 1, [0, 1, 2, 3, 4, 5])).eql([[1, 3, 5], [0, 2, 4]]));
	// });

	describe("size #", () => {
	/*ts
		size					#
		calculation				#(1 2 3 4 5)
		calculationB			#({"{one: 1, two: 2, three: 3}")
	*/
		it("#(1 2 3 4 5) eql 5", () => expect(calculation).eql(5));
		it('#({"{one: 1, two: 2, three: 3}") eql 3', () => expect(calculationB).eql(3));
		it("size([1, 2, 3, 4, 5]) eql 5", () => expect(size([1, 2, 3, 4, 5])).eql(5));
		it('size({one: 1, two: 2, three: 3}) eql 3', () => expect(size({one: 1, two: 2, three: 3})).eql(3));
	});

	describe("countBy /.#@", () => {
	/*ts
		countBy					/.#@
		calculation				((%2.=0 "even"`) "odd"`)?countBy(1 2 3 4 5)
		calculationA			((%2.=0 "even"`) "odd"`)?@(1 2 3 4 5)
	*/
		it('((%2.=0)?,("even"` "odd"`).|$)@(1 2 3 4 5) eql ["odd", "even", "odd", "even", "odd"]', () => expect(calculationA).eql(["odd", "even", "odd", "even", "odd"]));
		it('((%2.=0)?,("even"` "odd"`).|$)countBy(1 2 3 4 5) eql {odd: 3, even: 2}', () => expect(calculation).eql({odd: 3, even: 2}));
		it("countBy(num => ((num % 2) === 0) ? 'even' : 'odd', [1, 2, 3, 4, 5]) eql {odd: 3, even: 2}", () => expect(countBy(num => ((num % 2) === 0) ? 'even' : 'odd', [1, 2, 3, 4, 5])).eql({odd: 3, even: 2}));
	});

	describe("groupBy /", () => {
	/*ts
		groupBy					/
		calculation				{"Math.floor"groupBy(1.3 2.1 2.4)
		calculationB			(#.""+)groupBy("one" "two" "three")
	*/

		it(`#groupBy("one" "two" "three") eql {3: ['one', 'two'], 5: ['three']}`, () => expect(calculationB).eql({3: ['one', 'two'], 5: ['three']}));
		it('{"Math.floor"groupBy(1.3 2.1 2.4) eql {1: [1.3], 2: [2.1, 2.4]}', () => expect(calculation).eql({1: [1.3], 2: [2.1, 2.4]}));
		it("groupBy(num => Math.floor(num), [1.3, 2.1, 2.4]) eql {1: [1.3], 2: [2.1, 2.4]}", () => expect(groupBy(num => Math.floor(num), [1.3, 2.1, 2.4])).eql({1: [1.3], 2: [2.1, 2.4]}));
		it("groupBy(string => string.length, ['one', 'two', 'three']) eql {3: ['one', 'two'], 5: ['three']}", () => expect(groupBy(string => string.length, ['one', 'two', 'three'])).eql({3: ['one', 'two'], 5: ['three']}));
	});

	describe("sortBy <", () => {
	/*ts
		sortBy					<
		calculation				{"Math.sin"sortBy(1 2 3 4 5 6)
		calculationB			"name"'sortBy({"[{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}]")
	*/

		it(`"name"'sortBy({"[{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}]") eql [{name: 'curly', age: 60}, {name: 'larry', age: 50}, {name: 'moe', age: 40}]`,
			() => expect(calculationB).eql([{name: 'curly', age: 60}, {name: 'larry', age: 50}, {name: 'moe', age: 40}]));
		it('{"Math.sin"<(1 2 3 4 5 6) eql [5, 4, 6, 3, 1, 2]', () => expect(calculation).eql([5, 4, 6, 3, 1, 2]));
		it("sortBy(num => Math.sin(num), [1, 2, 3, 4, 5, 6]) eql [5, 4, 6, 3, 1, 2]", () => expect(sortBy(num => Math.sin(num), [1, 2, 3, 4, 5, 6])).eql([5, 4, 6, 3, 1, 2]));
		it("sortBy(stooge => stooge.name, [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}]) eql [{name: 'curly', age: 60}, {name: 'larry', age: 50}, {name: 'moe', age: 40}]",
			() => expect(sortBy(stooge => stooge.name, [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}])).eql([{name: 'curly', age: 60}, {name: 'larry', age: 50}, {name: 'moe', age: 40}]));
	});

	describe("min <.[", () => {
	/*ts
		min						<.[
		calculation				;min(10 5 100 2 1000)
	*/

		it(";min(10 5 100 2 1000) eql 2", () => expect(calculation).eql(2));
		it("min(x => x, [10, 5, 100, 2, 1000]) eql 2", () => expect(min(x => x, [10, 5, 100, 2, 1000])).eql(2));
	});
	describe("max <.]", () => {
	/*ts
		max						<.]
		calculation				"age"'max({"[{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}]")
	*/

		it(`"age"'max({"[{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}]") eql {name: 'curly', age: 60}`, () => expect(calculation).eql({name: 'curly', age: 60}));
		it("max(stooge => stooge.age, [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}]) eql {name: 'curly', age: 60}",
			() => expect(max(stooge => stooge.age, [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}])).eql({name: 'curly', age: 60}));
	});

	describe("pluck :,(' ;).@$", () => {
	/*ts
		pluck					:,(' ;).@$
		calculation				"name"pluck({"[{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}]")
	*/

		it(`name"pluck({"[{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}]") eql ['moe', 'larry', 'curly']`, () => expect(calculation).eql(['moe', 'larry', 'curly']));
		it("pluck('name', [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}]) eql ['moe', 'larry', 'curly']",
			() => expect(pluck('name', [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}])).eql(['moe', 'larry', 'curly']));
	});

	describe("contains :,(= ;).?$", () => {
	/*ts
		intermediateB			(4 (2 3 4 5)),(= ;),?$
		intermediate			(=4 (2 3 4 5)),?$
		containsFour			=4?(2 3 4 5)
		contains				:,(= ;).?$
		calculation				3contains(1 2 3)
		calculationB			4contains(1 2 3)
	*/

		it("3contains(1 2 3) eql 3", () => expect(calculation).eql(3));
		it("4contains(1 2 3) eql undefined", () => expect(calculationB).eql(undefined));
		it("(4 (2 3 4 5)),(= ;),?$ eql 4", () => expect(intermediateB).eql(4));
		it("(=4 (2 3 4 5)),?$ eql 4", () => expect(intermediate).eql(4));
		it("contains(4, [2, 3, 4, 5]) eql 4", () => expect(contains(4, [2, 3, 4, 5])).eql(4));
		it("=4?(2 3 4 5) eql 4", () => expect(containsFour).eql(4));
	});

	describe("some *.#.>0", () => {
	/*ts
		some					*.#.>0
		someValues				;some(() 0 "yes")
		filterByIdentity		;*(() 0)
	*/

		it("some(x => x, [undefined, 0, 'yes', false]) eql true", () => expect(some(x => x, [undefined, 0, 'yes', false])).eql(true));
		it(";some(() 0 'yes') eql true", () => expect(someValues).eql(true));
		it(";*(() 0) eql []", () => expect(filterByIdentity).eql([]));
	});

	describe("every :.(*$ ]).#@.=$", () => {
	/*ts
		every					:.(*$ ]).#@.=$
		calculation				(%2.=0)every(2 4 5)
		calculationB			(%2.=0)every(2 4 6)
	*/

		it("(%2.=0)every(2 4 6) eql true", () => expect(calculationB).eql(true));
		it("(%2.=0)every(2 4 5) eql false", () => expect(calculation).eql(false));
		it("every(num => (num % 2) === 0, [2, 4, 5]) eql false", () => expect(every(num => (num % 2) === 0, [2, 4, 5])).eql(false));
		it("every(num => (num % 2) === 0, [2, 4, 6]) eql true", () => expect(every(num => (num % 2) === 0, [2, 4, 6])).eql(true));
	});

	describe("reject :,(! ;).*$", () => {
	/*ts
		complimentAndArray		:,(! ;)
		reject					:,(! ;).*$
		notLessThanThree		!(<3)
		calculation				(%2.=0)reject(1 2 3 4 5 6)
	*/

		it("(%2.=0)reject(1 2 3 4 5 6) eql [1, 3, 5]", () => expect(calculation).eql([1, 3, 5]));
		it("!(<3)(4) eql true", () => expect(notLessThanThree(4)).eql(true));
		it(":,(! ;)(value => value < 3, 2)[0](4) eql true", () => expect(complimentAndArray(value => value < 3, 2)[0](4)).eql(true));
		it("!(<3)(2) eql false", () => expect(notLessThanThree(2)).eql(false));
		it(":,(! ;)(() => {}, [1, 2, 3])[1] eql [1, 2, 3]", () => expect(complimentAndArray(() => {}, [1, 2, 3])[1]).eql([1, 2, 3]));
		it("reject(num => (num % 2) === 0, [1, 2, 3, 4, 5, 6]) eql [1, 3, 5]", () => expect(reject(num => (num % 2) === 0, [1, 2, 3, 4, 5, 6])).eql([1, 3, 5]));
	});

	describe("filter *", () => {
	/*ts
		filter					*
		calculation				(%2.=0)filter(1 2 3 4 5 6)
	*/

		it("(%2.=0)*(1 2 3 4 5 6) eql [2, 4, 6]", () => expect(calculation).eql([2, 4, 6]));
		it("filter(num => (num % 2) === 0, [1, 2, 3, 4, 5, 6]) eql [2, 4, 6]", () => expect(filter(num => (num % 2) === 0, [1, 2, 3, 4, 5, 6])).eql([2, 4, 6]));
	});

	describe("find ?", () => {
	/*ts
		find					?
		calculation				(%2.=0)find(1 2 3 4 5 6)
	*/

		it("(%2.=0)?(1 2 3 4 5 6) eql 2", () => expect(calculation).eql(2));
		it("find(num => (num % 2) === 0, [1, 2, 3, 4, 5, 6]) eql 2", () => expect(find(num => (num % 2) === 0, [1, 2, 3, 4, 5, 6])).eql(2));
	});

	describe("reduceRight :.([ ]._).$$", () => {
	/*ts
		reduceRight				:.([ ]._).$$
		calculation				+reduceRight((0 1) (2 3) (4 5))
	*/

		it("+reduceRight((0 1) (2 3) (4 5)) eql [4, 5, 2, 3, 0, 1]", () => expect(calculation).eql([4, 5, 2, 3, 0, 1]));
		it("reduceRight((a, b) => a.concat(b), [[0, 1], [2, 3], [4, 5]]) eql [4, 5, 2, 3, 0, 1]", () => expect(reduceRight((a, b) => a.concat(b), [[0, 1], [2, 3], [4, 5]])).eql([4, 5, 2, 3, 0, 1]));
	});

	describe("reduce $", () => {
	/*ts
		reduce					$
		calculation				(+ 0)reduce(1 2 3)
	*/

		it("(+ 0)$(1 2 3) eql 6", () => expect(calculation).eql(6));
		it("reduce([(a, b) => a + b, 0], [1, 2, 3]) eql 6", () => expect(reduce([(a, b) => a + b, 0], [1, 2, 3])).eql(6));
	});

	describe("map @", () => {
	/*ts
		map						@
		mapIndexed				\.(.([ _))@.\
		calculation				*3map(1 2 3)
		calculationA			*3map({"{one: 1, two: 2, three: 3}")
		calculationB			[map((1 2) (3 4))
	*/

		it("[@((1 2) (3 4)) eql [1, 3]", () => expect(calculationB).eql([1, 3]));
		it('*3@({"{one: 1, two: 2, three: 3}"}) eql {one: 3, two: 6, three: 9}', () => expect(calculationA).eql({one: 3, two: 6, three: 9}));
		it("*3@(1 2 3) eql [3, 6, 9]", () => expect(calculation).eql([3, 6, 9]));
		it("map(num => num * 3, [1, 2, 3]) eql [3, 6, 9]", () => expect(map(num => num * 3, [1, 2, 3])).eql([3, 6, 9]));
		it("map(num => num * 3, {one: 1, two: 2, three: 3}) eql {one: 3, two: 6, three: 9}", () => expect(map(num => num * 3, {one: 1, two: 2, three: 3})).eql({one: 3, two: 6, three: 9}));
		it("map(array => array[0], [[1, 2], [3, 4]]) eql [1, 3]", () => expect(map(array => array[0], [[1, 2], [3, 4]])).eql([1, 3]));
		it("(\.(.([ _))@.\)map({one: 'a', two: 'b', three: 'c'}) eql {one: ['a', 'one'], two: ['b', 'two'], three: ['c', 'three']}",
			() => expect(mapIndexed({one: 'a', two: 'b', three: 'c'})).eql({one: ['a', 'one'], two: ['b', 'two'], three: ['c', 'three']}));
	});
});

describe("Basic Operations", () => {
	describe("Value Binding", () => {
		describe("number 5", () => {
		/*ts
			number					5
		*/
			it("number eql 5", () => expect(number).eql(5));
		});

		describe("character \"c\"", () => {
		/*ts
			character               "c"
		*/
			it("character eql \"c\"", () => expect(character).eql("c"));
		});

		describe("greeting \"hello\"", () => {
		/*ts
			greeting                  "hello"
		*/
			it("greeting eql \"hello\"", () => expect(greeting).eql("hello"));
		});
	});

	describe("Strings", () => {
		describe("stringWithSpaces \"This is a string with spaces\" some comments here", () => {
		/*ts
			stringWithSpaces		"This is a string with spaces" some   comments   here
		*/
			it("stringWithSpaces eql \"This is a string with spaces\"", () => expect(stringWithSpaces).eql("This is a string with spaces"));
		});

		describe("stringWithEmbeddedStrings \"\"initial string\" some text \"middle string\" more text \"final string\"\"", () => {
		/*ts
			stringWithEmbeddedStrings		"\"initial string\" some text \"middle string\" more text \"final string\""
		*/
			it ("stringWithEmbeddedStrings eql \"\"initial string\" some text \"middle string\" more text \"final string\"\"", () =>
				expect(stringWithEmbeddedStrings).eql("\"initial string\" some text \"middle string\" more text \"final string\""));
		});
	});

	describe("Comments", () => {
		describe("commentedValue 5 this is a nice value", () => {
		/*ts
			commentedValue            5                     this is a nice value
		*/
			it("commentedValue eql 5", () => expect(commentedValue).eql(5));
		});

		describe("name \"john\" a comment about a string", () => {
		/*ts
			name                      "john"               a comment about name
		*/
			it("name eql \"john\"", () => expect(name).eql("john"));
		});
	});

	describe("Brackets", () => {
	/*ts
		undefinedValue		()
		emptyArray			( )
		arrayOfEmpties		(( ) (  ) () ())
	*/
		it("() eql false", () => expect(undefinedValue).eql(false));
		it("( ) eql []", () => expect(emptyArray).eql([]));
		it("(( ) (  ) () ()) eql [[], [], undefined, undefined]", () => expect(arrayOfEmpties).eql([[], [], false, false]));

		describe("singleArray (5 ) some comment", () => {
		/*ts
			singleArray             (5 ) some comment
		*/
			it("singleArray eql [5]", () => expect(singleArray).eql([5]));
		});

		describe("bracketed (5)", () => {
		/*ts
			bracketed               (5)
		*/
			it("bracketed eql 5", () => expect(bracketed).eql(5));
		});

		describe("numbers (1 2 3 4)", () => {
		/*ts
			numbers                   (1 2 3 4)
		*/
			it("numbers eql [1, 2, 3, 4]", () => expect(numbers).eql([1, 2, 3, 4]));
		});

		describe("trailingSpace (1 2 3 4 )", () => {
		/*ts
			trailingSpace             (1 2 3 4 )
		*/
			it("trailingSpace eql [1, 2, 3, 4]", () => expect(trailingSpace).eql([1, 2, 3, 4]));
		});

		describe("doubleBrackets ((1 2 3 4))", () => {
		/*ts
			doubleBrackets            ((1 2 3 4))
		*/
			it("doubleBrackets eql [1, 2, 3, 4]", () => expect(doubleBrackets).eql([1, 2, 3, 4]));
		});

		describe("bracketedString (\"string\")", () => {
		/*ts
			bracketedString           ("string")
		*/
			it("bracketedString eql \"string\"", () => expect(bracketedString).eql("string"));
		});

		describe("mixedArray (5 \"hello\" (1 2 3) (4))", () => {
		/*ts
			mixedArray                (5 "hello" (1 2 3) (4))
		*/
			it("mixedArray eql [5, \"hello\", [1, 2, 3], 4]", () => expect(mixedArray).eql([5, "hello", [1, 2, 3], 4]));
		});
	});

	describe("Array end spaces", () => {
		/*ts
			newLines (
				4
				5
				6
			) another comment
			newLineWithLineComment
			(
				2
				3 // comment
				4
			)

		*/
		const finalSpace = /*ts (1 2 3 )*/;
		const initialSpace = /*ts ( 1 2 3)*/;
		const noEndSpaces = /*ts (1 2 3 )*/;
		const doubleEndSpaces = /*ts ( 1 2 3 )*/;
		const singleLineNewLine = /*ts (
		1
		2
		3
	) some extra comment*/;
		const singleMultilineWithLineComment = /*ts (
			5
			6 // comment
			7
		)*/;

		it("/*ts (1 2 3)*/ eql [1, 2, 3]", () => expect(noEndSpaces).eql([1, 2, 3]));
		it("/*ts ( 1 2 3)*/ eql [1, 2, 3]", () => expect(initialSpace).eql([1, 2, 3]));
		it("/*ts (1 2 3 )*/ eql [1, 2, 3]", () => expect(finalSpace).eql([1, 2, 3]));
		it("/*ts ( 1 2 3 )*/ eql [1, 2, 3]", () => expect(doubleEndSpaces).eql([1, 2, 3]));
		it("/*ts (\\n\\t1\\n\\t2\\n\\t3\\n) some extra comment*/ eql [1, 2, 3]", () => expect(singleLineNewLine).eql([1, 2, 3]));
		it("/*\\<name> (\\n\\t4\\n\\t5\\n\\t6\\n) another comment*/ eql [4, 5, 6]", () => expect(newLines).eql([4, 5, 6]));
		it("/*\\<name>\\n\\t(\\n\\t2\\n\\t3 // comment\\n\\t4\\n)*/ eql [2, 3, 4]", () => expect(newLineWithLineComment).eql([2, 3, 4]));
		it("/*ts (\\n\\t5\\n\\t5 // comment\\n\\t7\\n)*/ eql [5, 6, 7]", () => expect(singleMultilineWithLineComment).eql([5, 6, 7]));
	});

	describe("Referencing custom functions: plus +", () => {
	/*ts
		plus			+
		twoPlus			2plus
		plusThree		plus3
	*/
		it("2plus(3) eql 5", () => expect(twoPlus(3)).eql(5));
		it("plus3(4) eql 7", () => expect(plusThree(4)).eql(7));
	});

	describe("Completed calculations", () => {
	/*ts
		nine		4+5
	*/
		it("4+5 eql 9", () => expect(nine).eql(9));
	});

	describe("Inverting primary function application location", () => {
	/*ts
		firstEqualsThree		=3,([.)
	*/
		it('=3,([.)([3, 2, 1]) eql true', () => expect(firstEqualsThree([3, 2, 1])).eql(true));
		it('=3,([.)([1, 2, 3]) eql false', () => expect(firstEqualsThree([1, 2, 3])).eql(false));
	});

	describe("Highest priority for spaces", () => {
		describe("arrays of dotted functions", () => {
		/*ts
			arrayApplication	 3.(;.+1 ;.-1)
		*/
			it('3.(;.+1 ;.-1) eql [4, 2]', () => expect(arrayApplication).eql([4, 2]))
		});

		describe("space breaks with highest priority", () => {
		/*ts
			arrayCalculation				(2+3 4+5 6+7)
			calculationWithDots				(2,+3 4,+5 6,+7)
			calculationWithMultipleDots		(2,+3,-1 4,+5,-1 6,+7,-1)
			calculationExtraction			(+2 -3),]
		*/
			it('(2+3 4+5 6+7) eql [5, 9, 13]', () => expect(arrayCalculation).eql([5, 9, 13]));
			it('(2,+3 4,+5 6,+7) eql [5, 9, 13]', () => expect(calculationWithDots).eql([5, 9, 13]));
			it('(2,+3,-1 4,+5,-1 6,+7,-1) eql [4, 8, 12]', () => expect(calculationWithMultipleDots).eql([4, 8, 12]));
			it('(+2 -3),](9) eql 6', () => expect(calculationExtraction(9)).eql(6));
		});
	})

	describe("Export binary function and execute with two arguments", () => {
	/*ts
		power			^
	*/
		it("^(3, 2) eql 9", () => expect(power(3, 2)).eql(9));
	});

	describe("recursive execution", () => {
	/*ts
		factorial					((=1 ;) .(; -1.factorial).*$)?
	*/
		it('=1?,(; .(; -1.factorial).*$).|$(1) eql 1', () => expect(factorial(1)).eql(1));
		it('=1?,(; .(; -1.factorial).*$).|$(2) eql 2', () => expect(factorial(2)).eql(2));
		it('=1?,(; .(; -1.factorial).*$).|$(4) eql 24', () => expect(factorial(4)).eql(24));
	});
});

///==========================================================
// functional utilites

const all = check => array => array.every(check);
const contains = value => array => array.includes(value);
const keys = Object.keys;
const reduce = reducer => startingValue => array => array.reduce(reducer, startingValue);
const isUnique = array => {
	const object = reduce((acc, value) => ({acc, [value]: true}))({})(array);

	return keys(object).length === array.length;
};

describe("99 Haskell Problems", () => {
	describe("1. myLast ]", () => {
	/*ts
		myLast                ]
	*/
		it("myLast([1, 2, 3, 4]) eql 4", () => expect(myLast([1, 2, 3, 4])).eql(4));
		it("myLast(\"xyz\") eql \"z\"", () => expect(myLast("xyz")).eql("z"));
	});
	
	describe("2. myButLast ~2'", () => {
	/*ts
		myButLast             ~2'
	*/
		it("myButLast([1, 2, 3, 4]) eql 3", () => expect(myButLast([1, 2, 3, 4])).eql(3));
		it("myButLast('abcde') eql 'd'", () => expect(myButLast("abcde")).eql("d"));
	});

	describe("3. elementAt '", () => {
	/*ts
		elementAt				'
		elementAtTwo			2elementAt
		elementFromArray		elementAt(1 2 3 4)
		elementFromString		elementAt"help"
	*/
		it("2elementAt([1, 2, 3]) eql 3", () => expect(elementAtTwo([1, 2, 3])).eql(3));
		it("2elementAt(\"help\") eql \"l\"", () => expect(elementAtTwo("help")).eql("l"));
		it("elementAt(1 2 3 4)(1) eql 2", () => expect(elementFromArray(1)).eql(2));
		it("elementAt\"help\"(1) eql \"e\"", () => expect(elementFromString(1)).eql("e"));
	});

	describe("4. myLength #", () => {
	/*ts
		myLength				#
		myLengthArray			#(5 6 7)
		myLengthString			#"dummy"
	*/
		it("myLength([123, 345, 789]) eql 3", () => expect(myLength([123, 456, 789])).eql(3));
		it("myLength(\"Hello, world!\") eql 13", () => expect(myLength("Hello, world!")).eql(13));
		it("#(5 6 7) eql 3", () => expect(myLengthArray).eql(3));
		it("#\"dummy\" eql 5", () => expect(myLengthString).eql(5));
	});

	describe("5. myReverse _", () => {
	/*ts
		myReverse				_
		myReverseString			_"A man, a plan, a canal, panama!"
		myReverseArray			_(1 2 3 4)
	*/
		it("myReverse(\"A man, a plan, a canal, panama!\") eql \"!amanap ,lanac a ,nalp a ,nam A\"", () => expect(myReverse("A man, a plan, a canal, panama!")).eql("!amanap ,lanac a ,nalp a ,nam A"));
		it("myReverse([1, 2, 3, 4]) eql [4, 3, 2, 1]", () => expect(myReverse([1, 2, 3, 4])).eql([4, 3, 2, 1]));
		it("_\"A man, a plan, a canal, panama!\" eql \"!amanap ,lanac a ,nalp a ,nam A\"", () => expect(myReverseString).eql("!amanap ,lanac a ,nalp a ,nam A"));
		it("_(1 2 3 4) eql [4, 3, 2, 1]", () => expect(myReverseArray).eql([4, 3, 2, 1]));
	});

	describe("6. isPalindrome .(; _).=$", () => {
	/*ts
		calculationC							(1 2 3)=(3 2 1)
		calculationB							((1 2 3) (3 2 1)),=$
		calculationA							(1 2 3).(; _)
		isPalindromeFalse						(1 2 3).(; _),=$
		forwardAndReverse						.(; _)
		forwardAndReverseThenLength				.(; _).#
		isPalindrome							.(; _).=$
		isPalindromeTrue						"madamimadam".(; _),=$
	*/
		it("(1 2 3)=(3 2 1) eql false", () => expect(calculationC).eql(false));
		it("((1 2 3) (3 2 1)),=$ eql false", () => expect(calculationB).eql(false));
		it("(1 2 3).(; _) eql [[1, 2, 3], [3, 2, 1]]", () => expect(calculationA).eql([[1, 2, 3], [3, 2, 1]]));
		it(".(; _)([1, 2, 3]) eql [[1, 2, 3], [3, 2, 1]]", () => expect(forwardAndReverse([1, 2, 3])).eql([[1, 2, 3], [3, 2, 1]]));
		it(".(; _).# arity 1", () => expect(ts.arity(forwardAndReverseThenLength)).eql(1));
		it(".(; _).#([1, 2, 3]) eql 2", () => expect(forwardAndReverseThenLength([1, 2, 3])).eql(2));
		it("isPalindrome([1, 2, 3]) eql false", () => expect(isPalindrome([1, 2, 3])).eql(false));
		it("isPalindrome(\"madamimadam\") eql true", () => expect(isPalindrome("madamimadam")).eql(true));
		it("isPalindrome([1, 2, 4, 8, 16, 8, 4, 2, 1]) eql true", () => expect(isPalindrome([1, 2, 4, 8, 16, 8, 4, 2, 1])).eql(true));
		it("(1 2 3).(; _),=$ eql false", () => expect(isPalindromeFalse).eql(false));
		it("\"madamimadam\".(; _),=$ eql true", () => expect(isPalindromeTrue).eql(true));
	});

	// describe('7. myFlatten (:,(; (}.="A")?,(myFlatten .(; )).|$).+$ ( ))$', () => {
	// /*ts
	// 	plainConcat					(+ ( ))$
	// 	insertConcat				(:.+$)$
	// 	embed						(:.+$ ( ))$
	// 	pair						:,(; ;)
	// 	concatZipBasic				(:,(; ;) ( ))$
	// 	concatZip					(:,(; ;).+$ ( ))$
	// 	concat						(:,(; .(; )).+$ ( ))$
	// 	isArray						(}.="A")?
	// 	undefinedDotIdentity		(),;
	// 	undefinedCommaIdentity		(() ()),(; ;)
	// 	makeArrayIfNot				(}.="A")?,(; .(; ))
	// 	undefinedDotArray			().(; )
	// 	undefinedCommaArray			(() ),(.(; ) )
	// 	flattenOrMakeArray			(}.="A")?,(flattenOrMakeArray .(; )).|$
	// 	myFlatten					(:,(; (}.="A")?,(myFlatten .(; )).|$).+$ ( ))$
	// */
	// 	it('(( ) +)$([[5, 6], [7, 8]]) eql [5, 6, 7, 8]', () => expect(plainConcat([[5, 6], [7, 8]])).eql([5, 6, 7, 8]));
	// 	it('(:.+$)$([[2, 3], [4, 5]]) eql [2, 3, 4, 5]', () => expect(insertConcat([[2, 3], [4, 5]])).eql([2, 3, 4, 5]));
	// 	it('(( ) :.+$)$([[1, 2], [3, 4]])', () => expect(embed([[1, 2], [3, 4]])).eql([1, 2, 3, 4]));
	// 	it(':,(; ;)(2, 3) eql [2, 3]', () => expect(pair(2, 3)).eql([2, 3]));
	// 	it('(:,(; ;) ( ))$([1, 2, 3] eql [[[[ ], 1], 2], 3]', () => expect(concatZipBasic([1, 2, 3])).eql([[[[ ], 1], 2], 3]));
	// 	it('(:,(; ;).+$ ( ))$([[6, 5], [4, 3]]) eql [6, 5, 4, 3]', () => expect(concatZip([[6, 5], [4, 3]])).eql([6, 5, 4, 3]));
	// 	it('(:,(; .(; )).+$ ( ))$([3, 4, 5]) eql [3, 4, 5]', () => expect(concat([1, 2, 3])).eql([1, 2, 3]));
	// 	it('(}.="A")?(1) eql [undefined, 1]', () => expect(isArray(1)).eql([undefined, 1]));
	// 	it('(}.="A")?([2, 3]) eql [[2, 3], undefined]', () => expect(isArray([2, 3])).eql([[2, 3], undefined]));
	// 	it('(),; eql false', () => expect(undefinedDotIdentity).eql(false));
	// 	it('(() ()),(; ;) eql (() ())', () => expect(undefinedCommaIdentity).eql([false, false]));
	// 	it('(}.="A")?,(; .(; ))(1) eql [undefined, [1]]', () => expect(makeArrayIfNot(1)).eql([undefined, [1]]));
	// 	it("().(; ) eql [false]", () => expect(undefinedDotArray).eql([false]));
	// 	it('(() ),(.(; ) ) eql [[false]]', () => expect(undefinedCommaArray).eql([[false]]));
	// 	it('(}.="A")?,(; .(; ))([1]) eql [[1], undefined]', () => expect(makeArrayIfNot([1])).eql([[1], undefined]));
	// 	it('(}.="A")?,(flattenOrMakeArray .(; )).|$(1) eql [1]', () => expect(flattenOrMakeArray(1)).eql([1]));
	// 	it('myFlatten([1, 2, 3]) eql [1, 2, 3]', () => expect(myFlatten([1, 2, 3])).eql([1, 2, 3]));
	// 	it('myFlatten([[1]]) eql [1]', () => expect(myFlatten([[1]])).eql([1]));
	// 	it('myFlatten([1, [2, 3], 4]) eql ([1, 2, 3, 4])', () => expect(myFlatten([1, [2, 3], 4])).eql([1, 2, 3, 4]));
	// 	it('myFlatten(["a", ["b", ["c", "d"], "e"]]) eql ["a", "b", "c", "d", "e"]', () => expect(myFlatten(["a", ["b", ["c", "d"], "e"]])).eql(["a", "b", "c", "d", "e"]));
	// 	it('myFlatten([]) eql []', () => expect(myFlatten([])).eql([]));
	// });

	describe("8. compress !=%.[@", () => {
	/*ts
		compress				!=%.[@
		compressString			!=%.[@.""$
		commaJoin				","$
		stringJoin				""$
	*/
		it('!=%.[@(["a", "a", "a", "a", "b", "c", "c", "a", "a", "d", "e", "e", "e", "e"]) eql ["a", "b", "c", "a", "d", "e"]', () => expect(compress(["a", "a", "a", "a", "b", "c", "c", "a", "a", "d", "e", "e", "e", "e"]))
			.eql(["a", "b", "c", "a", "d", "e"]));
		it('","$([2, 3]) eql "2,3"', () => expect(commaJoin([2, 3])).eql("2,3"));
		it('""$([2, 3]) eql "23"', () => expect(stringJoin([2, 3])).eql("23"));
		it('""$(["a", "b", "c"]) eql "abc"', () => expect(stringJoin(["a", "b", "c"])).eql("abc"));
		it('!=%.[@.""$("aaaabccaadeeee") eql "abcade"', () => expect(compressString("aaaabccaadeeee")).eql("abcade"));
	});

/*ts
	pack					!=%
	encode					pack.(.(# [))@
*/

	describe("9. pack !=%", () => {
	/*ts
		packString			!=%.""$@
	*/
		it('!=%([1, 1, 1, 1, 2, 3, 3, 1, 1, 4, 5, 5, 5, 5]) eql [[1, 1, 1, 1], [2], [3, 3], [1, 1], [4], [5, 5, 5, 5]]', () => expect(pack([1, 1, 1, 1, 2, 3, 3, 1, 1, 4, 5, 5, 5, 5])).eql([[1, 1, 1, 1], [2], [3, 3], [1, 1], [4], [5, 5, 5, 5]]));
		it('!=%.""$@(["a", "a", "a", "a", "b", "c", "c", "a", "a", "d", "e", "e", "e", "e"]) eql ["aaaa", "b", "cc", "aa", "d", "eeee"]', () => expect(packString(["a", "a", "a", "a", "b", "c", "c", "a", "a", "d", "e", "e", "e", "e"]))
			.eql(["aaaa", "b", "cc", "aa", "d", "eeee"]));
	});

	describe("10. encode pack.(.(# [))@", () => {
	/*ts
	*/
		it('pack.(.(# [))@("aaaabccaadeeee") eql [[4, "a"], [1, "b"], [2, "c"], [2, "a"], [1, "d"], [4, "e"]]', () => expect(encode("aaaabccaadeeee")).eql([[4, "a"], [1, "b"], [2, "c"], [2, "a"], [1, "d"], [4, "e"]]));
	});

	describe("11. encodeModified encode.(([.=1)?,(] ;).|$)@", () => {
	/*ts
		encodeModified		encode.(([.=1 ]) ;)?@
	*/
		it('encode.(([.=1)?,(] ;).|$)@("aaaabccaadeeee") eql [[4, "a"], "b", [2, "c"], [2, "a"], "d", [4, "e"]]', () => expect(encodeModified("aaaabccaadeeee")).eql([[4, "a"], "b", [2, "c"], [2, "a"], "d", [4, "e"]]));
	});

	// describe('12. decodeModifiedString ((#.=2)?,(.(].` [).^$ .(; )).|$.""$)@.""$', () => {
	// /*ts
	// 	endAndConst						].`
	// 	expandUnit						.(].` [).^$
	// 	joinSingle						""$("b" )
	// 	expand							((#.=2)?,(.(].` [).^$ .(; )).|$)@
	// 	expandConcat					((#.=2)?,(.(].` [).^$ .(; )).|$.""$)@
	// 	decodeModifiedString			((#.=2)?,(.(].` [).^$ .(; )).|$.""$)@.""$
	// */
	// 	it('].`([2, 3])(4) eql 3', () => expect(endAndConst([2, 3])(4)).eql(3));
	// 	it('.(].` [).^$([3, "a"]) eql ["a", "a", "a"]', () => expect(expandUnit([3, "a"])).eql(["a", "a", "a"]));
	// 	it('""$("b" ) eql "b"', () => expect(joinSingle).eql("b"));
	// 	it('((#.=2)?,(.(].` [).^$ .(; )).|$)@([[3, "a"], "b"]) eql [["a", "a", "a"], ["b"]]', () => expect(expand([[3, "a"], "b"])).eql([["a", "a", "a"], ["b"]]));
	// 	it('((#.=2)?,(.(].` [).^$ .(; )).|$.""$)@([[3, "a"], "b"]) eql ["aaa", "b"]', () => expect(expandConcat([[3, "a"], "b"])).eql(["aaa", "b"]));
	// 	it('((#.=2)?,(.(].` [).^$ .(; )).|$.""$)@.""$([[4, "a"], "b", [2, "c"], [2, "a"], "d", [4, "e"]]) eql "aaaabccaadeeee"', () => expect(decodeModifiedString([[4, "a"], "b", [2, "c"], [2, "a"], "d", [4, "e"]])).eql("aaaabccaadeeee"));
	// });

	describe('14. dupli .(; ;).~.+$', () => {
	/*ts
		dupli				.(; ;).~.+$
	*/
		it('.(; ;).~.+$([1, 2, 3]) eql [1, 1, 2, 2, 3, 3]', () => expect(dupli([1, 2, 3])).eql([1, 1, 2, 2, 3, 3]));
	});

	describe('15. repli :.(].` [).^$.~.+$', () => {
	/*ts
		pipeIntoConst		`
		twoThrees			(3` 2),^$
		twoFours			(2 4).(].(` ).[ [),^$
		replicate			:.(].(` ).[ [).^$
		repli				:.(].(` ).[ [).^$.~.+$
		repliInPlace		2repli(1 2 3)
	*/
		it('`(3, 4) eql 3', () => expect(pipeIntoConst(3, 4)).eql(3));
		it('(3` 2),^$ eql [3, 3]', () => expect(twoThrees).eql([3, 3]));
		it('(2 4).(].(` ).[ [),^$ eql [4, 4]', () => expect(twoFours).eql([4, 4]));
		it(':.(].(` ).[ [).^$(2, 3) eql [3, 3]', () => expect(replicate(2, 3)).eql([3, 3]));
		it('2repli(1 2 3) eql [1, 1, 2, 2, 3, 3]', () => expect(repliInPlace).eql([1, 1, 2, 2, 3, 3]));
		it('repli(3, [4, 5]) eql [4, 4, 4, 5, 5, 5]', () => expect(repli(3, [4, 5])).eql([4, 4, 4, 5, 5, 5]));
	});

	describe("16. dropEvery :.([.-1.% ,(.(; ) ;).%$).@$.[@.+$", () => {
	/*ts
		testMapApply			(*2 (1 2 3)),@$
		chunk					,(.(; ) ;).%$
		breakUp					:.(,(.(; ) ;).%$ )
		modifiedSplit			[.-1.%
		endSplit				[.%
		sum						2+3
		addTwo					2,+
		splitArray				2,%
		joinAndRecombine		:,(.(; ) ;).%$
		splitMinusTwo			~2%
		dropEvery				:.([.-1.% ,(.(; ) ;).%$).@$.[@.+$
	*/
		it('(*2 (1 2 3)),@$ eql [2, 4, 6]', () => expect(testMapApply).eql([2, 4, 6]));
		it(':.(,(.(; ) ;).%$ )(2, [1, 2, 3, 4, 5]) eql [[[1, 2], [3, 4], [5]]]', () => expect(breakUp(2, [1, 2, 3, 4, 5])).eql([[[1, 2], [3, 4], [5]]]));
		it('[.-1.%([2, 4])([4, 5, 6]) eql [[4], [5, 6]]', () => expect(modifiedSplit([2, 4])([4, 5, 6])).eql([[4], [5, 6]]));
		it('[.%([1, 2])([4, 5, 6]) eql [[4], [5, 6]]', () => expect(endSplit([1, 2])([4, 5, 6])).eql([[4], [5, 6]]));
		it('2+3 eql 5', () => expect(sum).eql(5));
		it('2,+(4) eql 6', () => expect(addTwo(4)).eql(6));
		it('2,%([1, 2, 3, 4, 5]) eql [[1, 2], [3, 4, 5]]', () => expect(splitArray([1, 2, 3, 4, 5])).eql([[1, 2], [3, 4, 5]]));
		it(':,(.(; ) ;).%$(2, [1, 2, 3, 4, 5]) eql [[1, 2], [3, 4], [5]]', () => expect(joinAndRecombine(2, [1, 2, 3, 4, 5])).eql([[1, 2], [3, 4], [5]]));
		it("~2split([1, 2, 3, 4, 5]) eql [[1, 2, 3], [4, 5]]", () => expect(splitMinusTwo([1, 2, 3, 4, 5])).eql([[1, 2, 3], [4, 5]]));
		it(':.([.-1.% ,(.(; ) ;).%$).@$.[@.+$(3, [1, 2, 3, 4, 5, 6, 7, 8]) eql [1, 2, 4, 5, 7, 8]', () => expect(dropEvery(3, [1, 2, 3, 4, 5, 6, 7, 8])).eql([1, 2, 4, 5, 7, 8]));
		it(':.([.-1.% ,(.(; ) ;).%$).@$.[@.+$("abcdefghik") eql "abdeghk"', () => expect(dropEvery(3, "abcdefghik")).eql("abdeghk"));
	});

	describe("17. split %", () => {
	/*ts
		split				%
	*/
		it('%(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) eql [[1, 2, 3], [4, 5, 6, 7, 8, 9, 10]]', () => expect(split(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).eql([[1, 2, 3], [4, 5, 6, 7, 8, 9, 10]]));
		it('%(3, "abcdefghik") eql ["abc", "defghik"]', () => expect(split(3, "abcdefghik")).eql(["abc", "defghik"]));
	});

	describe("18. slice :,(.([ _.-$ 0`) ;).%$.1'", () => {
	/*ts
		slice				:,(.([ _.-$ 0`) ;).%$.1'
	*/
		it("slice([2, 7], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) eql [3, 4, 5, 6, 7]", () => expect(slice([2, 7], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).eql([3, 4, 5, 6, 7]));
		it('slice([2, 7], "abcdefghik") eql "cdefg"', () => expect(slice([2, 7], "abcdefghik")).eql("cdefg"));
	});

	describe("19. rotate %._.+$", () => {
	/*ts
		rotate				%._.+$
		split				%
	*/
		it('rotate(3, [1, 2, 3, 4, 5, 6, 7, 8]) eql [4, 5, 6, 7, 8, 1, 2, 3]', () => expect(rotate(3, [1, 2, 3, 4, 5, 6, 7, 8])).eql([4, 5, 6, 7, 8, 1, 2, 3]));
		it('%(-2, "abcde" eql ["abc", "de"]', () => expect(split(-2, "abcde")).eql(["abc", "de"]));
		it('rotate(-2, "abcdefgh") eql "ghabcdef"', () => expect(rotate(-2, "abcdefgh")).eql("ghabcdef"));
	});

	describe("20. removeAt :,(.(; 1` 0`) ;).%$.([ ]).+$", () => {
	/*ts
		removeAt			:,(.(; 1` 0`) ;).%$.([ ]).+$
	*/
		it('removeAt(2, [1, 2, 3, 4, 5, 6]) eql [1, 2, 4, 5, 6]', () => expect(removeAt(2, [1, 2, 3, 4, 5, 6])).eql([1, 2, 4, 5, 6]));
		it('removeAt(1, "abcd") eql "acd"', () => expect(removeAt(1, "abcd")).eql("acd"));
	});

	describe("21. insertAt :.(.([.[ ]).%$ [.]).([.[ .(] ) [.]).+$", () => {
	/*ts
		splitUp						:.(.([.[ ]).%$ [.])
		insertAt					:.(.([.[ ]).%$ [.]).([.[ .(] ) [.]).+$
		insertAtString				:.(.([.[ ]).%$ [.]).([.[ ] [.]).+$
	*/
		it(':.(.([.[ ]).%$ [.])([2, 8], [1, 2, 3, 4, 5]) eql [[[1, 2], [3, 4, 5]], 8]', () => expect(splitUp([2, 8], [1, 2, 3, 4, 5])).eql([[[1, 2], [3, 4, 5]], 8]));
		it('insertAt([2, 8], [1, 2, 3, 4, 5]) eql [1, 2, 8, 3, 4, 5]', () => expect(insertAt([2, 8], [1, 2, 3, 4, 5])).eql([1, 2, 8, 3, 4, 5]));
		it(':.(.([.[ ]).%$ [.]).([.[ ] [.]).+$([2, "alpha"], "abcde") eql "abalphacde"', () => expect(insertAtString([2, "alpha"], "abcde")).eql("abalphacde"));
	});

	describe("22. range :.([.+ _.-$).^$", () => {
	/*ts
		range			:.([.+ _.-$).^$
	*/
		it('range(2, 6) eql [2, 3, 4, 5]', () => expect(range(2, 6)).eql([2, 3, 4, 5]));
	});

	describe('23. rndSelect :,(; {"Math.random"<).%$.[', () => {
	/*ts
		rndSelect				:,(; {"Math.random"<).%$.[
	*/
		it('rndSelect(3, [1, 2, 3, 4, 5, 6, 7, 8]) ~ [5, 4, 6]', () => {
			const array = [1, 2, 3, 4, 5, 6, 7, 8];
			const result = rndSelect(3, array);

			return expect(result.length === 3) && expect(all(value => contains(value)(array))(result)) && expect(isUnique(result));
		})
	});

	describe('25. rndPermu {"Math.random"<', () => {
	/*ts
		rndPermu			{"Math.random"<
	*/
		it('rndPermu([1, 2, 3, 4, 5, 6]) ~ [3, 5, 2, 1, 4, 6]', () => {
			const array = [1, 2, 3, 4, 5, 6];
			const result = rndPermu(array);

			return expect(result.length === array.length) && expect(all(value => contains(value)(array))(result)) && expect(isUnique(result));
		});
	});
});

mocha.run();