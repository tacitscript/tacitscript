const {expect} = chai;
import ts from "tacitscript";
import {streamFromArray} from "utilities";

export default () => {
	xdescribe("", () => {
		/*ts

		*/
		it("", () => expect().eql());
	});

	describe("Utilities", () => {
		describe("streamFromArray .(#.>.(#.) .(#` ',~).(.$)).^$.(( ),)", () => {
			/*ts
				solutionA			{(streamFromArray(1 2 3))				A
			*/
			it("streamArray(1 2 3).{=(1 2 3)", () => expect(solutionA).eql([1, 2, 3]));
		});
	});
};