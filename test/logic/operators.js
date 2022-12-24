const {expect} = chai;
import ts from "tacitscript";

export default () => {
	describe("Operators", () => {
		describe("plus (+)", () => {
			/*ts
				stringConcat			"High"+5
				add						2+"3"
				arrayConcat				(1 2 3)+(4 5 6)
				// merge					\(("a" 1) ("b" 2))+(\(("b" 3) ))
			*/
			it('000 stringConcat "High"+5', () => expect(stringConcat).eql("High5"));
			it('000 add 2+"3"=5', () => expect(add).eql(5));
			it("000 arrayConcat (1 2 3)+(4 5 6)=(1 2 3 4 5 6)", () => expect(arrayConcat).eql([1, 2, 3, 4, 5, 6]));
			// it('000 merge \(("a" 1) ("b" 2))+(\(("b" 3))=\(("a" 1) ("b" 3))', () => expect(merge).eql({a: 1, b: 3}));
		});

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