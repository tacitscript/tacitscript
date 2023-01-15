const {expect, assert} = chai;
import ts from "tacitscript";

export default () => {
	describe("minus (-)", () => {
		/*ts
			subtractN				5-2
			omitKeyD				"a"-((("a" 1) )\)
		*/
		it('subtract				NNN						5-2=3', () => expect(subtractN).eql(3));
		it('omitKey					SDD						"a"-((("a" 1) )\)=(( )\)', () => expect(omitKeyD).eql({}));
	});

	describe("greater (>)", () => {
		/*ts
			greaterT				3>2
			greateraT				"abc">"def"
			descendingSortA			;>(2 3 1)
			descendingSortaA		;>("b" "c" "a")
			overA					((1 ) +1)>(3 5 7)
			overD					(("a" ) +1)>((("a" 1) )\)
		*/
		it("greater					NNT						3>2=(()!)", () => expect(greaterT).eql(true));
		it('greater					SST						"abc">"def"=()', () => expect(greateraT).eql(false));
		it('descendingSort			(VN)AA					;>(2 3 1)=(3 2 1)', () => expect(descendingSortA).eql([3, 2, 1]));
		it('descendingSort			(VS)AA					;>("b" "c" "a")=("c" "b" "a")', () => expect(descendingSortaA).eql(["c", "b", "a"]));
		it('over					AAA						((1 ) +1)>(3 5 7)=(3 6 7)', () => expect(overA).eql([3, 6, 7]));
		it('over					ADD						(("a" ) +1)>((("a" 1) )\\)=((("a" 2) )\\)', () => expect(overD).eql({a: 2}));
	});

	describe("less (<)", () => {
		/*ts
			lessT					3<2
			lessaT					"abc"<"def"
			ascendingSortA			;<(2 3 1)
			ascendingSortaA			;<("b" "c" "a")
			tapNN					"x => console.log.call(null, x)"{<
		*/
		it("less					NNT						3<2=()", () => expect(lessT).eql(false));
		it('less					SST						"abc"<"def"=(()!)', () => expect(lessaT).eql(true));
		it('ascendingSort			(VN)AA					;<(2 3 1)=(1 2 3)', () => expect(ascendingSortA).eql([1, 2, 3]));
		it('ascendingSort			(VS)AA					;<("b" "c" "a")=("a" "b" "c")', () => expect(ascendingSortaA).eql(["a", "b", "c"]));

		let spy;
		before(() => spy = sinon.spy(console, "log"));
		it('tap						(V?)VV					"x => console.log.call(null, x)"{<3=3', () => {
			expect(tapNN(3)).eql(3);
			assert(spy.calledWith(3));
		});
		after(() => spy.restore());
	});

	describe("slash (/)", () => {
		/*ts
			divideN					8/2
			divideO					2/0
			groupByD				[/("ann" "ben" "ade")
		*/
		it('divide					NNN						8/2=4', () => expect(divideN).eql(4));
		it('divide					NNO						2/0=(1/0)', () => expect(divideO).eql(undefined));
		it('groupBy					(VS)AD					[/("ann" "ben" "ade")=(("a" ("ann" "ade")) ("b" ("ben" ))\\)', () => expect(groupByD).eql({a: ["ann", "ade"], b: ["ben"]}));
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
		it("binaryUnaryApply		(XYZ)((YZ)(WR))(X(WR))	>,(#.)(3)(1 2 3)=()", () => expect(binaryUnaryApplyNB(3)([1, 2, 3])).eql(false));
		it("zipApplyTo				AAA						(3 1),(+1 /),(; 2,)=(4 0.5)", () => expect(zipApplyToA).eql([4, 0.5]));
		it("unaryZipApplyTo			(XA)A(XA)				1$,(*2 /2)(2 )=(2 1)", () => expect(unaryZipApplyToA([2])).eql([2, 1]));
		it("binaryZipApplyTo		(XYA)A(XYA)				4(:,(+1 -1))3=(5 2)", () => expect(binaryZipApplyToNNA(4, 3)).eql([5, 2]));
	});
};