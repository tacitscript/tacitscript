const {expect} = chai;
import ts from "tacitscript";

export default () => {
	describe("Parser", () => {
		/*ts
			one			1
			oneB		one
			add			one+2
			subtract	9-5
			incr		+1
			six			incr5
			inverse		1/
			array		(1 2 3)
		*/
		it("one 1", () => expect(one).eql(1));
		it("oneB one", () => expect(oneB).eql(1));
		it("add one+2", () => expect(add).eql(3));
		it("subtract 9-5", () => expect(subtract).eql(4));
		it("incr +1", () => expect(incr(4)).eql(5));
		it("six incr5", () => expect(six).eql(6));
		it("inverse 1/", () => expect(inverse(2)).eql(0.5));
		it("array (1 2 3)", () => expect(array).eql([1, 2, 3]));
	});
};