const {expect} = chai;
import ts from "tacitscript";

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

export default () => {
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

		describe('7. myFlatten :.[.((}.="A" myFlatten0) .(; ))?@.((#.=0 ;) +$)?', () => {
		/*ts
			myFlatten					:.[.((}.="A" myFlatten0) .(; ))?@.((#.=0 ;) +$)?
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
};
