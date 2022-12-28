const {expect} = chai;
import ts from "tacitscript";

export default () => {
	describe("SICP", () => {
		describe("1.12 pascal >,(#.).^(].((0 )+.: $ $0).~.+@&).(((1 ) ),)", () => {
			/*ts
				pascal						>,(#.).^(].((0 )+.: $ $0).~.+@&).(((1 ) ),)
				// v1						.(.(>,(#.) (].((0 )+ +(0 )).~.+$@)`) ((1 ) )`).^$
			*/
			it("pascal5=((1 ) (1 1) (1 2 1) (1 3 3 1) (1 4 6 4 1))", () => expect(pascal(5)).eql([[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]));
		});

		describe("1.11 f (<3 ? ;)|(-1.f.+ $ (-2.f.*2.+ $ -3.f.*3))", () => {
			/*ts
				f							(<3 ? ;)|(-1.f.+ $ (-2.f.*2.+ $ -3.f.*3))			NN
				// v1						((<3 ;) .(-1.f -2.f.*2 -3.f.*3).+$)?
			*/
			it('f4=11', () => expect(f(4)).eql(11));
		});

		describe("fibGen >,(#.).^(_2%.].+@).((1 1),).]", () => {
			/*ts
				isEven						%2.=0
				threeSequence				+,^3
				lessLength					:.(].#.< $ [)
				sumLastTwo					_2%.].+@
				fibGen						>,(#.).^(_2%.].+@).((1 1),).]						NN
				// v1						.(.(>,(#.) (_2%.].+$)`) (1 1)`).^$.]
			*/
			it("sumLastTwo(1 2 3)=5", () => expect(sumLastTwo([1, 2, 3])).eql(5));
			it("3lessLength(1 2 3)=()", () => expect(lessLength(3, [1, 2, 3])).eql(false));
			it("fibGen6=8", () => expect(fibGen(6)).eql(8));
			it('(+,^3)3=(3 4 5)', () => expect(threeSequence(3)).eql([3, 4, 5]));
		});

		describe("fibRec (=0 ? 0`)|(=1 ? 1`)|((-1.: $ -2).fibRec&.+@)", () => {
			/*ts
				fibRec						(=0 ? 0`)|(=1 ? 1`)|((-1.: $ -2).fibRec&.+@)		NN
				// v1						:.[.((=0 0`) (=1 1`) .(-1 -2).fibRec0@.+$)?
			*/
			it("fibRec4=3", () => expect(fibRec(4)).eql(3));
		});

		describe("factGen +1^.*@", () => {
			/*ts
				factGen	+1^.*@																	NN
			*/
			it("factGen4=24", () => expect(factGen(4)).eql(24));
		});

		describe("factRec (=0 ? 1`)|(-1.factRec.* $ ;)", () => {
			/*ts
				factRec						(=0 ? 1`)|(-1.factRec.* $ ;)						NN
				// v1						:.[.((=0 1`) .(; -1.factRec0).*$)?
			*/
			it('factRec4=24', () => expect(factRec(4)).eql(24));
		});

		describe("1.3 sumOfTwoLarger ;<.1%.].^2&.+@", () => {
			/*ts
				sumOfTwoLarger				;<.1%.].^2&.+@										AN
			*/
			it("sumOfTwoLarger(4 2 3)=25", () => expect(sumOfTwoLarger([4, 2, 3])).eql(25));
		});

		describe("hypotenuse :.^2&.+@.^0.5", () => {
			/*ts
				hypotenuse					:.^2&.+@.^0.5										NNN
			*/
			it('3hypotenuse4=5', () => expect(hypotenuse(3, 4)).eql(5));
		});

		describe("1.1.1 sumOfSquares :.^2&.+@", () => {
			/*ts
				sumOfSquares				:.^2&.+@											NNN
			*/
			it('3sumOfSquares4=25', () => expect(sumOfSquares(3, 4)).eql(25));
		});
	});
};