const {expect} = chai;
import ts from "tacitscript";

mocha.setup('bdd');

export default () => {
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
		factorialIterative			+1^.*$
	*/
		it('=1?,(; .(; -1.factorial).*$).|$(1) eql 1', () => expect(factorial(1)).eql(1));
		it('=1?,(; .(; -1.factorial).*$).|$(2) eql 2', () => expect(factorial(2)).eql(2));
		it('=1?,(; .(; -1.factorial).*$).|$(4) eql 24', () => expect(factorial(4)).eql(24));
		it("factorial iterative", () => expect(factorialIterative(4)).eql(24));
	});

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
		
	describe("string conversion of negative numbers", () => {
	/*ts
		result			""+(_2)
	*/
		it(`""+(_2)="_2"`, () => expect(result).eql("_2"));
	});

	describe("mutual recursive language embedding", () => {
	/*ts
		embed			"/*ts 1"+.+" */".{
	*/
		it(`"/*ts 1"+.+" */".{("") eql 1`, () => expect(embed("")).eql(1));
	});

	describe("toString", () => {
	/*ts
		array		""+(1 _2 "string" () !() (4 5) \(("a" 7) ("b" 8)))
	*/
		it(`""+(1 _2 "string" () !() (4 5) \(("a" 7) ("b" 8))) eql "(1 _2 "string" () !() (4 5) (\\(("a" 7) ("b" 8))))"`, () => expect(array).eql(`(1 _2 "string" () !() (4 5) (\\(("a" 7) ("b" 8))))`));
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
};
