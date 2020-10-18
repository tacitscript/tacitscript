const {expect, assert} = chai;
import ts from "tacitscript";

mocha.setup('bdd');

describe("Operators", () => {
	describe(". (dot)", () => {
		describe("pipe (XY)(YZ)(XZ)", () => {
		/*ts
			pipe				.
			calculation			(+2.(*3))4
			pipeToBacktick		+2.`
		*/

			it("pipe(x => x + 2, x => x * 3)(4) eql 18", () => expect(pipe(x => x + 2, x => x * 3)(4)).eql(18));
			it("(+2.(*3))4 eql 18", () => expect(calculation).eql(18));
			it("+2.`(3)(4) eql 5", () => expect(pipeToBacktick(3)(4)).eql(5));
		});

		describe("binaryUnaryPipe (XYZ)(ZW)(XYW)", () => {
		/*ts
			binaryUnaryPipe		.
			calculation			6(/.(*3))2
			pipeToBacktick		+.`
		*/

			it("binaryUnaryPipe((x, y) => x / y, x => x * 3)(6, 2) eql 9", () => expect(binaryUnaryPipe((x, y) => x / y, x => x * 3)(6, 2)).eql(9));
			it("6(/.(*3))2 eql 9", () => expect(calculation).eql(9));
			it("+.`(2, 3)(4, 5) eql 5", () => expect(pipeToBacktick(2, 3)(4, 5)).eql(5));
		});

		describe("unaryBinaryPipe (XY)(YZW)(X(ZW))", () => {
		/*ts
			unaryBinaryPipe		.
			calculation			((-3./)9)3
		*/

			it("unaryBinaryPipe(x => x - 3, (x, y) => x / y)(9)(3) eql 2", () => expect(unaryBinaryPipe(x => x - 3, (x, y) => x / y)(9)(3)).eql(2));
			it("((-3./)9)3 eql 2", () => expect(calculation).eql(2));
		});

		describe("pipeToArray (??)A(?A)", () => {
		/*ts
			arrayPipe			.
			calculation			(10/.(10- 3*))2
		*/

			it("arrayPipe(x => 10 / x, [x => 10 - x, x => 3 * x])(2) eql [5, 15]", () => expect(arrayPipe(x => 10 / x, [x => 10 - x, x => 3 * x])(2)).eql([5, 15]));
			it("(10/.(10- 3*))2 eql [5, 15]", () => expect(calculation).eql([5, 15]));
		});

		describe("binaryPipeToArray (???)A(??A)", () => {
		/*ts
			binaryPipeToArray	.
			calculation			5(-.(10- 3*))2
		*/

			it("binaryPipeToArray((x, y) => x - y, [x => 10 - x, x => 3 * x])(5, 2) eql [7, 9]", () => expect(binaryPipeToArray((x, y) => x - y, [x => 10 - x, x => 3 * x])(5, 2)).eql([7, 9]));
			it("5(-.(10- 3*))2 eql [7, 9]", () => expect(calculation).eql([7, 9]));
		});

		describe("zipApplyTo AAA", () => {
		/*ts
			zipApplyTo			.
			calculation			(2 3).(10/ 7-)
		*/

			it("zipApplyTo([2, 3], [x => 10 / x, x => 7 - x]) eql [5, 4]", () => expect(zipApplyTo([2, 3], [x => 10 / x, x => 7 - x])).eql([5, 4]));
			it("(2 3).(10/ 7-) eql [5, 4]", () => expect(calculation).eql([5, 4]));
		})
	});

	describe(", (comma)", () => {
		describe("applyTo X(XY)Y", () => {
		/*ts
			applyTo				,
			calculation			3,(12/)
			applyToBacktick		+2,`
		*/

			it("applyTo(3, x => 12 / x) eql 4", () => expect(applyTo(3, x => 12 / x)).eql(4));
			it("3,(12/) eql 4", () => expect(calculation).eql(4));
			it("+2,`(3)(4) eql 6", () => expect(applyToBacktick(3)(4)).eql(6));
		});

		describe("applyToBinary X(XYZ)(YZ)", () => {
		/*ts
			applyToBinary		,
			calculation			(12,/)4
			applyToBacktick		+,`
		*/

			it("applyToBinary(12, (x, y) => x / y)(4) eql 3", () => expect(applyToBinary(12, (x, y) => x / y)(4)).eql(3));
			it("(12,/)4 eql 3", () => expect(calculation).eql(3));
			it("+,`(2, 3)(4, 5) eql 9", () => expect(applyToBacktick(2, 3)(4, 5)).eql(9));
		});

		describe("applyToArray ?AA", () => {
		/*ts
			applyToArray		,
			calculation			2,(10/ 5-)
			calculationB		(4 5 6),(# ])
		*/
			it("applyToArray(2, [x => 10 / x, x => 5 - x]) eql [5, 3]", () => expect(applyToArray(2, [x => 10 / x, x => 5 - x])).eql([5, 3]));
			it("2,(10/ 5-) eql [5, 3]", () => expect(calculation).eql([5, 3]));
			it("(4 5 6),(# ]) eql [3, 6]", () => expect(calculationB).eql([3, 6]));
		});
	});
});

mocha.run();