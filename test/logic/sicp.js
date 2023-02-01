const {expect, assert} = chai;
import ts from "tacitscript";

export default () => {
	describe("factRec", () => {
		/*ts
			factRec			((=0 1`) .(; -1.factRec).*$)?
		*/
		it("4factRec=24", () => expect(factRec(4)).eql(24));
	});

	describe("1.3 sumOfTwoLarger ;<.1%.].^2@.+$", () => {
		/*ts
			sumOfTwoLarger	;<.1%.].^2@.+$
		*/
		it("sumOfTwoLarger(4 2 3)=25", () => expect(sumOfTwoLarger([4, 2, 3])).eql(25));
	});

	describe("hypotenuse :.^2@.+$.^0.5", () => {
		/*ts
			hypotenuse  :.^2@.+$.^0.5
		*/
		it("3hypotenuse4=5", () => expect(hypotenuse(3, 4)).eql(5));
	});

	describe("1.1.1 sumOfSquares :.^2@.+$", () => {
		/*ts
			sumOfSquares    :.^2@.+$
		*/
		it("3sumOfSquares4=25", () => expect(sumOfSquares(3, 4)).eql(25));
	});

};