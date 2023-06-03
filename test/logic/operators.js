const {expect, assert} = chai;
import ts from "tacitscript";

export default () => {
	describe("bang (!)", () => {
		/*ts
			notB					!<
			notU					!(>3)
			notT					!5
		*/
		it('not						(VVV)(VVT)				2(!<)3=0', () => expect(notB(2, 3)).eql(0));
		it('not						(VV)(VT)				!(>3)4=0', () => expect(notU(4)).eql(0));
		it('not						VT						!5=0', () => expect(notT).eql(0));
	});

	describe("braceright (})", () => {
		/*ts
			typeofS					}3
		*/
		it('typeof					?S						}3="N"', () => expect(typeofS).eql("N"));
	});

	describe("semicolon (;)", () => {
		/*ts
			identityN				;1
		*/
		it('identity				XX						;1=1', () => expect(identityN).eql(1));
	});

	describe("braceleft ({)", () => {
		/*ts
			unnestA					{(1 (2 3))
			evalU					{"Math.sqrt"
			spreadA					3%((#.+1)^( )),{
		*/
		it('unnest					AA						{(1 (2 3))=(1 2 3)', () => expect(unnestA).eql([1, 2, 3]));
		it('eval					S?						{"Math.sqrt"4=2', () => expect(evalU(4)).eql(2));
		it('spread					LA						(3%((#.+1)^( )),{)=(1 2 3)', () => expect(spreadA).eql([1, 2, 3]));
	});

	describe("backslash (\\)", () => {
		/*ts
			fromPairsD				\(("a" 1) ("b" 2))
			toPairsA				\(\(("a" 1) ("b" 2)))
		*/
		it('fromPairs				AD						\\(("a" 1)  ("b" 2))', () => expect(fromPairsD).eql({a: 1, b: 2}));
		it('toPairs					DA						\\(\\(("a" 1)  ("b" 2)))=(("a" 1)  ("b" 2))', () => expect(toPairsA).eql([["a", 1], ["b", 2]]));
	});

	describe("hash (#)", () => {
		/*ts
			lengthN					#(4 5 6)
			lengthaN				#"abcd"
			lengthbN				#(\(("a" 1) ))
			modulusN				#(_1.5)
		*/
		it('length					AN						#(4 5 6)=3', () => expect(lengthN).eql(3));
		it('length					SN						#"abcd"=4', () => expect(lengthaN).eql(4));
		it('length					ON						#(\\(("a" 1) ))=1', () => expect(lengthbN).eql(1));
		it('modulus					NN						#(_1.5)=1.5', () => expect(modulusN).eql(1.5));
	});

	describe("bracketright (])", () => {
		/*ts
			lastN					](1 2 3)
			lastS					]"abc"
			ceilingN				](_1.8)
		*/
		it('last					A?						](1 2 3)=3', () => expect(lastN).eql(3));
		it('last					SS						]"abc"="c"', () => expect(lastS).eql("c"));
		it('ceiling					NN						](_1.8)=(_1)', () => expect(ceilingN).eql(-1));
	});

	describe("bracketleft ([)", () => {
		/*ts
			firstN					[(1 2 3)
			firstS					["abc"
			floorN					[(_1.2)
		*/
		it('first					A?						[(1 2 3)=1', () => expect(firstN).eql(1));
		it('first					SS						["abc"="a"', () => expect(firstS).eql("a"));
		it('floor					NN						[(_1.2)=(_2)', () => expect(floorN).eql(-2));
	});

	describe("underscore (_)", () => {
		/*ts
			negativeN				_3
			reverseA				_(1 2 3)
			reverseS				_"Hello"
		*/
		it('negative				NN						_3', () => expect(negativeN).eql(-3));
		it('reverse					AA						_(1 2 3)=(3 2 1)', () => expect(reverseA).eql([3, 2, 1]));
		it('reverse					SS						_"Hello"="olleH"', () => expect(reverseS).eql("olleH"));
	});

	describe("tilde (~)", () => {
		/*ts
			flipB					~/
		*/
		it('flip					(XYZ)(YXZ)				2(~/)6=3', () => expect(flipB(2, 6)).eql(3));
	});

	describe("backtick (\`)", () => {
		/*ts
			constantN				2`3
		*/
		it('constant				XVX						2`3=2', () => expect(constantN).eql(2));
	});

	describe("ampersand (&)", () => {
		/*ts
			andU					>2&(<6)
			andN					!()&3
		*/
		it('and						(VV)(VV)(VV)			>2&(<6)6=0', () => expect(andU(6)).eql(0));
		it('and						V??						!()&3=3', () => expect(andN).eql(3));
	});

	describe("hat (^)", () => {
		/*ts
			powerN					2^3
			generateA				;^3
			scanA					(#.<5 #.+1)^( )
			lazyScanA				3%((#.+1)^( )),{
			whileN					1,(<10^(*2))
		*/
		it('power					NNN						2^3=8', () => expect(powerN).eql(8));
		it('generate				(N?)NA					;^3=(0 1 2)', () => expect(generateA).eql([0, 1, 2]));
		it('scan					AAA						(#.<5 #.+1)^( )=(1 2 3 4 5)', () => expect(scanA).eql([1, 2, 3, 4, 5]));
		it('lazyScan				(AV)AL					(3%((#.+1)^( )),{)=(1 2 3)', () => expect(lazyScanA).eql([1, 2, 3]));
		it('while					UUU						1,(<10^(*2))=16', () => expect(whileN).eql(16));
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
			takeA					3%((#.+1)^( )),{
			partitionA				<3%(1 5 2)
		*/
		it('remainder				NNN						7%2=1', () => expect(remainderN).eql(1));
		it('split					NAA						2%(1 2 3 4 5)=((1 2) (3 4 5))', () => expect(splitA).eql([[1, 2], [3, 4, 5]]));
		it('split					NSA						2%"abcde"=("ab" "cde")', () => expect(splitaA).eql(["ab", "cde"]));
		it('chunk					AAA						(1 2 0)%(1 2 3 4 5)=((1 ) (2 3) (4 5))', () => expect(chunkA).eql([[1], [2, 3], [4, 5]]));
		it('chunk					ASA						(1 2 0)%"abcde"=("a" "bc" "de")', () => expect(chunkaA).eql(["a", "bc", "de"]));
		it('chunkWithDelimiter		SSA						", "%"1, 2, 3, 4"=("1" "2" "3" "4")', () => expect(chunkWithDelimiterA).eql(["1", "2", "3", "4"]));
		it('chunkWhenComparator		(VVV)AA					<%(1 2 3 2 1)=((1 ) (2 ) (3 2 1))', () => expect(chunkWhenComparatorA).eql([[1], [2], [3, 2, 1]]));
		it('chunkWhenComparator		(SSV)SA					<%"abcba"=("a" "b" "cba")', () => expect(chunkWhenComparatoraA).eql(["a", "b", "cba"]));
		it('take					NLA						(3%((#.+1)^( )),{)=(1 2 3)', () => expect(takeA).eql([1, 2, 3]));
		it('partition				(VV)AA					<3%(1 5 2)=((1 2) (5 ))', () => expect(partitionA).eql([[1, 2], [5]]));
	});

	describe("bar (|)", () => {
		/*ts
			orU						>0|(%2.=0)
			orB						<|=
			orN						()|3
		*/
		it('or						(VV)(VV)(VV)			(>0|(%2.=0))(_2)=1', () => expect(orU(-2)).eql(1));
		it('or						(VVV)(VVV)(VVV)			2(<|=)2=1', () => expect(orB(2, 2)).eql(1));
		it('or						V??						()|3=3', () => expect(orN).eql(3));
	});

	describe("equal (=)", () => {
		/*ts
			equalsT					2=4
		*/
		it('equals					VVT						2=4=0', () => expect(equalsT).eql(0));
	});

	describe("apostrophe (')", () => {
		/*ts
			roundN					3'3.1419
			ata						1'(1 2 3)
			atS						1'"abc"
			propN					"a"'(\(("a" 1) ))
			pathN					(1 )'(1 2 3)
			pathaN					("a" )'(\(("a" 1) ))
			findN					(%2.=0)'(1 2 3)
		*/
		it("round					NNN						3'3.1419=3.142", () => expect(roundN).eql(3.142));
		it("at						NA?						1'(1 2 3)=2", () => expect(ata).eql(2));
		it(`at						NSS						1'"abc"="b"`, () => expect(atS).eql("b"));
		it(`prop					SD?						"a"'(\\(("a" 1) ))=1`, () => expect(propN).eql(1));
		it(`path					AA?						(1 )'(1 2 3)=2`, () => expect(pathN).eql(2));
		it(`path					AD?						("a" )'(\\(("a" 1) ))=1`, () => expect(pathaN).eql(1));
		it("find					(VV)AV					(%2.=0)'(1 2 3)=2", () => expect(findN).eql(2));
	});

	describe("dollar ($)", () => {
		/*ts
			reduceN					+$(1 2 3)
			// prependA				1$(2 3)
			joinS					", "$(1 2 3)
			processA				(#.+1)^( ),(1'.((%2.=0 ;) 1/0`)?)$,3%,{
		*/
		it('reduce					(VVV)AV					+$(1 2 3)=6', () => expect(reduceN).eql(6));
		xit('prepend					VAA						1$(2 3)=(1 2 3)', () => expect(prependA).eql([1, 2, 3]));
		it('join					SAS						", "$(1 2 3)', () => expect(joinS).eql("1, 2, 3"));
		it('process					(AV)LL					((#.+1)^( ),(1\'.((%2.=0 ;) 1/0`)?)$,3%,{)=(2 4 6)', () => expect(processA).eql([2, 4, 6]));
	});

	describe("asterisk (*)", () => {
		/*ts
			pickD					("a" "c" "d")*(\(("a" 1) ("b" 2) ("c" 3)))
			timesN					2*3
			zipA					(1 2)*(3 4)
		*/
		it('pick					ADD						("a" "c" "d")*(\\(("a" 1) ("b" 2) ("c" 3)))=(\\(("a" 1) ("c" 3)))', () => expect(pickD).eql({a: 1, c: 3}));
		it('times					NNN						2*3=6', () => expect(timesN).eql(6));
		it('zip						AAA						(1 2)*(3 4)=((1 3) (2 4))', () => expect(zipA).eql([[1, 3], [2, 4]]));
	});

	describe("atsign (@)", () => {
		/*ts
			mapA					*2@(3 4 5)
			mapaA					=@(3 4 5),|$
			mapD					*2@(\(("a" 1) ("b" 2)))
			mapObjIndexedD			+@(\(("a" 1) ("b" 2)))
			replaceAllS				("_" "-")@"_1 0 _1"
			indicesOfA				2@(6 8 2 3 2)
			indicesOfS				"bc"@"abcbcd"
			// findIndicesA			(%2.=0)@(1 2 3 4)
			mapbA					*2@((#.+1)^( )),3%,{
		*/
		it('map						(VV)AA					*2@(3 4 5)=(6 8 10)', () => expect(mapA).eql([6, 8, 10]));
		it('map						(VVV)AA					(=@(3 4 5),|$)6=0', () => expect(mapaA(6)).eql(0));
		it('map						(VV)DD					*2@(\\(("a" 1) ("b" 2)))=(\\(("a" 2) ("b" 4)))', () => expect(mapD).eql({a: 2, b: 4}));
		it('mapObjIndexed			(SVV)DD					+@(\\(("a" 1) ("b" 2)))=(\\(("a" "a1") ("b" "b2")))', () => expect(mapObjIndexedD).eql({a: "a1", b: "b2"}));
		it('replaceAll				ASS						("_" "-")@"_1 0 _1"="-1 0 -1"', () => expect(replaceAllS).eql("-1 0 -1"));
		it('indicesOf				VAA						2@(6 8 2 3 2)=(2 4)', () => expect(indicesOfA).eql([2, 4]));
		it('indicesOf				SSA						"bc"@"abcbcd"=(1 3)', () => expect(indicesOfS).eql([1, 3]));
		xit('findIndices			(VV)AA					(%2.=0)@(1 2 3 4)=(1 3)', () => expect(findIndicesA).eql([1, 3]));
		it('map						(VV)LL					(*2@((#.+1)^( )),3%,{)=(2 4 6)', () => expect(mapbA).eql([2, 4, 6]));
	});

	describe("question (?)", () => {
		/*ts
			condN					((<10 +1) -1)?15
			randomN					1?10
			filterA					<5?(4 9 2 7 3)
			filterD					(%2.=0)?(\(("a" 1) ("b" 2)))
			filterObjIndexedD		(+.="b2")?(\(("a" 1) ("b" 2)))
			filteraA				(%2.=0)?((#.+1)^( )),3%,{
		*/
		it('cond					AVV						((<10 +1) -1)?15=14', () => expect(condN).eql(14));
		it('random					NNN						1(<|=)(1?10)<10', () => expect((1 <= randomN) && (randomN < 10)).eql(true));
		it('filter					(VV)AA					<5?(4 9 2 7 3)=(4 2 3)', () => expect(filterA).eql([4, 2, 3]));
		it('filter					(VV)DD					(%2.=0)?(\\(("a" 1) ("b" 2)))=(\\(("b" 2) ))', () => expect(filterD).eql({b: 2}));
		it('filterObjIndexed		(SVV)DD					(+.="b2")?(\\(("a" 1) ("b" 2)))=(\\(("b" 2) ))', () => expect(filterObjIndexedD).eql({b: 2}));
		it('filter					(VV)LL					((%2.=0)?((#.+1)^( )),3%,{)=(2 4 6)', () => expect(filteraA).eql([2, 4, 6]));
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
			omitKeyD				\(("a" 1) )-"a"
			omitKeysD				\(("a" 1) ("b" 2))-("a" "b")
			spliceA					(5 6 7 8)-(1 2 3 4)
			spliceS					"nucular"-(3 2 "le")
			dropA					(#.+1)^( ),-3,3%,{
		*/
		it('subtract				NNN						5-2=3', () => expect(subtractN).eql(3));
		it('omitKey					DSD						\\(("a" 1) )-"a"=(\\( ))', () => expect(omitKeyD).eql({}));
		it('omitKeys				DAD						\\(("a" 1) ("b" 2))-("a" "b")=(\\( ))', () => expect(omitKeysD).eql({}));
		it('splice					AAA						(5 6 7 8)-(1 2 3 4)=(5 3 4 8)', () => expect(spliceA).eql([5, 3, 4, 8]));
		it('splice					SAS						"nucular"-(3 2 "le")="nuclear"', () => expect(spliceS).eql("nuclear"));
		it('drop					NLL						((#.+1)^( ),-3,3%,{)=(4 5 6)', () => expect(dropA).eql([4, 5, 6]));
	});

	describe("greater (>)", () => {
		/*ts
			greaterT				3>2
			greateraT				"abc">"def"
			overA					((1 ) +1)>(3 5 7)
			overD					(("a" ) +1)>(\(("a" 1) ))
			tapNN					{"x => console.log.call(null, x)">
		*/
		it("greater					NNT						3>2=1", () => expect(greaterT).eql(1));
		it('greater					SST						"abc">"def"=0', () => expect(greateraT).eql(0));
		it('over					AAA						((1 ) +1)>(3 5 7)=(3 6 7)', () => expect(overA).eql([3, 6, 7]));
		it('over					ADD						(("a" ) +1)>(\\(("a" 1) ))=(\\(("a" 2) ))', () => expect(overD).eql({a: 2}));

		let spy;
		before(() => spy = sinon.spy(console, "log"));
		it('tap						(V?)VV					{"x => console.log.call(null, x)">3=3', () => {
			expect(tapNN(3)).eql(3);
			assert(spy.calledWith(3));
		});
		after(() => spy.restore());
	});

	describe("less (<)", () => {
		/*ts
			lessT					3<2
			lessaT					"abc"<"def"
			ascendingSortA			;<(2 3 1)
			ascendingSortaA			;<("b" "c" "a")
		*/
		it("less					NNT						3<2=0", () => expect(lessT).eql(0));
		it('less					SST						"abc"<"def"=1', () => expect(lessaT).eql(1));
		it('ascendingSort			(VN)AA					;<(2 3 1)=(1 2 3)', () => expect(ascendingSortA).eql([1, 2, 3]));
		it('ascendingSort			(VS)AA					;<("b" "c" "a")=("a" "b" "c")', () => expect(ascendingSortaA).eql(["a", "b", "c"]));
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
			mergeD					\(("a" 1) ("b" 2))+(\(("b" 3) ("c" 4)))
		*/
		it('add						NNN						2+3=5', () => expect(addN).eql(5));
		it('parse					NSN						2+"3"=5', () => expect(parseN).eql(5));
		it('parse					NSO						2+"abc"=(1/0)', () => expect(parseO).eql(undefined));
		it('stringConcat			SSS						"abc"+"def"="abcdef"', () => expect(stringConcatS).eql("abcdef"));
		it('toString				SVS						"2"+3="23"', () => expect(toStringS).eql("23"));
		it('arrayConcat				AAA						(1 2 3)+(4 5 6)', () => expect(arrayConcatA).eql([1, 2, 3, 4, 5, 6]));
		it('merge					DDD						\\(("a" 1) ("b" 2))+(\\(("b" 3) ("c" 4)))=(\\(("a" 1") ("b" 3) ("c" 4)))', () => expect(mergeD).eql({a: 1, b: 3, c: 4}));
	});

	describe("dot (.)", () => {
		/*ts
			pipeNN					+1.*2
			unaryBinaryPipeNB		+1./
			binaryUnaryPipeNNN		:.-$
			applyToArrayA			(1 2 3).(# [)
			pipeToArrayAA			[.(+1 -2)
			pipeBinaryToArrayNNA	:.(+$ -$)
			binaryBinaryPipeBBU		:.:
		*/
		it("pipe					(XY)(YZ)(XZ)			(+1.*2)3=8", () => expect(pipeNN(3)).eql(8));
		it("unaryBinaryPipe			(XY)(YZW)(X(ZW))		7(+1./)4=2", () => expect(unaryBinaryPipeNB(7, 4)).eql(2));
		it("binaryUnaryPipe			(XYZ)(ZW)(XYW)			5(:.-$)3=2", () => expect(binaryUnaryPipeNNN(5, 3)).eql(2));
		it("applyToArray			VAA						(1 2 3).(# [)=(3 1)", () => expect(applyToArrayA).eql([3, 1]));
		it("pipeToArray				(VV)A(VA)				[.(+1 -2)(3 2 1)=(4 1)", () => expect(pipeToArrayAA([3, 2, 1])).eql([4, 1]));
		it("pipeBinaryToArray		(VVV)A(VVA)				5(:.(+$ -$))3=(8 2)", () => expect(pipeBinaryToArrayNNA(5, 3)).eql([8, 2]));
		it('binaryBinaryPipe		(XYZ)(ZWR)(XY(WR))		3(:.:)4(5 6)=((3 4) (5 6))', () => expect(binaryBinaryPipeBBU(3, 4)([5, 6])).eql([[3, 4], [5, 6]]));
	});

	describe("comma (,)", () => {
		/*ts
			applyToUnaryN			3,+1
			applyToBinaryNN			1,/
			binaryUnaryApplyNA		+,^3
			binaryUnaryApplyNB		>,(#.)
			zipApplyToA				(3 1),(+1 /),(; 2,)
			unaryZipApplyToA		{,(*2 /2)
			binaryZipApplyToNNA		:,(+1 -1)
		*/
		it("applyToUnary			X(XY)Y					3,+1=4", () => expect(applyToUnaryN).eql(4));
		it("applyToBinary			X(XYZ)(YZ)				(1,/)2=0.5", () => expect(applyToBinaryNN(2)).eql(0.5));
		it("binaryUnaryApply		(XYZ)((YZ)W)(XW)		(+,^3)1=(1 2 3)", () => expect(binaryUnaryApplyNA(1)).eql([1, 2, 3]));
		it("binaryUnaryApply		(XYZ)((YZ)(WR))(X(WR))	>,(#.)(3)(1 2 3)=0", () => expect(binaryUnaryApplyNB(3)([1, 2, 3])).eql(0));
		it("zipApplyTo				AAA						(3 1),(+1 /),(; 2,)=(4 0.5)", () => expect(zipApplyToA).eql([4, 0.5]));
		it("unaryZipApplyTo			(XA)A(XA)				{,(*2 /2)((1 2) )=(2 1)", () => expect(unaryZipApplyToA([[1, 2]])).eql([2, 1]));
		it("binaryZipApplyTo		(XYA)A(XYA)				4(:,(+1 -1))3=(5 2)", () => expect(binaryZipApplyToNNA(4, 3)).eql([5, 2]));
	});
};