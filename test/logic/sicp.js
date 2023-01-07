const {expect} = chai;
import ts from "tacitscript";

export default () => {
	describe("SICP", () => {
		describe('2.27 deepReverse (}.="A" ? deepReverse)|;&._', () => {
			/*ts
				deepReverse					(}.="A" ? deepReverse)|;&._
				// v1						:.[.((}.="A" deepReverse0) ;)?@._
			*/
			it("deepReverse((1 2) (3 4))=((4 3) (2 1))", () => expect(deepReverse([[1, 2], [3, 4]])).eql([[4, 3], [2, 1]]));
		});

		describe("2.20 sameParity ([.%2.=,(%2.).? $ ;)", () => {
			/*ts
				sameParity					([.%2.=,(%2.).? $ ;)
				// v1						.([.%2.=.(%2.) ;).*$
			*/
			it("sameParity(1 2 3 4 5 6 7)=(1 3 5 7)", () => expect(sameParity([1, 2, 3, 4, 5, 6, 7])).eql([1, 3, 5, 7]));
			it("sameParity(2 3 4 5 6 7)=(2 4 6)", () => expect(sameParity([2, 3, 4, 5, 6, 7])).eql([2, 4, 6]));
		});

		describe("compose ~.", () => {
			/*ts
				compose						~.
			*/
			it("6,^2compose(+1)=47", () => expect(compose(x => x * x, x => x + 1)(6)).eql(49));
		});

		describe("repeated ^", () => {
			/*ts
				repeated					^													N(VV)(VV)
				// v1						:,(` ;).^$.(.$)
			*/
			it("3,4^(+2)=11", () => expect(repeated(4, x => x + 2)(3)).eql(11));
		});

		describe("twice (. $ ;)", () => {
			/*ts
				twice						(. $ ;)												(VV)(VV)
				// v1						:,(`,^2.(.$) ;)._.(,$)
			*/
			it("twice(+1)(2)=4", () => expect(twice(x => x + 1)(2)).eql(4));
		});

		describe("piSum ;^.(*2.+1)&.(2 )%.(*@.8/)&.+@", () => {
			/*ts
				piSum						;^.(*2.+1)&.(2 )%.(*@.8/)&.+@						NN
				// v1						;^.(*2.+1)@.(2 )%.(*$.8/)@.+$
			*/
			it("piSum10000=3.1414926535900367", () => expect(piSum(10000)).eql(3.1414926535900367));
		});

		describe("sumCubes :.([.+,^ $ _.-@.+1).^3&.+@", () => {
			/*ts
				sumCubes					:.([.+,^ $ _.-@.+1).^3&.+@							NNN
				// v1						:.([.+ _.-$.+1).^$.^3@.+$
			*/
			it("2sumCubes4=99", () => expect(sumCubes(2, 4)).eql(99));
		});

		describe("sumIntegers :.([.+,^ $ _.-@.+1).+@", () => {
			/*ts
				sumIntegers					:.([.+,^ $ _.-@.+1).+@								NNN
				// v1						:.([.+ _.-$.+1).^$.+$
			*/
			it("0sumIntegers10=55", () => expect(sumIntegers(0, 10)).eql(55));
		});

		describe("gcd (].=0 ? [)|((].: $ %@).gcd)", () => {
			/*ts
				gcd							(].=0 ? [)|((].: $ %@).gcd)							AN
				// v1						:.((].=0 [) .(] %$).gcd$)?
			*/
			it("gcd(15 20)=5", () => expect(gcd([15, 20])).eql(5));
		});

		describe("fastExp (].=0 ? 1`)|(].%2.=0 ? /2>(1 ).fastExp.*$;)|([.* $ -1>(1 ).fastExp)", () => {
			/*ts
				square						*$;
				isEven						%2.=0
				fastExp						(].=0 ? 1`)|(].%2.=0 ? /2>(1 ).fastExp.*$;)|([.* $ -1>(1 ).fastExp)							AN
				// v1						:.((].=0 1`) (].((%2.=0 !()`) ()`)? ,(; /2).fastExp$.(; ;).*$) .([ ,(; -1).fastExp$).*$)?
			*/
			it("fastExp(2 7)=128", () => expect(fastExp([2, 7])).eql(128));
		});

		describe("expGen :.([.`,^ $ ]).*@", () => {
			/*ts
				expGen						:.([.`,^ $ ]).*@									NNN
				// v1						:,(` ;).^$.*$
			*/
			it("3expGen2=9", () => expect(expGen(3, 2)).eql(9));
		});

		describe("expRec (].=0 ? 1`)|([.* $ -1>(1 ).expRec)", () => {
			/*ts
				expRec						(].=0 ? 1`)|([.* $ -1>(1 ).expRec)					AN
			*/
			it("expRec(2 3)=8", () => expect(expRec([2, 3])).eql(8));
		});

		describe("1.12 pascal >,(#.).^(].((0 )+.: $ $0).~.+@&).(((1 ) ),)", () => {
			/*ts
				pascal						>,(#.).^(].((0 )+.: $ $0).~.+@&).(((1 ) ),)			NA
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