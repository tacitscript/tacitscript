const {expect} = chai;
import ts from "tacitscript";

export default () => {
	describe("slash (/)", () => {
		/*ts
			divideN					8/2
			divideO					2/0
		*/
		it('divide					NNN						8/2=4', () => expect(divideN).eql(4));
		it('divide					NNO						2/0=(1/0)', () => expect(divideO).eql(undefined));
	});

	describe("plus (+)", () => {
		/*ts
			addN					2+3
			parseN					2+"3"
			parseO					2+"abc"
			stringConcatS			"abc"+"def"
			toStringS				"2"+3
			arrayConcatA			(1 2 3)+(4 5 6)
			mergeD					(("a" 1) ("b" 2))\+((("b" 3) ("c" 4))\)
		*/
		it('add						NNN						2+3=5', () => expect(addN).eql(5));
		it('parse					NSN						2+"3"=5', () => expect(parseN).eql(5));
		it('parse					NSO						2+"abc"=(1/0)', () => expect(parseO).eql(undefined));
		it('stringConcat			SSS						"abc"+"def"="abcdef"', () => expect(stringConcatS).eql("abcdef"));
		it('toString				SVS						"2"+3="23"', () => expect(toStringS).eql("23"));
		it('arrayConcat				AAA						(1 2 3)+(4 5 6)', () => expect(arrayConcatA).eql([1, 2, 3, 4, 5, 6]));
		it('merge					DDD						(("a" 1) ("b" 2))\\+((("b" 3) ("c" 4))\\)=((("a" 1") ("b" 3) ("c" 4))\\)', () => expect(mergeD).eql({a: 1, b: 3, c: 4}));
	});

	describe("dot (.)", () => {
		/*ts
			pipeNN					+1.*2
			unaryBinaryPipeNB		+1./
			binaryUnaryPipeNNN		:.-$
			applyToArrayA			(1 2 3).(# [)
			pipeToArrayAA			[.(+1 -2)
			pipeBinaryToArrayNNA	:.(+$ -$)
		*/
		it("pipe					(XY)(YZ)(XZ)			(+1.*2)3=8", () => expect(pipeNN(3)).eql(8));
		it("unaryBinaryPipe			(XY)(YZW)(X(ZW))		(+1./)7(4)=2", () => expect(unaryBinaryPipeNB(7)(4)).eql(2));
		it("binaryUnaryPipe			(XYZ)(ZW)(XYW)			5(:.-$)3=2", () => expect(binaryUnaryPipeNNN(5, 3)).eql(2));
		it("applyToArray			VAA						(1 2 3).(# [)=(3 1)", () => expect(applyToArrayA).eql([3, 1]));
		it("pipeToArray				(VV)A(VA)				[.(+1 -2)(3 2 1)=(4 1)", () => expect(pipeToArrayAA([3, 2, 1])).eql([4, 1]));
		it("pipeBinaryToArray		(VVV)A(VVA)				5(:.(+$ -$))3=(8 2)", () => expect(pipeBinaryToArrayNNA(5, 3)).eql([8, 2]));
	});

	describe("comma (,)", () => {
		/*ts
			applyToUnaryN			3,+1
			applyToBinaryNN			1,/
			binaryUnaryApplyNA		+,^3
			binaryUnaryApplyNB		>,(#.)
			zipApplyToA				(3 1),(+1 /),(; 2,)
			unaryZipApplyToA		1$,(*2 /2)
			binaryZipApplyToNNA		:,(+1 -1)
		*/
		it("applyToUnary			X(XY)Y					3,+1=4", () => expect(applyToUnaryN).eql(4));
		it("applyToBinary			X(XYZ)(YZ)				(1,/)2=0.5", () => expect(applyToBinaryNN(2)).eql(0.5));
		it("binaryUnaryApply		(XYZ)((YZ)W)(XW)		(+,^3)1=(1 2 3)", () => expect(binaryUnaryApplyNA(1)).eql([1, 2, 3]));
		it("binaryUnaryApply		(XYZ)((YZ)(WU))(X(WU))	>,(#.)(3)(1 2 3)=()", () => expect(binaryUnaryApplyNB(3)([1, 2, 3])).eql(false));
		it("zipApplyTo				AAA						(3 1),(+1 /),(; 2,)=(4 0.5)", () => expect(zipApplyToA).eql([4, 0.5]));
		it("unaryZipApplyTo			(XA)A(XA)				1$,(*2 /2)(2 )=(2 1)", () => expect(unaryZipApplyToA([2])).eql([2, 1]));
		it("binaryZipApplyTo		(XYA)A(XYA)				4(:,(+1 -1))3=(5 2)", () => expect(binaryZipApplyToNNA(4, 3)).eql([5, 2]));
	});
};