const {expect} = chai;
import ts from "tacitscript";

export default () => {
	describe("SICP", () => {
		describe("1.1.1 sumOfSquares :.^2@.+$", () => {
			/*ts
				sumOfSquares    :.^2@.+$
			*/
			it("3sumOfSquares4=25", () => expect(sumOfSquares(3, 4)).eql(25));
		});

		describe("hypotenuse :.^2@.+$.^0.5", () => {
			/*ts
				hypotenuse  :.^2@.+$.^0.5
			*/
			it("3hypotenuse4=5", () => expect(hypotenuse(3, 4)).eql(5));
		});

		describe("1.3 sumOfTwoLarger ;<.1%.].^2@.+$", () => {
			/*ts
				sumOfTwoLarger	;<.1%.].^2@.+$
			*/
			it(";<.1%.].^2@.+$(4 2 3)=25", () => expect(sumOfTwoLarger([4, 2, 3])).eql(25));
		});

		describe("recursive factorial ((=0 1`) .(; -1.fact).*$)?", () => {
			/*ts
				fact	((=0 1`) .(; -1.fact).*$)?
			*/
			it("((=0 1`) .(; -1.fact).*$)?4=24", () => expect(fact(4)).eql(24));
		});

		describe("generator factorial +1^.*$", () => {
			/*ts
				fact	+1^.*$
			*/
			it("+1^.*$4=24", () => expect(fact(4)).eql(24));
		});

		describe("fibonacci recursive ((=0 0`) (=1 1`) .(-1 -2).fib@.+$)?", () => {
			/*ts
				fib		((=0 0`) (=1 1`) .(-1 -2).fib@.+$)?
			*/
			it("((=0 0`) (=1 1`) .(-1 -2).fib@.+$)?4=3", () => expect(fib(4)).eql(3));
		});
	});
};