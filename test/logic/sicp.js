const {expect} = chai;
import ts from "tacitscript";

// Note: Recursive operators MUST be unary
// The reason is that generating the type of a recursive operator cannot be determined or deferred - therefore we assume it is VV

export default () => {
	describe("SICP", () => {
		describe("gcd ((].=0 [) .(] %$).gcd)?", () => {
			/*ts
				gcd			((].=0 [) .(] %$).gcd)?
			*/
			it("gcd(15 20)=5", () => expect(gcd([15, 20])).eql(5));
		});

		describe("fastExp ((].=0 1`) (].((%2.=0 !()`) ()`)? ,(; /2).fastExp.(; ;).*$) .([ ,(; -1).fastExp).*$)?", () => {
			/*ts
				square		.(; ;).*$
				isEven		((%2.=0 !()`) ()`)?
				ifNoNOne	(].=0 1`)
				fastExp		(ifNoNOne (].isEven ,(; /2).fastExp.square) .([ ,(; -1).fastExp).*$)?
			*/
			it("fastExp(2 7)=128", () => expect(fastExp([2, 7])).eql(128));
		});

		describe("expGen :,(` ;).^$.*$", () => {
			/*ts
				expGen		:,(` ;).^$.*$
			*/
			it("3expGen2=9", () => expect(expGen(3, 2)).eql(9));
		});

		describe("expRec :.((=0 1`) .([ .([ ].-1).^$).*$)?", () => {
			/*ts
				expRec		:.((=0 1`) .([ .([ ].-1).^$).*$)?
			*/
			it("2expRec3=8", () => expect(expRec(2, 3)).eql(8));
		});

		describe("1.12 pascal .(.(>,(#.) (].((0 )+ +(0 )).~.+$@)`) ((1 ) )`).^$", () => {
			/*ts
				pascal		.(.(>,(#.) (].((0 )+ +(0 )).~.+$@)`) ((1 ) )`).^$
			*/
			it("pascal5=((1 ) (1 1) (1 2 1) (1 3 3 1) (1 4 6 4 1))", () => expect(pascal(5)).eql([[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]));
		});

		describe("1.11 f ((<3 ;) .(-1.f -2.f.*2 -3.f.*3).+$)?", () => {
			/*ts
				f	((<3 ;) .(-1.f -2.f.*2 -3.f.*3).+$)?
			*/
			it("f4=11", () => expect(f(4)).eql(11));
		});

		describe("fibGen .(.(>,(#.) (_2%.].+$)`) (1 1)`).^$.]", () => {
			/*ts
				fibGen		.(.(>,(#.) (_2%.].+$)`) (1 1)`).^$.]
			*/
			it("fibGen6=8", () => expect(fibGen(6)).eql(8));
		});

		describe("fibRec ((=0 0`) (=1 1`) .(-1 -2).fibRec@.+$)?", () => {
			/*ts
				fibRec		((=0 0`) (=1 1`) .(-1 -2).fibRec@.+$)?
			*/
			it("fibRec4=3", () => expect(fibRec(4)).eql(3));
		});

		describe("factGen +1^.*$", () => {
			/*ts
				factGen	+1^.*$
			*/
			it("factGen4=24", () => expect(factGen(4)).eql(24));
		});

		describe("factRec ((=0 1`) .(; -1.factRec).*$)?", () => {
			/*ts
				factRec	((=0 1`) .(; -1.factRec).*$)?
			*/
			it("factRec4=24", () => expect(factRec(4)).eql(24));
		});

		describe("1.3 sumOfTwoLarger ;<.1%.].^2@.+$", () => {
			/*ts
				sumOfTwoLarger	;<.1%.].^2@.+$
			*/
			it("sumOfTwoLarger(4 2 3)=25", () => expect(sumOfTwoLarger([4, 2, 3])).eql(25));
		});

		describe("hypotenuse :.^2@.+$.^0.5", () => {
			/*ts
				hypotenuse  :.^2@.+$.^0.5
			*/
			it("3hypotenuse4=5", () => expect(hypotenuse(3, 4)).eql(5));
		});

		describe("1.1.1 sumOfSquares :.^2@.+$", () => {
			/*ts
				sumOfSquares    :.^2@.+$
			*/
			it("3sumOfSquares4=25", () => expect(sumOfSquares(3, 4)).eql(25));
		});
	});
};