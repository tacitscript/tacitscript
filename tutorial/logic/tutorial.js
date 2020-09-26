const {expect} = chai;
import ts from "tacitscript";
import lesson1 from "../data/lesson1.js";
import lesson2 from "../data/lesson2.js";
import parser from "common/src/parser.js";

const {ts2es6} = parser;
window.ts = ts; // required for release build

mocha.setup("bdd");

//=======================================================================================================
// LESSON 1

describe("Lesson 1 Tests", () => {
	eval(ts2es6(lesson1).replace(/const /g, "var "));

	it("number equals 3", () => expect(number).eql(3));
	it("decimal equals 3.5", () => expect(decimal).eql(3.5));
	it('string equals "strings may continue\\nover several lines"', () => expect(string).eql("strings may continue\nover several lines"));
	it("falsey equals undefined", () => expect(falsey).eql(undefined));
	it('array equals [1, "hello", undefined, 3]', () => expect(array).eql([1, "hello", undefined, 3]));
	it("expression equals 8", () => expect(expression).eql(8));
	it('pitfall equals 4 ("+ number" is considered a comment)', () => expect(pitfall).eql(4));
	it('calculation equals 7', () => expect(calculation).eql(7));
});

//=======================================================================================================
// LESSON 2

describe("Lesson 2 Tests", () => {
	eval(ts2es6(lesson2).replace(/const /g, "var "));

	it('stringCat equals "hello world"', () => expect(stringCat).eql("hello world"));
	it("arrayCat equals [1, 2, 3, 4]", () => expect(arrayCat).eql([1, 2, 3, 4]));
	it("negative equals -5", () => expect(negative).eql(-5));
	it("leftAssoc equals 20", () => expect(leftAssoc).eql(20));
	it("mathematical equals 14", () => expect(mathematical).eql(14));
});


