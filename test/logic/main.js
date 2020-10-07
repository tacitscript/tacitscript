const {expect, assert} = chai;
import ts from "tacitscript";

mocha.setup('bdd');

//==========================================================
// underscore

describe("Underscore", () => {
	describe("countBy /.#@", () => {
	/*ts
		calculationC			(%2.=0)?2
		countBy					/.#@
		calculation				((%2.=0)?,(`"even" `"odd").|$)countBy(1 2 3 4 5)
		calculationA			((%2.=0)?,(`"even" `"odd").|$)@(1 2 3 4 5)
		calculationB			(%2.=0)?@(1 2 3 4 5)
	*/

		it("(%2.=0)?2 eql [2, undefined]", () => expect(calculationC).eql([2, undefined]));
		it('(%2.=0)?@(1 2 3 4 5) eql [[undefined, 1], [2, undefined], [undefined, 3], [4, undefined], [undefined, 5]]', () => expect(calculationB).eql([[undefined, 1], [2, undefined], [undefined, 3], [4, undefined], [undefined, 5]]));
		it('((%2.=0)?,(`"even" `"odd").|$)@(1 2 3 4 5) eql ["odd", "even", "odd", "even", "odd"]', () => expect(calculationA).eql(["odd", "even", "odd", "even", "odd"]));
		it('((%2.=0)?,(`"even" `"odd").|$)countBy(1 2 3 4 5) eql {odd: 3, even: 2}', () => expect(calculation).eql({odd: 3, even: 2}));
		it("countBy(num => ((num % 2) === 0) ? 'even' : 'odd', [1, 2, 3, 4, 5]) eql {odd: 3, even: 2}", () => expect(countBy(num => ((num % 2) === 0) ? 'even' : 'odd', [1, 2, 3, 4, 5])).eql({odd: 3, even: 2}));
	});

	describe("groupBy /", () => {
	/*ts
		groupBy					/
		calculation				{"Math.floor"groupBy(1.3 2.1 2.4)
		calculationB			#groupBy("one" "two" "three")
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

	describe("contains :,(= ;).'$", () => {
	/*ts
		intermediateB			(4 (2 3 4 5)),(= ;).'$
		intermediate			(=4 (2 3 4 5)).'$
		containsFour			=4'(2 3 4 5)
		contains				:,(= ;).'$
		calculation				3contains(1 2 3)
		calculationB			4contains(1 2 3)
	*/

		it("3contains(1 2 3) eql 3", () => expect(calculation).eql(3));
		it("4contains(1 2 3) eql undefined", () => expect(calculationB).eql(undefined));
		it("(4 (2 3 4 5)),(= ;).'$ eql 4", () => expect(intermediateB).eql(4));
		it("(=4 (2 3 4 5)).'$ eql 4", () => expect(intermediate).eql(4));
		it("contains(4, [2, 3, 4, 5]) eql 4", () => expect(contains(4, [2, 3, 4, 5])).eql(4));
		it("=4'(2 3 4 5) eql 4", () => expect(containsFour).eql(4));
	});

	describe("some *.#.>0", () => {
	/*ts
		some					*.#.>0
		someValues				;some(() 0 "yes")
		filterByIdentity		;*(() 0)
	*/

		it("some(x => x, [undefined, 0, 'yes', false]) eql 1", () => expect(some(x => x, [undefined, 0, 'yes', false])).eql(2));
		it(";some(() 0 'yes') eql 1", () => expect(someValues).eql(2));
		it(";*(() 0) eql []", () => expect(filterByIdentity).eql([0]));
	});

	describe("every :.(*$ ]).#@.=$", () => {
	/*ts
		every					:.(*$ ]).#@.=$
		calculation				(%2.=0)every(2 4 5)
		calculationB			(%2.=0)every(2 4 6)
	*/

		it("(%2.=0)every(2 4 6) eql 3", () => expect(calculationB).eql(3));
		it("(%2.=0)every(2 4 5) eql undefined", () => expect(calculation).eql(undefined));
		it("every(num => (num % 2) === 0, [2, 4, 5]) eql undefined", () => expect(every(num => (num % 2) === 0, [2, 4, 5])).eql(undefined));
		it("every(num => (num % 2) === 0, [2, 4, 6]) eql 3", () => expect(every(num => (num % 2) === 0, [2, 4, 6])).eql(3));
	});

	describe("reject :,(! ;).*$", () => {
	/*ts
		complimentAndArray		:,(! ;)
		reject					:,(! ;).*$
		notLessThanThree		!(<3)
		calculation				(%2.=0)reject(1 2 3 4 5 6)
	*/

		it("(%2.=0)reject(1 2 3 4 5 6) eql [1, 3, 5]", () => expect(calculation).eql([1, 3, 5]));
		it("!(<3)(4) eql 4", () => expect(notLessThanThree(4)).eql(4));
		it(":,(! ;)(value => value < 3, 2)[0](4) eql []", () => expect(complimentAndArray(value => value < 3, 2)[0](4)).eql(4));
		it("!(<3)(2) eql undefined", () => expect(notLessThanThree(2)).eql(undefined));
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

	describe("reduceRight :,(; _).$$", () => {
	/*ts
		reduceRight				:,(; _).$$
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
		mapIndexed				:@
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
		it("map((value, index) => [value, index], ['a', 'b', 'c']) eql [['a', 0], ['b', 1], ['c', 2]]", () => expect(map((value, index) => [value, index], ['a', 'b', 'c'])).eql([['a', 0], ['b', 1], ['c', 2]]));
		it(":map(['a', 'b', 'c']) eql [['a', 0], ['b', 1], ['c', 2]]", () => expect(mapIndexed(['a', 'b', 'c'])).eql([['a', 0], ['b', 1], ['c', 2]]));
		it("map((value, key) => [value, key], {one: 'a', two: 'b', three: 'c'}) eql {one: ['a', 'one'], two: ['b', 'two'], three: ['c', 'three']}",
			() => expect(map((value, key) => [value, key], {one: 'a', two: 'b', three: 'c'})).eql({one: ['a', 'one'], two: ['b', 'two'], three: ['c', 'three']}));
		it(":map({one: 'a', two: 'b', three: 'c'}) eql {one: ['a', 'one'], two: ['b', 'two'], three: ['c', 'three']}",
			() => expect(mapIndexed({one: 'a', two: 'b', three: 'c'})).eql({one: ['a', 'one'], two: ['b', 'two'], three: ['c', 'three']}));
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

//===========================================================
// tests

describe("Multiline Strings", () => {
	/*ts
		multiLineString			"some words
 and some others on a new line"				a comment about this
	*/

	it('"some words\\n and some others on a new line" a comment about this eql "some words\\n and some others on a new line"', () => expect(multiLineString).eql("some words\n and some others on a new line"));
});

describe("Parsing", () => {
	const doubleRecurse = /*ts 2*({"Math.sqrt(/*ts *$(2 2 4)*/)")*/;
	const singleRecurse = /*ts {"Math.sqrt(9)"*2*/;
	const singleLineWithBreaks = /*ts (5
		6
		7) some
	comment*/;
	const singleLine = /*ts 3+5*/;
	const singleLineWithComment = /*ts 4*3*/; // this is a comment
	/*ts
		sum						2+4
		vectorOverLines			(2
			3
			4
		) and some comments here
	*/

	it("2+4 eql 6", () => expect(sum).eql(6));
	it("/*ts 3+5*/ eql 8", () => expect(singleLine).eql(8));
	it("/*ts 4*3*/; // this is a comment eql 12", () => expect(singleLineWithComment).eql(12));
	it("(2\\n\\t3\\n\\t4\\n) and some comments here eql [2, 3, 4]", () => expect(vectorOverLines).eql([2, 3, 4]));
	it(`/*ts {"Math.sqrt(9)"*2*/ eql 6`, () => expect(singleRecurse).eql(6));
	it(`/*ts 2*({"Math.sqrt(/*ts *$(2 2 4)*/)")*/ eql 8`, () => expect(doubleRecurse).eql(8));
});

describe("Operators", () => {
	describe(".", () => {

		describe("pipe 20", () => {
		/*ts
			pipe						.
			firstThen					[pipe
			thenDivideByTwo				pipe(/2)
			firstThenDivideByTwo		[pipe(/2)
			sizeLessThanThree			#.<3
		*/
			it("[.(value => value * 2)([3, 4, 5]) eql 6", () => expect(firstThen(value => value * 2)([3, 4, 5])).eql(6));
			it(".(/2)(array => array[0])([10, 8, 9]) eql 5", () => expect(thenDivideByTwo(array => array[0])([10, 8, 9])).eql(5));
			it("[./2([4, 5, 7]) eql 4", () => expect(firstThenDivideByTwo([4, 5, 7])).eql(2));
			it('#.<3([4, 5]) eql 2', () => expect(sizeLessThanThree([4, 5])).eql(2));
		});

		describe("applyTo 34", () => {
		/*ts
			applyTo					.
			twoApplyTo				2.
			stringApplyTo			"hello".
			arrayApplyTo			(1 2 3).
			twoApplyToThreePlus		2.(3+)
			stringApplyToLength		"hello".#
			arrayApplyToFirst		(1 2 3).[
			twoDotPlusThree			2.+3
			twoApplyToPlusThree		2applyTo(+3)
			fiveMinus				5.-
			sevenApplyToArray		7.(+2 -)
		*/
			it("2.(x => 3 + x) eql 5", () => expect(twoApplyTo(x => 3 + x)).eql(5));
			it("\"hello\".(x => x.length) eql 6", () => expect(stringApplyTo(x => x.length)).eql(5));
			it("(1 2 3).(x => x[0]) eql 6", () => expect(arrayApplyTo(x => x[0])).eql(1));
			it("2.(3+) eql 5", () => expect(twoApplyToThreePlus).eql(5));
			it("\"hello\".# eql 5", () => expect(stringApplyToLength).eql(5));
			it("(1 2 3).[ eql 1]", () => expect(arrayApplyToFirst).eql(1));
			it("2.+3 eql 5", () => expect(twoDotPlusThree).eql(5));
			it("2applyTo(+3) eql 5", () => expect(twoApplyToPlusThree).eql(5));
			it('(5.-)(2) eql 3', () => expect(fiveMinus(2)).eql(3));
			it('7.(+2 -)[0] eql 9', () => expect(sevenApplyToArray[0]).eql(9));
			it('7.(+2 -)[1](3) eql 4', () => expect(sevenApplyToArray[1](3)).eql(4));
		});

		describe("applyToArray", () => {
		/*ts
			applyToArray			.
			sixApplyToArray			6.
			stringApplyToArray		"hello".
			applyToArrayArray		.(# ])
			arrayApplyToArray		(5 6).(# [)
		*/
			it("6.([x => x + 3, x => x * 3]) eql [5, 6]", () => expect(sixApplyToArray([x => x + 3, x => x * 3])).eql([9, 18]));
			it("\"hello\".([x => x.length, x => x[0]]) eql [5, \"h\"]", () => expect(stringApplyToArray([x => x.length, x => x[0]])).eql([5, "h"]));
			it(".(# ])([7, 8, 9]) eql [3, 9]", () => expect(applyToArrayArray([7, 8, 9])).eql([3, 9]));
			it("(5 6).(# [) eql [2, 5]", () => expect([arrayApplyToArray, ts.typeOf(arrayApplyToArray)]).eql([[2, 5], "A"]));
		});

		describe("binaryPipe (XYZ ZW XYW)", () => {
		/*ts
			add						:.+$
			addTwoAndThree			2add3
		*/
			it('2(:.+$)3 eql 5', () => expect(addTwoAndThree).eql(5));
			it(':.+$(2, 3) eql 5', () => expect(add(2, 3)).eql(5));
		});
	});

	describe("~", () => {
		describe("negative 1", () => {
		/*ts
			negative                    ~
			negativeFive				~5
		*/
			it("~(4) eql -4", () => expect(negative(4)).eql(-4));
			it("~(-4) eql 4", () => expect(negative(-4)).eql(4));
			it('~5 eql 5', () => expect(negativeFive).eql(-5));
		});

		describe("transpose AA", () => {
		/*ts
			transposedMatrix				~((1 2 3) (4 5 6) (7 8 9))
			unequalTransposition			~((1 2 3) (4 5) (6 7 8))
		*/
			it('~((1 2 3) (4 5 6) (7 8 9)) eql [[1, 4, 7], [2, 5, 8], [3, 6, 9]]', () => expect(transposedMatrix).eql([[1, 4, 7], [2, 5, 8], [3, 6, 9]]));
			it('~((1 2 3) (4 5) (6 7 8)) eql [[1, 4, 6], [2, 5, 7]]', () => expect(unequalTransposition).eql([[1, 4, 6], [2, 5, 7]]));
		});

		describe("flip 22", () => {
		/*ts
			flipMinus				~-
			flipPairMinus			(:.-$).~
			flipPairMinusApplied	2flipPairMinus6
			flipPow					~({"Math.pow")
		*/
			it('~-(2, 7) eql 5', () => expect(flipMinus(2, 7)).eql(5));
			it('2((:.-$).~)6 eql 4', () => expect(flipPairMinusApplied).eql(4));
			it('(:.-$).~(9, 6) eql -3', () => expect(flipPairMinus(9, 6)).eql(-3));
			it('~({"Math.pow")(2, 3) eql 9', () => expect(flipPow(2, 3)).eql(9));
		});
	});

	describe("-", () => {
		/*ts
			reverse						_
		*/

		describe("reverseArray 3", () => {
		/*ts
			reversedArray				_(7 8 9)
		*/
			it("_([3, 4, 5]) eql [5, 4, 3]", () => expect(reverse([3, 4, 5])).eql([5, 4, 3]));
			it("_(7 8 9) eql [9, 8, 7]", () => expect(reversedArray).eql([9, 8, 7]));
		});

		describe("reverseString SS", () => {
		/*ts
			reversedString				_"Howdy!"
		*/
			it("reverse(\"Hello!\") eql \"!olleH\"", () => expect(reverse("Hello!")).eql("!olleH"));
			it("_\"Howdy!\" eql \"!ydwoH\"", () => expect(reversedString).eql("!ydwoH"));
		});
	});

	describe(":", () => {
		describe("pair (? ? A)", () => {
		/*ts
			numberAndString		4:"hello"
		*/
			it('4:"hello" eql [4, "hello"]', () => expect(numberAndString).eql([4, "hello"]));
		});
	});

	describe("\\", () => {
		describe("fromPairs (A O) 8", () => {
		/*ts
			simpleObject			\(("a" 1) ("b" 2))
			emptyObject				\( )
			compoundObject			\(("a" 1) ("b" \(("ba" 2) )))
		*/
			it('\\(("a" 1) ("b" 2)) eql {a: 1, b: 2} type O', () => expect([simpleObject, ts.typeOf(simpleObject)]).eql([{a: 1, b: 2}, "O"]));
			it('\\( ) eql {} type O', () => expect([emptyObject, ts.typeOf(emptyObject)]).eql([{}, "O"]));
			it('\\(("a" 1) ("b" \(("ba" 2) ))) eql {a: 1, b: {ba: 2}} type O', () => expect([compoundObject, ts.typeOf(compoundObject)]).eql([{a: 1, b: {ba: 2}}, "O"]));
		});

		describe("toPairs (O A) 8", () => {
		/*ts
			fromSimpleObject			\(\(("a" 1) ("b" 2)))
			fromEmptyObject				\(\( ))
			fromCompoundObject			\(\(("a" 1) ("b" \(("ba" 2) ))))
		*/
			it('\\(\\(("a" 1) ("b" 2))) eql [["a", 1], ["b", 2]] type A', () => expect([fromSimpleObject, ts.typeOf(fromSimpleObject)]).eql([[["a", 1], ["b", 2]], "A"]));
			it('\\(\\( )) eql [] type A', () => expect([fromEmptyObject, ts.typeOf(fromEmptyObject)]).eql([[], "A"]));
			it('\\(\\(("a" 1) ("b" \(("ba" 2) )))) eql [["a", 1], ["b", {ba: 2}]] type A', () => expect([fromCompoundObject, ts.typeOf(fromCompoundObject)]).eql([[["a", 1], ["b", {ba: 2}]], "A"]));
		});
	});

	describe("?", () => {
		describe("indexOfString (S S N) 5", () => {
		/*ts
			foundSubstring			"ell"?"hello"
			unfoundSubstring		"bye"?"hello"
		*/
			it('"ell"?"hello" eql 1', () => expect(foundSubstring).eql(1));
			it('"bye"?"hello" eql undefined', () => expect(unfoundSubstring).eql(undefined));
		});

		describe("indexOfNumber (N A N) 2", () => {
		/*ts
			indexOfNumber		2?(1 5 3 7 2 4)
			unfoundIndex		2?(1 5 7 3)
		*/
			it('2?(1 5 3 7 2 4) eql 4', () => expect(indexOfNumber).eql(4));
			it('2?(1 5 7 3) eql undefined', () => expect(unfoundIndex).eql(undefined));
		});

		describe("if (X? X N) 6", () => {
		/*ts
			yes				<3?2
			no				<3?4
		*/
			it("<3?2 eql [2, undefined]", () => expect(yes).eql([2, undefined]));
			it("<3?4 eql [undefined, 4]", () => expect(no).eql([undefined, 4]));
		});

		describe("cond", () => {
		/*ts
			tens			(<10 <20)?
			tensTwelve		tens12
		*/
			it('(<10 <20)?(5) eql [5, undefined, undefined]', () => expect(tens(5)).eql([5, undefined, undefined]));
			it('(<10 <20)?(15) eql [undefined, 15, undefined]', () => expect(tens(15)).eql([undefined, 15, undefined]));
			it('(<10 <20)?(25) eql [undefined, undefined, 25]', () => expect(tens(25)).eql([undefined, undefined, 25]));
			it('(<10 <20)?12 eql [undefined, 12, undefined]', () => expect(tensTwelve).eql([undefined, 12, undefined]));
		});

	});

	describe("@", () => {
		describe("map (?? A A) 17", () => {
		/*ts
			timesTwoMapArray			*2@(3 4 5)
		*/
			it("*2@(3 4 5) eql [6, 8, 10]", () => expect(timesTwoMapArray).eql([6, 8, 10]));
		});

		describe("mapIndexed (?NX A X)", () => {
		/*ts
			indexedSum				(:.+$)@(4 5 6)
		*/
			it('(:.+$)@(4 5 6) = [4, 6, 8]', () => expect(indexedSum).eql([4, 6, 8]))
		});
	});

	describe("*", () => {
		describe("times (0 0 0)", () => {
		/*ts
			timesSix		*6
		*/
			it('*6(4) eql 24', () => expect(timesSix(4)).eql(24));
		});

		describe("pick (A O O) 3", () => {
		/*ts
			pickedObject ("a" "c" "d")*(\(("a" 1) ("b" 2) ("c" 3)))
		*/
			it('("a" "c" "d")*(\(("a" 1) ("b" 2) ("c" 3))) eql {a: 1, c: 3}', () => expect(pickedObject).eql({a: 1, c: 3}));
		});

		describe("filter (?? A A) 7", () => {
		/*ts
			lessThanFilter		<5*(4 9 2 7 3)
			emptyFilter			;*( )
		*/
			it("<5*(4 9 2 7 3) eql [4, 2, 3]", () => expect(lessThanFilter).eql([4, 2, 3]));
			it(";*( ) eql []", () => expect(emptyFilter).eql([]));
		});	
	});

	describe("+", () => {
		describe("plus (N N N) 1", () => {
		/*ts
			plusThree		+3
		*/
			it("+3(4) eql 7", () => expect(plusThree(4)).eql(7));
		});

		describe("arrayConcat (A A A) |||", () => {
		/*ts
			concatArray				(1 2 3)+("hello" (4 5))
			undefinedConcatArray	()+(1 2 3)
			arrayConcatUndefined	(1 2 3)+()
		*/
			it('(1 2 3)+("hello" (4 5)) eql [1, 2, 3, "hello", [4, 5]]', () => expect(concatArray).eql([1, 2, 3, "hello", [4, 5]]));
			it('(1 2 3)+() eql undefined', () => expect(undefinedConcatArray).eql(undefined));
			it('()+(1 2 3) eql undefined', () => expect(arrayConcatUndefined).eql(undefined));
		});

		describe("merge (O O O) 3", () => {
			/*ts
				mergedObjects			\(("a" 1) ("b" \(("b1" 2) ("b3" (1 2)))) ("c" 3))+(\(("b" \(("b2" 2.5) ("b3" (4 )))) ("c" \(("c1" 3.5) ))))
			*/
			it(
				'\\(("a" 1) ("b" \\(("b1" 2) ("b3" (1 2)))) ("c" 3))+(\\(("b" \\(("b2" 2.5) ("b3" (4 )))) ("c" \\(("c1" 3.5) )))) eql {a: 1, b: {b1: 2, b3: [4], b2: 2.5}, c: {c1: 3.5}}',
				() => expect(mergedObjects).eql({a: 1, b: {b1: 2, b3: [4], b2: 2.5}, c: {c1: 3.5}})
			);
		});

		describe("stringConcat (S ? S) 3", () => {
		/*ts
			undefinedString				"me"+()
			numberString				"me"+1
			stringString				"me"+"hello"
			arrayString					"me"+(1 2 3)
			singleArrayString			""+(9 )
			emptyArrayString			"me"+( )
			objectString				"me"+(\(("a" 1) ))
			//functionString			me+(+2)
			mixedString					""+(\(("a" (1 "hello")) ))
		*/
			it('"me"+() eql undefined', () => expect(undefinedString).eql(undefined));
			it('"me"+1 eql "me1"', () => expect(numberString).eql("me1"));
			it('"me"+"hello" eql "mehello"', () => expect(stringString).eql("mehello"));
			it('"me"+(1 2 3) eql "me(1 2 3)"', () => expect(arrayString).eql("me(1 2 3)"));
			it('""+(9 ) eql "(9 )"', () => expect(singleArrayString).eql("(9 )"));
			it('"me"+( ) eql "me( )"', () => expect(emptyArrayString).eql("me( )"));
			it('"me"+(\\(("a" 1) )) eql "me(\\(("a" 1) ))"', () => expect(objectString).eql('me(\\(("a" 1) ))'));
			it('""+(\\(("a" (1 "hello")) )) eql "(\\(("a" (1 "hello")) ))"', () => expect(mixedString).eql('(\\(("a" (1 "hello")) ))'));
		});
	});

	describe("$", () => {
		describe("join (S A S) 4", () => {
		/*ts
			csv			","$(1 2 3)
		*/
			it('","$(1 2 3) eql "1,2,3"', () => expect(csv).eql("1,2,3"));
		});

		describe("insert (??Y A Y) 7", () => {
		/*ts
			insert						$
			timesInsert					*$
			timesInsertSingle			*$(4 )
			insertEmpty					$( )
			timesInsertUndefined		*$()
			timesInsertArray			*$(5 6 7)
		*/
			it("*$([4, 5, 6]) eql 120", () => expect(timesInsert([4, 5, 6])).eql(120));
			it("*$(4 ) eql 4", () => expect(timesInsertSingle).eql(4));
			it("$( )((x, y) => x + y) eql undefined", () => expect(insertEmpty((x, y) => x + y)).eql(undefined));
			it("*$() eql undefined", () => expect(timesInsertUndefined).eql(undefined));
			it("*$(5 6 7) eql [210, N]", () => expect([timesInsertArray, ts.typeOf(timesInsertArray)]).eql([210,  "N"]));
		});

		describe("reduce (A A ?) 1", () => {
		/*ts
			sum					(+ 0)$
		*/
			it('(+ 0)$([2, 3, 4]) eql 9', () => expect(sum([2, 3, 4])).eql(9));
		});
	});

	describe("`", () => {
		describe("constant (X ?X) 13", () => {
		/*ts
			constNumber			`3
			constObject			`(\(("a" 3) ))
		*/
			it('`3("hello") eql 3', () => expect(constNumber("hello")).eql(3));
			it('`(\(("a" 3) )([1, 2]) eql {a: 3}', () => expect(constObject([1, 2])).eql({a: 3}));
		});
	});

	describe("]", () => {
		describe("last (A ?) 7", () => {
		/*ts
			last                        ]
		*/
			it("last([1, 2, 3]) eql 3", () => expect(last([1, 2, 3])).eql(3));
			it("last(\"abcd\") eql \"d\"", () => expect(last("abcd")).eql("d"));
		});
	});

	describe("{", () => {
		describe("eval (S ?) 2", () => {
		/*ts
			evalFunctionApplied	{"Math.sqrt"4
			evalObject			{"({a: 4})"
			evalNumber			{"2"
			evalString			{"\"hello\""
			evalArray			{"[4, 5, 6]"
			evalFunction		{"x => Math.max.apply(Math, x)"
			binaryFunction		2({"Math.pow")3
		*/
			it('{"2" eql 2', () => expect(evalNumber).eql(2));
			it('{"\\"hello\\"" eql "hello"', () => expect(evalString).eql("hello"));
			it('{"[4, 5, 6]" eql [4, 5, 6]', () => expect(evalArray).eql([4, 5, 6]));
			it('{"({a: 4})" eql {a: 4}', () => expect(evalObject).eql({a: 4}));
			it('{"x => Math.max.apply(Math, x)"([2, 3, 7, 4]) eql 7', () => expect(evalFunction([2, 3, 7, 4])).eql(7));
			it('{"Math.sqrt"4 eql 2', () => expect(evalFunctionApplied).eql(2));
			it('2({"Math.pow")3 eql 8', () => expect(binaryFunction).eql(8));
		});
	});

	describe(";", () => {
		describe("identity (X X) 6", () => {
			const fn = x => x + 3;

		/*ts
			identity			;
			mixedTypes			;(3 "hello" (4 5 6))
		*/
			it("identity(76) eql 76", () => expect(identity(76)).eql(76));
			it("\;(3 \"hello\" (4 5 6)) eql [3, \"hello\", [4, 5, 6]]", () => expect(mixedTypes).eql([3, "hello", [4, 5, 6]]));
			it("identity(<fn>) eql <fn>", () => expect(identity(fn)).eql(fn));
		});
	});

	describe("'", () => {
		describe("at (N A ?) (N S S) 3", () => {
		/*ts
			at				'
			twoAt			2at
			atArray			at(1 2 3 4)
			atString		at"help"
		*/
			it("2at([1, 2, 3]) eql 3", () => expect(twoAt([1, 2, 3])).eql(3));
			it("2at(\"help\") eql \"l\"", () => expect(twoAt("help")).eql("l"));
			it("at(1 2 3 4)(1) eql 2", () => expect(atArray(1)).eql(2));
			it("at\"help\"(1) eql \"e\"", () => expect(atString(1)).eql("e"));
		});
	
		describe("prop (S O ?) 22", () => {
		/*ts
			prop			"key"'(\(("a" 2) ("key" 4)))
		*/
			it(`"key"'(\(("a" 2) ("key" 4))) eql 4`, () => expect(prop).eql(4));
		});

		describe("path AA?, AO?", () => {
		/*ts
			singleArrayArrayPath					(1 )'(5 6 7)
			singleArrayObjectPath					("key1" )'(\(("key0" 3) ("key1" 4) ("key3" 5)))
			multiArrayArrayPath						(1 "mykey" 0)'
			multiArrayObjectPath					("mykey" 1)'
		*/
			it(`(1 )'(5 6 7) eql 6`, () => expect(singleArrayArrayPath).eql(6));
			it(`("key1" )'(\(("key0" 3) ("key1" 4) ("key3" 5))) eql 4`, () => expect(singleArrayObjectPath).eql(4));
			it(`(1 "mykey" 0)'([3, {mykey: ["hello", "bye"]}]) eql "hello"`, () => expect(multiArrayArrayPath([3, {mykey: ["hello", "bye"]}])).eql("hello"));
			it(`("mykey" 1)'({no: "hello", mykey: [5, 44]}) eql 44`, () => expect(multiArrayObjectPath({no: "hello", mykey: [5, 44]})).eql(44));
			it(`("mykey" 1)'({no: [2, 3]}) eql undefined`, () => expect(multiArrayObjectPath({no: [2, 3]})).eql(undefined));
		});

		describe("over (A ?? 00)", () => {
		/*ts
			applyAtIndex			((1 ) +1)'(3 5 7)
			applyAtNegativeIndex	((~2 ) *2)'
			applyAtKey				(("b" ) +" John")'
			applyAtInvalidIndex		((3 ) +1)'(0 1 2)
			applyAtInvalidKey		(("c" ) `"hi")'
			applyAtPath				((~2 "a" 1) -2)'
			createAtPath			(("a" "b" "c") `"created")'
		*/
			it(`(1 )'(+1)(3 5 7) eql [3, 6, 7]`, () => expect(applyAtIndex).eql([3, 6, 7]));
			it(`(~2 )'(*2)([1, 2, 3, 4, 5]) eql [1, 2, 3, 8, 5]`, () => expect(applyAtNegativeIndex([1, 2, 3, 4, 5])).eql([1, 2, 3, 8, 5]));
			it(`("b" )'(+" John")({a: "Hello", b: "Bye", c: "Welcome"}) eql {a: "Hello", b: "Bye John", c: "Welcome"}`, () => expect(applyAtKey({a: "Hello", b: "Bye", c: "Welcome"})).eql({a: "Hello", b: "Bye John", c: "Welcome"}));
			it(`(3 )'(+1)(0 1 2) eql [0, 1, 2]`, () => expect(applyAtInvalidIndex).eql([0, 1, 2]));
			it(`("c" )'(\`"hi")({a: "hello", b: "morning"}) eql {a: "hello", b: "morning", c: "hi"}`, () => expect(applyAtInvalidKey({a: "hello", b: "morning"})).eql({a: "hello", b: "morning", c: "hi"}));
			it(`(~2 "a" 1)'(-2)([1, 2, {a: [0, 1, 2]}, 3]) eql [1, 2, {a: [0, -1, 2]}, 3]`, () => expect(applyAtPath([1, 2, {a: [0, 1, 2]}, 3])).eql([1, 2, {a: [0, -1, 2]}, 3]));
			it(`(~2 "a" 1)'(-2)([0]) eql [0]`, () => expect(applyAtPath([0])).eql([0]));
			it(`("a" "b" "c")'(\`"created")({}) eql {a: {b: {c: "created"}}}`, () => expect(createAtPath({})).eql({a: {b: {c: "created"}}}));
		});

	});

	describe(",", () => {
		describe("zipApplyTo (A A A) 8", () => {
		/*ts
			topHeavy		(1 2 3),(*3 +7)
			bottomHeavy		(4 5),(/2 -1 *8)
		*/
			it('(1 2 3),(*3 +7) eql [3, 9]', () => expect(topHeavy).eql([3, 9]));
			it('(4 5),(/2 -1 *8) eql [2, 4]', () => expect(bottomHeavy).eql([2, 4]));
		});

		describe("zipPipe 000", () => {
		/*ts
			commaArray			,(-1 )
			invertedSense		-1.(7.)
			chainedComma		,(- ),(5. )
			zipPipe				,(+2 -),(; 5.)
			zipPipeInPlace		zipPipe(5 3)
			inlineApplication	(4 8),(+2 -),(; 5.)
		*/
			it(',(-1 )([5]) eql [4]', () => expect(commaArray([5])).eql([4]));
			it('-1.(7.) eql 6', () => expect(invertedSense).eql(6));
			it(',(- ),(5. )([9]) eql 4', () => expect(chainedComma([9])).eql([4]));
			it(',(+2 -),(; 5.)([7, 9]) eql [9, 4]', () => expect(zipPipe([7, 9])).eql([9, 4]));
			it(',(+2 -),(; 5.)(5 3) eql [7, -2]', () => expect(zipPipeInPlace).eql([7, -2]));
			it('(4 8),(+2 -),(; 5.) eql [6, 3]', () => expect(inlineApplication).eql([6, 3]));
		});

	});

	describe("=", () => {
		describe("equals (X X X) 4", () => {
		/*ts
			equals				=
			equalsSeven			=7
			peterEquals			"Peter"=
			mixedEqualsMixed	(2 "Jane" (3 4))=(2 "Jane" (3 4))
			failedEquality		2=4
			arrayEqualsArray	(1 2 3)=(1 2 3)
			numberEqualsArray	=(1 2 3)
			inequality			1=2
			equalsUndefined		1=()
			mixedEquality		(1 "hello")=(1 "hello")
			undefinedEquality	()=()
		*/
			it("=7(\"Dan\") eql undefined", () => expect(equalsSeven("Dan")).eql(undefined));
			it("\"Peter\"=(\"Peter\") eql \"Peter\"", () => expect(peterEquals("Peter")).eql("Peter"));
			it("(2 \"Jane\" (3 4))=(2 \"Jane\" (3 4)) eql [[2, \"Jane\", [3, 4]], [\"A\"]]", () => expect([mixedEqualsMixed, ts.typeOf(mixedEqualsMixed)]).eql([[2, "Jane", [3, 4]], "A"]));
			it("2=4 eql undefined", () => expect(failedEquality).eql(undefined));
			it('(1 2 3)=(1 2 3) eql [1, 2, 3]', () => expect(arrayEqualsArray).eql([1, 2, 3]));
			it('=(1 2 3)(1) eql undefined', () => expect(numberEqualsArray(1)).eql(undefined));
			it('1=2 eql undefined', () => expect(inequality).eql(undefined));
			it('1=() eql undefined', () => expect(equalsUndefined).eql(undefined));
			it('(1 "hello")=(1 "hello") eql [1, "hello"]', () => expect(mixedEquality).eql([1, "hello"]));
			it('()=() eql undefined', () => expect(undefinedEquality).eql(undefined));
		});
	});

	describe("|", () => {
		describe("orValue (? N ?), (? A ?) 7", () => {
		/*ts
			oneOrTwo			1|2
			arrayOrArray		(1 2 3)|(4 5)
			oneOrNull			1|()
			nullOrOne			()|1
			nullOr				()|
			orNull				|()
			helloOrBye			"hello"|"bye"
			nullOrHello			()|(1 2 3)
		*/
			it('1|2 eql 1', () => expect(oneOrTwo).eql(1));
			it("(1 2 3)|(4 5) eql [1, 2, 3]", () => expect(arrayOrArray).eql([1, 2, 3]));
			it('1|() eql 1', () => expect(oneOrNull).eql(1));
			it('()|1 eql 1', () => expect(nullOrOne).eql(1));
			it('()|(2) eql 2', () => expect(nullOr(2)).eql(2));
			it('|()(3) eql 3', () => expect(orNull(3)).eql(3));
			it('"hello"|"bye" eql "hello"', () => expect(helloOrBye).eql("hello"));
			it('()|(1 2 3) eql [1, 2, 3]', () => expect(nullOrHello).eql([1, 2, 3]));
		});

		describe("orPredicate 111", () => {
		/*ts
			lessThanFiveOrEven				<5|(%2.=0)
		*/
			it('<5|(%2.=0)(3) eql 3', () => expect(lessThanFiveOrEven(3)).eql(3));
			it('<5|(%2.=0)(10) not eql undefined', () => expect(lessThanFiveOrEven(10)).not.eql(undefined));
			it('<5|(%2.=0)(7) eql undefined', () => expect(lessThanFiveOrEven(7)).eql(undefined));
		});

		describe("orOperator 222", () => {
		/*ts
			lessThanOrEqual						<|=
			fiveLessThanOrEqualSeven			5lessThanOrEqual7
			sevenLessThanOrEqualFive			7(<|=)5
			sevenLessThanOrEqualUndefined		7(<|=)()
		*/
			it('5(<|=)7 eql 5', () => expect(fiveLessThanOrEqualSeven).eql(5));
			it('7(<|=)5 eql undefined', () => expect(sevenLessThanOrEqualFive).eql(undefined));
			it('<|=(5, 5) eql 5', () => expect(lessThanOrEqual(5, 5)).eql(5));
			it('<|=(6, 4) eql undefined', () => expect(lessThanOrEqual(6, 4)).eql(undefined));
			it('7(<|=)() eql undefined', () => expect(sevenLessThanOrEqualUndefined).eql(undefined));
		});

	});

	describe("-", () => {
		describe("minus NNN", () => {
		/*ts
			minusFive			4-9
			minusSix			-6
			nineMinus			9-
		*/
			it('4-9 eql -5', () => expect(minusFive).eql(-5));
			it('-6(10) eql 4', () => expect(minusSix(10)).eql(4));
			it('9-(-5) eql 14', () => expect(nineMinus(-5)).eql(14));
		});

		describe("omitKey (S O O) |", () => {
		/*ts
			removedKey			"key1"-(\(("key1" 1) ("key2" 2)))
		*/
			it('"key1"-(\\(("key1" 1) ("key2" 2))) eql {key1: 1}', () => expect(removedKey).eql({key2: 2}));
		});

		describe("omitKeys AOO", () => {
		/*ts
			keysOmitted				("a" "no" "hen")-(\(("a" 4) ("be" "hello") ("hen" (1 2 3))))
			omitTheseKeys			("c" "ex")-
		*/
			it('("a" "no" "hen")-(\(("a" 4) ("be" "hello") ("hen" (1 2 3)))) eql {be: "hello"}', () => expect(keysOmitted).eql({be: "hello"}));
			it('("c" "ex")-({a: "head", ex: 4}) eql {a: "head}', () => expect(omitTheseKeys({a: "head", ex: 4})).eql({a: "head"}));
		});
	});

	describe("/", () => {
		describe("divide 000", () => {
		/*ts
			basicDivide				9/2
			numeratorDivide			8/
			divideByDenominator		/2
			divideByZero			/0
		*/
			it('9/2 eql 4.5', () => expect(basicDivide).eql(4.5));
			it('8/(4) eql 2', () => expect(numeratorDivide(4)).eql(2));
			it('/2(10) eql 5', () => expect(divideByDenominator(10)).eql(5));
			it('/0(8) eql undefined', () => expect(divideByZero(8)).eql(undefined));
		});

		describe("groupBy (?? A O) |", () => {
		/*ts
			groupByFirst	[/("ann" "ben" "ade")
			groupByEmpty	[/( )
		*/
			it('[/("ann" "ben" "ade") eql {a: ["ann", "ade"], b: ["ben"]}', () => expect(groupByFirst).eql({a: ["ann", "ade"], b: ["ben"]}));
			it('[/( ) eql {}', () => expect(groupByEmpty).eql({}));
		});
	});

	describe("#", () => {
		describe("length (A N) 3", () => {
		/*ts
			length					#
			lengthOfArray			#(3 4 5 6 7)
		*/
			it("length([5, 6, 7, 8]) eql 4", () => expect(length([5, 6, 7, 8])).eql(4));
			it("#(3 4 5 6 7) eql [5, [N]]", () => expect([lengthOfArray, ts.typeOf(lengthOfArray)]).eql([5,  "N"]));
		});
	});

	describe("<", () => {
		describe("lessThan (N N N)", () => {
			/*ts
				passedLessThan			2<3
				failedLessThan			3<2
			*/
				it("2<3 eql 2", () => expect(passedLessThan).eql(2));
				it("3<2 eql undefined", () => expect(failedLessThan).eql(undefined));
		});

		describe("lessThan (S S S)", () => {
			/*ts
				passedLessThan			"ab"<"bc"
				failedLessThan			"b"<"a"
			*/
				it('"ab"<"bc" eql "ab"', () => expect(passedLessThan).eql("ab"));
				it('"b"<"a" eql undefined', () => expect(failedLessThan).eql(undefined));
			});

		describe("ascendingSort (?? A A) |", () => {
		/*ts
			sortArray	{"Math.abs"<(~7 3 ~1 4)
			sortStrings	[<("tom" "ann" "sam")
		*/
			it('{"Math.abs"<(~7 3 _~1 4) eql [-1, 3, 4, -7]', () => expect(sortArray).eql([-1, 3, 4, -7]));
			it('[<("tom" "ann" "sam") eql ["ann", "sam", "tom"]', () => expect(sortStrings).eql(["ann", "sam", "tom"]));
		});
	});

	describe(">", () => {
		describe("greaterThan (N N N)", () => {
		/*ts
			failedGreaterThan			2>3
			passedGreaterThan			3>2
		*/
			it("2>3 eql undefined", () => expect(failedGreaterThan).eql(undefined));
			it("3>2 eql 3", () => expect(passedGreaterThan).eql(3));
		});

		describe("greaterThan (S S S)", () => {
		/*ts
			failedGreaterThan			"ab">"bc"
			passedGreaterThan			"b">"a"
		*/
			it('"ab">"bc" eql undefined', () => expect(failedGreaterThan).eql(undefined));
			it('"b">"a" eql "b"', () => expect(passedGreaterThan).eql("b"));
		});

		describe("descendingSort (?? A A) |", () => {
		/*ts
			sortArray	{"Math.abs">(~7 3 ~1 4)
			sortStrings	[>("tom" "ann" "sam")
		*/
			it('{"Math.abs">(~7 3 _~1 4) eql [-7, 4, 3, -1]', () => expect(sortArray).eql([-7, 4, 3, -1]));
			it('[>("tom" "ann" "sam") eql ["tom", "sam", "ann"]', () => expect(sortStrings).eql(["tom", "sam", "ann"]));
		});
	});

	describe("%", () => {
	/*ts
		split						%
	*/

		describe("modulo (N N N)", () => {
		/*ts
			moduloTwo		%2
		*/
			it("%2(3) eql 1", () => expect(moduloTwo(3)).eql(1));
		});

		describe("split (N A A) (N S A)", () => {
		/*ts
			splitTwo					2split
			splitMinusTwo				~2split
		*/
			it("2split([1, 2, 3, 4, 5]) eql [[1, 2], [3, 4, 5]]", () => expect(splitTwo([1, 2, 3, 4, 5])).eql([[1, 2], [3, 4, 5]]));
			it('2split("abcde") eql ["ab", "cde"]', () => expect(splitTwo("abcde")).eql(["ab", "cde"]));
			it("~2split([1, 2, 3, 4, 5]) eql [[1, 2, 3], [4, 5]]", () => expect(splitMinusTwo([1, 2, 3, 4, 5])).eql([[1, 2, 3], [4, 5]]));
			it('~2split("abcde") eql ["abc", "de"]', () => expect(splitMinusTwo("abcde")).eql(["abc", "de"]));
		});

		/*ts
			threeChunk			(3 )%
			threeTwoChunk		(3 2)%
			threeTwoZeroChunk	(3 2 0)%
		*/

		describe("chunkArray (A A A)", () => {
			it('(3 )%([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) eql [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9]]', () => expect(threeChunk([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).eql([[0, 1, 2], [3, 4, 5], [6, 7, 8], [9]]));
			it('(3 2)%([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) eql [[0, 1, 2], [3, 4], [5, 6, 7], [8, 9]]', () => expect(threeTwoChunk([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).eql([[0, 1, 2], [3, 4], [5, 6, 7], [8, 9]]));
			it('(3 2 0)%([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) eql [[0, 1, 2], [3, 4], [5, 6, 7, 8, 9]]', () => expect(threeTwoZeroChunk([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).eql([[0, 1, 2], [3, 4], [5, 6, 7, 8, 9]]));
		});

		describe("chunkString (A S A)", () => {
			it('(3 )%"abcdefghij" eql ["abc", "def", "ghi", "j]', () => expect(threeChunk("abcdefghij")).eql(["abc", "def", "ghi", "j"]));
			it('(3 2)%"abcdefghij" eql ["abc", "de", "fgh", "ij"]', () => expect(threeTwoChunk("abcdefghij")).eql(["abc", "de", "fgh", "ij"]));
			it('(3 2 0)%"abcdefghij" eql ["abc", "de", "fgh", "ij"]', () => expect(threeTwoZeroChunk("abcdefghij")).eql(["abc", "de", "fghij"]));
		});

		/*ts
			chunkWhenLessThan		<%
		*/

		describe("chunkArrayWhen (??? A A)", () => {
			it('<%([9, 6, 4, 8, 5, 2, 7, 4, 1, 0]) eql [[9, 6, 4], [8, 5, 2], [7, 4, 1, 0]]', () => expect(chunkWhenLessThan([9, 6, 4, 8, 5, 2, 7, 4, 1, 0])).eql([[9, 6, 4], [8, 5, 2], [7, 4, 1, 0]]));
		});

		describe("chunkStringWhen (SS? S A)", () => {
			it('<%("jgeifcheba") eql ["jge", "ifc", "heba"]', () => expect(chunkWhenLessThan("jgeifcheba")).eql(["jge", "ifc", "heba"]));
		});
	});

	describe("[", () => {
		describe("first (A ?) 3", () => {
		/*ts
			first                       [
		*/
			it("first([1, 2, 3]) eql 1", () => expect(first([1, 2, 3])).eql(1));
			it("first(\"abcd\") eql \"a\"", () => expect(first("abcd")).eql("a"));
		});
	});

	describe("}", () => {
		describe("typeOf (? S) 1", () => {
		/*ts
			typeOf					}
			typeOfUndefined			}()
			typeOfNumber			}4.5
			typeOfString			}"hello"
			typeOfArray				}(7 8 9)
			typeOfObject			}(\(("a" 4) ))
			typeOfPow				}({"Math.pow")
			typeOfPlus				}+
			typeOfFirst				}[
		*/
			it('}(undefined) eql undefined', () => expect(typeOf(undefined)).eql(undefined));
			it('}() eql undefined', () => expect(typeOfUndefined).eql(undefined));
			it('}(4) eql "N"', () => expect(typeOf(4)).eql("N"));
			it('}4.5 eql "N"', () => expect(typeOfNumber).eql("N"));
			it('}("hello") eql "S"', () => expect(typeOf("hello")).eql("S"));
			it('}"hello" eql "S"', () => expect(typeOfString).eql("S"));
			it('}([1, 2, 3]) eql "A"', () => expect(typeOf([1, 2, 3])).eql("A"));
			it('}(7 8 9) eql "A"', () => expect(typeOfArray).eql("A"));
			it('}({a: 3}) eql "O"', () => expect(typeOf({a: 3})).eql("O"));
			it('}(\\(("a" 4) )) eql "O"', () => expect(typeOfObject).eql("O"));
			it('}(Math.random) eql 1 (0 arity functions returned as 1)', () => expect(typeOf(Math.random)).eql(1));
			it('}(Math.sin) eql 1', () => expect(typeOf(Math.sin)).eql(1));
			it('}(Math.pow) eql 2', () => expect(typeOf(Math.pow)).eql(2));
			it('}({"Math.pow") eql 2', () => expect(typeOfPow).eql(2));
			it('}+ eql 2', () => expect(typeOfPlus).eql(2));
			it('}[ eql 1', () => expect(typeOfFirst).eql(1));
		});
	});

	describe("^", () => {
		describe("power (N N N)", () => {
		/*ts
			cube		^3
		*/
			it("^3(2) eql 8", () => expect(cube(2)).eql(8));
		});

		describe("generate (N? N A)", () => {
		/*ts
			timesTwoGenerate	*2^
		*/
			it('*2^(5) eql [0, 2, 4, 6, 8]', () => expect(timesTwoGenerate(5)).eql([0, 2, 4, 6, 8]));
		});

		describe("while (A A A)", () => {
		/*ts
			firstFiveNaturalNumbers	(#.<5 #.+1)^( )
			firstFiveFibonacci	(#.<5 ~2%.].+$)^(1 1)
		*/
			it('(#.<5 #.+1)^( ) eql [1, 2, 3, 4, 5]', () => expect(firstFiveNaturalNumbers).eql([1, 2, 3, 4, 5]));
			it('(#.<5 ~2%.].+$)^(1 1) eql [1, 1, 2, 3, 5]', () => expect(firstFiveFibonacci).eql([1, 1, 2, 3, 5]));
		});
	});

	describe("&", () => {
		describe("andValue (0 0 0)", () => {
		/*ts
			fiveAndUndefined			5&()
			undefinedAndFive			()&5
			andHello					&"hello"
			helloAnd					"hello"&
		*/
			it('5&() eql undefined', () => expect(fiveAndUndefined).eql(undefined));
			it('()&5 eql undefined', () => expect(undefinedAndFive).eql(undefined));
			it('&"hello"([4, 5, 6]) eql "hello"', () => expect(andHello([4, 5, 6])).eql("hello"));
			it('"hello"&([7, 8, 9]) eql [7, 8, 9]', () => expect(helloAnd([7, 8, 9])).eql([7, 8, 9]));
		});

		describe("andPredicate (X? X? X?)", () => {
		/*ts
			greaterAndLessThan				>3&(<6)
		*/
			it('>3&(<6)(4) eql 4', () => expect(greaterAndLessThan(4)).eql(4));
			it('>3&(<6)(7) eql undefined', () => expect(greaterAndLessThan(7)).eql(undefined));
			it('>3&(<6)(3) eql undefined', () => expect(greaterAndLessThan(3)).eql(undefined));
		});
	})

	describe("_", () => {
		describe("reverse AA, SS", () => {
		/*ts
			reversedArray			_(1 2 3)
			reversedString			_"Hello"
			reverse					_
		*/
			it('_(1 2 3) eql [3, 2, 1]', () => expect(reversedArray).eql([3, 2, 1]));
			it('_"Hello" eql "olleH"', () => expect(reversedString).eql("olleH"));
			it('_([4, 5, 6]) eql [6, 5, 4]', () => expect(reverse([4, 5, 6])).eql([6, 5, 4]));
			it('_("Bye") eql "eyB"', () => expect(reverse("Bye")).eql("eyB"));
		});
	});

	describe("!", () => {
		describe("not 00, 11, 22", () => {
		/*ts
			notNumber					!4
			notZero						!0
			notUndefined				!()
			notArray					!( )
			notString					!"hello"
			notEqual					!=
			notLessThanThree			!(<3)
			not							!
			notDivideByZero				!(1/0)
		*/
			it("!4 eql undefined", () => expect(notNumber).eql(undefined));
			it('!0 eql undefined', () => expect(notZero).eql(undefined));
			it('!() eql []', () => expect(notUndefined).eql([]));
			it('!(1 2 3) eql undefined', () => expect(notArray).eql(undefined));
			it('!"hello" eql undefined', () => expect(notString).eql(undefined));
			it('!=(2, 3) eql 2', () => expect(notEqual(2, 3)).eql(2));
			it('!=(3, 3) eql undefined', () => expect(notEqual(3, 3)).eql(undefined));
			it('!(<3)(4) eql 4', () => expect(notLessThanThree(4)).eql(4));
			it('!(<3)(2) eql undefined', () => expect(notLessThanThree(2)).eql(undefined));
			it('!("hello") eql undefined', () => expect(not("hello")).eql(undefined));
			it('!(x => x)({a: 2}) eql undefined', () => expect(not(x => x)({a: 2})).eql(undefined));
			it('!(x => undefined)(3) eql []', () => expect(not(x => undefined)(3)).eql(3));
			it('!(1/0) eql []', () => expect(notDivideByZero).eql([]));
		});
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
		it("() eql undefined", () => expect(undefinedValue).eql(undefined));
		it("( ) eql []", () => expect(emptyArray).eql([]));
		it("(( ) (  ) () ()) eql [[], [], undefined, undefined]", () => expect(arrayOfEmpties).eql([[], [], undefined, undefined]));

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
		firstEqualsThree		=3.([.)
	*/
		it('=3.([.)([3, 2, 1]) eql 3', () => expect(firstEqualsThree([3, 2, 1])).eql(3));
		it('=3.([.)([1, 2, 3]) eql undefined', () => expect(firstEqualsThree([1, 2, 3])).eql(undefined));
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
			calculationWithDots				(2.+3 4.+5 6.+7)
			calculationWithMultipleDots		(2.+3.-1 4.+5.-1 6.+7.-1)
			calculationExtraction			(+2 -3).]
		*/
			it('(2+3 4+5 6+7) eql [5, 9, 13]', () => expect(arrayCalculation).eql([5, 9, 13]));
			it('(2.+3 4.+5 6.+7) eql [5, 9, 13]', () => expect(calculationWithDots).eql([5, 9, 13]));
			it('(2.+3.-1 4.+5.-1 6.+7.-1) eql [4, 8, 12]', () => expect(calculationWithMultipleDots).eql([4, 8, 12]));
			it('(+2 -3).](9) eql 6', () => expect(calculationExtraction(9)).eql(6));
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
		factorial					=1?,(; .(; -1.factorial).*$).|$
	*/
		it('=1?,(; .(; -1.factorial).*$).|$(1) eql 1', () => expect(factorial(1)).eql(1));
		it('=1?,(; .(; -1.factorial).*$).|$(2) eql 2', () => expect(factorial(2)).eql(2));
		it('=1?,(; .(; -1.factorial).*$).|$(4) eql 24', () => expect(factorial(4)).eql(24));
	});

});

describe("99 Haskell Problems", () => {
	describe("1. myLast ]", () => {
	/*ts
		myLast                ]
	*/
		it("myLast([1, 2, 3, 4]) eql 4", () => expect(myLast([1, 2, 3, 4])).eql(4));
		it("myLast(\"xyz\") eql \"z\"", () => expect(myLast("xyz")).eql("z"));
	});
	
	describe("2. myButLast ~2'", () => {
	/*ts
		myButLast             ~2'
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
		forwardAndReverse						.(; _)
		forwardAndReverseThenLength				.(; _).#
		isPalindrome							.(; _).=$
		isPalindromeFalse						(1 2 3).(; _).=$
		isPalindromeTrue						"madamimadam".(; _).=$
	*/
		it(".(; _)([1, 2, 3]) eql [[1, 2, 3], [3, 2, 1]]", () => expect(forwardAndReverse([1, 2, 3])).eql([[1, 2, 3], [3, 2, 1]]));
		it(".(; _).# arity 1", () => expect(ts.arity(forwardAndReverseThenLength)).eql(1));
		it(".(; _).#([1, 2, 3]) eql 2", () => expect(forwardAndReverseThenLength([1, 2, 3])).eql(2));
		it("isPalindrome([1, 2, 3]) eql undefined", () => expect(isPalindrome([1, 2, 3])).eql(undefined));
		it("isPalindrome(\"madamimadam\") eql \"madamimadam\"", () => expect(isPalindrome("madamimadam")).eql("madamimadam"));
		it("isPalindrome([1, 2, 4, 8, 16, 8, 4, 2, 1]) eql [1, 2, 4, 8, 16, 8, 4, 2, 1]", () => expect(isPalindrome([1, 2, 4, 8, 16, 8, 4, 2, 1])).eql([1, 2, 4, 8, 16, 8, 4, 2, 1]));
		it("(1 2 3).(; _).=$ eql undefined", () => expect(isPalindromeFalse).eql(undefined));
		it("\"madamimadam\".(; _).=$ eql \"madamimadam\" type \"S\"", () => expect([isPalindromeTrue, ts.typeOf(isPalindromeTrue)]).eql(["madamimadam", "S"]));
	});


	describe('7. myFlatten (:,(; (}.="A")?,(myFlatten .(; )).|$).+$ ( ))$', () => {
	/*ts
		plainConcat					(+ ( ))$
		insertConcat				(:.+$)$
		embed						(:.+$ ( ))$
		pair						:,(; ;)
		concatZipBasic				(:,(; ;) ( ))$
		concatZip					(:,(; ;).+$ ( ))$
		concat						(:,(; .(; )).+$ ( ))$
		isArray						(}.="A")?
		undefinedDotIdentity		().;
		undefinedCommaIdentity		(() ()),(; ;)
		makeArrayIfNot				(}.="A")?,(; .(; ))
		undefinedDotArray			().(; )
		undefinedCommaArray			(() ),(.(; ) )
		flattenOrMakeArray			(}.="A")?,(flattenOrMakeArray .(; )).|$
		myFlatten					(:,(; (}.="A")?,(myFlatten .(; )).|$).+$ ( ))$
	*/
		it('(( ) +)$([[5, 6], [7, 8]]) eql [5, 6, 7, 8]', () => expect(plainConcat([[5, 6], [7, 8]])).eql([5, 6, 7, 8]));
		it('(:.+$)$([[2, 3], [4, 5]]) eql [2, 3, 4, 5]', () => expect(insertConcat([[2, 3], [4, 5]])).eql([2, 3, 4, 5]));
		it('(( ) :.+$)$([[1, 2], [3, 4]])', () => expect(embed([[1, 2], [3, 4]])).eql([1, 2, 3, 4]));
		it(':,(; ;)(2, 3) eql [2, 3]', () => expect(pair(2, 3)).eql([2, 3]));
		it('(:,(; ;) ( ))$([1, 2, 3] eql [[[[ ], 1], 2], 3]', () => expect(concatZipBasic([1, 2, 3])).eql([[[[ ], 1], 2], 3]));
		it('(:,(; ;).+$ ( ))$([[6, 5], [4, 3]]) eql [6, 5, 4, 3]', () => expect(concatZip([[6, 5], [4, 3]])).eql([6, 5, 4, 3]));
		it('(:,(; .(; )).+$ ( ))$([3, 4, 5]) eql [3, 4, 5]', () => expect(concat([1, 2, 3])).eql([1, 2, 3]));
		it('(}.="A")?(1) eql [undefined, 1]', () => expect(isArray(1)).eql([undefined, 1]));
		it('(}.="A")?([2, 3]) eql [[2, 3], undefined]', () => expect(isArray([2, 3])).eql([[2, 3], undefined]));
		it('().; eql undefined', () => expect(undefinedDotIdentity).eql(undefined));
		it('(() ()),(; ;) eql (() ())', () => expect(undefinedCommaIdentity).eql([undefined, undefined]));
		it('(}.="A")?,(; .(; ))(1) eql [undefined, [1]]', () => expect(makeArrayIfNot(1)).eql([undefined, [1]]));
		it("().(; ) eql undefined", () => expect(undefinedDotArray).eql(undefined));
		it('(() ),(.(; ) ) eql [undefined]', () => expect(undefinedCommaArray).eql([undefined]));
		it('(}.="A")?,(; .(; ))([1]) eql [[1], undefined]', () => expect(makeArrayIfNot([1])).eql([[1], undefined]));
		it('(}.="A")?,(flattenOrMakeArray .(; )).|$(1) eql [1]', () => expect(flattenOrMakeArray(1)).eql([1]));
		it('myFlatten([1, 2, 3]) eql [1, 2, 3]', () => expect(myFlatten([1, 2, 3])).eql([1, 2, 3]));
		it('myFlatten([[1]]) eql [1]', () => expect(myFlatten([[1]])).eql([1]));
		it('myFlatten([1, [2, 3], 4]) eql ([1, 2, 3, 4])', () => expect(myFlatten([1, [2, 3], 4])).eql([1, 2, 3, 4]));
		it('myFlatten(["a", ["b", ["c", "d"], "e"]]) eql ["a", "b", "c", "d", "e"]', () => expect(myFlatten(["a", ["b", ["c", "d"], "e"]])).eql(["a", "b", "c", "d", "e"]));
		it('myFlatten([]) eql []', () => expect(myFlatten([])).eql([]));
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

	describe("11. encodeModified encode.(([.=1)?,(] ;).|$)@", () => {
	/*ts
		encodeModified		encode.(([.=1)?,(] ;).|$)@
	*/
		it('encode.(([.=1)?,(] ;).|$)@("aaaabccaadeeee") eql [[4, "a"], "b", [2, "c"], [2, "a"], "d", [4, "e"]]', () => expect(encodeModified("aaaabccaadeeee")).eql([[4, "a"], "b", [2, "c"], [2, "a"], "d", [4, "e"]]));
	});

	describe('12. decodeModifiedString ((#.=2)?,(.(].` [).^$ .(; )).|$.""$)@.""$', () => {
	/*ts
		endAndConst						].`
		expandUnit						.(].` [).^$
		joinSingle						""$("b" )
		expand							((#.=2)?,(.(].` [).^$ .(; )).|$)@
		expandConcat					((#.=2)?,(.(].` [).^$ .(; )).|$.""$)@
		decodeModifiedString			((#.=2)?,(.(].` [).^$ .(; )).|$.""$)@.""$
	*/
		it('].`([2, 3])(4) eql 3', () => expect(endAndConst([2, 3])(4)).eql(3));
		it('.(].` [).^$([3, "a"]) eql ["a", "a", "a"]', () => expect(expandUnit([3, "a"])).eql(["a", "a", "a"]));
		it('""$("b" ) eql "b"', () => expect(joinSingle).eql("b"));
		it('((#.=2)?,(.(].` [).^$ .(; )).|$)@([[3, "a"], "b"]) eql [["a", "a", "a"], ["b"]]', () => expect(expand([[3, "a"], "b"])).eql([["a", "a", "a"], ["b"]]));
		it('((#.=2)?,(.(].` [).^$ .(; )).|$.""$)@([[3, "a"], "b"]) eql ["aaa", "b"]', () => expect(expandConcat([[3, "a"], "b"])).eql(["aaa", "b"]));
		it('((#.=2)?,(.(].` [).^$ .(; )).|$.""$)@.""$([[4, "a"], "b", [2, "c"], [2, "a"], "d", [4, "e"]]) eql "aaaabccaadeeee"', () => expect(decodeModifiedString([[4, "a"], "b", [2, "c"], [2, "a"], "d", [4, "e"]])).eql("aaaabccaadeeee"));
	});

	describe('14. dupli .(; ;).~.+$', () => {
	/*ts
		dupli				.(; ;).~.+$
	*/
		it('.(; ;).~.+$([1, 2, 3]) eql [1, 1, 2, 2, 3, 3]', () => expect(dupli([1, 2, 3])).eql([1, 1, 2, 2, 3, 3]));
	});

	describe('15. repli :.(].` [).^$.~.+$', () => {
	/*ts
		pipeIntoConst		.`
		twoThrees			(`3 2).^$
		twoFours			(2 4).(].` [).^$
		replicate			:.(].` [).^$
		repli				:.(].` [).^$.~.+$
		repliInPlace		2repli(1 2 3)
	*/
		it('.`(3)(4) eql 3', () => expect(pipeIntoConst(3)(4)).eql(3));
		it('(`3 2).^$ eql [3, 3]', () => expect(twoThrees).eql([3, 3]));
		it('(2 4).(].` [).^$ eql [4, 4]', () => expect(twoFours).eql([4, 4]));
		it(':.(].` [).^$(2, 3) eql [3, 3]', () => expect(replicate(2, 3)).eql([3, 3]));
		it('2repli(1 2 3) eql [1, 1, 2, 2, 3, 3]', () => expect(repliInPlace).eql([1, 1, 2, 2, 3, 3]));
		it('repli(3, [4, 5]) eql [4, 4, 4, 5, 5, 5]', () => expect(repli(3, [4, 5])).eql([4, 4, 4, 5, 5, 5]));
	});

	describe("16. dropEvery :.([.-1.% ,(.(; ) ;).%$).@$.[@.+$", () => {
	/*ts
		testMapApply			(*2 (1 2 3)).@$
		chunk					,(.(; ) ;).%$
		breakUp					:.(,(.(; ) ;).%$ )
		modifiedSplit			[.-1.%
		endSplit				[.%
		sum						2+3
		addTwo					2.+
		splitArray				2.%
		joinAndRecombine		:,(.(; ) ;).%$
		splitMinusTwo			~2%
		dropEvery				:.([.-1.% ,(.(; ) ;).%$).@$.[@.+$
	*/
		it('(*2 (1 2 3)).@$ eql [2, 4, 6]', () => expect(testMapApply).eql([2, 4, 6]));
		it(':.(,(.(; ) ;).%$ )(2, [1, 2, 3, 4, 5]) eql [[[1, 2], [3, 4], [5]]]', () => expect(breakUp(2, [1, 2, 3, 4, 5])).eql([[[1, 2], [3, 4], [5]]]));
		it('[.-1.%([2, 4])([4, 5, 6]) eql [[4], [5, 6]]', () => expect(modifiedSplit([2, 4])([4, 5, 6])).eql([[4], [5, 6]]));
		it('[.%([1, 2])([4, 5, 6]) eql [[4], [5, 6]]', () => expect(endSplit([1, 2])([4, 5, 6])).eql([[4], [5, 6]]));
		it('2+3 eql 5', () => expect(sum).eql(5));
		it('2.+(4) eql 6', () => expect(addTwo(4)).eql(6));
		it('2.%([1, 2, 3, 4, 5]) eql [[1, 2], [3, 4, 5]]', () => expect(splitArray([1, 2, 3, 4, 5])).eql([[1, 2], [3, 4, 5]]));
		it(':,(.(; ) ;).%$(2, [1, 2, 3, 4, 5]) eql [[1, 2], [3, 4], [5]]', () => expect(joinAndRecombine(2, [1, 2, 3, 4, 5])).eql([[1, 2], [3, 4], [5]]));
		it("~2split([1, 2, 3, 4, 5]) eql [[1, 2, 3], [4, 5]]", () => expect(splitMinusTwo([1, 2, 3, 4, 5])).eql([[1, 2, 3], [4, 5]]));
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

	describe("18. slice :,(.([ _.-$ `0) ;).%$.1'", () => {
	/*ts
		slice				:,(.([ _.-$ `0) ;).%$.1'
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

	describe("20. removeAt :,(.(; `1 `0) ;).%$.([ ]).+$", () => {
	/*ts
		removeAt			:,(.(; `1 `0) ;).%$.([ ]).+$
	*/
		it('removeAt(2, [1, 2, 3, 4, 5, 6]) eql [1, 2, 4, 5, 6]', () => expect(removeAt(2, [1, 2, 3, 4, 5, 6])).eql([1, 2, 4, 5, 6]));
		it('removeAt(1, "abcd") eql "acd"', () => expect(removeAt(1, "abcd")).eql("acd"));
	});

	describe("21. insertAt :.(.([.[ ]).%$ [.]).([.[ .(] ) [.]).+$", () => {
	/*ts
		splitUp						:.(.([.[ ]).%$ [.])
		insertAt					:.(.([.[ ]).%$ [.]).([.[ .(] ) [.]).+$
		insertAtString				:.(.([.[ ]).%$ [.]).([.[ ] [.]).+$
	*/
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

mocha.run();