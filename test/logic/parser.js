const {expect} = chai;
import ts from "tacitscript";

export default () => {
	describe("Parser", () => {
		/*ts
			oneN				1
			oneaN				oneN
		*/
		it("oneN 1", () => expect(oneN).eql(1));
		it("oneaN one", () => expect(oneaN).eql(1));

	});
};