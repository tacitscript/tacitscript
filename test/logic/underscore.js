const {expect} = chai;
import ts from "tacitscript";

export default () => {
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
};
