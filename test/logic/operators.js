const {expect} = chai;
import ts from "tacitscript";

export default () => {
	describe("Operators", () => {
		describe("dot (.)", () => {
			/*ts
				pipe					+1./2
				unaryBinaryPipe			+1./
				binaryUnaryPipe			:.+@
			*/
			it("111 pipe (+1./2)5=3", () => expect(pipe(5)).eql(3));
			it("122 unaryBinaryPipe 7(+1./)4=2", () => expect(unaryBinaryPipe(7, 4)).eql(2));
			it("212 binaryUnaryPipe 3(:.+@)4=7", () => expect(binaryUnaryPipe(3, 4)).eql(7));
		});

		describe("comma (,)", () => {
			/*ts
				applyToUnary			3,+1
				applyToBinary			1,/
				binaryUnaryApply		+,^3
				binaryBinaryApply		+,^
			*/
			it("010 applyToUnary 3,+1=4", () => expect(applyToUnary).eql(4));
			it("021 applyToBinary (1,/)2=0.5", () => expect(applyToBinary(2)).eql(0.5));
			it("2(10)1 binaryUnaryApply (+,^3)1=(1 2 3)", () => expect(binaryUnaryApply(1)).eql([1, 2, 3]));
			it("2(100)2 binaryBinaryApply 1(+,^)3=(1 2 3)", () => expect(binaryBinaryApply(1, 3)).eql([1, 2, 3]));
		});
	});
};