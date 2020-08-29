const {expect, assert} = chai;
import ts from "./tacitscript.js";

//===========================================================
// tests

describe("Parsing", () => {
	const doubleRecurse = /*ts 2*({"Math.sqrt(/*ts *$(2 2 4)*/)")*/;
	const singleRecurse = /*ts {"Math.sqrt(9)"*2*/;
	const singleLineWithBreaks = /*ts (5
		6
		7) some
	comment*/;
	const singleLine = /*ts 3+5*/;
	const singleLineWithComment = /*ts 4*3*/; // this is a comment
	/*ts
		sum						2+4
		vectorOverLines			(2
			3
			4
		) and some comments here
	*/

	it("2+4 eql 6", () => expect(sum).eql(6));
	it("/*ts 3+5*/ eql 8", () => expect(singleLine).eql(8));
	it("/*ts 4*3*/; // this is a comment eql 12", () => expect(singleLineWithComment).eql(12));
	it("(2\\n\\t3\\n\\t4\\n) and some comments here eql [2, 3, 4]", () => expect(vectorOverLines).eql([2, 3, 4]));
	it(`/*ts {"Math.sqrt(9)"*2*/ eql 6`, () => expect(singleRecurse).eql(6));
	it(`/*ts 2*({"Math.sqrt(/*ts *$(2 2 4)*/)")*/ eql 8`, () => expect(doubleRecurse).eql(8));
});
