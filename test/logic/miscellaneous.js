const {expect} = chai;
import ts from "tacitscript";

mocha.setup('bdd');

export default () => {
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
