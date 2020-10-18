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
			invertedSense				-1.7,
		*/
			it("([pipe)(value => value * 2)([3, 4, 5]) eql 6", () => expect(firstThen(value => value * 2)([3, 4, 5])).eql(6));
			it("(pipe(/2))(array => array[0])([10, 8, 9]) eql 5", () => expect(thenDivideByTwo(array => array[0])([10, 8, 9])).eql(5));
			it("([pipe(/2))([4, 5, 7]) eql 4", () => expect(firstThenDivideByTwo([4, 5, 7])).eql(2));
			it('(#.<3)([4, 5]) eql true', () => expect(sizeLessThanThree([4, 5])).eql(true));
			it('-1.7, eql 6', () => expect(invertedSense).eql(6));
		});

		describe("binaryPipe (XYZ)(ZW)(XYW)", () => {
		/*ts
			add						:.+$
			addTwoAndThree			2add3
		*/
			it('2(:.+$)3 eql 5', () => expect(addTwoAndThree).eql(5));
			it(':.+$(2, 3) eql 5', () => expect(add(2, 3)).eql(5));
		});

		describe("arrayPipe (??)AA (???)AA", () => {
		/*ts

			chainedComma		,(- ),(5. )
			zipPipe				,(+2 -),(; 5.)
			zipPipeInPlace		zipPipe(5 3)
			inlineApplication	(4 8),(+2 -),(; 5.)
		*/

		
			it(',(- ),(5. )([9]) eql 4', () => expect(chainedComma([9])).eql([4]));
			it(',(+2 -),(; 5.)([7, 9]) eql [9, 4]', () => expect(zipPipe([7, 9])).eql([9, 4]));
			it(',(+2 -),(; 5.)(5 3) eql [7, -2]', () => expect(zipPipeInPlace).eql([7, -2]));
			it('(4 8),(+2 -),(; 5.) eql [6, 3]', () => expect(inlineApplication).eql([6, 3]));
		});

		describe("zipPipe AAA", () => {
		/*ts
			commaArray			.(-1 )
		*/

			it('.(-1 )([5]) eql [4]', () => expect(commaArray([5])).eql([4]));
		});	
	});

	describe(",", () => {
		describe("applyTo X(XY)Y", () => {
		/*ts
			applyTo					,
			twoApplyTo				2,
			stringApplyTo			"hello",
			arrayApplyTo			(1 2 3),
			twoApplyToThreePlus		2,(3+)
			stringApplyToLength		"hello",#
			arrayApplyToFirst		(1 2 3),[
			twoDotPlusThree			2,+3
			twoApplyToPlusThree		2applyTo(+3)
		*/
			it("2,(x => 3 + x) eql 5", () => expect(twoApplyTo(x => 3 + x)).eql(5));
			it("\"hello\",(x => x.length) eql 6", () => expect(stringApplyTo(x => x.length)).eql(5));
			it("(1 2 3),(x => x[0]) eql 6", () => expect(arrayApplyTo(x => x[0])).eql(1));
			it("2,(3+) eql 5", () => expect(twoApplyToThreePlus).eql(5));
			it("\"hello\",# eql 5", () => expect(stringApplyToLength).eql(5));
			it("(1 2 3),[ eql 1]", () => expect(arrayApplyToFirst).eql(1));
			it("2,+3 eql 5", () => expect(twoDotPlusThree).eql(5));
			it("2applyTo(+3) eql 5", () => expect(twoApplyToPlusThree).eql(5));
		});

		describe("applyToBinary X(XYZ)(YZ)", () => {
		/*ts
			fiveMinus				5,-
		*/

			it('(5,-)(2) eql 3', () => expect(fiveMinus(2)).eql(3));
		});

		describe("applyToArray ?AA", () => {
		/*ts
			sevenApplyToArray		7,(+2 -)
			applyToArray			,
			sixApplyToArray			6,
			stringApplyToArray		"hello",
			applyToArrayArray		,(# ])
			arrayApplyToArray		(5 6),(# [)
			zipApplyToTopHeavy		(1 2 3):(*3 +7).~.,$@
			zipApplyBottomHeavy		(4 5):(/2 -1 *8).~.,$@
		*/

			it('7,(+2 -)[0] eql 9', () => expect(sevenApplyToArray[0]).eql(9));
			it('7,(+2 -)[1](3) eql 4', () => expect(sevenApplyToArray[1](3)).eql(4));
			it("6,([x => x + 3, x => x * 3]) eql [5, 6]", () => expect(sixApplyToArray([x => x + 3, x => x * 3])).eql([9, 18]));
			it("\"hello\",([x => x.length, x => x[0]]) eql [5, \"h\"]", () => expect(stringApplyToArray([x => x.length, x => x[0]])).eql([5, "h"]));
			it(",(# ])([7, 8, 9]) eql [3, 9]", () => expect(applyToArrayArray([7, 8, 9])).eql([3, 9]));
			it("(5 6),(# [) eql [2, 5]", () => expect([arrayApplyToArray, ts.typeOf(arrayApplyToArray)]).eql([[2, 5], "A"]));
			it('(1 2 3):(*3 +7).~.,$@ eql [3, 9]', () => expect(zipApplyToTopHeavy).eql([3, 9]));
			it('(4 5):(/2 -1 *8).~.,$@ eql [2, 4]', () => expect(zipApplyBottomHeavy).eql([2, 4]));
		});
	});
});

mocha.run();