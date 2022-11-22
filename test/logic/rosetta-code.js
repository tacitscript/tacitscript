const {expect} = chai;
import ts from "tacitscript";

const reduce = reducer => startingValue => array => array.reduce(reducer, startingValue);

export default () => {
	describe("Rosetta Code", () => {
		describe("Strip comments from a string", () => {
		/*ts
			strip			%.[
		*/
			it('%.[("#", "hello # comment") eql "hello "', () => expect(strip("#", "hello # comment")).eql("hello "));
		});

		describe("Hash from two arrays", () => {
		/*ts
			hash				:.~
		*/
			it(":.~(['a', 'b', 'c'], [1, 2, 3]) eql [['a', 1], ['b', 2], ['c', 3]]", () => expect(hash(['a', 'b', 'c'], [1, 2, 3])).eql([['a', 1], ['b', 2], ['c', 3]]));
		});

		describe("flip tests", () => {
		/*ts
			flipDivide			~/
			flipLess			~<
			flipRight			~>
			flipMinus			~-
			flipQuestion		?,~
			flipMap				@,~
			flipInsert			~$
			flipAt				',~
			flipSplit			~%
			flipHat				^,~
		*/
			it("~^(3, x => x) eql [0, 1, 2]", () => expect(flipHat(3, x => x)).eql([0, 1, 2]));
			it("~%([1, 2, 3, 4, 5], 2) eql [[1, 2], [3, 4, 5]]", () => expect(flipSplit([1, 2, 3, 4, 5], 2)).eql([[1, 2], [3, 4, 5]]));
			it("~'([1, 2, 3], 1) eql 2", () => expect(flipAt([1, 2, 3], 1)).eql(2));
			it("~$([1, 2, 3], (x, y) => x + y) eql 6", () => expect(flipInsert([1, 2, 3], (x, y) => x + y)).eql(6));
			it("~@([1, 2, 3], x => x * 2) eql [2, 4, 6]", () => expect(flipMap([1, 2, 3], x => x * 2)).eql([2, 4, 6]));
			it("~?(2, [[x => x > 3, () => 1], () => 2]) eql 2", () => expect(flipQuestion(2, [[x => x > 3, () => 1], () => 2])).eql(2));
			it("~/(2, 10) eql 5", () => expect(flipDivide(2, 10)).eql(5));
			it("~<(2, 10) eql false", () => expect(flipLess(2, 10)).eql(false));
			it("~>(2, 10) eql true", () => expect(flipRight(2, 10)).eql(true));
			it("~-(2, 10) eql 8", () => expect(flipMinus(2, 10)).eql(8));
		});
		
		describe("Factors of an integer", () => {
		/*ts
			divides				.(/ /2.{"Math.floor".+1^).@$.(%1.=0)*
			inverted			.(/ divides).@$
			factors				.(inverted .(; )).+$
		*/
			it("inverted(24) eql [1, 2, 3, 4, 6, 8, 12]", () => expect(inverted(24)).eql([1, 2, 3, 4, 6, 8, 12]));
			it('.(/ /2.{"Math.floor".-1.+1^).@$.(%1.=0)*(24) eql [24, 12, 8, 6, 4, 3, 2]', () => expect(divides(24)).eql([24, 12, 8, 6, 4, 3, 2]));
			it("factors(24) eql [1, 2, 3, 4, 6, 8, 12, 24]", () => expect(factors(24)).eql([1, 2, 3, 4, 6, 8, 12, 24]));
			it("factors(11) eql [1, 11]", () => expect(factors(11)).eql([1, 11]));
		});

		describe("Create a two-dimensional array at runtime", () => {
		/*ts
			generate			:._,(0`^.(` ).[ ;).^$
		*/
			it("generate(3, 2) eql [[0, 0], [0, 0], [0, 0]]", () => expect(generate(3, 2)).eql([[0, 0], [0, 0], [0, 0]]));
		});

		describe("Binary digits", () => {
		/*ts
			binaryDigits		.((].[.>0 ].[.(/2.{"Math.floor" %2))` .(.(; ) )).^$.1%.].]@._.("" )+.+$
		*/
			it(`binaryDigits(5) eql "101"`, () => expect(binaryDigits(5)).eql("101"));
			it(`binaryDigits(50) eql "110010"`, () => expect(binaryDigits(50)).eql("110010"));
			it(`binaryDigits(9000) eql "10001100101000"`, () => expect(binaryDigits(9000)).eql("10001100101000"));
		});
		
		describe("Zero to the zero power", () => {
		/*ts
			calculation			0^0
		*/
			it("0^0 eql 1", () => expect(calculation).eql(1));
		});

		describe("Tokenize a string", () => {
		/*ts
			tokenize			","%."."$
		*/
			it(`tokenize("Hello,How,Are,You,Today") eql "Hello.How.Are.You.Today`, () => expect(tokenize("Hello,How,Are,You,Today")).eql("Hello.How.Are.You.Today"));
		});

		describe("Substring", () => {
		/*ts
			indexOfSubstring	%.((#.=1 ()`) [.#)?
			substring			:.(.([.2%.[ ]).%$.1'
								.([.[ ]).%$.]
								.(_1` ]).%$.[
								.(.(.([.2' ]).indexOfSubstring$ [.1') ]).%$.1'
								.(.(.([.3' ]).indexOfSubstring$ [.1') ]).%$.1')
		*/
			it(`indexOfSubstring("d", "abcdefgh") eql 3`, () => expect(indexOfSubstring("d", "abcdefgh")).eql(3));
			it(`substring([2, 4, "d", "bc"], "abcdefgh") eql ["cdef", "cdefgh", "abcdefg", "defg", "bcde"]`, () => expect(substring([2, 4, "d", "bc"], "abcdefgh")).eql(["cdef", "cdefgh", "abcdefg", "defg", "bcde"]));
			it('indexOfSubstring("ab", "babababa") eql 1', () => expect(indexOfSubstring("ab", "babababa")).eql(1));
			//it('indexOfSubstring("cab", "babababa") eql undefined', () => expect(indexOfSubstring("cab", "babababa")).eql(undefined));
		});

		// describe("String matching", () => {
		// /*ts
		// 	match				:._.%$.([.#.=0 (#.=1)?,(`() .(`(!()) [.# #.>2)).|$ (].#.=0)?,(`(!()) `()).|$)
		// */
		// 	it('match("abcdef", "abc") eql [true, [true, 0, false], false]', () => expect(match("abcdef", "abc")).eql([true, [true, 0, false], false]));
		// 	it('match("bababa", "ab") eql [false, [true, 1, true], false]', () => expect(match("bababa", "ab")).eql([false, [true, 1, true], false]));
		// 	it('match("abcdef", "def") eql [false, [true, 3, false], true]', () => expect(match("abcdef", "def")).eql([false, [true, 3, false], true]));
		// });
		describe("String interpolation (included)", () => {
		/*ts
			interpolate			:,(; "X"%).$$
		*/
			it(`:,(; "X"%).$$("little", "Mary had a X lamb") eql "Mary had a little lamb"`, () => expect(interpolate("little", "Mary had a X lamb")).eql("Mary had a little lamb"));
		});

		describe("Split a character string based on change of character", () => {
		/*ts
			split				!=%.", "$
		*/
			it(`!=%.", "$("gHHH5YY++///\\") eql "g, HHH, 5, YY, ++, ///, \\"`, () => expect(split("gHHH5YY++///\\")).eql("g, HHH, 5, YY, ++, ///, \\"));
		});

		describe("RPG attributes generator", () => {
		/*ts
			generate			.(({"Math.random".*6.{"Math.floor".+1)` 4`).^$
			sumLargest			generate.;<.1%.].+$
			getSet				.(sumLargest` 6`).^$
			isSetValid			.(+$.>75 ((>15 1`) 0`)?@.+$.>2).&$
			finalSet			(].!isSetValid getSet)^((1 ) ),]
		*/
			it(`${JSON.stringify(finalSet)}: six numbers are generated`, () => expect(finalSet.length).eql(6));
			it(`${JSON.stringify(finalSet)}: the sum of the numbers is greater than 75`, () => expect(reduce((acc, x) => acc + x)(0)(finalSet) > 75).eql(true));
			it(`${JSON.stringify(finalSet)}: at least two of the numbers are greater than 15`, () => expect(reduce((acc, x) => (x > 15) ? (acc + 1) : acc)(0)(finalSet) > 2).eql(true));
		});

		describe("Nth root", () => {
		/*ts
			intermediate		:.(,(^,~,(#.) >).(.$) #`).^( ).#
			floorInteger		.(,(^,~,(#.) >).(.$) #`).^( ).#.-1
			nthRoot				:.(floorInteger [).([ .([ .(] ,(; -1).^$).*$)./$).+$
		*/
			it(":.(.(,(~^,(#.) >).(.$) #`).^( ).#.-1 [).([ .([ .(] ,(; -1).^$).*$)./$).+$(5, 34) eql 2.025", () => expect(nthRoot(5, 34)).eql(2.025));
			it(":.(,(~^,(#.) >).(.$) #`).^( ).#(5, 34) eql 3", () => expect(intermediate(5, 34)).eql(3));
		});

		describe("Loops/While", () => {
		/*ts
			calculation			(].>0 ]./2.{"Math.floor")^(1024 )
		*/
			it(`(].>0 ]./2.{"Math.floor")^(1024 ) eql [1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0]`, () => expect(calculation).eql([1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0]));
		});

		describe("Loops/For", () => {
		/*ts
			calculation			(+1."*"`^.""$)^5
		*/
			it('(+1."*"`^.""$)^5 eql ["*", "**", "***", "****", "*****"]', () => expect(calculation).eql(["*", "**", "***", "****", "*****"]));
		});

		describe("Loops/Downward for", () => {
		/*ts
			calculation			(].!=0 ].-1)^(10 )
		*/
			it("(].!=0 ].-1)^(10 ) eql [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]", () => expect(calculation).eql([10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]));
		});

		describe("Loops/Do-while", () => {
		/*ts
			calculation			((].%6.!=0)|(#.=1) ].+1)^(0 )
		*/
			it("((].%6.!=0)|(#.=1) ].+1)^(0 ) eql [0, 1, 2, 3, 4, 5, 6]", () => expect(calculation).eql([0, 1 ,2 ,3 ,4 ,5 ,6]));
		});

		describe("Logical operations", () => {
		/*ts
			logical				:.(&$ |$ [.!)
			calculation			!()logical()
		*/
			it("!()(:.(&$ |$ [.!))() eql [false, true, false]", () => expect(calculation).eql([false, true, false]));
		});

		describe("Integer comparison", () => {
		/*ts
			comparison			((<$ "less"`) (=$ "equal"`) "greater"`)?
			calculation			comparison@((1 2) (2 2) (2 1))
		*/
			it('((<$ "less"`) (=$ "equal"`) "greater"`)?@((1 2) (2 2) (2 1)) eql ["less", "equal", "greater"]', () => expect(calculation).eql(["less", "equal", "greater"]));
		});

		describe("Increment a numerical string", () => {
		/*ts
			increment			0+.+1.""+
			calculation			increment"22.5"
		*/
			it(`(0+.+1.""+)"22.5" eql "23.5"`, () => expect(calculation).eql("23.5"));
		});

		describe("Formatted numeric output", () => {
		/*ts
			fixed				:,(; ""+.(; #)).(.([ ].]).-$.0`^.""$ ].[).+$
			calculation			9fixed7.125
			fixedB				:.([._ ,(0`^.""$ ""+).+$).%$.]
		*/
			it('9(:,(; ""+.(; #)).(.([ ].]).-$.0`^.""$ ].[).+$)7.125 eql "00007.125"', () => expect(calculation).eql("00007.125"));
			it(':.([._ ,(0`^.""$ ""+).+$).%$.](9, 7.125) eql "00007.125"', () => expect(fixedB(9, 7.125)).eql("00007.125"));
		});

		describe("FizzBuzz", () => {
		/*ts
			fizzBuzz			+1^100,(((%3.=0)&(%5.=0) "FizzBuzz"`) (%3.=0 "Fizz"`) (%5.=0 "Buzz"`) ;)?@
		*/
			it('+1^100,((%3.=0)&(%5.=0) "FizzBuzz"`) (%3.=0 "Fizz"`) (%5.=0 "Buzz"`) ;)?@ eql [1,2,"Fizz",4,"Buzz","Fizz",7,8,"Fizz","Buzz",11,"Fizz",13,14,"FizzBuzz",16,17,"Fizz",19,"Buzz","Fizz",22,23,"Fizz","Buzz",26,"Fizz",28,29,"FizzBuzz",31,32,"Fizz",34,"Buzz","Fizz",37,38,"Fizz","Buzz",41,"Fizz",43,44,"FizzBuzz",46,47,"Fizz",49,"Buzz","Fizz",52,53,"Fizz","Buzz",56,"Fizz",58,59,"FizzBuzz",61,62,"Fizz",64,"Buzz","Fizz",67,68,"Fizz","Buzz",71,"Fizz",73,74,"FizzBuzz",76,77,"Fizz",79,"Buzz","Fizz",82,83,"Fizz","Buzz",86,"Fizz",88,89,"FizzBuzz",91,92,"Fizz",94,"Buzz","Fizz",97,98,"Fizz","Buzz"]',
				() => expect(fizzBuzz).eql([1,2,"Fizz",4,"Buzz","Fizz",7,8,"Fizz","Buzz",11,"Fizz",13,14,"FizzBuzz",16,17,"Fizz",19,"Buzz","Fizz",22,23,"Fizz","Buzz",26,"Fizz",28,29,"FizzBuzz",31,32,"Fizz",34,"Buzz","Fizz",37,38,"Fizz","Buzz",41,"Fizz",43,44,"FizzBuzz",46,47,"Fizz",49,"Buzz","Fizz",52,53,"Fizz","Buzz",56,"Fizz",58,59,"FizzBuzz",61,62,"Fizz",64,"Buzz","Fizz",67,68,"Fizz","Buzz",71,"Fizz",73,74,"FizzBuzz",76,77,"Fizz",79,"Buzz","Fizz",82,83,"Fizz","Buzz",86,"Fizz",88,89,"FizzBuzz",91,92,"Fizz",94,"Buzz","Fizz",97,98,"Fizz","Buzz"]));
		});

		describe("Arithmetic/Integer", () => {
		/*ts
			fn					:.(+$ -$ *$ /$.({"Math.floor") %$ ^$)
			calculation			3fn2
		*/
			it(`3(:.(+$ -$ *$ /$.({"Math.floor") %$ ^$))2 eql [5, 1, 6, 1, 1, 9]`, () => expect(calculation).eql([5, 1, 6, 1, 1, 9]));
		});
	});
};
