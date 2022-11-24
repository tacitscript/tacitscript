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

		describe("1.11 recursive ((<3 ;) .(-1.f -2.f.*2 -3.f.*3).+$)?", () => {
			/*ts
				f	((<3 ;) .(-1.f -2.f.*2 -3.f.*3).+$)?
			*/
			it("((<3 ;) .(-1.f -2.f.*2 -3.f.*3).+$)?4=11", () => expect(f(4)).eql(11));
		});

		// firstFiveFibonacci	(#.<5 _2%.].+$)^(1 1)
		describe("1.12 pascals triangle .(.(>,(#.) (].((0 )+ +(0 )).~.+$@)`) ((1 ) )`).^$", () => {
			/*ts
				pascal		.(.(>,(#.) (].((0 )+ +(0 )).~.+$@)`) ((1 ) )`).^$
			*/
			it(".(.(>,(#.) (].((0 )+ +(0 )).~.+$@)`) ((1 ) )`).^$5=((1 ) (1 1) (1 2 1) (1 3 3 1) (1 4 6 4 1))", () => expect(pascal(5)).eql([[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]));
		});

		describe("exponent recursive", () => {
			/*ts
				exp		:.((=0 1`) .([ .([ ].-1).^$).*$)?
			*/
			it("2(:.((=0 1`) .([ .([ ].-1).^$).*$)?)3=8", () => expect(exp(2, 3)).eql(8));
		});
	});
};