const {expect} = chai;
import ts from "tacitscript";

export default () => {
	describe("Parser", () => {
		/*ts
			oneN				1
			oneaN				oneN
			addN				oneN+2
			subtractN			9-5
			incrNN				+1
			sixN				incrNN5
			inverseNN			1/
			arrayA				(1 2 3)
			singleElemA			(1 )
			emptyArrayA			( )
			subArrayA			((1 2) )
			falseT				()
			trueT				!()
		*/
		it("oneN 1", () => expect(oneN).eql(1));
		it("oneaN oneN", () => expect(oneaN).eql(1));
		it("addN oneN+2", () => expect(addN).eql(3));
		it("subtractN 9-5", () => expect(subtractN).eql(4));
		it("incrNN +1", () => expect(incrNN(4)).eql(5));
		it("sixN incrNN5", () => expect(sixN).eql(6));
		it("inverseNN 1/", () => expect(inverseNN(2)).eql(0.5));
		it("arrayA (1 2 3)", () => expect(arrayA).eql([1, 2, 3]));
		it("singleElemA (1 )", () => expect(singleElemA).eql([1]));
		it("emptyArrayA ()", () => expect(emptyArrayA).eql([]));
		it("subArrayA ((1 2) )", () => expect(subArrayA).eql([[1, 2]]));
		it("falseT ()", () => expect(falseT).eql(false));
		it("trueT !()", () => expect(trueT).eql(true));
	});

	describe("Order of application", () => {
		/*ts
			binaryPreN			(1+)2
			binaryPostPostN		(+2)1
			unaryPreT			!()
			dotNN				+1.*2
		*/
		it("binaryPreN (1+)2", () => expect(binaryPreN).eql(3));
		it("binaryPostPostN (+2)1", () => expect(binaryPostPostN).eql(3));
		it("unaryPreT !()", () => expect(unaryPreT).eql(true));
		it("dotNN +1.*2", () => expect(dotNN(3)).eql(8));
	});

	describe("Inverted piping", () => {
		/*ts
			nMoreThanLengthNN			+,(#.)
			nMoreThanLengthPlusFiveNB	.(+,(#.) +5`).(.$)
			dotReduceNN					(+1 *2),(.$)
		*/
		it("nMoreThanLengthNN +,(#.)", () => expect(nMoreThanLengthNN(2)([1, 2, 3])).eql(5));
		it("dotReduceNN (+1 *2),(.$)", () => expect(dotReduceNN(3)).eql(8));
		it("nMoreThanLengthPlusFiveNB .(+,(#.) +5`).(.$)", () => expect(nMoreThanLengthPlusFiveNB(2)([1, 2, 3])).eql(10));
	});
};