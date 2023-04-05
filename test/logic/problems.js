import ts from "tacitscript";

const {expect} = chai;

export default () => {
	describe("Problems", () => {
		describe("1", () => {
			/*ts
				solutionAN          +$
				exampleN			solutionAN(3 5)
				answerN             solutionAN(11658 6671)
			*/
			it("example", () => expect(exampleN).eql(8));
			it("answer", () => expect(answerN).eql(18329));
		});

		describe("2", () => {
			/*ts
				solutionAN          +$
				exampleN            solutionAN(10 20 30 40 5 6 7 8)
				answerN             solutionAN(118 334 547 663 364 1070 664 1161 997 556 873 543 166 236 1292 937 547 1054 1181 709 76 1002 650 841 932 879 927 178 1018 595 848 1136 111)
			*/
			it("example", () => expect(exampleN).eql(126));
			it("answer", () => expect(answerN).eql(23205));
		});

		describe("3", () => {
			/*ts
				solutionAA         
			*/
		})
	});
};