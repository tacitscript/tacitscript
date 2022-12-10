const {expect} = chai;
import ts from "tacitscript";

export default () => {
	xdescribe("", () => {
		/*ts

		*/
		it("", () => expect().eql());
	});

	describe("SICP", () => {
		describe("operators", () => {
			/*ts
				// check			<
			*/

		});

		describe("1.4 Compound Procedures", () => {
			/*ts
				cube			;$*$*
				square			;$*
				double			*2
				inverse			1/
				doubleSix		6,*2
			*/
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
				c				[([z)
				d				[(]z)
				makeRat			:
				numer			[
				denom			]
				triple			1:2:3
			*/
			it("[x=1", () => expect(a).eql(1));
			it("]x=2", () => expect(b).eql(2));
			it("[([z)=1", () => expect(c).eql(1));
			it("[(]z)=3", () => expect(d).eql(3));
			it("1:2:3=[[1, 2], 3]", () => expect(ts.toString(triple)).eql("[[1 2] 3]"));
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