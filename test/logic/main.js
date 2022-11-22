const {expect} = chai;
import ts from "tacitscript";
import problems from "./problems.js";
import lodash from "./lodash.js";
import miscellaneous from "./miscellaneous.js";
import operators from "./operators.js";
import rosettaCode from "./rosetta-code.js";

mocha.setup('bdd');

describe("Underscore", () => {
	// describe("intersection _1%,(~?@.&$ [),(=, ;).*$", () => {
	// /*ts
	// 	intermediateF		((1 2 3) (2 3 4)),~?@
	// 	intermediateL		&$
	// 	intermediateJ		&$(<2 <3 <4)
	// 	intermediateI		<2&(>0)
	// 	intermediateE		((1 2 3) (2 3 4)),(~?@.&$),(=,)
	// 	intermediateH		((1 2 3) (2 3 4)),~?@,&$
	// 	intermediateG		(2 3 4),~?
	// 	intermediateD		=,?(1 2 3)
	// 	intermediateC		=2?(1 2 3)
	// 	intermediateB		(=,?(1 2 3))*(2 3 4 5)
	// 	intermediateA		_1%((1 2 3) (101 2 1 10) (2 1))
	// 	intersection		_1%,(~?@.&$ [),(=, ;).*$
	// 	calculation			intersection((1 2 3) (101 2 1 10) (2 1))
	// */

	// 	it("((1 2 3) (2 3 4)),~?@,&$,(=,)(2) eql 2", () => expect(intermediateE(2)).eql(2));
	// 	it("((1 2 3) (2 3 4)),~?@,&$(x => x === 2) eql 2", () => expect(intermediateH(x => x === 2)).eql(2));
	// 	it("((1 2 3) (2 3 4)),~?@[1](x => x === 2) eql 2", () => expect(intermediateF[1](x => x === 2)).eql(2));
	// 	it("(2 3 4),~?(x => x === 2) eql 2", () => expect(intermediateG(x => x === 2)).eql(2));
	// 	it("=,?(1 2 3)(2) eql 2", () => expect(intermediateD(2)).eql(2));
	// 	it("=2?(1 2 3) eql 2", () => expect(intermediateC).eql(2));
	// 	it("(=,?(1 2 3))*(2 3 4 5) eql [2, 3]", () => expect(intermediateB).eql([2, 3]));
	// 	it("_1%((1 2 3) (101 2 1 10) (2 1)) eql [[[1, 2, 3], [101, 2, 1, 10]], [[2, 1]]]", () => expect(intermediateA).eql([[[1, 2, 3], [101, 2, 1, 10]], [[2, 1]]]));
	// 	it("intersection([[1, 2, 3], [101, 2, 1, 10], [2, 1]]) eql [2, 1]", () => expect(intersection([[1, 2, 3], [101, 2, 1, 10], [2, 1]])).eql([2, 1]));
	// 	it("intersection((1 2 3) (101 2 1 10) (2 1)) eql [2, 1]", () => expect(calculation).eql([2, 1]));
	// });

	describe("has '.!.!", () => {
	/*ts
		has					'.((; !()`) ()`)?
		calculation			"b"has({"{a: 1, b: 2, c: 3}")
	*/
		it(`"b"has({"{a: 1, b: 2, c: 3}") eql true`, () => expect(calculation).eql(true));
		it(`has("b", {a: 1, b: 2, c: 3}) eql true`, () => expect(has("b", {a: 1, b: 2, c: 3})).eql(true));
	});

	describe("defaults +", () => {
	/*ts
		defaults			+
		calculation			{"{flavor: 'vanilla', sprinkles: 'lots'}"defaults({"{flavor: 'chocolate'}")
	*/
		it(`defaults({flavor: 'vanilla', sprinkles: 'lots'}, {flavor: 'chocolate'}) eql {flavor: "chocolate", sprinkles: "lots"}`, () => expect(defaults({flavor: 'vanilla', sprinkles: 'lots'}, {flavor: 'chocolate'})).eql({flavor: "chocolate", sprinkles: "lots"}));
		it(`{"{flavor: 'vanilla', sprinkles: 'lots'}"defaults({"{flavor: 'chocolate'}") eql {flavor: "chocolate", sprinkles: "lots"}`, () => expect(calculation).eql({flavor: "chocolate", sprinkles: "lots"}));
	});

	describe("omit -", () => {
	/*ts
		omit				-
		calculation			("userid" )omit({"{name: 'moe', age: 50, userid: 'moe1'}")
	*/
		it(`omit(["userid"], {name: 'moe', age: 50, userid: 'moe1'}) eql {name: 'moe', age: 50}`, () => expect(omit(["userid"], {name: 'moe', age: 50, userid: 'moe1'})).eql({name: 'moe', age: 50}));
		it(`("userid" )omit({"{name: 'moe', age: 50, userid: 'moe1'}") eql {name: 'moe', age: 50}`, () => expect(calculation).eql({name: 'moe', age: 50}));
	});

	describe("pick *", () => {
	/*ts
		pick				*
		calculation			("name" "age")pick({"{name: 'moe', age: 50, userid: 'moe1'}")
	*/
		it(`pick(["name", "age"], {name: 'moe', age: 50, userid: 'moe1'}) eql {name: 'moe', age: 50}`, () => expect(pick(["name", "age"], {name: 'moe', age: 50, userid: 'moe1'})).eql({name: 'moe', age: 50}));
		it(`("name" "age")pick({"{name: 'moe', age: 50, userid: 'moe1'}") eql {name: 'moe', age: 50}`, () => expect(calculation).eql({name: 'moe', age: 50}));
	});

	describe("extend +$", () => {
	/*ts
		extend				+$
		calculation			extend({"{name: \"moe\"}" {"{age: 50}")
	*/
		it(`extend({"{name: \"moe\"}" {"{age: 50}") eql {name: "moe", age: 50}`, () => expect(calculation).eql({name: "moe", age: 50}));
		it(`extend([{name: "moe"}, {age: 50}]) eql {name: "moe", age: 50}`, () => expect(extend([{name: "moe"}, {age: 50}])).eql({name: "moe", age: 50}));
	});

	describe("invert \\._@.\\", () => {
	/*ts
		invert				\._@.\
		calculation			invert({"{Moe: 'Moses', Larry: 'Louis', Curly: 'Jerome'}")
	*/
		it(`invert({Moe: 'Moses', Larry: 'Louis', Curly: 'Jerome'}) eql {Moses: "Moe", Louis: "Larry", Jerome: "Curly"}`, () => expect(invert({Moe: 'Moses', Larry: 'Louis', Curly: 'Jerome'})).eql({Moses: "Moe", Louis: "Larry", Jerome: "Curly"}));
		it(`invert({"{Moe: 'Moses', Larry: 'Louis', Curly: 'Jerome'}") eql {Moses: "Moe", Louis: "Larry", Jerome: "Curly"}`, () => expect(calculation).eql({Moses: "Moe", Louis: "Larry", Jerome: "Curly"}));
	});

	describe("pairs \\", () => {
	/*ts
		pairs				\
		calculation			pairs({"{one: 1, two: 2, three: 3}")
	*/
		it("pairs({one: 1, two: 2, three: 3}) eql [['one', 1], ['two', 2], ['three', 3]]", () => expect(pairs({one: 1, two: 2, three: 3})).eql([['one', 1], ['two', 2], ['three', 3]]));
		it(`pairs({"{one: 1, two: 2, three: 3}") eql [['one', 1], ['two', 2], ['three', 3]]`, () => expect(calculation).eql([['one', 1], ['two', 2], ['three', 3]]));
	});

	describe("mapObject @", () => {
	/*ts
		mapObject			@
		calculation			+5mapObject({"{start: 5, end: 12}")
	*/
		it("mapObject(x => x + 5, {start: 5, end: 12}) eql {start: 10, end: 17}", () => expect(mapObject(x => x + 5, {start: 5, end: 12})).eql({start: 10, end: 17}));
		it(`+5mapObject({"{start: 5, end: 12}") eql {start: 10, end: 17}`, () => expect(calculation).eql({start: 10, end: 17}));
	});

	describe("values \\.]@", () => {
	/*ts
		values				\.]@
		calculation			values({"{one: 1, two: 2, three: 3}")
	*/
		it("values({one: 1, two: 2, three: 3}) eql [1, 2, 3]", () => expect(values({one: 1, two: 2, three: 3})).eql([1, 2, 3]));
		it(`values({"{one: 1, two: 2, three: 3}") eql [1, 2, 3]`, () => expect(calculation).eql([1, 2, 3]));
	});

	describe("keys \\.[@", () => {
	/*ts
		keys				\.[@
		calculation			keys({"{one: 1, two: 2, three: 3}")
	*/
		it("keys({one: 1, two: 2, three: 3}) eql ['one', 'two', 'three']", () => expect(keys({one: 1, two: 2, three: 3})).eql(["one", "two", "three"]));
		it(`keys({"{one: 1, two: 2, three: 3}") eql ['one', 'two', 'three']`, () => expect(calculation).eql(["one", "two", "three"]));
	});

	describe("compose _.(.$)", () => {
	/*ts
		compose				_.(.$)
		calculation			compose(+1 *2)3
	*/
		it("compose([x => x + 1, x => x * 2])(3) eql 7", () => expect(compose([x => x + 1, x => x * 2])(3)).eql(7));
		it("compose(+1 *2)3 eql 7", () => expect(calculation).eql(7));
	});

	describe("negate !", () => {
	/*ts
		negate				!
		calculation			negate(%2.=0)'(0 1 2 3)
	*/
		it("negate(%2.=0)'(0 1 2 3) eql 1", () => expect(calculation).eql(1));
	});

	describe(`range (}.="N" #.=2)?,(;^ .([.+ _.-$).^$ .(.(].* [.+).(.$) .(.(1' [).-$ ])./$).^$).|$`, () => {
	/*ts
		rangeStop			;^
		rangeLimits			.([.+ _.-$).^$
		rangeStep			.(.(].* [.+).(.$) .(.(1' [).-$ ])./$).^$
		range				((}.="N" rangeStop) (#.=2 rangeLimits) rangeStep)?
	*/
		it("range(0) eql []", () => expect(range(0)).eql([]));
		it("range([0, -10, -1) eql [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]", () => expect(range([0, -10, -1])).eql([0, -1, -2, -3, -4, -5, -6, -7, -8, -9]));
		it("range([0, 30, 5]) eql [0, 5, 10, 15, 20, 25]", () => expect(range([0, 30, 5])).eql([0, 5, 10, 15, 20, 25]));
		it("range([1, 11]) eql [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]", () => expect(range([1, 11])).eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
		it("range(10) eql [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]", () => expect(range(10)).eql([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
		it(";^(4) eql [0, 1, 2, 3]", () => expect(rangeStop(4)).eql([0, 1, 2, 3]));
		it(".([.+ _.-$).^$([1, 4]) eql [1, 2, 3]", () => expect(rangeLimits([1, 4])).eql([1, 2, 3]));
		it(".(.(].* [.+).(.$) .(.(1' [).-$ ])./$).^$([10, 25, 5]) eql [10, 15, 20]", () => expect(rangeStep([10, 25, 5])).eql([10, 15, 20]));
	});

	describe("findLastIndex :.(%$ ].#).(([.#.=1 ()`) .(] [.].#).-$)?", () => {
	/*ts
		findLastIndex		:.(%$ ].#).(([.#.=1 ()`) .(] [.].#).-$)?
		calculation			(%2.=1)findLastIndex(1 2 3 4)
	*/
		//it("findLastIndex(x => (x % 2) === 1, [2, 4]) eql undefined", () => expect(findLastIndex(x => (x % 2) === 1, [2, 4])).eql(undefined));
		it("findLastIndex(x => (x % 2) === 1, [1, 2, 3, 4]) eql 2", () => expect(findLastIndex(x => (x % 2) === 1, [1, 2, 3, 4])).eql(2));
		it("(%2.=1)findLastIndex(1 2 3 4) eql 2", () => expect(calculation).eql(2));
	});

	describe("findIndex :.(%$.[.# ].#).((=$ ()`) [)?", () => {
	/*ts
		findIndex			:.(%$.[.# ].#).((=$ ()`) [)?
		calculation			(%2.=0)findIndex(1 2 3 4)
	*/
		//it("findIndex(x => (x % 2) === 0, [1, 5, 3]) eql undefined", () => expect(findIndex(x => (x % 2) === 0, [1, 3, 5])).eql(undefined));
		it("findIndex(x => (x % 2) === 0, [1, 2, 3, 4]) eql 1", () => expect(findIndex(x => (x % 2) === 0, [1, 2, 3, 4])).eql(1));
		it("(%2.=0)findIndex(1 2 3 4) eql 1", () => expect(calculation).eql(1));
	});

	// describe("sortedIndex :,(.(>.(].).(?,([.+1 [).|$).(:.) `0) ;).$$", () => {
	// /*ts
	// 	intermediateE		>,(].).(?,([.+1 [).|$).(:.)
	// 	intermediateF		>,(].).?.(:.)
	// 	intermediateD		>,(:.].)
	// 	intermediateC		35>,([.)
	// 	intermediateB		35>,(:.[.)
	// 	sortedIndex			:,(.(.(.(>,(].) `([.+1)) `[).?.(:.) `0) ;).$$
	// 	calculation			35sortedIndex(10 20 30 40 50)
	// */
	// 	it(">,(].).(?,([.+1 ].[).|$).(:.)(35)(2, 30) eql 3", () => expect(intermediateE(35)(2, 30)).eql(3));
	// 	it(">,(].).?.(:.)(35)(2, 30) eql [[2, 30], undefined]", () => expect(intermediateF(35)(2, 30)).eql([[2, 30], undefined]));
	// 	it("(>,(:.].))(35)(2, 40) eql false", () => expect(intermediateD(35)(2, 40)).eql(false));
	// 	it("(>,(:.].))(35)(2, 30) eql true", () => expect(intermediateD(35)(2, 30)).eql(true));
	// 	it("35>,([.)([20, 50]) eql true", () => expect(intermediateC([20, 50])).eql(true));
	// 	it("35>,(:.[.)(20, 50) eql true", () => expect(intermediateB(20, 50)).eql(true));
	// 	it("sortedIndex(35, [10, 20, 30, 40, 50]) eql 3", () => expect(sortedIndex(35, [10, 20, 30, 40, 50])).eql(3));
	// 	it("35sortedIndex(10 20 30 40 50) eql 3", () => expect(calculation).eql(3));
	// });

	describe("lastIndexOf :,(= ;).%$._1%.([.#.=0)?,(()` [.+$.#).|$", () => {
	/*ts
		intermediate		_1%((1 2 3) )
		lastIndexOf			:,(= ;).%$._1%.(([.#.=0 ()`) [.+$.#)?
		calculation			2lastIndexOf(1 2 3 1 2 3)
	*/
		it("_1%((1 2 3) ) eql [[], [[1, 2, 3]]]", () => expect(intermediate).eql([[], [[1, 2, 3]]]));
		it("lastIndexOf(2, [1, 2, 3, 1, 2, 3]) eql 4", () => expect(lastIndexOf(2, [1, 2, 3, 1, 2, 3])).eql(4));
		it("2lastIndexOf(1 2 3 1 2 3) eql 4", () => expect(calculation).eql(4));
		it("lastIndexOf(1, [1, 2, 3, 4, 2, 3]) eql 0", () => expect(lastIndexOf(1, [1, 2, 3, 4, 2, 3])).eql(0));
		it("lastIndexOf(3, [1, 2, 3, 4, 2, 3]) eql 5", () => expect(lastIndexOf(3, [1, 2, 3, 4, 2, 3])).eql(5));
		//it("lastIndexOf(5, [1, 2, 3, 4, 2, 3]) eql undefined", () => expect(lastIndexOf(5, [1, 2, 3, 4, 2, 3])).eql(undefined));
	});

	describe("indexOf :.(].#.= ,(= ;).%$.[.#).?$,(()` ;).|$", () => {
	/*ts
		indexOf				:.(.(.(].#.= (()`)`) ;`) ,(= ;).%$.[.#).?$
		calculation			2indexOf(1 2 3)
		calculationB		4indexOf(1 2 3)
	*/
		it("indexOf(2, [1, 2, 3]) eql 1", () => expect(indexOf(2, [1, 2, 3])).eql(1));
		it("2indexOf(1 2 3) eql 1", () => expect(calculation).eql(1));
		//it("indexOf(4, [1, 2, 3]) eql undefined", () => expect(indexOf(4, [1, 2, 3])).eql(undefined));
		//it("4indexOf(1 2 3) eql undefined", () => expect(calculationB).eql(undefined));
	});

	describe("chunk :,(.(; ) ;).%$", () => {
	/*ts
		chunk				:,(.(; ) ;).%$
		calculation			2chunk("Tyrone" "Elie" "Aidan" "Sam" "Katrina" "Billie" "Little Timmy")
	*/
		it(`chunk(2, ["Tyrone", "Elie", "Aidan", "Sam", "Katrina", "Billie", "Little Timmy"]) eql [["Tyrone", "Elie"], ["Aidan", "Sam"], ["Katrina", "Billie"], ["Little Timmy"]]`,
			() => expect(chunk(2, ["Tyrone", "Elie", "Aidan", "Sam", "Katrina", "Billie", "Little Timmy"])).eql([["Tyrone", "Elie"], ["Aidan", "Sam"], ["Katrina", "Billie"], ["Little Timmy"]]));
		it(`2chunk("Tyrone" "Elie" "Aidan" "Sam" "Katrina" "Billie" "Little Timmy") eql [["Tyrone", "Elie"], ["Aidan", "Sam"], ["Katrina", "Billie"], ["Little Timmy"]]`,
			() => expect(calculation).eql([["Tyrone", "Elie"], ["Aidan", "Sam"], ["Katrina", "Billie"], ["Little Timmy"]]));
	});

	describe("object \\", () => {
	/*ts
		object				\
		calculation			object(("moe" 30) ("larry" 40) ("curly" 50))
	*/
		it("object([['moe', 30], ['larry', 40], ['curly', 50]]) eql {moe: 30, larry: 40, curly: 50}", () => expect(object([['moe', 30], ['larry', 40], ['curly', 50]])).eql({moe: 30, larry: 40, curly: 50}));
		it(`object(("moe" 30) ("larry", 40) ("curly" 50)) eql {moe: 30, larry: 40, curly: 50}`, () => expect(calculation).eql({moe: 30, larry: 40, curly: 50}));
	});

	describe("zip unzip ~", () => {
	/*ts
		zip					~
		calculation			~(("moe" "larry" "curly") (30 40 50) (!() () ()))
	*/
		it("zip([['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]]) eql [['moe', 30, true], ['larry', 40, false], ['curly', 50, false]]",
			() => expect(zip([['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]])).eql([['moe', 30, true], ['larry', 40, false], ['curly', 50, false]]));
		it(`~(("moe" "larry" "curly") (30 40 50) (!() () ())) eql [['moe', 30, true], ['larry', 40, false], ['curly', 50, false]]`,
			() => expect(calculation).eql([['moe', 30, true], ['larry', 40, false], ['curly', 50, false]]));
	});

	describe("uniq (:.([ .([.(#.=0)?,(((!())`)` !=@.&$).|$ .(] )).*$).+$ ( ))$", () => {
	/*ts
		intermediateA		((#.=0 ((!())`)`) !=@.&$)?
		uniq				(:.([ .([.intermediateA .(] )).*$).+$ ( ))$
		calculation			uniq(1 2 1 4 1 3)
	*/
		it("!=@.&$([])(3) eql true", () => expect(intermediateA([])(3)).eql(true));
		it("!=@.&$([2, 4])(3) eql true", () => expect(intermediateA([2, 4])(3)).eql(true));
		it("!=@.&$([2, 4])(4) eql false", () => expect(intermediateA([2, 4])(4)).eql(false));
		it("uniq([1, 2, 1, 4, 1, 3]) eql [1, 2, 4, 3]", () => expect(uniq([1, 2, 1, 4, 1, 3])).eql([1, 2, 4, 3]));
		it("uniq(1 2 1 4 1 3) eql [1, 2, 4, 3]", () => expect(calculation).eql([1, 2, 4, 3]));
	});

	describe("difference :._,(+$.;/.\\.(1 0)'@.!=@.&$ ;).*$", () => {
	/*ts
		difference			:._,(+$.;/.\.(1 0)'@.!=@.&$ ;).*$
		intermediateA		:._,(+$.;/.\.(1 0)'@ ;)
		intermediateB		:._,(+$.;/ ;)
		intermediateC		:._,(+$ ;)
		intermediateD		:._
		calculation			(1 2 3 4 5)difference((5 2 10) )
	*/
		it("(1 2 3 4 5)difference((5 2 10) ) eql [1, 3, 4]", () => expect(calculation).eql([1, 3, 4]));
		it(":._([1, 2, 3, 4, 5], [[5, 2, 10]]) eql [[[5, 2, 10]], [1, 2, 3, 4, 5]]", () => expect(intermediateD([1, 2, 3, 4, 5], [[5, 2, 10]])).eql([[[5, 2, 10]], [1, 2, 3, 4, 5]]));
		it(":._,(+$ ;)([1, 2, 3, 4, 5], [[5, 2, 10]]) eql [[5, 2, 10], [1, 2, 3, 4, 5]]", () => expect(intermediateC([1, 2, 3, 4, 5], [[5, 2, 10]])).eql([[5, 2, 10], [1, 2, 3, 4, 5]]));
		it(":._,(+$.;/.\ ;)([1, 2, 3, 4, 5], [[5, 2, 10]]) eql [{5: [5], 2: [2], 10: [10]}, [1, 2, 3, 4, 5]]", () => expect(intermediateB([1, 2, 3, 4, 5], [[5, 2, 10]])).eql([{5: [5], 2: [2], 10: [10]}, [1, 2, 3, 4, 5]]));
		it(":._,(+$.;/.\.(1 0)'@ ;)([1, 2, 3, 4, 5], [[5, 2, 10]]) eql [[5, 2, 10], [1, 2, 3, 4, 5]]", () => expect(intermediateA([1, 2, 3, 4, 5], [[5, 2, 10]])).eql([[2, 5, 10], [1, 2, 3, 4, 5]]));
		it("difference([1, 2, 3, 4, 5], [[5, 2, 10]]) eql [1, 3, 4]", () => expect(difference([1, 2, 3, 4, 5], [[5, 2, 10]])).eql([1, 3, 4]));
	});

	/*ts
		leftPad				:.(.([ ].#).-$."0"`^.""$ ]).+$
	*/

	describe('leftPad :.(.([ ].#).-$."0"`^.""$ ]).+$', () => {
	/*ts
		calculation			6leftPad"123"
	*/

		it("leftPad(6, '123') eql '000123'", () => expect(leftPad(6, "123")).eql("000123"));
		it('6leftPad"123" eql "000123"', () => expect(calculation).eql("000123"));
	});

	describe(`union +$.(""+.6leftPad)/.\\.(1 0)'@`, () => {
	/*ts
		union				+$.(""+.6leftPad)/.\.(1 0)'@
		calculation			union((1 2 3) (101 2 1 10) (2 1))
	*/

		it("union([[1, 2, 3], [101, 2, 1, 10], [2, 1]]) eql [1, 2, 3, 101, 10]", () => expect(union([[1, 2, 3], [101, 2, 1, 10], [2, 1]])).eql([1, 2, 3, 101, 10]));
		it("union((1 2 3) (101 2 1 10) (2 1)) eql [1, 2, 3, 101, 10]", () => expect(calculation).eql([1, 2, 3, 101, 10]));
	});

	describe("without :,(!=@.&$ ;).*$", () => {
	/*ts
		intermediateF		!=$
		intermediateE		!=@
		intermediateD		(!=0&(!=1))*(1 2 1 0 3 1 4)
		intermediateC		&$(<2 <3 <4)
		intermediateB		&$
		intermediateA		!=@.&$
		without				:,(!=@.&$ ;).*$
		calculation			(0 1)without(1 2 1 0 3 1 4)
	*/
		it("!=$(1 2 3) eql true", () => expect(intermediateF([1, 2, 3])).eql(true));
		it("!=@([1, 2, 3])[1](3) eql true", () => expect(intermediateE([1, 2, 3])[1](3)).eql(true));
		it("(0 1)without(1 2 1 0 3 1 4) eql [2, 3, 4]", () => expect(calculation).eql([2, 3, 4]));
		it("(!=0&(!=1))*(1 2 1 0 3 1 4) eql [2, 3, 4]", () => expect(intermediateD).eql([2, 3, 4]));
		it("&$(<2 <3 <4)(1) eql true", () => expect(intermediateC(1)).eql(true));
		it("&$([1, 2, 3]) eql 3", () => expect(intermediateB([1, 2, 3])).eql(3));
		it("(!=@.&$)([2, 3, 4])(5) eql true", () => expect(intermediateA([2, 3, 4])(5)).eql(true));
		it("without([0, 1], [1, 2, 1, 0, 3, 1, 4]) eql [2, 3, 4]", () => expect(without([0, 1], [1, 2, 1, 0, 3, 1, 4])).eql([2, 3, 4]));
	});

	describe('flatten :,(.(+1.>.(#.) (].{)`) .(; )).^$.]', () => {
	/*ts
		flatten				:,(.(+1.>.(#.) (].{)`) .(; )).^$.]
		intermediateC		+1.>.(#.)
		constLast			]`
		endIntoConst		].(` ).[
		flattenAll			.((_2%.].!=$ ].{)` .(; )).^$.]
		intermediate		.(1` .(; ))
		intermediateB		].{
		calculation			flattenAll(1 (2 ) (3 ((4 ) )))
		calculationB		2flatten(1 (2 ) (3 ((4 ) )))
	*/

		it("flatten(2, [1, [2], [3, [[4]]]]) eql [1, 2, 3, [4]]", () => expect(flatten(2, [1, [2], [3, [[4]]]])).eql([1, 2, 3, [4]]));
		it("2flatten(1 (2 ) (3 ((4 ) ))) eql [1, 2, 3, [4]]", () => expect(calculationB).eql([1, 2, 3, [4]]));
		it("+1.>.(#.)(2)([1, 2, 3, 4]) eql false", () => expect(intermediateC(2)([1, 2, 3, 4])).eql(false));
		it("+1.>.(#.)(5)([1, 2, 3, 4]) eql true", () => expect(intermediateC(5)([1, 2, 3, 4])).eql(true));
		it("].(` ).[([1, 2, 3])([3, 2, 1]) eql 3", () => expect(endIntoConst([1, 2, 3])([3, 2, 1])).eql(3));
		it("]`([1, 2, 3])([3, 2, 1]) eql 1", () => expect(constLast([1, 2, 3])([3, 2, 1])).eql(1));
		it(".((_2%.].!=$ ].{)` .(; )).^$.](1 (2 ) (3 ((4 ) ))) eql [1, 2, 3, 4]", () => expect(calculation).eql([1, 2, 3, 4]));
		it(".((_2%.].!=$ ].{)` .(; )).^$.]([1, [2], [3, [[4]]]]) eql [1, 2, 3, 4]", () => expect(flattenAll([1, [2], [3, [[4]]]])).eql([1, 2, 3, 4]));
		it("].{([1, [1, [2, [3, 4]]]]) eql [1, 2, [3, 4]]", () => expect(intermediateB([1, [1, [2, [3, 4]]]])).eql([1, 2, [3, 4]]));
		it(".(1` .(; ))([1, 2, 3]) eql [1, [[1, 2, 3]]]", () => expect(intermediate([1, 2, 3])).eql([1, [[1, 2, 3]]]));
	});

	describe("rest %.]", () => {
	/*ts
		rest				%.]
		calculation			1rest(5 4 3 2 1)
	*/

		it("rest(1, [5, 4, 3, 2, 1]) eql [4, 3, 2, 1]", () => expect(rest(1, [5, 4, 3, 2, 1])).eql([4, 3, 2, 1]));
		it("1rest(5 4 3 2 1) eql [4, 3, 2, 1]", () => expect(calculation).eql([4, 3, 2, 1]));
	});

	describe("last :,(_1* ;).%$.]", () => {
	/*ts
		last				:,(_1* ;).%$.]
		calculation			2last(5 4 3 2 1)
	*/

		it("last(2, [5, 4, 3, 2, 1]) eql [2, 1]", () => expect(last(2, [5, 4, 3, 2, 1])).eql([2, 1]));
		it("2last(5 4 3 2 1) eql [2, 1]", () => expect(calculation).eql([2, 1]));
	});

	describe("initial :,(_1* ;).%$.[", () => {
	/*ts
		initial				:,(_1* ;).%$.[
		calculation			2initial(5 4 3 2 1)
	*/

		it("initial(2, [5, 4, 3, 2, 1]) eql [5, 4, 3]", () => expect(initial(2, [5, 4, 3, 2, 1])).eql([5, 4, 3]));
		it("2initial(5 4 3 2 1) eql [5, 4, 3]", () => expect(calculation).eql([5, 4, 3]));
	});

	describe("first [", () => {
	/*ts
		first				[
		calculation			first(5 4 3 2 1)
	*/

		it("first([5, 4, 3, 2, 1]) eql 5", () => expect(first([5, 4, 3, 2, 1])).eql(5));
		it("[(5 4 3 2 1) eql 5", () => expect(calculation).eql(5));
	});

	describe("compact ;*", () => {
	/*ts
		compact				;*
		calculation			compact(0 1 false 2 "" 3 ( ) \( ))
	*/
		it('compact(0 1 false 2 "" 3 ( ) \\( )) eql [0, 1, 2, 3]', () => expect(calculation).eql([0, 1, 2, 3]));
		it("compact([0, undefined, 1, false, 2, '', 3]) eql [1, 2, 3]", () => expect(compact([0, undefined, 1, false, 2, '', 3])).eql([0, 1, 2, 3]));
	});
	// describe("partition :,(? ;).@$.~.;*@", () => {
	// /*ts
	// 	isEqualToOne		=1,?
	// 	partition			:,(.(.(; `(`())) .(`(`()) ;)).? ;).@$.~.;*@
	// 	calculation			(%2.=1)partition(0 1 2 3 4 5)
	// 	calculationB		(%2.=0)partition(0 1 2 3 4 5)
	// 	intermediate		:,(? ;).@$.~
	// 	intermediateB		:,(? ;).@$
	// 	intermediateC		(%2.=1)?@(1 2 3)
	// 	intermediateD		((%2.=1)? (1 2 3)),@$
	// 	intermediateE		((%2.=1),?)1
	// 	intermediateF		(=1,?)1
	// */

	// 	it("(%2.=0)partition(0 1 2 3 4 5) eql [[0, 2, 4], [1, 3, 5]]", () => expect(calculationB).eql([[0, 2, 4], [1, 3, 5]]));
	// 	it("partition(num => (num % 2) === 0, [0, 1, 2, 3, 4, 5]) eql [[0, 2, 4], [1, 3, 5]]", () => expect(partition(num => (num % 2) === 0, [0, 1, 2, 3, 4, 5])).eql([[0, 2, 4], [1, 3, 5]]));
	// 	it("=1,?(1) eql [1, undefined]", () => expect(isEqualToOne(1)).eql([1, undefined]));
	// 	it("(=1,?)1 eql [1, undefined]", () => expect(intermediateF).eql([1, undefined]));
	// 	it("((%2.=1),?)1 eql [1, undefined]", () => expect(intermediateE).eql([1, undefined]));
	// 	it("((%2.=1)? (1 2 3)),@$ eql [[1, undefined], [undefined, 2], [3, undefined]]", () => expect(intermediateD).eql([[1, undefined], [undefined, 2], [3, undefined]]));
	// 	it("(%2.=1)?@(1 2 3) eql [[1, undefined], [undefined, 2], [3, undefined]]", () => expect(intermediateC).eql([[1, undefined], [undefined, 2], [3, undefined]]));
	// 	it(":,(? ;).@$(num => (num % 2) === 1, [1, 2 3]) eql [[1, undefined], [undefined, 2], [3, undefined]]", () => expect(intermediateB(num => (num % 2) === 1, [1, 2, 3])).eql([[1, undefined], [undefined, 2], [3, undefined]]));
	// 	it(":,(? ;).@$.~(num => (num % 2) === 1, [1, 2 3]) eql [[1, undefined, 3], [undefined, 2, undefined]]", () => expect(intermediate(num => (num % 2) === 1, [1, 2, 3])).eql([[1, undefined, 3], [undefined, 2, undefined]]));
	// 	it("(%2.=1)partition(0 1 2 3 4 5) eql [[1, 3, 5], [0, 2, 4]]", () => expect(calculation).eql([[1, 3, 5], [0, 2, 4]]));
	// 	it("partition(num => (num % 2) === 1, [0, 1, 2, 3, 4, 5]) eql [[1, 3, 5], [0, 2, 4]]", () => expect(partition(num => (num % 2) === 1, [0, 1, 2, 3, 4, 5])).eql([[1, 3, 5], [0, 2, 4]]));
	// });

	describe("size #", () => {
	/*ts
		size					#
		calculation				#(1 2 3 4 5)
		calculationB			#({"{one: 1, two: 2, three: 3}")
	*/
		it("#(1 2 3 4 5) eql 5", () => expect(calculation).eql(5));
		it('#({"{one: 1, two: 2, three: 3}") eql 3', () => expect(calculationB).eql(3));
		it("size([1, 2, 3, 4, 5]) eql 5", () => expect(size([1, 2, 3, 4, 5])).eql(5));
		it('size({one: 1, two: 2, three: 3}) eql 3', () => expect(size({one: 1, two: 2, three: 3})).eql(3));
	});

	describe("countBy /.#@", () => {
	/*ts
		countBy					/.#@
		calculation				((%2.=0 "even"`) "odd"`)?countBy(1 2 3 4 5)
		calculationA			((%2.=0 "even"`) "odd"`)?@(1 2 3 4 5)
	*/
		it('((%2.=0)?,("even"` "odd"`).|$)@(1 2 3 4 5) eql ["odd", "even", "odd", "even", "odd"]', () => expect(calculationA).eql(["odd", "even", "odd", "even", "odd"]));
		it('((%2.=0)?,("even"` "odd"`).|$)countBy(1 2 3 4 5) eql {odd: 3, even: 2}', () => expect(calculation).eql({odd: 3, even: 2}));
		it("countBy(num => ((num % 2) === 0) ? 'even' : 'odd', [1, 2, 3, 4, 5]) eql {odd: 3, even: 2}", () => expect(countBy(num => ((num % 2) === 0) ? 'even' : 'odd', [1, 2, 3, 4, 5])).eql({odd: 3, even: 2}));
	});

	describe("groupBy /", () => {
	/*ts
		groupBy					/
		calculation				{"Math.floor"groupBy(1.3 2.1 2.4)
		calculationB			(#.""+)groupBy("one" "two" "three")
	*/

		it(`#groupBy("one" "two" "three") eql {3: ['one', 'two'], 5: ['three']}`, () => expect(calculationB).eql({3: ['one', 'two'], 5: ['three']}));
		it('{"Math.floor"groupBy(1.3 2.1 2.4) eql {1: [1.3], 2: [2.1, 2.4]}', () => expect(calculation).eql({1: [1.3], 2: [2.1, 2.4]}));
		it("groupBy(num => Math.floor(num), [1.3, 2.1, 2.4]) eql {1: [1.3], 2: [2.1, 2.4]}", () => expect(groupBy(num => Math.floor(num), [1.3, 2.1, 2.4])).eql({1: [1.3], 2: [2.1, 2.4]}));
		it("groupBy(string => string.length, ['one', 'two', 'three']) eql {3: ['one', 'two'], 5: ['three']}", () => expect(groupBy(string => string.length, ['one', 'two', 'three'])).eql({3: ['one', 'two'], 5: ['three']}));
	});

	describe("sortBy <", () => {
	/*ts
		sortBy					<
		calculation				{"Math.sin"sortBy(1 2 3 4 5 6)
		calculationB			"name"'sortBy({"[{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}]")
	*/

		it(`"name"'sortBy({"[{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}]") eql [{name: 'curly', age: 60}, {name: 'larry', age: 50}, {name: 'moe', age: 40}]`,
			() => expect(calculationB).eql([{name: 'curly', age: 60}, {name: 'larry', age: 50}, {name: 'moe', age: 40}]));
		it('{"Math.sin"<(1 2 3 4 5 6) eql [5, 4, 6, 3, 1, 2]', () => expect(calculation).eql([5, 4, 6, 3, 1, 2]));
		it("sortBy(num => Math.sin(num), [1, 2, 3, 4, 5, 6]) eql [5, 4, 6, 3, 1, 2]", () => expect(sortBy(num => Math.sin(num), [1, 2, 3, 4, 5, 6])).eql([5, 4, 6, 3, 1, 2]));
		it("sortBy(stooge => stooge.name, [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}]) eql [{name: 'curly', age: 60}, {name: 'larry', age: 50}, {name: 'moe', age: 40}]",
			() => expect(sortBy(stooge => stooge.name, [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}])).eql([{name: 'curly', age: 60}, {name: 'larry', age: 50}, {name: 'moe', age: 40}]));
	});

	describe("min <.[", () => {
	/*ts
		min						<.[
		calculation				;min(10 5 100 2 1000)
	*/

		it(";min(10 5 100 2 1000) eql 2", () => expect(calculation).eql(2));
		it("min(x => x, [10, 5, 100, 2, 1000]) eql 2", () => expect(min(x => x, [10, 5, 100, 2, 1000])).eql(2));
	});
	describe("max <.]", () => {
	/*ts
		max						<.]
		calculation				"age"'max({"[{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}]")
	*/

		it(`"age"'max({"[{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}]") eql {name: 'curly', age: 60}`, () => expect(calculation).eql({name: 'curly', age: 60}));
		it("max(stooge => stooge.age, [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}]) eql {name: 'curly', age: 60}",
			() => expect(max(stooge => stooge.age, [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}])).eql({name: 'curly', age: 60}));
	});

	describe("pluck :,(' ;).@$", () => {
	/*ts
		pluck					:,(' ;).@$
		calculation				"name"pluck({"[{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}]")
	*/

		it(`name"pluck({"[{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}]") eql ['moe', 'larry', 'curly']`, () => expect(calculation).eql(['moe', 'larry', 'curly']));
		it("pluck('name', [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}]) eql ['moe', 'larry', 'curly']",
			() => expect(pluck('name', [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}])).eql(['moe', 'larry', 'curly']));
	});

	describe("contains :,(= ;).?$", () => {
	/*ts
		intermediateB			(4 (2 3 4 5)),(= ;),'$
		intermediate			(=4 (2 3 4 5)),'$
		containsFour			=4'(2 3 4 5)
		contains				:,(= ;).'$
		calculation				3contains(1 2 3)
		calculationB			4contains(1 2 3)
	*/

		it("3contains(1 2 3) eql 3", () => expect(calculation).eql(3));
		it("4contains(1 2 3) eql undefined", () => expect(calculationB).eql(undefined));
		it("(4 (2 3 4 5)),(= ;),'$ eql 4", () => expect(intermediateB).eql(4));
		it("(=4 (2 3 4 5)),'$ eql 4", () => expect(intermediate).eql(4));
		it("contains(4, [2, 3, 4, 5]) eql 4", () => expect(contains(4, [2, 3, 4, 5])).eql(4));
		it("=4'(2 3 4 5) eql 4", () => expect(containsFour).eql(4));
	});

	describe("some *.#.>0", () => {
	/*ts
		some					*.#.>0
		someValues				;some(() 0 "yes")
		filterByIdentity		;*(() 0)
	*/

		it("some(x => x, [undefined, 0, 'yes', false]) eql true", () => expect(some(x => x, [undefined, 0, 'yes', false])).eql(true));
		it(";some(() 0 'yes') eql true", () => expect(someValues).eql(true));
		it(";*(() 0) eql [0]", () => expect(filterByIdentity).eql([0]));
	});

	describe("every :.(*$ ]).#@.=$", () => {
	/*ts
		every					:.(*$ ]).#@.=$
		calculation				(%2.=0)every(2 4 5)
		calculationB			(%2.=0)every(2 4 6)
	*/

		it("(%2.=0)every(2 4 6) eql true", () => expect(calculationB).eql(true));
		it("(%2.=0)every(2 4 5) eql false", () => expect(calculation).eql(false));
		it("every(num => (num % 2) === 0, [2, 4, 5]) eql false", () => expect(every(num => (num % 2) === 0, [2, 4, 5])).eql(false));
		it("every(num => (num % 2) === 0, [2, 4, 6]) eql true", () => expect(every(num => (num % 2) === 0, [2, 4, 6])).eql(true));
	});

	describe("reject :,(! ;).*$", () => {
	/*ts
		complimentAndArray		:,(! ;)
		reject					:,(! ;).*$
		notLessThanThree		!(<3)
		calculation				(%2.=0)reject(1 2 3 4 5 6)
	*/

		it("(%2.=0)reject(1 2 3 4 5 6) eql [1, 3, 5]", () => expect(calculation).eql([1, 3, 5]));
		it("!(<3)(4) eql true", () => expect(notLessThanThree(4)).eql(true));
		it(":,(! ;)(value => value < 3, 2)[0](4) eql true", () => expect(complimentAndArray(value => value < 3, 2)[0](4)).eql(true));
		it("!(<3)(2) eql false", () => expect(notLessThanThree(2)).eql(false));
		it(":,(! ;)(() => {}, [1, 2, 3])[1] eql [1, 2, 3]", () => expect(complimentAndArray(() => {}, [1, 2, 3])[1]).eql([1, 2, 3]));
		it("reject(num => (num % 2) === 0, [1, 2, 3, 4, 5, 6]) eql [1, 3, 5]", () => expect(reject(num => (num % 2) === 0, [1, 2, 3, 4, 5, 6])).eql([1, 3, 5]));
	});

	describe("filter *", () => {
	/*ts
		filter					*
		calculation				(%2.=0)filter(1 2 3 4 5 6)
	*/

		it("(%2.=0)*(1 2 3 4 5 6) eql [2, 4, 6]", () => expect(calculation).eql([2, 4, 6]));
		it("filter(num => (num % 2) === 0, [1, 2, 3, 4, 5, 6]) eql [2, 4, 6]", () => expect(filter(num => (num % 2) === 0, [1, 2, 3, 4, 5, 6])).eql([2, 4, 6]));
	});

	describe("find '", () => {
	/*ts
		find					'
		calculation				(%2.=0)find(1 2 3 4 5 6)
	*/

		it("(%2.=0)'(1 2 3 4 5 6) eql 2", () => expect(calculation).eql(2));
		it("find(num => (num % 2) === 0, [1, 2, 3, 4, 5, 6]) eql 2", () => expect(find(num => (num % 2) === 0, [1, 2, 3, 4, 5, 6])).eql(2));
	});

	describe("reduceRight :.([ ]._).$$", () => {
	/*ts
		reduceRight				:.([ ]._).$$
		calculation				+reduceRight((0 1) (2 3) (4 5))
	*/

		it("+reduceRight((0 1) (2 3) (4 5)) eql [4, 5, 2, 3, 0, 1]", () => expect(calculation).eql([4, 5, 2, 3, 0, 1]));
		it("reduceRight((a, b) => a.concat(b), [[0, 1], [2, 3], [4, 5]]) eql [4, 5, 2, 3, 0, 1]", () => expect(reduceRight((a, b) => a.concat(b), [[0, 1], [2, 3], [4, 5]])).eql([4, 5, 2, 3, 0, 1]));
	});

	describe("reduce $", () => {
	/*ts
		reduce					$
		calculation				(+ 0)reduce(1 2 3)
	*/

		it("(+ 0)$(1 2 3) eql 6", () => expect(calculation).eql(6));
		it("reduce([(a, b) => a + b, 0], [1, 2, 3]) eql 6", () => expect(reduce([(a, b) => a + b, 0], [1, 2, 3])).eql(6));
	});

	describe("map @", () => {
	/*ts
		map						@
		mapIndexed				\.(.([ _))@.\
		calculation				*3map(1 2 3)
		calculationA			*3map({"{one: 1, two: 2, three: 3}")
		calculationB			[map((1 2) (3 4))
	*/

		it("[@((1 2) (3 4)) eql [1, 3]", () => expect(calculationB).eql([1, 3]));
		it('*3@({"{one: 1, two: 2, three: 3}"}) eql {one: 3, two: 6, three: 9}', () => expect(calculationA).eql({one: 3, two: 6, three: 9}));
		it("*3@(1 2 3) eql [3, 6, 9]", () => expect(calculation).eql([3, 6, 9]));
		it("map(num => num * 3, [1, 2, 3]) eql [3, 6, 9]", () => expect(map(num => num * 3, [1, 2, 3])).eql([3, 6, 9]));
		it("map(num => num * 3, {one: 1, two: 2, three: 3}) eql {one: 3, two: 6, three: 9}", () => expect(map(num => num * 3, {one: 1, two: 2, three: 3})).eql({one: 3, two: 6, three: 9}));
		it("map(array => array[0], [[1, 2], [3, 4]]) eql [1, 3]", () => expect(map(array => array[0], [[1, 2], [3, 4]])).eql([1, 3]));
		it("(\.(.([ _))@.\)map({one: 'a', two: 'b', three: 'c'}) eql {one: ['a', 'one'], two: ['b', 'two'], three: ['c', 'three']}",
			() => expect(mapIndexed({one: 'a', two: 'b', three: 'c'})).eql({one: ['a', 'one'], two: ['b', 'two'], three: ['c', 'three']}));
	});
});

describe("Basic Operations", () => {
	describe("Value Binding", () => {
		describe("number 5", () => {
		/*ts
			number					5
		*/
			it("number eql 5", () => expect(number).eql(5));
		});

		describe("character \"c\"", () => {
		/*ts
			character               "c"
		*/
			it("character eql \"c\"", () => expect(character).eql("c"));
		});

		describe("greeting \"hello\"", () => {
		/*ts
			greeting                  "hello"
		*/
			it("greeting eql \"hello\"", () => expect(greeting).eql("hello"));
		});
	});

	describe("Strings", () => {
		describe("stringWithSpaces \"This is a string with spaces\" some comments here", () => {
		/*ts
			stringWithSpaces		"This is a string with spaces" some   comments   here
		*/
			it("stringWithSpaces eql \"This is a string with spaces\"", () => expect(stringWithSpaces).eql("This is a string with spaces"));
		});

		describe("stringWithEmbeddedStrings \"\"initial string\" some text \"middle string\" more text \"final string\"\"", () => {
		/*ts
			stringWithEmbeddedStrings		"\"initial string\" some text \"middle string\" more text \"final string\""
		*/
			it ("stringWithEmbeddedStrings eql \"\"initial string\" some text \"middle string\" more text \"final string\"\"", () =>
				expect(stringWithEmbeddedStrings).eql("\"initial string\" some text \"middle string\" more text \"final string\""));
		});
	});

	describe("Comments", () => {
		describe("commentedValue 5 this is a nice value", () => {
		/*ts
			commentedValue            5                     this is a nice value
		*/
			it("commentedValue eql 5", () => expect(commentedValue).eql(5));
		});

		describe("name \"john\" a comment about a string", () => {
		/*ts
			name                      "john"               a comment about name
		*/
			it("name eql \"john\"", () => expect(name).eql("john"));
		});
	});

	describe("Brackets", () => {
	/*ts
		undefinedValue		()
		emptyArray			( )
		arrayOfEmpties		(( ) (  ) () ())
	*/
		it("() eql false", () => expect(undefinedValue).eql(false));
		it("( ) eql []", () => expect(emptyArray).eql([]));
		it("(( ) (  ) () ()) eql [[], [], undefined, undefined]", () => expect(arrayOfEmpties).eql([[], [], false, false]));

		describe("singleArray (5 ) some comment", () => {
		/*ts
			singleArray             (5 ) some comment
		*/
			it("singleArray eql [5]", () => expect(singleArray).eql([5]));
		});

		describe("bracketed (5)", () => {
		/*ts
			bracketed               (5)
		*/
			it("bracketed eql 5", () => expect(bracketed).eql(5));
		});

		describe("numbers (1 2 3 4)", () => {
		/*ts
			numbers                   (1 2 3 4)
		*/
			it("numbers eql [1, 2, 3, 4]", () => expect(numbers).eql([1, 2, 3, 4]));
		});

		describe("trailingSpace (1 2 3 4 )", () => {
		/*ts
			trailingSpace             (1 2 3 4 )
		*/
			it("trailingSpace eql [1, 2, 3, 4]", () => expect(trailingSpace).eql([1, 2, 3, 4]));
		});

		describe("doubleBrackets ((1 2 3 4))", () => {
		/*ts
			doubleBrackets            ((1 2 3 4))
		*/
			it("doubleBrackets eql [1, 2, 3, 4]", () => expect(doubleBrackets).eql([1, 2, 3, 4]));
		});

		describe("bracketedString (\"string\")", () => {
		/*ts
			bracketedString           ("string")
		*/
			it("bracketedString eql \"string\"", () => expect(bracketedString).eql("string"));
		});

		describe("mixedArray (5 \"hello\" (1 2 3) (4))", () => {
		/*ts
			mixedArray                (5 "hello" (1 2 3) (4))
		*/
			it("mixedArray eql [5, \"hello\", [1, 2, 3], 4]", () => expect(mixedArray).eql([5, "hello", [1, 2, 3], 4]));
		});
	});

	describe("Array end spaces", () => {
		/*ts
			newLines (
				4
				5
				6
			) another comment
			newLineWithLineComment
			(
				2
				3 // comment
				4
			)

		*/
		const finalSpace = /*ts (1 2 3 )*/;
		const initialSpace = /*ts ( 1 2 3)*/;
		const noEndSpaces = /*ts (1 2 3 )*/;
		const doubleEndSpaces = /*ts ( 1 2 3 )*/;
		const singleLineNewLine = /*ts (
		1
		2
		3
	) some extra comment*/;
		const singleMultilineWithLineComment = /*ts (
			5
			6 // comment
			7
		)*/;

		it("/*ts (1 2 3)*/ eql [1, 2, 3]", () => expect(noEndSpaces).eql([1, 2, 3]));
		it("/*ts ( 1 2 3)*/ eql [1, 2, 3]", () => expect(initialSpace).eql([1, 2, 3]));
		it("/*ts (1 2 3 )*/ eql [1, 2, 3]", () => expect(finalSpace).eql([1, 2, 3]));
		it("/*ts ( 1 2 3 )*/ eql [1, 2, 3]", () => expect(doubleEndSpaces).eql([1, 2, 3]));
		it("/*ts (\\n\\t1\\n\\t2\\n\\t3\\n) some extra comment*/ eql [1, 2, 3]", () => expect(singleLineNewLine).eql([1, 2, 3]));
		it("/*\\<name> (\\n\\t4\\n\\t5\\n\\t6\\n) another comment*/ eql [4, 5, 6]", () => expect(newLines).eql([4, 5, 6]));
		it("/*\\<name>\\n\\t(\\n\\t2\\n\\t3 // comment\\n\\t4\\n)*/ eql [2, 3, 4]", () => expect(newLineWithLineComment).eql([2, 3, 4]));
		it("/*ts (\\n\\t5\\n\\t5 // comment\\n\\t7\\n)*/ eql [5, 6, 7]", () => expect(singleMultilineWithLineComment).eql([5, 6, 7]));
	});

	describe("Referencing custom functions: plus +", () => {
	/*ts
		plus			+
		twoPlus			2plus
		plusThree		plus3
	*/
		it("2plus(3) eql 5", () => expect(twoPlus(3)).eql(5));
		it("plus3(4) eql 7", () => expect(plusThree(4)).eql(7));
	});

	describe("Completed calculations", () => {
	/*ts
		nine		4+5
	*/
		it("4+5 eql 9", () => expect(nine).eql(9));
	});

	describe("Inverting primary function application location", () => {
	/*ts
		firstEqualsThree		=3,([.)
	*/
		it('=3,([.)([3, 2, 1]) eql true', () => expect(firstEqualsThree([3, 2, 1])).eql(true));
		it('=3,([.)([1, 2, 3]) eql false', () => expect(firstEqualsThree([1, 2, 3])).eql(false));
	});

	describe("Highest priority for spaces", () => {
		describe("arrays of dotted functions", () => {
		/*ts
			arrayApplication	 3.(;.+1 ;.-1)
		*/
			it('3.(;.+1 ;.-1) eql [4, 2]', () => expect(arrayApplication).eql([4, 2]))
		});

		describe("space breaks with highest priority", () => {
		/*ts
			arrayCalculation				(2+3 4+5 6+7)
			calculationWithDots				(2,+3 4,+5 6,+7)
			calculationWithMultipleDots		(2,+3,-1 4,+5,-1 6,+7,-1)
			calculationExtraction			(+2 -3),]
		*/
			it('(2+3 4+5 6+7) eql [5, 9, 13]', () => expect(arrayCalculation).eql([5, 9, 13]));
			it('(2,+3 4,+5 6,+7) eql [5, 9, 13]', () => expect(calculationWithDots).eql([5, 9, 13]));
			it('(2,+3,-1 4,+5,-1 6,+7,-1) eql [4, 8, 12]', () => expect(calculationWithMultipleDots).eql([4, 8, 12]));
			it('(+2 -3),](9) eql 6', () => expect(calculationExtraction(9)).eql(6));
		});
	})

	describe("Export binary function and execute with two arguments", () => {
	/*ts
		power			^
	*/
		it("^(3, 2) eql 9", () => expect(power(3, 2)).eql(9));
	});

	describe("recursive execution", () => {
	/*ts
		factorial					((=1 ;) .(; -1.factorial).*$)?
		factorialIterative			+1^.*$
	*/
		it('=1?,(; .(; -1.factorial).*$).|$(1) eql 1', () => expect(factorial(1)).eql(1));
		it('=1?,(; .(; -1.factorial).*$).|$(2) eql 2', () => expect(factorial(2)).eql(2));
		it('=1?,(; .(; -1.factorial).*$).|$(4) eql 24', () => expect(factorial(4)).eql(24));
		it("factorial iterative", () => expect(factorialIterative(4)).eql(24));
	});
});

///==========================================================
// functional utilites

const all = check => array => array.every(check);
const contains = value => array => array.includes(value);
const keys = Object.keys;
const reduce = reducer => startingValue => array => array.reduce(reducer, startingValue);
const isUnique = array => {
	const object = reduce((acc, value) => ({acc, [value]: true}))({})(array);

	return keys(object).length === array.length;
};

describe("99 Haskell Problems", () => {
	describe("1. myLast ]", () => {
	/*ts
		myLast                ]
	*/
		it("myLast([1, 2, 3, 4]) eql 4", () => expect(myLast([1, 2, 3, 4])).eql(4));
		it("myLast(\"xyz\") eql \"z\"", () => expect(myLast("xyz")).eql("z"));
	});
	
	describe("2. myButLast _2'", () => {
	/*ts
		myButLast             _2'
	*/
		it("myButLast([1, 2, 3, 4]) eql 3", () => expect(myButLast([1, 2, 3, 4])).eql(3));
		it("myButLast('abcde') eql 'd'", () => expect(myButLast("abcde")).eql("d"));
	});

	describe("3. elementAt '", () => {
	/*ts
		elementAt				'
		elementAtTwo			2elementAt
		elementFromArray		elementAt(1 2 3 4)
		elementFromString		elementAt"help"
	*/
		it("2elementAt([1, 2, 3]) eql 3", () => expect(elementAtTwo([1, 2, 3])).eql(3));
		it("2elementAt(\"help\") eql \"l\"", () => expect(elementAtTwo("help")).eql("l"));
		it("elementAt(1 2 3 4)(1) eql 2", () => expect(elementFromArray(1)).eql(2));
		it("elementAt\"help\"(1) eql \"e\"", () => expect(elementFromString(1)).eql("e"));
	});

	describe("4. myLength #", () => {
	/*ts
		myLength				#
		myLengthArray			#(5 6 7)
		myLengthString			#"dummy"
	*/
		it("myLength([123, 345, 789]) eql 3", () => expect(myLength([123, 456, 789])).eql(3));
		it("myLength(\"Hello, world!\") eql 13", () => expect(myLength("Hello, world!")).eql(13));
		it("#(5 6 7) eql 3", () => expect(myLengthArray).eql(3));
		it("#\"dummy\" eql 5", () => expect(myLengthString).eql(5));
	});

	describe("5. myReverse _", () => {
	/*ts
		myReverse				_
		myReverseString			_"A man, a plan, a canal, panama!"
		myReverseArray			_(1 2 3 4)
	*/
		it("myReverse(\"A man, a plan, a canal, panama!\") eql \"!amanap ,lanac a ,nalp a ,nam A\"", () => expect(myReverse("A man, a plan, a canal, panama!")).eql("!amanap ,lanac a ,nalp a ,nam A"));
		it("myReverse([1, 2, 3, 4]) eql [4, 3, 2, 1]", () => expect(myReverse([1, 2, 3, 4])).eql([4, 3, 2, 1]));
		it("_\"A man, a plan, a canal, panama!\" eql \"!amanap ,lanac a ,nalp a ,nam A\"", () => expect(myReverseString).eql("!amanap ,lanac a ,nalp a ,nam A"));
		it("_(1 2 3 4) eql [4, 3, 2, 1]", () => expect(myReverseArray).eql([4, 3, 2, 1]));
	});

	describe("6. isPalindrome .(; _).=$", () => {
	/*ts
		calculationC							(1 2 3)=(3 2 1)
		calculationB							((1 2 3) (3 2 1)),=$
		calculationA							(1 2 3).(; _)
		isPalindromeFalse						(1 2 3).(; _),=$
		forwardAndReverse						.(; _)
		forwardAndReverseThenLength				.(; _).#
		isPalindrome							.(; _).=$
		isPalindromeTrue						"madamimadam".(; _),=$
	*/
		it("(1 2 3)=(3 2 1) eql false", () => expect(calculationC).eql(false));
		it("((1 2 3) (3 2 1)),=$ eql false", () => expect(calculationB).eql(false));
		it("(1 2 3).(; _) eql [[1, 2, 3], [3, 2, 1]]", () => expect(calculationA).eql([[1, 2, 3], [3, 2, 1]]));
		it(".(; _)([1, 2, 3]) eql [[1, 2, 3], [3, 2, 1]]", () => expect(forwardAndReverse([1, 2, 3])).eql([[1, 2, 3], [3, 2, 1]]));
		it(".(; _).# arity 1", () => expect(ts.arity(forwardAndReverseThenLength)).eql(1));
		it(".(; _).#([1, 2, 3]) eql 2", () => expect(forwardAndReverseThenLength([1, 2, 3])).eql(2));
		it("isPalindrome([1, 2, 3]) eql false", () => expect(isPalindrome([1, 2, 3])).eql(false));
		it("isPalindrome(\"madamimadam\") eql true", () => expect(isPalindrome("madamimadam")).eql(true));
		it("isPalindrome([1, 2, 4, 8, 16, 8, 4, 2, 1]) eql true", () => expect(isPalindrome([1, 2, 4, 8, 16, 8, 4, 2, 1])).eql(true));
		it("(1 2 3).(; _),=$ eql false", () => expect(isPalindromeFalse).eql(false));
		it("\"madamimadam\".(; _),=$ eql true", () => expect(isPalindromeTrue).eql(true));
	});

	describe('7. myFlatten ((}.="A" myFlatten) .(; ))?@.((#.=0 ;) +$)?', () => {
	/*ts
		myFlatten					((}.="A" myFlatten) .(; ))?@.((#.=0 ;) +$)?
	// 	plainConcat					(+ ( ))$
	// 	insertConcat				(:.+$)$
	// 	embed						(:.+$ ( ))$
	// 	pair						:,(; ;)
	// 	concatZipBasic				(:,(; ;) ( ))$
	// 	concatZip					(:,(; ;).+$ ( ))$
	// 	concat						(:,(; .(; )).+$ ( ))$
	// 	isArray						(}.="A")?
	// 	undefinedDotIdentity		(),;
	// 	undefinedCommaIdentity		(() ()),(; ;)
	// 	makeArrayIfNot				(}.="A")?,(; .(; ))
	// 	undefinedDotArray			().(; )
	// 	undefinedCommaArray			(() ),(.(; ) )
	// 	flattenOrMakeArray			(}.="A")?,(flattenOrMakeArray .(; )).|$
	// 	myFlatten					(:,(; (}.="A")?,(myFlatten .(; )).|$).+$ ( ))$
	*/
	// 	it('(( ) +)$([[5, 6], [7, 8]]) eql [5, 6, 7, 8]', () => expect(plainConcat([[5, 6], [7, 8]])).eql([5, 6, 7, 8]));
	// 	it('(:.+$)$([[2, 3], [4, 5]]) eql [2, 3, 4, 5]', () => expect(insertConcat([[2, 3], [4, 5]])).eql([2, 3, 4, 5]));
	// 	it('(( ) :.+$)$([[1, 2], [3, 4]])', () => expect(embed([[1, 2], [3, 4]])).eql([1, 2, 3, 4]));
	// 	it(':,(; ;)(2, 3) eql [2, 3]', () => expect(pair(2, 3)).eql([2, 3]));
	// 	it('(:,(; ;) ( ))$([1, 2, 3] eql [[[[ ], 1], 2], 3]', () => expect(concatZipBasic([1, 2, 3])).eql([[[[ ], 1], 2], 3]));
	// 	it('(:,(; ;).+$ ( ))$([[6, 5], [4, 3]]) eql [6, 5, 4, 3]', () => expect(concatZip([[6, 5], [4, 3]])).eql([6, 5, 4, 3]));
	// 	it('(:,(; .(; )).+$ ( ))$([3, 4, 5]) eql [3, 4, 5]', () => expect(concat([1, 2, 3])).eql([1, 2, 3]));
	// 	it('(}.="A")?(1) eql [undefined, 1]', () => expect(isArray(1)).eql([undefined, 1]));
	// 	it('(}.="A")?([2, 3]) eql [[2, 3], undefined]', () => expect(isArray([2, 3])).eql([[2, 3], undefined]));
	// 	it('(),; eql false', () => expect(undefinedDotIdentity).eql(false));
	// 	it('(() ()),(; ;) eql (() ())', () => expect(undefinedCommaIdentity).eql([false, false]));
	// 	it('(}.="A")?,(; .(; ))(1) eql [undefined, [1]]', () => expect(makeArrayIfNot(1)).eql([undefined, [1]]));
	// 	it("().(; ) eql [false]", () => expect(undefinedDotArray).eql([false]));
	// 	it('(() ),(.(; ) ) eql [[false]]', () => expect(undefinedCommaArray).eql([[false]]));
	// 	it('(}.="A")?,(; .(; ))([1]) eql [[1], undefined]', () => expect(makeArrayIfNot([1])).eql([[1], undefined]));
	// 	it('(}.="A")?,(flattenOrMakeArray .(; )).|$(1) eql [1]', () => expect(flattenOrMakeArray(1)).eql([1]));
		it('myFlatten([1, 2, 3]) eql [1, 2, 3]', () => expect(myFlatten([1, 2, 3])).eql([1, 2, 3]));
		it('myFlatten([[1]]) eql [1]', () => expect(myFlatten([[1]])).eql([1]));
		it('myFlatten([1, [2, 3], 4]) eql ([1, 2, 3, 4])', () => expect(myFlatten([1, [2, 3], 4])).eql([1, 2, 3, 4]));
		it('myFlatten(["a", ["b", ["c", "d"], "e"]]) eql ["a", "b", "c", "d", "e"]', () => expect(myFlatten(["a", ["b", ["c", "d"], "e"]])).eql(["a", "b", "c", "d", "e"]));
		it('myFlatten([]) eql undefined', () => expect(myFlatten([])).eql([]));
	});

	describe("8. compress !=%.[@", () => {
	/*ts
		compress				!=%.[@
		compressString			!=%.[@.""$
		commaJoin				","$
		stringJoin				""$
	*/
		it('!=%.[@(["a", "a", "a", "a", "b", "c", "c", "a", "a", "d", "e", "e", "e", "e"]) eql ["a", "b", "c", "a", "d", "e"]', () => expect(compress(["a", "a", "a", "a", "b", "c", "c", "a", "a", "d", "e", "e", "e", "e"]))
			.eql(["a", "b", "c", "a", "d", "e"]));
		it('","$([2, 3]) eql "2,3"', () => expect(commaJoin([2, 3])).eql("2,3"));
		it('""$([2, 3]) eql "23"', () => expect(stringJoin([2, 3])).eql("23"));
		it('""$(["a", "b", "c"]) eql "abc"', () => expect(stringJoin(["a", "b", "c"])).eql("abc"));
		it('!=%.[@.""$("aaaabccaadeeee") eql "abcade"', () => expect(compressString("aaaabccaadeeee")).eql("abcade"));
	});

/*ts
	pack					!=%
	encode					pack.(.(# [))@
*/

	describe("9. pack !=%", () => {
	/*ts
		packString			!=%.""$@
	*/
		it('!=%([1, 1, 1, 1, 2, 3, 3, 1, 1, 4, 5, 5, 5, 5]) eql [[1, 1, 1, 1], [2], [3, 3], [1, 1], [4], [5, 5, 5, 5]]', () => expect(pack([1, 1, 1, 1, 2, 3, 3, 1, 1, 4, 5, 5, 5, 5])).eql([[1, 1, 1, 1], [2], [3, 3], [1, 1], [4], [5, 5, 5, 5]]));
		it('!=%.""$@(["a", "a", "a", "a", "b", "c", "c", "a", "a", "d", "e", "e", "e", "e"]) eql ["aaaa", "b", "cc", "aa", "d", "eeee"]', () => expect(packString(["a", "a", "a", "a", "b", "c", "c", "a", "a", "d", "e", "e", "e", "e"]))
			.eql(["aaaa", "b", "cc", "aa", "d", "eeee"]));
	});

	describe("10. encode pack.(.(# [))@", () => {
	/*ts
	*/
		it('pack.(.(# [))@("aaaabccaadeeee") eql [[4, "a"], [1, "b"], [2, "c"], [2, "a"], [1, "d"], [4, "e"]]', () => expect(encode("aaaabccaadeeee")).eql([[4, "a"], [1, "b"], [2, "c"], [2, "a"], [1, "d"], [4, "e"]]));
	});

	describe("11. encodeModified encode.(([.=1 ]) ;)?@", () => {
	/*ts
		encodeModified		encode.(([.=1 ]) ;)?@
	*/
		it('encode.(([.=1)?,(] ;).|$)@("aaaabccaadeeee") eql [[4, "a"], "b", [2, "c"], [2, "a"], "d", [4, "e"]]', () => expect(encodeModified("aaaabccaadeeee")).eql([[4, "a"], "b", [2, "c"], [2, "a"], "d", [4, "e"]]));
	});

	describe('12. decodeModifiedString (((#.=2 _,(` ;).^$) .(; ))?.""$)@.""$', () => {
	/*ts
	// 	endAndConst						].`
	// 	expandUnit						.(].` [).^$
	// 	joinSingle						""$("b" )
	// 	expand							((#.=2)?,(.(].` [).^$ .(; )).|$)@
	// 	expandConcat					((#.=2)?,(.(].` [).^$ .(; )).|$.""$)@
		decodeModifiedString			(((#.=2 _,(` ;).^$) .(; ))?.""$)@.""$
	*/
	// 	it('].`([2, 3])(4) eql 3', () => expect(endAndConst([2, 3])(4)).eql(3));
	// 	it('.(].` [).^$([3, "a"]) eql ["a", "a", "a"]', () => expect(expandUnit([3, "a"])).eql(["a", "a", "a"]));
	// 	it('""$("b" ) eql "b"', () => expect(joinSingle).eql("b"));
	// 	it('((#.=2)?,(.(].` [).^$ .(; )).|$)@([[3, "a"], "b"]) eql [["a", "a", "a"], ["b"]]', () => expect(expand([[3, "a"], "b"])).eql([["a", "a", "a"], ["b"]]));
	// 	it('((#.=2)?,(.(].` [).^$ .(; )).|$.""$)@([[3, "a"], "b"]) eql ["aaa", "b"]', () => expect(expandConcat([[3, "a"], "b"])).eql(["aaa", "b"]));
		it('((#.=2)?,(.(].` [).^$ .(; )).|$.""$)@.""$([[4, "a"], "b", [2, "c"], [2, "a"], "d", [4, "e"]]) eql "aaaabccaadeeee"', () => expect(decodeModifiedString([[4, "a"], "b", [2, "c"], [2, "a"], "d", [4, "e"]])).eql("aaaabccaadeeee"));
	});

	describe('14. dupli .(; ;).~.+$', () => {
	/*ts
		dupli				.(; ;).~.+$
	*/
		it('.(; ;).~.+$([1, 2, 3]) eql [1, 1, 2, 2, 3, 3]', () => expect(dupli([1, 2, 3])).eql([1, 1, 2, 2, 3, 3]));
	});

	describe('15. repli :._,(` ;).^$.~.+$', () => {
	/*ts
		pipeIntoConst		`
		twoThrees			(3` 2),^$
		twoFours			(2 4).(].(` ).[ [),^$
		replicate			:.(].(` ).[ [).^$
		repli				:._,(` ;).^$.~.+$
		repliInPlace		2repli(1 2 3)
	*/
		it('`(3, 4) eql 3', () => expect(pipeIntoConst(3, 4)).eql(3));
		it('(3` 2),^$ eql [3, 3]', () => expect(twoThrees).eql([3, 3]));
		it('(2 4).(].(` ).[ [),^$ eql [4, 4]', () => expect(twoFours).eql([4, 4]));
		it(':.(].(` ).[ [).^$(2, 3) eql [3, 3]', () => expect(replicate(2, 3)).eql([3, 3]));
		it('2repli(1 2 3) eql [1, 1, 2, 2, 3, 3]', () => expect(repliInPlace).eql([1, 1, 2, 2, 3, 3]));
		it('repli(3, [4, 5]) eql [4, 4, 4, 5, 5, 5]', () => expect(repli(3, [4, 5])).eql([4, 4, 4, 5, 5, 5]));
	});

	describe("16. dropEvery :.([.-1.% ,(.(; ) ;).%$).@$.[@.+$", () => {
	/*ts
		testMapApply			(*2 (1 2 3)),@$
		chunk					,(.(; ) ;).%$
		breakUp					:.(,(.(; ) ;).%$ )
		modifiedSplit			[.-1.%
		endSplit				[.%
		sum						2+3
		addTwo					2,+
		splitArray				2,%
		joinAndRecombine		:,(.(; ) ;).%$
		splitMinusTwo			_2%
		dropEvery				:.([.-1.% ,(.(; ) ;).%$).@$.[@.+$
	*/
		it('(*2 (1 2 3)),@$ eql [2, 4, 6]', () => expect(testMapApply).eql([2, 4, 6]));
		it(':.(,(.(; ) ;).%$ )(2, [1, 2, 3, 4, 5]) eql [[[1, 2], [3, 4], [5]]]', () => expect(breakUp(2, [1, 2, 3, 4, 5])).eql([[[1, 2], [3, 4], [5]]]));
		it('[.-1.%([2, 4])([4, 5, 6]) eql [[4], [5, 6]]', () => expect(modifiedSplit([2, 4])([4, 5, 6])).eql([[4], [5, 6]]));
		it('[.%([1, 2])([4, 5, 6]) eql [[4], [5, 6]]', () => expect(endSplit([1, 2])([4, 5, 6])).eql([[4], [5, 6]]));
		it('2+3 eql 5', () => expect(sum).eql(5));
		it('2,+(4) eql 6', () => expect(addTwo(4)).eql(6));
		it('2,%([1, 2, 3, 4, 5]) eql [[1, 2], [3, 4, 5]]', () => expect(splitArray([1, 2, 3, 4, 5])).eql([[1, 2], [3, 4, 5]]));
		it(':,(.(; ) ;).%$(2, [1, 2, 3, 4, 5]) eql [[1, 2], [3, 4], [5]]', () => expect(joinAndRecombine(2, [1, 2, 3, 4, 5])).eql([[1, 2], [3, 4], [5]]));
		it("_2split([1, 2, 3, 4, 5]) eql [[1, 2, 3], [4, 5]]", () => expect(splitMinusTwo([1, 2, 3, 4, 5])).eql([[1, 2, 3], [4, 5]]));
		it(':.([.-1.% ,(.(; ) ;).%$).@$.[@.+$(3, [1, 2, 3, 4, 5, 6, 7, 8]) eql [1, 2, 4, 5, 7, 8]', () => expect(dropEvery(3, [1, 2, 3, 4, 5, 6, 7, 8])).eql([1, 2, 4, 5, 7, 8]));
		it(':.([.-1.% ,(.(; ) ;).%$).@$.[@.+$("abcdefghik") eql "abdeghk"', () => expect(dropEvery(3, "abcdefghik")).eql("abdeghk"));
	});

	describe("17. split %", () => {
	/*ts
		split				%
	*/
		it('%(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) eql [[1, 2, 3], [4, 5, 6, 7, 8, 9, 10]]', () => expect(split(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).eql([[1, 2, 3], [4, 5, 6, 7, 8, 9, 10]]));
		it('%(3, "abcdefghik") eql ["abc", "defghik"]', () => expect(split(3, "abcdefghik")).eql(["abc", "defghik"]));
	});

	describe("18. slice :,(.([ _.-$ 0`) ;).%$.1'", () => {
	/*ts
		slice				:,(.([ _.-$ 0`) ;).%$.1'
	*/
		it("slice([2, 7], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) eql [3, 4, 5, 6, 7]", () => expect(slice([2, 7], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).eql([3, 4, 5, 6, 7]));
		it('slice([2, 7], "abcdefghik") eql "cdefg"', () => expect(slice([2, 7], "abcdefghik")).eql("cdefg"));
	});

	describe("19. rotate %._.+$", () => {
	/*ts
		rotate				%._.+$
		split				%
	*/
		it('rotate(3, [1, 2, 3, 4, 5, 6, 7, 8]) eql [4, 5, 6, 7, 8, 1, 2, 3]', () => expect(rotate(3, [1, 2, 3, 4, 5, 6, 7, 8])).eql([4, 5, 6, 7, 8, 1, 2, 3]));
		it('%(-2, "abcde" eql ["abc", "de"]', () => expect(split(-2, "abcde")).eql(["abc", "de"]));
		it('rotate(-2, "abcdefgh") eql "ghabcdef"', () => expect(rotate(-2, "abcdefgh")).eql("ghabcdef"));
	});

	describe("20. removeAt :,(:1 ;).-$", () => {
	/*ts
		removeAt			:,(.(; 1` 0`) ;).%$.([ ]).+$
		removeAtA			:,(:1 ;).-$
	*/
		it("solved", () => expect(removeAtA(2, [1, 2, 3, 4, 5, 6])).eql([1, 2, 4, 5, 6]));
		it('removeAt(2, [1, 2, 3, 4, 5, 6]) eql [1, 2, 4, 5, 6]', () => expect(removeAt(2, [1, 2, 3, 4, 5, 6])).eql([1, 2, 4, 5, 6]));
		it('removeAt(1, "abcd") eql "acd"', () => expect(removeAt(1, "abcd")).eql("acd"));
	});

	describe("21. insertAt :,((1 0 0)- ;).-$", () => {
	/*ts
		splitUp						:.(.([.[ ]).%$ [.])
		insertAt					:.(.([.[ ]).%$ [.]).([.[ .(] ) [.]).+$
		insertAtString				:.(.([.[ ]).%$ [.]).([.[ ] [.]).+$
		insertAtA					:,((1 0 0)- ;).-$
	*/
		it("solved", () => expect(insertAtA([2, 8], [1, 2, 3, 4, 5])).eql([1, 2, 8, 3, 4, 5]));
		it(':.(.([.[ ]).%$ [.])([2, 8], [1, 2, 3, 4, 5]) eql [[[1, 2], [3, 4, 5]], 8]', () => expect(splitUp([2, 8], [1, 2, 3, 4, 5])).eql([[[1, 2], [3, 4, 5]], 8]));
		it('insertAt([2, 8], [1, 2, 3, 4, 5]) eql [1, 2, 8, 3, 4, 5]', () => expect(insertAt([2, 8], [1, 2, 3, 4, 5])).eql([1, 2, 8, 3, 4, 5]));
		it(':.(.([.[ ]).%$ [.]).([.[ ] [.]).+$([2, "alpha"], "abcde") eql "abalphacde"', () => expect(insertAtString([2, "alpha"], "abcde")).eql("abalphacde"));
	});

	describe("22. range :.([.+ _.-$).^$", () => {
	/*ts
		range			:.([.+ _.-$).^$
	*/
		it('range(2, 6) eql [2, 3, 4, 5]', () => expect(range(2, 6)).eql([2, 3, 4, 5]));
	});

	describe('23. rndSelect :,(; {"Math.random"<).%$.[', () => {
	/*ts
		rndSelect				:,(; {"Math.random"<).%$.[
	*/
		it('rndSelect(3, [1, 2, 3, 4, 5, 6, 7, 8]) ~ [5, 4, 6]', () => {
			const array = [1, 2, 3, 4, 5, 6, 7, 8];
			const result = rndSelect(3, array);

			return expect(result.length === 3) && expect(all(value => contains(value)(array))(result)) && expect(isUnique(result));
		})
	});

	describe('25. rndPermu {"Math.random"<', () => {
	/*ts
		rndPermu			{"Math.random"<
	*/
		it('rndPermu([1, 2, 3, 4, 5, 6]) ~ [3, 5, 2, 1, 4, 6]', () => {
			const array = [1, 2, 3, 4, 5, 6];
			const result = rndPermu(array);

			return expect(result.length === array.length) && expect(all(value => contains(value)(array))(result)) && expect(isUnique(result));
		});
	});
});

miscellaneous();
rosettaCode();
lodash();
problems();
operators();

mocha.run();