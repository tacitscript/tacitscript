const {expect, assert} = chai;
import ts from "tacitscript";

export default () => {
	describe('complex numbers - revealing module .(: ((].="real" [.[) (].="imag" [.]) (].="mag" [.^2@.+$.^0.5) (].="add" [.(: (~.+$@.complexASV)`).(.$)) 0/0`)?`).(.$)', () => {
		// NB if we pass a module here eg, complexASV(1 2)"add"(complexASV(3 4)) then it fails as complexASV(1 2)"add" is applied to complexASV(3 4)
		/*ts
			complexASV		.(: (
				(].="real" [.[)
				(].="imag" [.])
				(].="mag" [.^2@.+$.^0.5)
				(].="add" [.(: (~.+$@.complexASV)`).(.$))
				0/0`
			)?`).(.$)
			doubleIntake	:.:
			module			:.(: ]`).(.$)
			complex			:.(: (
				(].="real" [.[)
				(].="imag" [.])
				(].="mag" [.^2@.+$.^0.5)
				0/0`
			)?`).(.$)
			solutionA		"mag",3complex4
			solutionB		complexASV(3 4)"add"(5 6)"real"
		*/
		it('complexASV(3 4)"mag"=5', () => expect(complexASV([3, 4])("mag")).eql(5));
		it(`complexASV(3 4)"real"=3`, () => expect(complexASV([3, 4])("real")).eql(3));
		it(`"invalid",1complex2=0/0`, () => expect(complex(1, 2)("invalid")).eql(undefined));
		it(`complexASV(3 4)"add"(5 6)"real"=8`, () => expect(solutionB).eql(8));
		it(`"real",3complex4=3`, () => expect(complex(3, 4)("real")).eql(3));
		it(`"mag",3complex4=5`, () => expect(solutionA).eql(5));
		it('"hello",2module3="hello"', () => expect(module(2, 3)("hello")).eql("hello"));
		it("(5 6),3doubleIntake4", () => expect(doubleIntake(3, 4)([5, 6])).eql([[3, 4], [5, 6]]));
	});

	describe("2.59 unionSet +.removeDuplicates", () => {
		/*ts
			removeDuplicates			;/.\.(].[)@
			unionSet					+.removeDuplicates
		*/
		it("(1 2 3)unionSet(2 3 4)=(1 2 3 4)", () => expect(unionSet([1, 2, 3], [2, 3, 4])).eql([1, 2, 3, 4]));
	});

	describe("2.40 cartesianProduct :,(:@ (:~)@)._.(.$).(.$)@.{ removeDuplicates ;/.\.(].[)@ intersectionSet cartesianProduct.removeDuplicates.((=$ 1`) ()`)??.[@", () => {
		/*ts
			pairMap						:@
			cartesianProduct			:,(:@ (:~)@)._.(.$).(.$)@.{
			solution					(1 2)cartesianProduct(4 5 6)
			removeDuplicates			;/.\.(].[)@
			solutionB					removeDuplicates((1 2) (3 4) (1 2) (5 6))
			intersectionSet				cartesianProduct.removeDuplicates.((=$ 1`) ()`)??.[@
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

	// describe('treeMap :.(.(.((}.="A")` [.treeMap) [).? ]).@$', () => {
	// 	/*ts
	// 		treeMap				:.(.(.((}.="A")` [.treeMap) [).? ]).@$
	// 		solution			^2treeMap(1 (2 (3 4) 5) (6 7))
	// 	*/
	// 	it("^2treeMap(1 (2 (3 4) 5) (6 7))=(1 (4 (9 16) 25) (36 49))", () => expect(solution).eql([1, [4, [9, 16], 25], [36, 49]]));
	// });

	describe(`2.30 squareTree ((}.="A" squareTree) ^2)?@`, () => {
		/*ts
			squareTree			((}.="A" squareTree) ^2)?@
		*/
		it("(1 (2 (3 4) 5) (6 7))squareTree=(1 (4 (9 16) 25) (36 49))", () => expect(squareTree([1, [2, [3, 4], 5], [6, 7]])).eql([1, [4, [9, 16], 25], [36, 49]]));
	});

	describe(`2.28 flatten ((}.="A" flatten) ;)?@.{`, () => {
		/*ts
			flatten				((}.="A" flatten) ;)?@.{
		*/
		it("(1 2 (3 (4 5 (6 )) 7) (8 9))flatten=(1 2 3 4 5 6 7 8 9)", () => expect(flatten([1, 2, [3, [4, 5, [6]], 7], [8, 9]])).eql([1, 2, 3, 4, 5, 6, 7, 8, 9]));
	});

	describe(`2.27 deepReverse ((}.="A" deepReverse) ;)?@._`, () => {
		/*ts
			deepReverse 		((}.="A" deepReverse) ;)?@._
		*/
		it("((1 2) (3 4))deepReverse=((4 3) (2 1))", () => expect(deepReverse([[1, 2], [3, 4]])).eql([[4, 3], [2, 1]]));
	});

	describe("2.20 sameParity .([.%2.=.(%2.) ;).?$", () => {
		/*ts
			sameParity			.([.%2.=.(%2.) ;).?$
		*/
		it("sameParity(1 2 3 4 5 6 7)=(1 3 5 7)", () => expect(sameParity([1, 2, 3, 4, 5, 6, 7])).eql([1, 3, 5, 7]));
		it("sameParity(2 3 4 5 6 7)=(2 4 6)", () => expect(sameParity([2, 3, 4, 5, 6, 7])).eql([2, 4, 6]));
	});

	describe("compose .~", () => {
		/*ts
			compose		.~
		*/
		it("6,^2compose+1=49", () => expect(compose(x => x * x, x => x + 1)(6)).eql(49));
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

	describe("expRec ((].=0 1`) .([ ,(; -1).expRec).*$)?", () => {
		/*ts
			expRec		((].=0 1`) .([ ,(; -1).expRec).*$)?
		*/
		it("expRec(2 3)=8", () => expect(expRec([2, 3])).eql(8));
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
		it("4f0=11", () => expect(f(4)).eql(11));
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
			factRec			((=0 1`) .(; -1.factRec).*$)?
		*/
		it("4factRec=24", () => expect(factRec(4)).eql(24));
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

};