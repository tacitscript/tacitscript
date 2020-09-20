const {expect, assert} = chai;
import ts from "tacitscript";
import l1 from "../data/1.js";
import parser from "common/src/parser.js";

const {ts2es6} = parser;

mocha.setup("bdd");

//=======================================================================================================
// LESSON 1

describe("Lesson 1 Tests", () => {
	eval(ts2es6(l1).replace(/const /g, "var "));

	it("number equals 3", () => expect(number).eql(3));
	it("decimal equals 3.5", () => expect(decimal).eql(3.5));
	it('string equals "strings may continue\\nover several lines"', () => expect(string).eql("strings may continue\nover several lines"));
	it("falsey equals undefined", () => expect(falsey).eql(undefined));
	it('array equals [1, "hello", undefined, 3]', () => expect(array).eql([1, "hello", undefined, 3]));
	it("expression equals 8", () => expect(expression).eql(8));
	it('pitfall equals 4 ("+ number" is considered a comment)', () => expect(pitfall).eql(4));
	it('calculation equals 7', () => expect(calculation).eql(7));
});

describe("Lesson 1 Exercise Tests", () => {
	/*ts
		numbers		()
	*/

	it('"numbers" is an array', () => expect(Array.isArray(numbers)).eql(true));
	it('"numbers" has more than one element', () => expect(numbers.length > 1).eql(true));
	it('all elements of "numbers" are numbers', () => expect(numbers.every(number => typeof(number) === "number")));
	it('sum of elements in "numbers" equals 20', () => expect(numbers.reduce((a, b) => a + b)).eql(20));
});
