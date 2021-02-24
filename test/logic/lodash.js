const {expect} = chai;
import ts from "tacitscript";

export default () => {
	describe("difference", () => {
	/*ts
		difference		:,(@,~.! ;).*$
		result			(2 3)difference(2 1)
	*/
		it("solved", () => expect(result).eql([1]));
	});

	describe("concat", () => {
	/*ts
		concat			((}.="A" ;) .(; ))?@.+$
		result			concat((1 ) 2 (3 ) ((4 ) ))
	*/
		it("solved", () => expect(result).eql([1, 2, 3, [4]]));
	});

	describe("compact", () => {
	/*ts
		compact			;*
		result			compact(0 1 () 2 "" 3)
	*/
		it("solved", () => expect(result).eql([0, 1, 2, 3]));
	});

	describe("chunk", () => {
	/*ts
		chunk			:,(.(; ) ;).%$
		result			3chunk("a" "b" "c" "d")
		resultB			2chunk("a" "b" "c" "d")
	*/
		it("solved", () => expect(result).eql([["a", "b", "c"], ["d"]]));
		it("solved2", () => expect(resultB).eql([["a", "b"], ["c", "d"]]));
	});
};