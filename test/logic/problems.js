import ts from "tacitscript";

const {expect} = chai;

export default () => {
	describe("Problems", () => {
		describe("5", () => {
			/*ts
				solutionAA			(3 )%.(;<.[)@
				exampleA			solutionAA(7 3 5
15 20 40
300 550 137)
			*/
			it("example", () => expect(exampleA).eql([3, 15, 137]))
		});

		describe("4", () => {
			/*ts
				solutionAA          (2 )%.((<$ [) ])?@
				exampleA			solutionAA(5 3
2 8
100 15)
				answerA             solutionAA(6634541 1660683
6053501 _6794531
_9256934 _9565526
8756374 _6615097
4625131 7857787
3749614 _4928185
9128463 5865631
3862770 _7293925
1843299 6075901
7900398 _5153609
2912742 6932276
1562664 3783710
_3286165 _133458
_8898629 9829512
3089099 _4583458
_6832763 _1721577
_5908069 3604886
_7188866 9646379
_4826361 2051733
_9042967 _614582
2296815 1050326)
			*/
			it("example", () => expect(exampleA).eql([3, 2, 15]));
			it("answer", () => expect(answerA).eql([1660683,-6794531,-9565526,-6615097,4625131,-4928185,5865631,-7293925,1843299,-5153609,2912742,1562664,-3286165,-8898629,-4583458,-6832763,-5908069,-7188866,-4826361,-9042967,1050326]));
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

		describe("2", () => {
			/*ts
				solutionAN          +$
				exampleN            solutionAN(10 20 30 40 5 6 7 8)
				answerN             solutionAN(118 334 547 663 364 1070 664 1161 997 556 873 543 166 236 1292 937 547 1054 1181 709 76 1002 650 841 932 879 927 178 1018 595 848 1136 111)
			*/
			it("example", () => expect(exampleN).eql(126));
			it("answer", () => expect(answerN).eql(23205));
		});

		describe("1", () => {
			/*ts
				solutionAN          +$
				exampleN			solutionAN(3 5)
				answerN             solutionAN(11658 6671)
			*/
			it("example", () => expect(exampleN).eql(8));
			it("answer", () => expect(answerN).eql(18329));
		});

	});
};