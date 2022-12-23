const {expect} = chai;
import ts from "tacitscript";

export default () => {
	describe("Operators", () => {
		describe("comma (,)", () => {
			/*ts
				// applyToUnary			3,+1
				// applyToBinary			1,/
				// binaryUnaryApply		+,^3
				// binaryBinaryApply		+,^
			*/
			// it("010 applyToUnary 3,+1=4", () => expect(applyToUnary).eql(4));
			// it("021 applyToBinary (1,/)2=0.5", () => expect(applyToBinary(2)).eql(0.5));
			// it("211 binaryUnaryApply (+,^3)1=(1 2 3)", () => expect(binaryUnaryApply(1)).eql([1, 2, 3]));
			// it("222 binaryBinaryApply 1(+,^)3=(1 2 3)", () => expect(binaryBinaryApply(1, 3)).eql([1, 2, 3]));
		});
	});
};