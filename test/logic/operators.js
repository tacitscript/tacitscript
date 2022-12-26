const {expect} = chai;
import ts from "tacitscript";

export default () => {
	describe("Operators", () => {
		describe("apostrophe (')", () => {
			/*ts
				round							2'3.176
				atArray							1'(1 2 3)
				atString						1'"abc"
				prop							"a"'(\(("a" 1) ))
			*/
			it("000			NNN					round				2'3.176=3.18", () => expect(round).eql(3.18));
			it(`000			NAV					at					1'(1 2 3)=2`, () => expect(atArray).eql(2));
			it(`000			NSS					at					1'"abc"="b"`, () => expect(atString).eql("b"));
			it(`000			SDV					prop				"a"'(\(("a" 1) ))=1`, () => expect(prop).eql(1));
		});

		describe("dollar ($)", () => {
			/*ts
				fork							(+2./)$;
				join							","$(1 2 3)
				append							(1 2)$3
			*/
			it('211			(XYZ)(XY)(XZ)		fork				(+2./)$;(2)=4', () => expect(fork(2)).eql(2));
			it('000			SAS					join				","$(1 2 3)', () => expect(join).eql("1,2,3"));
			it('000			AVA					append				(1 2)$3=(1 2 3)', () => expect(append).eql([1, 2, 3]));
		});

		describe("asterisk (*)", () => {
			/*ts
				times							2*3
			*/
			it('000			NNN					times				2*3=6', () => expect(times).eql(6));
		});

		describe("atsign (@)", () => {
			/*ts
				accumulate						+@(1 2)
				findIndex						(%2.=0)@(1 2 3 4)
				indexOfValue					2@(6 8 2 3)
				indexOfString					"bc"@"abcd"
			*/
			it('200			(VVX)AX				accumulate			+@(1 2)', () => expect(accumulate).eql(3));
			it('100			(VV)AN				findIndex			(%2.=0)@(1 2 3 4)=1', () => expect(findIndex).eql(1));
			it('000			VAN					indexOf				2@(6 8 2 3)=2', () => expect(indexOfValue).eql(2));
			it('000			SSN					indexOf				"bc"@"abcd"=1', () => expect(indexOfString).eql(1));
		});

		describe("question (?)", () => {
			/*ts
				ifCheck							<3?(+1)
				random							0?100
				filter							<5?(4 9 2 7 3)
			*/
			it('111			(XV)(XY)(XY)		if					<3?(+1)1=2', () => expect(ifCheck(1)).eql(2));
			it('000			NNN					random				0?100=[0:100)', () => expect((random < 100) && (random >= 0)).eql(true));
			it('100			(VV)AA				filter				<5?(4 9 2 7 3)', () => expect(filter).eql([4, 2, 3]));
		});

		describe("colon (:)", () => {
			/*ts
				pair							1:"string"
			*/
			it('000			VVA					pair				1:"string"=(1 "string")', () => expect(pair).eql([1, "string"]));
		});

		describe("minus (-)", () => {
			/*ts
				minus							5-2
				spliceA							(1 2 3 4)-(5 6 7 8)
				spliceB							(3 2 "le")-"nucular"
				stringReplace					"_"-"-""1 0 _1"
				omitKey							"a"-(\(("a" 1) ("b" 2)))
				omitKeys						("a" )-(\(("a" 1) ("b" 2)))
			*/
			it('000			NNN					subtract			5-2=3', () => expect(minus).eql(3));
			it('000			AAA					splice				(1 2 3 4)-(5 6 7 8)=(5 3 4 8)', () => expect(spliceA).eql([5, 3, 4, 8]));
			it('000			ASS					splice				(3 2 "le")-"nucular"="nuclear"', () => expect(spliceB).eql("nuclear"));
			it('001			SS(SS)				stringReplace		"_"-"-""1 0 _1"="1 0 -1"', () => expect(stringReplace).eql("1 0 -1"));
			it('000			SDD					omitKey				"a"-(\(("a" 1) ("b" 2)))=(\(("b" 2) ))', () => expect(omitKey).eql({b: 2}));
			it('000			ADD					omitKeys			("a" )-(\(("a" 1) ("b" 2)))=(\(("b" 2) ))', () => expect(omitKeys).eql({b: 2}));
		});

		describe("greater (>)", () => {
			/*ts
				greaterThanA					3>2
				greaterThanB					"abc">"def"
				overA							+1>(1 )(3 5 7)
				overB							+1>("a" )(\(("a" 2) ))
				// tap							3>({"console.log")
			*/
			it('000			NNB					greaterThan			3>2=!()', () => expect(greaterThanA).eql(true));
			it('000			SSB					greaterThan			"abc"<"def"=()', () => expect(greaterThanB).eql(false));
			it('101			(VV)A(AA)			over				+1>(1 )(3 5 7)=(3 6 7)', () => expect(overA).eql([3, 6, 7]));
			it('101			(VV)A(DD)			over				+1>("a" )(\(("a" 2) ))=(`(("a" 3) ))', () => expect(overB).eql({a: 3}));
			xit('010		V(VV)V				tap					3>({"console.log")=3', () => expect(tap).eql(3));
		});

		describe("less (<)", () => {
			/*ts
				lessThanA						3<2
				lessThanB						"abc"<"def"
				sortA							;<("dan" "sue" "alan")
				sortB							;<(2 3 1)
			*/
			it("000			NNB					lessThan			3<2=()", () => expect(lessThanA).eql(false));
			it('000			SSB					lessThan			"abc"<"def"=(!())', () => expect(lessThanB).eql(true));
			it('100			(VS)AA				sort				;<("dan" "sue" "alan")=("alan" "dan" "sue")', () => expect(sortA).eql(["alan", "dan", "sue"]));
			it('100			(VN)AA				sort				;<(2 3 1)=(1 2 3)', () => expect(sortB).eql([1, 2, 3]));
		});

		describe("slash (/)", () => {
			/*ts
				divide							6/2
			*/
			it("000			NNN					divide				6/2=3", () => expect(divide).eql(3));
		});

		describe("plus (+)", () => {
			/*ts
				stringConcat					"High"+5
				add								2+"3"
				arrayConcat						(1 2 3)+(4 5 6)
				merge							\(("a" 1) ("b" 2))+(\(("b" 3) ))
			*/
			it('000			SVS					stringConcat		"High"+5="High5"', () => expect(stringConcat).eql("High5"));
			it('000			NVN					add					2+"3"=5', () => expect(add).eql(5));
			it("000			AAA					arrayConcat			(1 2 3)+(4 5 6)=(1 2 3 4 5 6)", () => expect(arrayConcat).eql([1, 2, 3, 4, 5, 6]));
			it('000			DDD					merge				\(("a" 1) ("b" 2))+(\(("b" 3))=\(("a" 1) ("b" 3))', () => expect(merge).eql({a: 1, b: 3}));
		});

		describe("dot (.)", () => {
			/*ts
				pipe							+1./2
				unaryBinaryPipe					+1./
				binaryUnaryPipe					:.+@
			*/
			it("111			(XY)(YZ)(XZ)		pipe				(+1./2)5=3", () => expect(pipe(5)).eql(3));
			it("122			(XY)(YZW)(XZW)		unaryBinaryPipe		7(+1./)4=2", () => expect(unaryBinaryPipe(7, 4)).eql(2));
			it("212 		(XYZ)(ZW)(XYW)		binaryUnaryPipe		3(:.+@)4=7", () => expect(binaryUnaryPipe(3, 4)).eql(7));
		});

		describe("comma (,)", () => {
			/*ts
				applyToUnary					3,+1
				applyToBinary					1,/
				binaryUnaryApply				+,^3
				binaryBinaryApply				+,^
			*/
			it("010 		X(XY)X				applyToUnary		3,+1=4", () => expect(applyToUnary).eql(4));
			it("021 		X(XYZ)(YZ)			applyToBinary		(1,/)2=0.5", () => expect(applyToBinary(2)).eql(0.5));
			it("2(10)1 		(XYZ)((YZ)W)(XW)	binaryUnaryApply	(+,^3)1=(1 2 3)", () => expect(binaryUnaryApply(1)).eql([1, 2, 3]));
			it("2(100)2		(XYZ)((YZ)WU)(XWU)	binaryBinaryApply	1(+,^)3=(1 2 3)", () => expect(binaryBinaryApply(1, 3)).eql([1, 2, 3]));
		});
	});
};