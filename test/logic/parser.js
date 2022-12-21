const {expect} = chai;
import ts from "tacitscript";
import parser from "../../common/src/parser.js";

const {ts2es6, processTsBlock} = parser;

export default () => {
	describe("Parser", () => {
		/*ts
			one			1
			oneB		one
			add			one+2
			// subtract	9-5
		*/
		it("one 1", () => expect(one).eql(1));
		it("oneB one", () => expect(oneB).eql(1));
		it("add one+2", () => expect(add).eql(3));
	});
};