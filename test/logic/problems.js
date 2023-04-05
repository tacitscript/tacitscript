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
				solutionAA          (2 )%.+$@
				exampleA			solutionAA(100 8
15 245
1945 54)
				answerA             solutionAA(21717 947651
45832 240654
817530 111556
304628 562100
453020 994395
323563 368565
291330 57135
237059 390101
202667 53436
858135 481416
123681 890118
824072 848121
897852 181543
41582 691942)
			*/
			it("example", () => expect(exampleA).eql([108, 260, 1999]));
			it("answer", () => expect(answerA).eql([969368,286486,929086,866728,1447415,692128,348465,627160,256103,1339551,1013799,1672193,1079395,733524]));
		})
	});
};