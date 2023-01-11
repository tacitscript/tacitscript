const {expect} = chai;
import ts from "tacitscript";

export default () => {
	describe("comma (,)", () => {
		/*ts
			applyToUnaryN			3,+1
			applyToBinaryNN			1,/
			binaryUnaryApplyNA		+,^3
			binaryUnaryApplyNB		>,(#.)
			zipApplyToA				(3 6),(+1 /),(; 2,)
			unaryZipApplyToA		$2,(*2 /2)
			binaryZipApplyToNNA		:,(+1 -1)
		*/
		it("applyToUnary		X(XY)Y					3,+1=4", () => expect(applyToUnaryN).eql(4));
		it("applyToBinary		X(XYZ)(YZ)				(1,/)2=0.5", () => expect(applyToBinaryNN(2)).eql(0.5));
		it("binaryUnaryApply	(XYZ)((YZ)W)(XW)		(+,^3)1=(1 2 3)", () => expect(binaryUnaryApplyNA(1)).eql([1, 2, 3]));
		it("binaryUnaryApply	(XYZ)((YZ)(WU))(X(WU))	>,(#.)(3)(1 2 3)=()", () => expect(binaryUnaryApplyNB(3)([1, 2, 3])).eql(false));
		it("zipApplyTo			AAA						(3 6),(+1 /),(; 2,)=(4 3)", () => expect(zipApplyToA).eql([4, 3]));
		it("unaryZipApplyTo		(XA)A(XA)				$2,(*2 /2)(1 )=(2 1)", () => expect(unaryZipApplyToA([1])).eql([2, 1]));
		it("binaryZipApplyTo	(XYA)A(XYA)				4(:,(+1 -1))3=(5 2)", () => expect(binaryZipApplyToNNA(4, 3)).eql([5, 2]));
	});
};