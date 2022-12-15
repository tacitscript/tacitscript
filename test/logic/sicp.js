const {expect} = chai;
import ts from "tacitscript";

export default () => {
	xdescribe("", () => {
		/*ts

		*/
		it("", () => expect().eql());
	});

	describe("SICP", () => {
		describe("1.1.6 Conditional Expressions and Predicates", () => {
			/*ts
				reversed				_(1:2:3:4)
				sort					;<
				solutionA				<5?(+1)
				solutionB				<5|(>9)
				abs						>0?;|(=0?(0`))|(<0?_)
			*/
			it("_(1:2:3:4)=(4:3:2:1)", () => expect(ts.toString(reversed)).eql("4:3:2:1"));
			it("sort(5:3:6:4)=(3:4:5:6)", () => expect(ts.toString(sort([[[[undefined, 5], 3], 6], 4]))).eql("3:4:5:6"));
			it("abs5=5", () => expect(abs(5)).eql(5));
			it("(<5|(>9))6=()", () => expect(solutionB(6)).eql(false));
			it("(<5|(>9))10=!()", () => expect(solutionB(10)).eql(true));
			it("(<5|(>9))1=!()", () => expect(solutionB(1)).eql(true));
			it("(<5?(+1))3=4", () => expect(solutionA(3)).eql(4));
			it("(<5?(+1))6=undefined", () => expect(solutionA(6)).eql(undefined));
		});

		describe("operators", () => {
			/*ts
				average				(;@+./)$(1`@+)
				sumAndDivide		;@+./
				hypotenuse			:.;$*@+.^0.5
				binaryUnaryPipe		:.;$*@+
				solutionB			3binaryUnaryPipe4
				unaryBinaryPipe		+1./
				pipe				;$*.+1
				squares				;$*@:
				solutionA			squares(3:4)
			*/
			it("average(3:5:7:9)=6", () => expect(average([[[[undefined, 3], 5], 7], 9])).eql(6));
			it("average(3:5)=4", () => expect(average([[undefined, 3], 5])).eql(4));
			it("7:5sumAndDivide6=2", () => expect(sumAndDivide([[undefined, 7], 5], 6)).eql(2));
			it("3hypotenuse4=5", () => expect(hypotenuse(3, 4)).eql(5));
			it("3binaryUnaryPipe4=25", () => expect(solutionB).eql(25));
			it("5unaryBinaryPipe2=3", () => expect(unaryBinaryPipe(5, 2)).eql(3));
			it("pipe3=7", () => expect(pipe(3)).eql(10));
			it("squares(3:4)=(9:16)", () => expect(solutionA).eql([[undefined, 9], 16]));
		});

		describe("1.1.4 Compound Procedures", () => {
			/*ts
				sumOfSquares	;$*@+
				solutionA		sumOfSquares(1:2:3)
				sum				;@+
				arraySum		sum(1:2:3)
				cube			;$*$*
				square			;$*
				double			*2
				inverse			1/
				doubleSix		6,*2
			*/
			it("sumOfSquares(1:2:3)=14", () => expect(solutionA).eql(14));
			it("arraySum=6", () => expect(arraySum).eql(6));
			it("cube(3)=27", () => expect(cube(3)).eql(27));
			it("square(3)=9", () => expect(square(3)).eql(9));
			it("double(4)=8", () => expect(double(4)).eql(8));
			it("inverse(1/2)=2", () => expect(inverse(0.5)).eql(2));
			it("6,*2=12", () => expect(doubleSix).eql(12));
		});

		describe("2.1.1 Example: Arithmetic Operations for Rational Numbers", () => {
			/*ts
				x				1:2
				a				[x
				b				]x
				y				3:4
				z				x:y
				c				]([z)
				d				](]z)
				makeRat			:
				numer			[
				denom			]
				triple			1:2:3
			*/
			it("]x=2", () => expect(b).eql(2));
			it("]([z)=2", () => expect(c).eql(2));
			it("](]z)=4", () => expect(d).eql(4));
			it("1:2:3 toString", () => expect(ts.toString(triple)).eql("1:2:3"));
		});

		describe("1.1.2 Naming and the Environment", () => {
			/*ts
				pi				3.14159
				radius			10
				a				pi*(radius*radius)
				circumference	2*(pi*radius)
			*/
			it("pi*(radius*radius)=314.159", () => expect(a).eql(314.159));
			it("2*(pi*radius)=62.8318", () => expect(circumference).eql(62.8318));
		});

		describe("1.1.1 Expressions", () => {
			/*ts
				a			137+349
				b			10/5
				c			1000-334
				d			2.7+10
				e			5*99
				f			(3*((2*4)+(3+5)))+((10-7)+6)
			*/
			it("(3*((2*4)+(3+5)))+((10-7)+6)=32", () => expect(f).eql(57));
			it("137+349=486", () => expect(a).eql(486));
			it("10/5=2", () => expect(b).eql(2));
			it("1000-334=666", () => expect(c).eql(666));
			it("2.7+10=12.7", () => expect(d).eql(12.7));
			it("5*99=495", () => expect(e).eql(495));
		});
	});
};