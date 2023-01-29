const {expect, assert} = chai;
import ts from "tacitscript";

export default () => {
	describe("hat (^)", () => {
		/*ts
			powerN					2^3
			generateA				;^3
			scanA					(#.<5 #.+1)^( )
		*/
		it('power					NNN						2^3=8', () => expect(powerN).eql(8));
		it('generate				(N?)NA					;^3=(0 1 2)', () => expect(generateA).eql([0, 1, 2]));
		it('scan					AAA						(#.<5 #.+1)^( )=(1 2 3 4 5)', () => expect(scanA).eql([1, 2, 3, 4, 5]));
	});

	describe("percent (%)", () => {
		/*ts
			remainderN				7%2
			splitA					2%(1 2 3 4 5)
			splitaA					2%"abcde"
			chunkA					(1 2 0)%(1 2 3 4 5)
			chunkaA					(1 2 0)%"abcde"
			chunkWithDelimiterA		", "%"1, 2, 3, 4"
			chunkWhenComparatorA	<%(1 2 3 2 1)
			chunkWhenComparatoraA	<%"abcba"
		*/
		it('remainder				NNN						7%2=1', () => expect(remainderN).eql(1));
		it('split					NAA						2%(1 2 3 4 5)=((1 2) (3 4 5))', () => expect(splitA).eql([[1, 2], [3, 4, 5]]));
		it('split					NSA						2%"abcde"=("ab" "cde")', () => expect(splitaA).eql(["ab", "cde"]));
		it('chunk					AAA						(1 2 0)%(1 2 3 4 5)=((1 ) (2 3) (4 5))', () => expect(chunkA).eql([[1], [2, 3], [4, 5]]));
		it('chunk					ASA						(1 2 0)%"abcde"=("a" "bc" "de")', () => expect(chunkaA).eql(["a", "bc", "de"]));
		it('chunkWithDelimiter		SSA						", "%"1, 2, 3, 4"=("1" "2" "3" "4")', () => expect(chunkWithDelimiterA).eql(["1", "2", "3", "4"]));
		it('chunkWhenComparator		(VVV)AA					<%(1 2 3 2 1)=((1 ) (2 ) (3 2 1))', () => expect(chunkWhenComparatorA).eql([[1], [2], [3, 2, 1]]));
		it('chunkWhenComparator		(SSV)SA					<%"abcba"=("a" "b" "cba")', () => expect(chunkWhenComparatoraA).eql(["a", "b", "cba"]));
	});

	describe("bar (|)", () => {
		/*ts
			orU						>0|(%2.=0)
			orB						<|=
			orN						()|3
		*/
		it('or						(VV)(VV)(VV)			(>0|(%2.=0))(_2)=(()!)', () => expect(orU(-2)).eql(true));
		it('or						(VVV)(VVV)(VVV)			2(<|=)2=(()!)', () => expect(orB(2, 2)).eql(true));
		it('or						V??						()|3=3', () => expect(orN).eql(3));
	});

	describe("equal (=)", () => {
		/*ts
			equalsT					2=4
		*/
		it('equals					VVB						2=4=()', () => expect(equalsT).eql(false));
	});

	describe("apostrophe (')", () => {
		/*ts
			roundN					3'3.1419
			ata						1'(1 2 3)
			atS						1'"abc"
			propN					"a"'((("a" 1) )\)
			pathN					(1 )'(1 2 3)
			pathaN					("a" )'((("a" 1) )\)
			findN					(%2.=0)'(1 2 3)
		*/
		it("round					NNN						3'3.1419=3.142", () => expect(roundN).eql(3.142));
		it("at						NA?						1'(1 2 3)=2", () => expect(ata).eql(2));
		it(`at						NSS						1'"abc"="b"`, () => expect(atS).eql("b"));
		it(`prop					SD?						"a"'((("a" 1) )\\)=1`, () => expect(propN).eql(1));
		it(`path					AA?						(1 )'(1 2 3)=2`, () => expect(pathN).eql(2));
		it(`path					AD?						("a" )'((("a" 1) )\\)=1`, () => expect(pathaN).eql(1));
		it("find					(VV)AV					(%2.=0)'(1 2 3)=2", () => expect(findN).eql(2));
	});

	describe("dollar ($)", () => {
		/*ts
			reduceN					+$(1 2 3)
			prependA				1$(2 3)
			joinS					", "$(1 2 3)
		*/
		it('reduce					(VVV)AV					+$(1 2 3)=6', () => expect(reduceN).eql(6));
		it('prepend					VAA						1$(2 3)=(1 2 3)', () => expect(prependA).eql([1, 2, 3]));
		it('join					SAS						", "$(1 2 3)', () => expect(joinS).eql("1, 2, 3"));
	});

	describe("asterisk (*)", () => {
		/*ts
			pickD					("a" "c" "d")*((("a" 1) ("b" 2) ("c" 3))\)
			timesN					2*3
		*/
		it('pick					ADD						("a" "c" "d")*((("a" 1) ("b" 2) ("c" 3))\\)=((("a" 1) ("c" 3))\\)', () => expect(pickD).eql({a: 1, c: 3}));
		it('times					NNN						2*3=6', () => expect(timesN).eql(6));
	});

	describe("atsign (@)", () => {
		/*ts
			mapA					*2@(3 4 5)
			mapaA					=@(3 4 5),|$
			mapD					*2@((("a" 1) ("b" 2))\)
			mapObjIndexedD			+@((("a" 1) ("b" 2))\)
			replaceAllS				("_" "-")@"_1 0 _1"
			indicesOfA				2@(6 8 2 3 2)
			indicesOfS				"bc"@"abcbcd"
			// findIndicesA			(%2.=0)@(1 2 3 4)
		*/
		it('map						(VV)AA					*2@(3 4 5)=(6 8 10)', () => expect(mapA).eql([6, 8, 10]));
		it('map						(VVV)AA					(=@(3 4 5),|$)6=()', () => expect(mapaA(6)).eql(false));
		it('map						(VV)DD					*2@((("a" 1) ("b" 2))\\)=((("a" 2) ("b" 4))\\)', () => expect(mapD).eql({a: 2, b: 4}));
		it('mapObjIndexed			(SVV)DD					+@((("a" 1) ("b" 2))\\)=((("a" "a1") ("b" "b2"))\\)', () => expect(mapObjIndexedD).eql({a: "a1", b: "b2"}));
		it('replaceAll				ASS						("_" "-")@"_1 0 _1"="-1 0 -1"', () => expect(replaceAllS).eql("-1 0 -1"));
		it('indicesOf				VAA						2@(6 8 2 3 2)=(2 4)', () => expect(indicesOfA).eql([2, 4]));
		it('indicesOf				SSA						"bc"@"abcbcd"=(1 3)', () => expect(indicesOfS).eql([1, 3]));
		xit('findIndices			(VV)AA					(%2.=0)@(1 2 3 4)=(1 3)', () => expect(findIndicesA).eql([1, 3]));
	});

	describe("question (?)", () => {
		/*ts
			condN					((<10 +1) -1)?15
			randomN					1?10
			filterA					<5?(4 9 2 7 3)
			filterD					(%2.=0)?((("a" 1) ("b" 2))\)
			filterObjIndexedD		(+.="b2")?((("a" 1) ("b" 2))\)
		*/
		it('cond					AVV						((<10 +1) -1)?15=14', () => expect(condN).eql(14));
		it('random					NNN						1(<|=)(1?10)<10', () => expect((1 <= randomN) && (randomN < 10)).eql(true));
		it('filter					(VV)AA					<5?(4 9 2 7 3)=(4 2 3)', () => expect(filterA).eql([4, 2, 3]));
		it('filter					(VV)DD					(%2.=0)?((("a" 1) ("b" 2))\\)=((("b" 2) )\\)', () => expect(filterD).eql({b: 2}));
		it('filterObjIndexed		(SVV)DD					(+.="b2")?((("a" 1) ("b" 2))\\)=((("b" 2) )\\)', () => expect(filterObjIndexedD).eql({b: 2}));
	});

	describe("colon (:)", () => {
		/*ts
			pairA					+1:2,(3, +3)
		*/
		it('pair					??A						+1:2,(3, +3)=(4 5)', () => expect(pairA).eql([4, 5]));
	});

	describe("minus (-)", () => {
		/*ts
			subtractN				5-2
			omitKeyD				((("a" 1) )\)-"a"
			omitKeysD				(("a" 1) ("b" 2))\-("a" "b")
			spliceA					(5 6 7 8)-(1 2 3 4)
			spliceS					"nucular"-(3 2 "le")
		*/
		it('subtract				NNN						5-2=3', () => expect(subtractN).eql(3));
		it('omitKey					DSD						(("a" 1) )\\-"a"=(( )\\)', () => expect(omitKeyD).eql({}));
		it('omitKeys				DAD						(("a" 1) ("b" 2))\\-("a" "b")=(( )\\)', () => expect(omitKeysD).eql({}));
		it('splice					AAA						(5 6 7 8)-(1 2 3 4)=(5 3 4 8)', () => expect(spliceA).eql([5, 3, 4, 8]));
		it('splice					SAS						"nucular"-(3 2 "le")="nuclear"', () => expect(spliceS).eql("nuclear"));
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