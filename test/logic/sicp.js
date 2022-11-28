const {expect} = chai;
import ts from "tacitscript";

// Note: Recursive operators MUST be unary
// The reason is that generating the type of a recursive operator cannot be determined or deferred - therefore we assume it is VV

export default () => {
	xdescribe("", () => {
		/*ts

		*/
		it("", () => expect().eql());
	});

	describe("SICP", () => {
		describe(`2.28 flatten ((}.="A" flatten) ;)?@.{`, () => {
			/*ts
				unnestSingle		{((1 ))
				flatten				((}.="A" flatten) ;)?@.{
			*/
			it("flatten(1 2 (3 (4 5 (6 )) 7) (8 9))=(1 2 3 4 5 6 7 8 9)", () => expect(flatten([1, 2, [3, [4, 5, [6]], 7], [8, 9]])).eql([1, 2, 3, 4, 5, 6, 7, 8, 9]));
		});

		describe(`2.27 deepReverse ((}.="A" deepReverse) ;)?@._`, () => {
			/*ts
				deepReverse 		((}.="A" deepReverse) ;)?@._
			*/
			it("deepReverse((1 2) (3 4))=((4 3) (2 1))", () => expect(deepReverse([[1, 2], [3, 4]])).eql([[4, 3], [2, 1]]));
		});

		describe("2.20 sameParity .([.%2.=.(%2.) ;).*$", () => {
			/*ts
				sameParity			.([.%2.=.(%2.) ;).*$
			*/
			it("sameParity(1 2 3 4 5 6 7)=(1 3 5 7)", () => expect(sameParity([1, 2, 3, 4, 5, 6, 7])).eql([1, 3, 5, 7]));
			it("sameParity(2 3 4 5 6 7)=(2 4 6)", () => expect(sameParity([2, 3, 4, 5, 6, 7])).eql([2, 4, 6]));
		});

		describe("cons :.(,apply) car [,", () => {
			/*ts
				comma				,
				apply				comma,~
				applyTest			+2apply3
				applyToBinary		:.#apply
				applyToBinaryB		:.(,#)
				cons				:.(,apply)
				val					7cons8
				execFn				#:.(,$)
				applyArray			(7 8),
				car					[:.(,$)
				carB				[,
			*/
			it("+2apply3=5", () => expect(applyTest).eql(5));
			it("5(:.#apply)6=2", () => expect(applyToBinary(5, 6)).eql(2));
			it("5(:.(,#))6=2", () => expect(applyToBinaryB(5, 6)).eql(2));
			it("#,7(:.(,apply))8=2", () => expect(cons(7, 8)(x => x.length)).eql(2));
			it("[,7(:.(,apply))8=2", () => expect(cons(7, 8)(x => x[0])).eql(7));
			it("],7(:.(,apply))8=2", () => expect(cons(7, 8)(x => x[1])).eql(8));
			it("#:.(,$)(f => f([7, 8]))=2", () => expect(execFn(applyArray)).eql(2));
			it("car(7cons8)=7", () => expect(car(cons(7, 8))).eql(7));
			it("[,(7cons8)=7", () => expect(carB(cons(7, 8))).eql(7));
		});

		describe("compose dot,~", () => {
			/*ts
				dot			.
				compose		dot,~
			*/
			it("6,^2compose+1=47", () => expect(compose(x => x * x, x => x + 1)(6)).eql(49));
		});

		describe("repeated :,(` ;).^$.(.$)", () => {
			/*ts
				repeated		:,(` ;).^$.(.$)
			*/
			it("3,+2repeated4=11", () => expect(repeated(x => x + 2, 4)(3)).eql(11));
		});

		describe("twice :,(`,^2.(.$) ;)._.(,$)", () => {
			/*ts
				twice		:,(`,^2.(.$) ;)._.(,$)
			*/
			it("+1twice2=4", () => expect(twice(x => x + 1, 2)).eql(4));
		});

		describe("piSum ;^.(*2.+1)@.(2 )%.(*$.8/)@.+$", () => {
			/*ts
				piSum		;^.(*2.+1)@.(2 )%.(*$.8/)@.+$
			*/
			it("piSum10000=3.1414926535900367", () => expect(piSum(10000)).eql(3.1414926535900367));
		});

		describe("sumCubes :.([.+ _.-$.+1).^$.^3@.+$", () => {
			/*ts
				sumCubes		:.([.+ _.-$.+1).^$.^3@.+$
			*/
			it("2sumCubes4=99", () => expect(sumCubes(2, 4)).eql(99));
		});

		describe("sumIntegers :.([.+ _.-$.+1).^$.+$", () => {
			/*ts
				sumIntegers		:.([.+ _.-$.+1).^$.+$
			*/
			it("0sumIntegers10=55", () => expect(sumIntegers(0, 10)).eql(55));
		});

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