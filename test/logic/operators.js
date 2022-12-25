const {expect} = chai;
import ts from "tacitscript";

export default () => {
	describe("Operators", () => {
		describe("less (<)", () => {
			/*ts
				lessThanA				3<2
				lessThanB				"abc"<"def"
				sortA					;<("dan" "sue" "alan")
				sortB					;<(2 3 1)
			*/
			it("000			NNB					lessThan			3<2=()", () => expect(lessThanA).eql(false));
			it('000			SSB					lessThan			"abc"<"def"=(!())', () => expect(lessThanB).eql(true));
			it('100			(VS)AA				sort				;<("dan" "sue" "alan")=("alan" "dan" "sue")', () => expect(sortA).eql(["alan", "dan", "sue"]));
			it('100			(VN)AA				sort				;<(2 3 1)=(1 2 3)', () => expect(sortB).eql([1, 2, 3]));
		});

		describe("slash (/)", () => {
			/*ts
				divide					6/2
			*/
			it("000			NNN					divide				6/2=3", () => expect(divide).eql(3));
		});

		describe("plus (+)", () => {
			/*ts
				stringConcat			"High"+5
				add						2+"3"
				arrayConcat				(1 2 3)+(4 5 6)
				merge					\(("a" 1) ("b" 2))+(\(("b" 3) ))
			*/
			it('000			SVS					stringConcat		"High"+5="High5"', () => expect(stringConcat).eql("High5"));
			it('000			NVN					add					2+"3"=5', () => expect(add).eql(5));
			it("000			AAA					arrayConcat			(1 2 3)+(4 5 6)=(1 2 3 4 5 6)", () => expect(arrayConcat).eql([1, 2, 3, 4, 5, 6]));
			it('000			DDD					merge				\(("a" 1) ("b" 2))+(\(("b" 3))=\(("a" 1) ("b" 3))', () => expect(merge).eql({a: 1, b: 3}));
		});

		describe("dot (.)", () => {
			/*ts
				pipe					+1./2
				unaryBinaryPipe			+1./
				binaryUnaryPipe			:.+@
			*/
			it("111			(XY)(YZ)(XZ)		pipe				(+1./2)5=3", () => expect(pipe(5)).eql(3));
			it("122			(XY)(YZW)(XZW)		unaryBinaryPipe		7(+1./)4=2", () => expect(unaryBinaryPipe(7, 4)).eql(2));
			it("212 		(XYZ)(ZW)(XYW)		binaryUnaryPipe		3(:.+@)4=7", () => expect(binaryUnaryPipe(3, 4)).eql(7));
		});

		describe("comma (,)", () => {
			/*ts
				applyToUnary			3,+1
				applyToBinary			1,/
				binaryUnaryApply		+,^3
				binaryBinaryApply		+,^
			*/
			it("010 		X(XY)X				applyToUnary		3,+1=4", () => expect(applyToUnary).eql(4));
			it("021 		X(XYZ)(YZ)			applyToBinary		(1,/)2=0.5", () => expect(applyToBinary(2)).eql(0.5));
			it("2(10)1 		(XYZ)((YZ)W)(XW)	binaryUnaryApply	(+,^3)1=(1 2 3)", () => expect(binaryUnaryApply(1)).eql([1, 2, 3]));
			it("2(100)2		(XYZ)((YZ)WU)(XWU)	binaryBinaryApply	1(+,^)3=(1 2 3)", () => expect(binaryBinaryApply(1, 3)).eql([1, 2, 3]));
		});
	});
};