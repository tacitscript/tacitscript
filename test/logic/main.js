const {expect, assert} = chai;
import ts from "tacitscript";

mocha.setup('bdd');

describe("Operators", () => {
	describe(".", () => {
		describe("pipe (XY)(YZ)(XZ)", () => {
		/*ts
			calculations		(12,/)4
			pipe				.
			calculation			(+2.(*3))4
		*/

			it("pipe(x => x + 2, x => x * 3)(4) eql 18", () => expect(pipe(x => x + 2, x => x * 3)(4)).eql(18));
			it("(+2.(*3))4 eql 18", () => expect(calculation).eql(18));
		});
	});

	describe(",", () => {
		describe("applyTo X(XY)Y", () => {
		/*ts
			applyTo				,
			calculation			3,(12/)
		*/

			it("applyTo(3, x => 12 / x) eql 4", () => expect(applyTo(3, x => 12 / x)).eql(4));
			it("3,(12/) eql 4", () => expect(calculation).eql(4));
		});

		describe("applyToBinary X(XYZ)(YZ)", () => {
		/*ts
			applyToBinary		,
			calculation			(12,/)4
		*/

			it("applyToBinary(12, (x, y) => x / y)(4) eql 3", () => expect(applyToBinary(12, (x, y) => x / y)(4)).eql(3));
			it("(12,/)4 eql 3", () => expect(calculation).eql(3));
		});
	});
});

mocha.run();