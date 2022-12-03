const {expect} = chai;
import ts from "tacitscript";

export default () => {
	xdescribe("", () => {
		/*ts

		*/
		it("", () => expect().eql());
	});

	describe("SICP", () => {
		describe('complex numbers - revealing module :.(: ).[.(;.).:(((].="real" [.[) (].="imag" [.]) (].="mag" [.^2@.+$.^0.5) (].="add" [.(: ).[.(;.("real", "imag",).).:(~.+$@.complex$).(.$)) "Unknown method"`)?).(.$)', () => {
			/*ts
				doubleIntake	:.(: ).[.(;.)
				complexA		:.(: ).[.(;.).:(((].="real" [.[) (].="imag" [.]) (].="mag" [.^2@.+$.^0.5) (].="add" [.(: ).[.(;.).:(~.+$@.complexA$).(.$)) "Unknown method"`)?).(.$)
				solutionA		"mag",3complexA4
				solutionB		3complexA4"add"(5 6)"real"
				complex			:.(: ).[.(;.).:(
									((].="real" [.[)
									(].="imag" [.])
									(].="mag" [.^2@.+$.^0.5)
									(].="add" [.(: ).[.(;.("real", "imag",).).:(~.+$@.complex$).(.$))
									0/0`
								)?).(.$)
				solutionC		2complex1"add"(1complex3)"mag"
			*/
			it(`"invalid",1complex2=0/0`, () => expect(complex(1, 2)("invalid")).eql(undefined));
			it(`2complex1"add"(1complex3)"mag"=5`, () => expect(solutionC).eql(5));
			it(`3complexA4"add"(5 6)"real"=8`, () => expect(solutionB).eql(8));
			it("(5 6),3doubleIntake4", () => expect(doubleIntake(3, 4)([5, 6])).eql([[3, 4], [5, 6]]));
			it(`"real",3complex4=3`, () => expect(complexA(3, 4)("real")).eql(3));
			it(`"mag",3complex4=5`, () => expect(solutionA).eql(5));
		});

		describe("2.59 unionSet +.removeDuplicates", () => {
			/*ts
				removeDuplicates			;/.\.(].[)@
				unionSet					+.removeDuplicates
			*/
			it("(1 2 3)unionSet(2 3 4)=(1 2 3 4)", () => expect(unionSet([1, 2, 3], [2, 3, 4])).eql([1, 2, 3, 4]));
		});

		describe("2.40 cartesianProduct :,(:@ (:,~)@)._.(.$).(.$)@.{ removeDuplicates ;/.\.(].[)@ intersectionSet cartesianProduct.removeDuplicates.((=$ 1`) ()`)?*.[@", () => {
			/*ts
				pairMap						:@
				cartesianProduct			:,(:@ (:,~)@)._.(.$).(.$)@.{
				solution					(1 2)cartesianProduct(4 5 6)
				removeDuplicates			;/.\.(].[)@
				solutionB					removeDuplicates((1 2) (3 4) (1 2) (5 6))
				intersectionSet				cartesianProduct.removeDuplicates.((=$ 1`) ()`)?*.[@
			*/
			it("(1 2 3)intersectionSet(2 3 4)=(2 3)", () => expect(intersectionSet([1, 2, 3], [2, 3, 4])).eql([2, 3]));
			it("removeDuplicates((1 2) (3 4) (1 2) (5 6))=((1 2) (3 4) (5 6))", () => expect(solutionB).eql([[1, 2], [3, 4], [5, 6]]));
			it("(1 2)cartesianProduct(4 5 6)=((1 4) (1 5) (1 6) (2 4) (2 5) (2 6))", () => expect(cartesianProduct([1, 2], [4, 5, 6])).eql([[1, 4], [1, 5], [1, 6], [2, 4], [2, 5], [2, 6]]));
		});

		describe("2.37 dotProduct :.~.*$@.+$ matrixXVector :,(; dotProduct)._.@$ matrixXMatrix :,(; ~),(; matrixXVector)._.@$", () => {
			/*ts
				dotProduct		:.~.*$@.+$
				matrixXVector	:,(; dotProduct)._.@$
				matrixXMatrix	:,(; ~),(; matrixXVector)._.@$
			*/
			it("((0 1 2) (1 2 3) (2 3 4))matrixXMatrix((2 1 3) (3 2 2) (1 3 1))=((5 8 4) (11 14 10) (17 20 16))", () => expect(matrixXMatrix([[0, 1, 2], [1, 2, 3], [2, 3, 4]], [[2, 1, 3], [3, 2, 2], [1, 3, 1]])).eql([[5, 8, 4], [11, 14, 10], [17, 20, 16]]))
			it("((0 1 2) (1 2 3) (2 3 4))matrixXVector(0 1 2)=(5 8 11)", () => expect(matrixXVector([[0, 1, 2], [1, 2, 3], [2, 3, 4]],[0, 1, 2])).eql([5, 8, 11]));
			it("(0 1 2 3)dotProduct(0 1 2 3)=14", () => expect(dotProduct([0, 1, 2, 3], [0, 1, 2, 3])).eql(14));
		});

		describe("2.36 accumulateN ~.+$@", () => {
			/*ts
				accumulateN			~.+$@
			*/
			it("accumulateN((1 2 3) (4 5 6) (7 8 9) (10 11 12))=(22 26 30)", () => expect(accumulateN([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]])).eql([22, 26, 30]));
		});

		describe("2.33 map* appendTo :.(] [.(; )).+$ length (:.[.+1 0)$", () => {
			/*ts
				incProcessor		:.(] [.(; +1`).(.$)).(,$)
				incProcessorB		:,(.(; +1`).(.$) ;)._.(,$)
				solution			*2incProcessor3
				solutionB			*2incProcessor3
				//map				:,(.(.(.(; (.(; ))`).(.$) +`) ( )`) ;)._.(,$)
				//solutionC			*2map(1 2 3)
				appendTo			:.(] [.(; )).+$
				//map				:,(.(:appendTo.(.$) ( )`) ;).$$
				//map				:,(.(.(;` :(; ).(.$))).:(+$).(.$).(:,) ( )`) ;).$$
				//applyAndCat		.(;` :(; ).(.$)).:(+$).(.$).(:,)
				//applyAndCat		:(; ).(.$).(;` ;).:(+$).(.$).(:,)
				//map				:,(.(applyAndCat ( )`) ;).$$
				//solutionC			2*map(1 2 3)
				length				(:.[.+1 0)$
			*/
			it("length(5 6 7)=3", () => expect(length([5, 6, 7])).eql(3));
			it ("4appendTo(1 2 3)=(1 2 3 4)", () => expect(appendTo(4, [1, 2, 3])).eql([1, 2, 3, 4]));
			it("2*(:.(] [.(; +1`).(.$)).(,$))3=7", () => expect(solution).eql(7));
			it("2*(:,(.(; +1`).(.$) ;)._.(,$))3=7", () => expect(solutionB).eql(7));
		});

		describe('treeMap :.(.(.((}.="A")` [.treeMap) [).? ]).@$', () => {
			/*ts
				treeMap				:.(.(.((}.="A")` [.treeMap) [).? ]).@$
				solution			^2treeMap(1 (2 (3 4) 5) (6 7))
			*/
			it("^2treeMap(1 (2 (3 4) 5) (6 7))=(1 (4 (9 16) 25) (36 49))", () => expect(solution).eql([1, [4, [9, 16], 25], [36, 49]]));
		});

		describe(`2.30 squareTree :.[.((}.="A" squareTree0) ^2)?@`, () => {
			/*ts
				squareTree			:.[.((}.="A" squareTree0) ^2)?@
			*/
			it("(1 (2 (3 4) 5) (6 7))squareTree0=(1 (4 (9 16) 25) (36 49))", () => expect(squareTree([1, [2, [3, 4], 5], [6, 7]])).eql([1, [4, [9, 16], 25], [36, 49]]));
		});

		describe(`2.28 flatten :.[.((}.="A" flatten0) ;)?@.{`, () => {
			/*ts
				flatten				:.[.((}.="A" flatten0) ;)?@.{
			*/
			it("(1 2 (3 (4 5 (6 )) 7) (8 9))flatten0=(1 2 3 4 5 6 7 8 9)", () => expect(flatten([1, 2, [3, [4, 5, [6]], 7], [8, 9]])).eql([1, 2, 3, 4, 5, 6, 7, 8, 9]));
		});

		describe(`2.27 deepReverse :.[.((}.="A" deepReverse0) ;)?@._`, () => {
			/*ts
				deepReverse 		:.[.((}.="A" deepReverse0) ;)?@._
			*/
			it("((1 2) (3 4))deepReverse0=((4 3) (2 1))", () => expect(deepReverse([[1, 2], [3, 4]])).eql([[4, 3], [2, 1]]));
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

		describe("gcd :.((].=0 [) .(] %$).gcd$)?", () => {
			/*ts
				gcd			:.((].=0 [) .(] %$).gcd$)?
			*/
			it("15gcd20=5", () => expect(gcd(15, 20)).eql(5));
		});

		describe("fastExp :.((].=0 1`) (].((%2.=0 !()`) ()`)? ,(; /2).fastExp$.(; ;).*$) .([ ,(; -1).fastExp$).*$)?", () => {
			/*ts
				square		.(; ;).*$
				isEven		((%2.=0 !()`) ()`)?
				ifNoNOne	(].=0 1`)
				fastExp		:.(ifNoNOne (].isEven ,(; /2).fastExp$.square) .([ ,(; -1).fastExp$).*$)?
			*/
			it("2fastExp7=128", () => expect(fastExp(2, 7)).eql(128));
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
				f	:.[.((<3 ;) .(-1.f0 -2.f0.*2 -3.f0.*3).+$)?
			*/
			it("4f0=11", () => expect(f(4)).eql(11));
		});

		describe("fibGen .(.(>,(#.) (_2%.].+$)`) (1 1)`).^$.]", () => {
			/*ts
				fibGen		.(.(>,(#.) (_2%.].+$)`) (1 1)`).^$.]
			*/
			it("fibGen6=8", () => expect(fibGen(6)).eql(8));
		});

		describe("fibRec :.[.((=0 0`) (=1 1`) .(-1 -2).fibRec0@.+$)?", () => {
			/*ts
				fibRec		:.[.((=0 0`) (=1 1`) .(-1 -2).fibRec0@.+$)?
			*/
			it("4fibRec0=3", () => expect(fibRec(4)).eql(3));
		});

		describe("factGen +1^.*$", () => {
			/*ts
				factGen	+1^.*$
			*/
			it("factGen4=24", () => expect(factGen(4)).eql(24));
		});

		describe("factRec :.[.((=0 1`) .(; -1.factRec0).*$)?", () => {
			/*ts
				factRec	:.[.((=0 1`) .(; -1.factRec0).*$)?
			*/
			it("4factRec0=24", () => expect(factRec(4)).eql(24));
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