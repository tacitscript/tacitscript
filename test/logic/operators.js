const {expect} = chai;
import ts from "tacitscript";

export default () => {
	describe("comma (,)", () => {
		/*ts
			applyToUnaryN			3,+1
			applyToBinaryNN			1,/
			binaryUnaryApplyNA		+,^3
		*/
		it("applyToUnary		X(XY)Y				3,+1=4", () => expect(applyToUnaryN).eql(4));
		it("applyToBinary		X(XYZ)(YZ)			(1,/)2=0.5", () => expect(applyToBinaryNN(2)).eql(0.5));
		it("binaryUnaryApply	(XYZ)((YZ)W)(XW)	(+,^3)1=(1 2 3)", () => expect(binaryUnaryApplyNA(1)).eql([1, 2, 3]));
	});
};