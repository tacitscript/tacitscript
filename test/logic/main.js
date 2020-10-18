const {expect, assert} = chai;
import ts from "tacitscript";

mocha.setup('bdd');

describe("Operators", () => {
	describe(".", () => {
		describe("pipe (XY)(YZ)(XZ)", () => {
		/*ts
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
			calculation			3,(2*)
		*/

			it("applyTo(3, x => 2 * x) eql 6", () => expect(applyTo(3, x => 2 * x)).eql(6));
			it("3,(2*) eql 6", () => expect(calculation).eql(6));
		});
	});
});

mocha.run();