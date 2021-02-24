const {expect} = chai;
import ts from "tacitscript";

export default () => {
	describe("chunk", () => {
	/*ts
		chunk			:,(.(; ) ;).%$
		result			3chunk("a" "b" "c" "d")
	*/
		it("solved", () => expect(result).eql([["a", "b", "c"], ["d"]]));
	});
};