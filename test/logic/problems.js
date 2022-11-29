const {expect} = chai;
import ts from "tacitscript";
import words from "../data/words.js";

export default () => {
	describe("51. Dungeons and Dragons Dice", () => {
		const lookup = [
			["1d2",[1.5,0.5]],["1d4",[2.5,1.118033988749895]],["1d6",[3.5,1.707825127659933]],["1d8",[4.5,2.29128784747792]],["1d10",[5.5,2.8722813232690143]],["1d12",[6.5,3.452052529534663]],
			["2d2",[3,0.7071067811865476]],["2d4",[5,1.5811388300841898]],["2d6",[7,2.41522945769824]],["2d8",[9,3.24037034920393]],["2d10",[11,4.06201920231798]],["2d12",[13,4.881939505292269]],
			["3d2",[4.5,0.8660254037844386]],["3d4",[7.5,1.9364916731037085]],["3d6",[10.5,2.958039891549808]],["3d8",[13.5,3.968626966596886]],["3d10",[16.5,4.9749371855331]],["3d12",[19.5,5.979130371550699]],
			["4d2",[6,1]],["4d4",[10,2.23606797749979]],["4d6",[14,3.415650255319866]],["4d8",[18,4.58257569495584]],["4d10",[22,5.744562646538029]],["4d12",[26,6.904105059069326]],
			["5d2",[7.5,1.118033988749895]],["5d4",[12.5,2.5]],["5d6",[17.5,3.8188130791298667]],["5d8",[22.5,5.123475382979799]],["5d10",[27.5,6.422616289332565]],["5d12",[32.5,7.7190241179396075]],
		];
	/*ts
		no				+5^1
		dice			(+1.*2)^6
		noComb			#@.*$
		toPath			.(#.;^ ;).~
		iterate			:.(].].[ _,(#.-1 ;).'$.(~/.[ ~%).(;.)).(,$)
		leftPad			:.(.([ ].#).-$.0`^ ]).+$
		expand			:.([.[ ,(].((].[.>0)` iterate) .(.(; 0`) )).^$.1%.]._.]@).leftPad$
		indices			.(.(# #@._).(expand ).[ noComb.;^).@$.toPath@.{
		combinations	.(#.(; ) .(, indices.'@).@$).%$
		mean			.(+$ #)./$
		std				.(.(mean._1*.+ ;).@$.^2@.+$ #)./$.^0.5
		dist			:._,(+1^.(` ).[ ;).^$.combinations.+$@
		//lookup			(no dice),combinations.("d"$@ (dist$.(mean std))@),~
		diff			.(.([ ].]).~.(-$.#)@.+$ ].[)
		closest			.(.(.(mean std).(` ).[ (lookup,#)`).^$ lookup`).~.diff@.[<.[.]
		solution		"\n"%.(" "%.0+@.closest)@." "$
		result			solution"2 1 2 1 1 2 2 1 1 1 1 2 2 2 1 2 1 2 1 2 2 1 2 2 1 2 2 2 1 2 2 2 1 1 2 1 2 2 2 2 2 2 2 2 1 1 2 2 2 2 1 1 1 2 2 1 2 1 1 2 1 2 2 2 2 1 1 2 1 2 2 1 1 2 2 2 2 1 2 1 1 2 2 1 2 1 2 1 2 2 1 2 2 2 1 2 1 1 1 1
2 3 1 1 2 4 2 4 2 3 4 4 1 3 1 4 4 4 4 1 3 3 4 1 1 1 3 3 2 3 4 4 1 1 4 3 4 2 3 2 4 2 2 4 4 2 4 4 2 3 1 1 2 1 1 2 1 4 1 3 2 1 3 3 1 2 1 1 3 4 2 3 1 3 2 1 1 1 1 2 4 2 2 1 2 3 3 3 2 3 2 4 3 4 2 3 2 3 4 1
10 9 7 8 6 7 6 10 9 10 7 5 6 7 8 9 6 10 10 7 11 4 5 6 6 5 8 6 6 9 5 9 10 8 9 8 8 4 4 8 11 7 5 6 5 7 11 12 4 10 10 9 8 5 10 5 4 3 4 9 5 8 7 9 7 7 6 7 8 9 7 8 4 11 10 7 7 8 10 7 7 7 8 7 8 8 4 9 6 8 7 6 4 7 6 6 7 8 9 8"
	*/
		it("closest test", () => expect(closest([2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 1, 1, 1])).eql("1d2"));
		it("solved", () => expect(result).eql("1d2 1d4 3d4"));
		it("diff test", () => expect(diff([[4, 3], ["3d4", [5, 2]]])).eql([2, "3d4"]));
		it("dist test", () => expect(dist(2, 3)).eql([2, 3, 4, 3, 4, 5, 4, 5, 6]));
		it("std test", () => expect(std([1, 2, 3, 4, 5])).to.be.closeTo(1.414, 0.001));
		it("mean test", () => expect(mean([1, 2, 3, 4, 5])).eql(3));
		it("combinations test", () => expect(combinations([[1, 2], [1, 2]])).eql([[1, 1], [1, 2], [2, 1], [2, 2]]));
		it("iterate test", () => expect(iterate([2, 2], [[10, 0]])).eql([5, 0]));
	});

	describe("97. Girls and Pigs", () => {
	/*ts
		possNoOfPigs	.(_.-$./2.>.(].) (].+1)`).^(1 )
		girls			.([.[ ].*4).-$./2
		n				,(_.-$ *2)./$.+2
		isPosInteger	.(>0 .(; 0').=$).&$
		filter			:.(n girls).isPosInteger@.&$
		solutions		.(filter possNoOfPigs).*$.#
		solution		(2 )%.solutions@." "$
		result			solution(6 10
26 136
106 336
200 500)
	*/
		it("solved", () => expect(result).eql("1 2 3 9"));
		it("filter test", () => expect(filter([6, 10], 2)).eql(false));
		it("filter test 2", () => expect(filter([6, 10], 1)).eql(true));
		it("girls test", () => expect(girls([[6, 10], 2])).eql(-1));
		it("possNoOfPigs test", () => expect(possNoOfPigs([6, 10])).eql([1, 2]));
	});

	describe("135. Variable Length Code", () => {
	/*ts
		table			\((" " "11") ("t" "1001") ("n" "10000") ("s" "0101") ("r" "01000") ("d" "00101") ("!" "001000")
						("c" "000101") ("m" "000011") ("g" "0000100") ("b" "0000010") ("v" "00000001") ("k" "0000000001") ("q" "000000000001")
						("e" "101") ("o" "10001") ("a" "011") ("i" "01001") ("h" "0011") ("l" "001001") ("u" "00011")
						("f" "000100") ("p" "0000101") ("w" "0000011") ("y" "0000001") ("j" "000000001") ("x" "00000000001") ("z" "000000000000"))
		hex				""%"0123456789ABCDEF"
		padRight		:.(] ,(; #).-$.((=0 ""`) "0"`^.+$)?).+$
		charToHex		_.""%.(0+@ #.2^^).~.*$@.+$.'hex
		byteToHex		(4 )%.charToHex@.+$
		solution		""%.'table@.+$.(8 )%.(8padRight.byteToHex)@." "$
		result			solution"entertaining interpreter"
	*/
		it("solved", () => expect(result).eql("B0 9A 89 69 82 60 13 4C 26 A0 2A 2C D4 00"));
		it("byteToHex test", () => expect(byteToHex("00101010")).eql("2A"));
		it("charToHex test", () => expect(charToHex("1010")).eql("A"));
		it("padRight test", () => expect(padRight(8, "123")).eql("12300000"));
	});

	describe("105. Convex Polygon Area", () => {
	/*ts
		semiPerimeter	+$./2
		area			.(.(semiPerimeter ) ;).+$.([ .([ 1').-$ .([ 2').-$ .([ ]).-$).*$.^0.5
		length			~.(-$.^2)@.+$.^0.5
		abc				(2 )%.(2%.[.length 1%.].length .([ ]).length)

		indices			-2.;^.(.(0` +1 +2))@
		extract			:._,(, '@).@$
		sextets			.(, #.indices.extract@).@$.+$@
		solution		(2 )%.sextets.(abc.area)@.+$
		result			solution(51 9
77 10
92 71
62 84
29 94)
	*/
		it("solved", () => expect(result).eql(3274.5));
		it("sextets test", () => expect(sextets([[0, 1], [2, 3], [4, 5], [6, 7], [8, 9]])).eql([[0, 1, 2, 3, 4, 5], [0, 1, 4, 5, 6, 7], [0, 1, 6, 7, 8, 9]]));
		it("extract test", () => expect(extract([0, 2, 3], [[0, 1], [2, 3], [4, 5], [6, 7]])).eql([[0, 1], [4, 5], [6, 7]]));
		it("indices test", () => expect(indices(5)).eql([[0, 1, 2], [0, 2, 3], [0, 3, 4]]));
	});

	describe("73. Hexagonal Grid", () => {
	/*ts
		angle			60/180*({"Math.PI")
		x				angle,{"Math.cos"
		y				angle,{"Math.sin"
		move			\(("A" (1 0)) ("B" (x y)) ("C" (_x y)) ("D" (_1 0)) ("E" (_x _y)) ("F" (x _y)))
		dist			^2@.+$.^0.5
		line			""%.'move@.~.+$@.dist.8'
		solution		"\n"%.line@." "$
		result			solution"AABF
FEDCBA
BCB"
	*/
		it("solved", () => expect(result).eql("3 0 2.64575131"));
	});

	describe("172. Cloud Altitude Measurement", () => {
	/*ts
		pi				{"Math.PI"
		tan				/180.*pi.{"Math.tan"
		numerator		2%.[.*$
		denominator		.(1` 1%.]./$).-$
		h				,(; tan tan).(numerator denominator)./$
		solution		(3 )%.(h.0')@." "$
		result			solution(1859 23.7740 53.8740
1721 34.2290 68.1863
1512 26.0048 53.1380)
	*/
		it("solved", () => expect(result).eql("1207 1609 1163"));
	});

	describe("54. Pythagorean Triples", () => {
	/*ts
		b				.(.([.^2 *$.2*).-$ -$.*2)./$
		c				.([ ] b).-$
		isValid			b.(; 0').-$.#.<(10^(_8))
		iterate			!isValid^(((1 ) +1)>)
		cSquared		.(; 1`).iterate.c.^2
		solution		cSquared@." "$
		result			solution(12
30)
	*/
		it("solved", () => expect(result).eql("25 169"));
		it("cSquared test", () => expect(cSquared(12)).eql(25));
		it("isValid test", () => expect(isValid([12, 3])).eql(true));
		it("b test", () => expect(b([12, 3])).eql(4));
		it("c test", () => expect(c([12, 3])).eql(5));
	});

	describe("156. Luhn Algorithm", () => {
	/*ts
		multiplier		((%2.=0 1`) 2`)?^16
		isValid			_.""%.0+@.(:multiplier ).[.~.(*$.((>9 -9) ;)?)@.+$.%10.=0
		swapDigit		(.("?"` ""+).@)^10
		replace			.(, swapDigit`).@$.isValid'
		flip			:,(.(; 2` 0`) ;).%$,(; _ ;).+$
		flipDigits		(.(flip ).[)^16
		swap			.(, flipDigits`).@$.isValid'
		hasMissing		"?"%.#.>1
		processed		((hasMissing replace) swap)?
		solution		"\n"%.processed@." "$
		result			solution"?942682966937054
1217400151414995
2146133934?67114
2553514623364925"
	*/
		it("solved", () => expect(result).eql("3942682966937054 1217040151414995 2146133934667114 2553514623369425"));
		it("swap test", () => expect(swap("2553514623364925")).eql("2553514623369425"));
		it("isValid test", () => expect(isValid("1217400151414995")).eql(false));
		it("replace test", () => expect(replace("2146133934?67114")).eql("2146133934667114"));
		it("flip test", () => expect(flip(4, "12345678")).eql("12346578"));
	});

	describe("80. Duel Chances", () => {
	/*ts
		chance			/100@.([ 1-@.*$.1-.1/).*$.100*.0'
		solution		(2 )%.chance@." "$
		result			solution(30 50
20 15)
	*/
		it("solved", () => expect(result).eql("46 63"));
	});

	describe("74. Clock Hands", () => {
	/*ts
		pi				{"Math.PI"
		sin				{"Math.sin"
		cos				{"Math.cos"
		hours			,(%12.*pi./6 /360.*pi).+$.(sin.*6.+10 cos.*6.+10)
		minutes			]./30.*pi.(sin.*9.+10 cos.*9.+10)
		positions		":"%.0+@.(hours minutes).+$
		solution		" "%.positions@.+$." "$
		result			solution"12:00 15:00 09:30"
	*/
		it("solved", () => expect(result).eql("10 16 10 19 16 10 10 19 4.20444504226559 11.552914270615123 10.000000000000002 1"));
	});

	describe("36. Code Guesser", () => {
	/*ts
		leftPad			:,(; ""+).(.([ ].#).-$."0"`^.""$ ]).+$
		noSame			:.(4leftPad.""%)@.~.((=$ 1`) 0`)?@.+$
		match			:.(.([.[ ]).noSame$ [.]).=$
		isSolved		(2 )%.match@.&$
		solution		.(isSolved.! +1`).^$.(0,).4leftPad
		result			solution(402 1
390 1
816 3
848 3
777 1
815 2)
	*/
		it("solved", () => expect(result).eql("0846"));
		it("isSolved test", () => expect(isSolved([402, 1, 390, 1])(846)).eql(true));
		it("noSame test", () => expect(noSame(816, 846)).eql(3));
		it("match test", () => expect(match([848, 3], 846)).eql(true));
	});

	describe("134. Flying Text Screensaver", () => {
	/*ts
		boundLeft		(([.[.<0 ((0 0) 1`)>.((2 0) _1*)>) ;)?
		boundTop		(([.].<0 ((0 1) 1`)>.((2 1) _1*)>) ;)?
		boundRight		((.([.[ 1'.[).=$ ((0 0) -2)>.((2 0) _1*)>) ;)?
		boundBottom		((.([.] 1'.]).=$ ((0 1) -2)>.((2 1) _1*)>) ;)?
		bound			boundLeft.boundTop.boundRight.boundBottom.([ ])
		nextPosAndDir	:.(].~.+$@ [.(.([ ]).-$.+1 1') ].]).bound
		next			nextPosAndDir,(].)
		start			(((0 0) (1 1)) )
		whileCond		#.<101
		solution		.(.(whileCond` next) start`).^$.[@.+$." "$
		result			solution(9 3 4)
	*/
		it("solved", () => expect(result).eql("0 0 1 1 2 2 3 1 4 0 5 1 4 2 3 1 2 0 1 1 0 2 1 1 2 0 3 1 4 2 5 1 4 0 3 1 2 2 1 1 0 0 1 1 2 2 3 1 4 0 5 1 4 2 3 1 2 0 1 1 0 2 1 1 2 0 3 1 4 2 5 1 4 0 3 1 2 2 1 1 0 0 1 1 2 2 3 1 4 0 5 1 4 2 3 1 2 0 1 1 0 2 1 1 2 0 3 1 4 2 5 1 4 0 3 1 2 2 1 1 0 0 1 1 2 2 3 1 4 0 5 1 4 2 3 1 2 0 1 1 0 2 1 1 2 0 3 1 4 2 5 1 4 0 3 1 2 2 1 1 0 0 1 1 2 2 3 1 4 0 5 1 4 2 3 1 2 0 1 1 0 2 1 1 2 0 3 1 4 2 5 1 4 0 3 1 2 2 1 1 0 0"));
		it("nextPosAndDir test", () => expect(nextPosAndDir([5, 6, 3], [[0, 0], [1, 1]])).eql([[1, 1], [1, 1]]));
		it("bound test 1", () => expect(bound([[-1, -1], [5, 5], [-1, -1]])).eql([[1, 1], [1, 1]]));
		it("bound test 2", () => expect(bound([[-1, 5], [5, 5], [-1, 1]])).eql([[1, 3], [1, -1]]));
		it("bound test 3", () => expect(bound([[5, -1], [5, 5], [1, -1]])).eql([[3, 1], [-1, 1]]));
		it("bound test 4", () => expect(bound([[5, 5], [5, 5], [1, 1]])).eql([[3, 3], [-1, -1]]));
		it("nextPosAndDir test 2", () => expect(nextPosAndDir([9, 3, 4], [[2, 2], [1, 1]])).eql([[3, 1], [1, -1]]));
});

	describe("127. Anagrams 2", () => {
		const wordArray = words.split("\n").map(word => word.split("").sort().join(""));
		const dict = {};
		wordArray.forEach(word => dict[word] = (count => count ? count + 1 : 1)(dict[word]));
	
	/*ts
		//dict			wordArray,(""%.;<.""$)@,;/,\,((1 ) #)>@,\
		anagrams		""%.;<.""$.'dict.-1
		solution		"\n"%.anagrams@." "$
		result			solution"bat
coal
lots"
	*/
		it("solved", () => expect(result).eql("1 1 2"));
	});

	describe("127. Anagrams", () => {
		const wordArray = words.split("\n");
		const dictionary = {};
		for (var i = 0; i < wordArray.length; i++) dictionary[wordArray[i]] = true;

	/*ts
		perms			:.[.(:._.((].#.=1 ]) .('$.+ ,(:1 ;).-$.perms0).@$)? #.;^).@$.{
		anagrams		perms0.'dictionary@.;*.#
		solution		"\n"%.(anagrams.-1)@." "$
		result			solution"bat
coal
lots"
	*/
		it("solved", () => expect(result).eql("1 1 2"));
		it('perms("ba") eql ["ba", "ab"]', () => expect(perms("ba")).eql(["ba", "ab"]));
		//it('perms("abc") eql ["abc", "acb", "bac", "bca", "cab", "cba"]', () => expect(perms("abc")).eql(["abc", "acb", "bac", "bca", "cab", "cba"]));

	//		var temp;
	/*ts
		// expand			:,(.(; 1` 0`) ;).%$.(1'.(+ ).[ .([ ]).+$.(; )).@$
		// permute			((#.=1 ;) .(expand,~ #.;^).@$.{@.+$)?
		// permutations	;^.permute
	*/
		// temp = permute;
		// it("permutations test", () => expect(permutations(2)).eql([[0, 1], [1, 0]]));
	});

	describe("171. Tree Height Measurement", () => {
	/*ts
		pi				{"Math.PI"
		height			,([ -90.*pi./180.{"Math.tan").*$.0'
		solution		(2 )%.height@." "$
		result			solution(71 134.182
47 139.994
121 109.983)
	*/
		it("solved", () => expect(result).eql("69 56 44"))
	});

	describe("121. Insertion Sort", () => {
	/*ts
		index				:,(< ;).?$
		splice				:.(([.[.! .(] .([.] )).+$) .(.([.[ ]).%$ [.]).([.[ .(] ) [.]).+$)?
		noShifted			:.(].# .(index$ ].#).|$).-$
		inserted			.(.(.(] [.[).index$ ]) [.[).splice$
		shifted				.([.] .(.(] [.[).noShifted$ )).+$
		pass				:.(inserted shifted)
		solution			1%,(.(pass` :( )) ;).$$.]." "$
		result				solution(3 1 2 5)
	*/
		it("pass test", () => expect(pass([[3], []], 1)).eql([[1, 3], [1]]));
		it("pass test 2", () => expect(pass([[1, 3], [1]], 2)).eql([[1, 2, 3], [1, 1]]));
		it("solved", () => expect(result).eql("1 1 0"))
		it("noShifted test", () => expect(noShifted(2, [1, 1, 2, 3])).eql(1));
		it("splice test 1", () => expect(splice([1, 2], [4, 5, 6])).eql([4, 2, 5, 6]));
		it("splice test 2", () => expect(splice([undefined, 2], [4, 5, 6])).eql([4, 5, 6, 2]));
		it("index test 1", () => expect(index(2, [1, 1, 2, 3])).eql(3));
		it("index test 2", () => expect(index(3, [1, 1, 2, 3])).eql(undefined));
		it("index test 3", () => expect(index(4, [1, 1, 2, 3])).eql(undefined));
		it("index test 4", () => expect(index(0, [1, 1, 2, 3])).eql(0));
		it("index test 5", () => expect(index(1, [1, 1, 2, 3])).eql(2));
	});

	describe("75. Yacht or Dice Poker", () => {
	/*ts
		any					*.#.>0
		isBigStraight		=(2 3 4 5 6)
		isSmallStraight		=(1 2 3 4 5)
		isYacht				#.=1
		isFour				(#.=4)any
		isFullHouse			.(#.=2 (#.=3)any).&$
		isTwoPairs			.(#.=3 (#.=2)any).&$
		isThree				(#.=3)any
		isPair				(#.=2)any
		split				!=%.((isYacht "yacht"`) (isFour "four"`) (isFullHouse "full-house"`) (isTwoPairs "two-pairs"`) (isThree "three"`) (isPair "pair"`) "none"`)?
		type				;<.((isBigStraight "big-straight"`) (isSmallStraight "small-straight"`) split)?
		solution			(5 )%.type@." "$
		result				solution(3 6 5 6 1
1 6 6 1 6
2 4 3 5 1)
	*/
		it("solved", () => expect(result).eql("pair full-house small-straight"));
	});

	describe("39. Share Price Volatility", () => {
	/*ts
		mean			.(+$ #)./$
		std				.(mean.-.:(#.^2).(.$) ;).@$.mean.^0.5
		buy				.(std mean.*0.04).>$
		process			" "%.1%,(; 0+@.buy)
		solution		"\n"%.process@.]*.([.[)@." "$
		result			solution"JOOG 99 99 99 99 99 99 99 101 101 101 101 101 101 101
GOLD 95 105 95 105 95 105 95 105 95 105 95 105 95 105"
	*/
		it("solved", () => expect(result).eql("GOLD"));
		it("std test", () => expect(Math.round(std([2500, 250, 250]))).eql(1061));
	});

	describe("62. Prime Ranges", () => {
	/*ts
		maxPrime		50
		primes			{"(() => {
			// i couldn't get my ts non-destructive algorithms to be performant enough
			let A = [];
			for (var n = 0; n < maxPrime; n += 1) A.push(n);
			let limit = Math.floor(Math.sqrt(maxPrime));
			for (var i = 2; i < limit; i += 1) {
				if (A[i]) {
					var start = i * i;
					for (var j = start; j < maxPrime; j += i) A[j] = 0;
				}
			}
			let result = [];
			for (var m = 2; m < maxPrime; m++) {
				var value = A[m];
				if (value) result.push(value);
			}
			return result;
		})()"
		increment		[.((1 ) +1)>
		isInside		.(] [.[,(<|= >|=).&$).(,$)
		check			:.((isInside increment) [)?
		inclusive		:0.(check` ;).$primes.]
		solution		(2 )%.inclusive@." "$
		result			solution(5 19
11 29
2 23)
	*/
		it("increment test", () => expect(increment([[[5, 19], 0], 17])).eql([[5, 19], 1]));
		it("isInside test", () => expect(isInside([[[5, 19], 0], 17])).eql(true));
		it("solved", () => expect(result).eql("6 6 9"));
	});

	describe("72. Funny Words Generator", () => {
	/*ts
		check			].+1.>.(#.)
		iterate			.([.* 1'.+ 2'.~%).(.$).(].)
		random			.(.(check iterate) .(3' )).^$.1%.]
		params			(445 700001 2097152)
		randoms			:.params:.+$.random
		consonants		""%"bcdfghjklmnprstvwxz"
		vowels			""%"aeiou"
		consonant		%19.'consonants
		vowel			%5.'vowels
		letter			((].%2.=0 [.consonant) [.vowel)?
		word			.(; #.;^).~.letter@.""$
		solutions		:.(] ,(; +$).randoms$).%$.word@." "$
		result			0solutions(4 5 6)
	*/
		it("solved", () => expect(result).eql("fami wovaw kelasi"));
		it("randoms test", () => expect(randoms(0, 4)).eql([700001, 1821950, 1967079, 1537772]));
	});

	describe("69. Fibonacci Divisibility 4", () => {
	/*ts
		isMultiple		:.([ ] /$).([ 1%.].*$).=$
		processFib		:,(.(.(isMultiple,([.) .((1 )` .(.(!` `) ;`).?).>) ;`).? ;).@$
		nextFib 		]._2%.].+$
		addFib			.(; nextFib).(.(] [.[).processFib$ ,(] .(; )).+$)
		extract			_,(@,~ ]@).@$
		any				*.#.>0
		forWhile		[.(].!)any
		iterate			forWhile^addFib
		start			.(; #.()`^).~
		solution		" "%.({"BigInt")@.(start ({"[BigInt(0), BigInt(1)]")`).iterate.extract." "$
		result			solution"17 12 61"
	*/
		it("solved", () => expect(result).eql("9 12 15"));
		it("isMultiple positive test", () => expect(isMultiple(BigInt(12), BigInt(3))).eql(true));
		it("isMultiple negative test", () => expect(isMultiple(BigInt(11), BigInt(3))).eql(false));
		it("extract([[[4, 8], [2, 2]], [0, 1, 1, 2, 3, 5, 8]]) eql [6, 3]", () => expect(extract([[[4, 8], [2, 2]], [0, 1, 1, 2, 3, 5, 8]])).eql([6, 3]));
		//it("addFib([[[4, false], [123, false]], [0, 1, 1, 2, 3, 5]]) eql [[[4, 8], [123, false]], [0, 1, 1, 2, 3, 5, 8]]", () => expect(addFib([[[4, false], [123, false]], [0, 1, 1, 2, 3, 5]])).eql([[[4, 8], [123, false]], [0, 1, 1, 2, 3, 5, 8]]));
		//it("processFib(34, [[12, false], [17, false]]) eql [[12, false], [17, 34]]", () => expect(processFib(34, [[12, false], [17, false]])).eql([[12, false], [17, 34]]));
	});

	describe("69. Fibonacci Divisibility 3", () => {
	/*ts
		accuracy		10^(_8)
		isInteger		%1.#.<accuracy
		isMultiple		:./$.isInteger
		processFib		:,(.(.(isMultiple,([.) .((1 )` .(.(!` `) ;`).?).>) ;`).? ;).@$
		nextFib 		]._2%.].+$
		addFib			.(; nextFib).(.(] [.[).processFib$ ,(] .(; )).+$)
		extract			_,(@,~ ]@).@$
		any				*.#.>0
		forWhile		[.(].!)any
		iterate			forWhile^addFib
		start			.(; #.()`^).~
		solution		.(start (0 1)`).iterate.extract." "$
		result			solution(17 12 61)
	*/
		it("solved", () => expect(result).eql("9 12 15"));
		it("extract([[[4, 8], [2, 2]], [0, 1, 1, 2, 3, 5, 8]]) eql [6, 3]", () => expect(extract([[[4, 8], [2, 2]], [0, 1, 1, 2, 3, 5, 8]])).eql([6, 3]));
		it("addFib([[[4, false], [123, false]], [0, 1, 1, 2, 3, 5]]) eql [[[4, 8], [123, false]], [0, 1, 1, 2, 3, 5, 8]]", () => expect(addFib([[[4, false], [123, false]], [0, 1, 1, 2, 3, 5]])).eql([[[4, 8], [123, false]], [0, 1, 1, 2, 3, 5, 8]]));
		it("processFib(34, [[12, false], [17, false]]) eql [[12, false], [17, 34]]", () => expect(processFib(34, [[12, false], [17, false]])).eql([[12, false], [17, 34]]));
	});

	describe("69. Fibonacci Divisibility 2", () => {
	/*ts
		stringMore		:.((.(#@.(>|=)$ .(#@.=$ >$).&$).|$ !()`) ()`)?
		leftPad			:.(.([ ].#).-$."0"`^.""$ ]).+$
		padStrings		:.(#@.;<.].+1.(leftPad ).[ ;).@$
		addStep			:.([.[ .([.1%.] ]).+$.0+@.+$.""+.2leftPad.""%).(.([ ].]).+$ ].[)
		stringAdd		padStrings._@.~.(addStep ("" "0"))$.[.((].="0" _1%.[) ;)?._
		doWhile			.(([.!)` [.(stringMore ).[.(].)).&$
		nextStep		.(,(:,(].).:(=$).(.$) (!() )``) ,(()`` stringAdd,(].)).(;.)).?
		isMultipleS		:.(,(()` ;) .(doWhile nextStep).^$).(,$).[
		processFib		:,(.(.(isMultipleS,([.) .((1 )` .(.(!` `) ;`).?).>) ;`).? ;).@$
		nextFib 		]._2%.].stringAdd$
		addFib			.(; nextFib).(.(] [.[).processFib$ ,(] .(; )).+$)
		extract			_,(@,~ ]@).@$
		any				*.#.>0
		forWhile		[.(].!)any
		iterate			forWhile^addFib
		start			.(; #.()`^).~
		solution		" "%.(start ("0" "1")`).iterate.extract." "$
		result			solution"17 12 61"
	*/
		it("isMultiple positive test", () => expect(isMultipleS("12", "3")).eql(true));
		it("isMultiple negative test", () => expect(isMultipleS("11", "3")).eql(false));
		it("doWhile test", () => expect(doWhile(["12", "3"])([false, "3"])).eql(true));
		it("doWhile test", () => expect(doWhile(["12", "3"])([false, "12"])).eql(true));
		it("next test", () => expect(nextStep(["12", "3"])([false, "12"])).eql([true]));
		it("next test", () => expect(nextStep(["10", "3"])([false, "6"])).eql([false, "9"]));
		it("solved", () => expect(result).eql("9 12 15"));
	});

	describe("69. Fibonacci Divisibility 1", () => {
	/*ts
		accuracy		10^(_8)
		isInteger		%1.#.<accuracy
		processFib		:,(.(.(/,([.).:isInteger.(.$) .((1 )` .(.(!` `) ;`).?).>) ;`).? ;).@$
		nextFib 		]._2%.].+$
		addFib			.(; nextFib).(.(] [.[).processFib$ ,(] .(; )).+$)
		extract			_,(@,~ ]@).@$
		any				*.#.>0
		forWhile		[.(].!)any
		iterate			forWhile^addFib
		start			.(; #.()`^).~
		solution		.(start (0 1)`).iterate.extract." "$
		result			solution(17 12 61)
	*/
		it("solved", () => expect(result).eql("9 12 15"));
		it("extract([[[4, 8], [2, 2]], [0, 1, 1, 2, 3, 5, 8]]) eql [6, 3]", () => expect(extract([[[4, 8], [2, 2]], [0, 1, 1, 2, 3, 5, 8]])).eql([6, 3]));
		it("addFib([[[4, false], [123, false]], [0, 1, 1, 2, 3, 5]]) eql [[[4, 8], [123, false]], [0, 1, 1, 2, 3, 5, 8]]", () => expect(addFib([[[4, false], [123, false]], [0, 1, 1, 2, 3, 5]])).eql([[[4, 8], [123, false]], [0, 1, 1, 2, 3, 5, 8]]));
		it("processFib(34, [[12, false], [17, false]]) eql [[12, false], [17, 34]]", () => expect(processFib(34, [[12, false], [17, false]])).eql([[12, false], [17, 34]]));
	});

	describe("63. Integer Factorization", () => {
	/*ts
		accuracy		10^(_8)
		isntFactor		/,(;.).:(%1.>accuracy).(.$)
		isntOne			(!=1)`
		inRange			^(0.5).>|=
		check			.(isntFactor isntOne inRange).&$
		getNextFactor	.(.(check (+1)`).^$.(2,) inRange).((,$ [) ()`)?
		addFactor		.([ [.getNextFactor ]).(2%.[./$ .(] .(1' )).+$)
		factors			.(; ( )`).(([.getNextFactor)^addFactor).(] .([ )).+$."*"$
		solution		factors@." "$
		result			solution(1000
1001
1002
1003
1009)
	*/
		it("solved", () => expect(result).eql("2*2*2*5*5*5 7*11*13 2*3*167 17*59 1009"));
		it("getNextFactor(9) eql 3", () => expect(getNextFactor(9)).eql(3));
	});

	describe("46. Tic Tac Toe", () => {
	/*ts
		
		sequences		.(~%.[ #.+1^).@$
		turnNumber		:,(+,(*2.) #).^$
		trials			:.(].sequences turnNumber$).~
		wins			(3 )%"123456789147258369159357",(""%.@@.&$)@
		hasWon			.(, ).[.@wins.|$
		moves			" "%.(; #.;^).~.((].%2.=0)* (].%2.=1)*).[@@.((1 2)` ;).~
		tests			moves.trials$@.+$.]<
		turnWon			tests.([.hasWon)'.((; ]) 0`)?
		solution		"\n"%.turnWon@." "$
		result			solution"7 5 4 1 9 2 8 3 6
5 1 3 7 6 4 2 9 8
5 1 2 8 6 4 7 3 9"
	*/
		it("solved", () => expect(result).eql("7 6 0"));
		it('turnWon("7 5 4 1 9 2 8 3 6") eql 7', () => expect(turnWon("7 5 4 1 9 2 8 3 6")).eql(7));
		it('moves("7 5 4 1 9 2 8 3 6") eql [[1, ["7", "4", "9", "8", "6"]], [2, ["5", "1", "2", "3"]]]', () => expect(moves("7 5 4 1 9 2 8 3 6")).eql([[1, ["7", "4", "9", "8", "6"]], [2, ["5", "1", "2", "3"]]]));
		it("hasWon test", () => expect(hasWon(["7", "4", "9", "8"])).eql(2));
		it("trials test", () => expect(trials(1, "749")).eql([["7", 1], ["74", 3], ["749", 5]]));
		it("turnNumber test", () => expect(turnNumber(1, "7498")).eql([1, 3, 5, 7]));
		it("turnNumber test 2", () => expect(turnNumber(2, "7498")).eql([2, 4, 6, 8]));
		it("test sequences", () => expect(sequences("74986")).eql(["7", "74", "749", "7498", "74986"]));
	});

	describe("37. Mortgage Calculator", () => {
	/*ts
		term			1'.(/1200).1+.1/
		denominator		.(term.^ ].+1^).@$.+$
		solution		.([ denominator)./$.]
		result			solution(800000 6 103)
	*/
		it("solved", () => expect(result).eql(9957));
	});

	describe("45. Cards Shuffling", () => {
	/*ts
		ranks			""%"A23456789TJQK"
		suits			""%"CDHS"
		cards			(+,@ranks)@suits,+$																this is interesting!
		swap			:,(;<.([ 1` _.-$.-1 1` 0`) +(0 )).%$.([ 3' 2' 1' ]).+$._1%.[
		swapIndices		.(%52@ (;^52)`).~.!=$*															final clause to remove duplicates
		shuffle			:._.swap$
		solution		.((shuffle cards)` swapIndices).$$." "$
		result			solution(5814 1316 2080 2712 0 647 8098 315 44 6354 7867 100 61 763 6731 685 42 9309 569 92 701 562
        85 8311 698 220 929 71 684 518 113 61 19 168 745 16 655 9548 6018 2686 25 785 81 721
        964 85 44 614 4 509 8708 19)
	*/
		it("solved", () => expect(result).eql("C5 D5 S4 C8 CQ S3 HK C9 H3 H6 D3 ST DT HT C6 CK DA H9 SJ SK DK C2 DQ S5 H4 D7 S7 S2 C4 D9 CT HJ HQ D2 SA CA H5 H2 C7 D4 CJ D6 S9 HA S8 D8 S6 SQ C3 DJ H8 H7"));
		it("swap test 1", () => expect(swap([5, 2], [1, 2, 3, 4, 5, 6, 7, 8])).eql([1, 2, 6, 4, 5, 3, 7, 8]));
		it("swap test 2", () => expect(swap([0, 3], [1, 2, 3, 4, 5, 6, 7, 8])).eql([4, 2, 3, 1, 5, 6, 7, 8]));
		it("swap test 3", () => expect(swap([3, 7], [1, 2, 3, 4, 5, 6, 7, 8])).eql([1, 2, 3, 8, 5, 6, 7, 4]));
	});

	describe("120. Selection Sort", () => {
	/*ts
		swapLast		:.%$.([ ].1%.].((#.<2 ;) _1%._.+$)?).+$
		maxIndex		.(; #.;^).~.[<.].]
		process			].[.(maxIndex ;).(swapLast$ [)
		check			].[.#.>1
		solution		.(.(; 0`) ).(check process)^.]@.1%.]." "$
		result			solution(31 41 59 26 53 58)
	*/
		it("swapLast test", () => expect(swapLast(2, [1, 2, 3, 4, 5, 6])).eql([1, 2, 6, 4, 5]));
		it("solved", () => expect(result).eql("2 2 2 1 0"))
	});

	describe("34. Binary Search", () => {
	/*ts
		E				{"Math.E"
		exponent		*,(_1*./50.E^._1*.)
		fn				,(* *,(^(3/2).) exponent _.(` ).[).(;.).:(+$).(.$)
		startValues		.(.(0` fn.(0,)) .(100` fn.(100,)))
		isNotConverged	]@.-$.#.>(10^(_7))
		middleValue		.(].[@.+$./2 [.fn).([ ,$)
		moveLarger		:.(middleValue ].])
		moveSmaller		:.(].[ middleValue)
		iterate			.(.(((].#)@.<$)` moveSmaller) moveLarger).?
		iterator		.(isNotConverged` iterate).^$
		result			.(startValues iterator).(,$).[.[.8'
		solution		("-" "_")@."\n"%.(" "%.0+@.result)@." "$
		results			solution"0.59912051 0.64030348 263.33721367 387.92069617
15.68387514 1.26222280 695.23706506 698.72384731"

		//resultA			fn,startValues 
	*/
		it("solved", () => expect(results).eql("73.59536855 41.89917492"));
		it("middleValue test", () => expect(middleValue([[0.59912051, 0.64030348, 263.33721367, 387.92069617], [[0,-651.2579098399999],[100,276.65601843123017]]])).eql([50, -228.4595513118918]));
		it("startValues test", () => expect(startValues([0.59912051, 0.64030348, 263.33721367, 387.92069617])).eql([[0,-651.2579098399999],[100,276.65601843123017]]));
		it("result test", () => expect(result([0.59912051, 0.64030348, 263.33721367, 387.92069617])).eql(73.59536855));
		it("fn test", () => expect(Math.abs(fn([0.59912051, 0.64030348, 263.33721367, 387.92069617])(73.595368554162))).lt(1E-7));
		it("converged test", () => expect(isNotConverged([[1E-8], [2E-8]])).eql(false));
	});

	describe("53. King and Queen", () => {
	/*ts
		map				(""%"abcdefgh" +1^8),~,\
		coord			""%,('map 0+)
		coords			" "%.coord@
		sameRow			]@.=$
		sameColumn		[@.=$
		diagonal		~.(-$.#)@.=$
		canTake			((sameRow|sameColumn|diagonal "Y"`) "N"`)?
		solution		"\n"%.(coords.canTake)@." "$
		result			solution"b4 b8
b4 e7
b4 d2
b4 g4
f2 b1
f2 c4
f2 d5
f2 g7"
	*/
		it('coord("b4") eql [2, 4]', () => expect(coord("b4")).eql([2, 4]));
		it("solved", () => expect(result).eql("Y Y Y Y N N N N"));
	});

	describe("33. Parity Control", () => {
	/*ts
		leftPad			:.(.([ ].#).-$."0"`^.""$ ]).+$
		toBinary		.((].[.>0 ].[.(/2.[ %2))` .(.(; 0`) )).^$.1%.]._.]@.""$.8leftPad
		numOfBits		""%.0+@.+$
		decodeBinary	toBinary.(; numOfBits).((].%2.=0 [.1%.]) ()`)?
		toDecimal		""%.0+@.(:,(*2 ;).+$)$
		binToChar		toDecimal.{"String.fromCharCode"
		solution		decodeBinary@.;*.binToChar@.""$
		result			solution(65 238 236 225 46)
	*/
		it("solved", () => expect(result).eql("Ana."));
		it("toBinary(10) eql '00001010'", () => expect(toBinary(10)).eql("00001010"));
		it("decodeBinary(10) eql '0001010'", () => expect(decodeBinary(10)).eql("0001010"));
		it("decodeBinary(74) eql false", () => expect(decodeBinary(74)).eql(false));
		it("toDecimal('1010') eql 10", () => expect(toDecimal("1010")).eql(10));

	});

	describe("38. Quadratic Equation", () => {
	/*ts
		signedSqrt		((<0 _1*.^0.5._1*) ^0.5)?
		first			.(1'._1* [.*2)./$
		signedSecond	.(.(1'.^2 .([ ] 4`).*$).-$.signedSqrt [.*2)./$
		simpleRoots		.(+$ -$).0'@." "$
		complexRoots	,(; _1*).0'@.("+"$ "-"$).+"i"@." "$
		roots			.(first signedSecond).((].<0 complexRoots) simpleRoots)?
		solution		("-" "_")@."\n"%.(" "%.0+@.roots.("_" "-")@)@."; "$
		result			solution"3 -3 -6
1 0 1
9 90 225"
	*/
		it("solved", () => expect(result).eql("2 -1; 0+1i 0-1i; -5 -5"));
		it("roots([2, 5, 2]) eql '0 _2'", () => expect(roots([2, 5, 2])).eql("0 _2"));
		it("signedSqrt(-9) eql -3", () => expect(signedSqrt(-9)).eql(-3));
		it("first([2, 4, 6]) eql -1", () => expect(first([2, 4, 6])).eql(-1));
		it("signedSecond([2, 5, 2]) eql 0.75", () => expect(signedSecond([2, 5, 2])).eql(0.75));
	});

	describe("42. Blackjack Counting", () => {
	/*ts
		fixedValues		\(("2" 2) ("3" 3) ("4" 4) ("5" 5) ("6" 6) ("7" 7) ("8" 8) ("9" 9) ("T" 10) ("J" 10) ("Q" 10) ("K" 10))
		sumFixed		'fixedValues@.+$
		splitHand		.(!="A"* ="A"*.#)
		aceValues		.(+,(10*.) +1).^$
		possibleValues	splitHand,(sumFixed.+ aceValues).@$.;<._
		highestValue	(:.(([ [) (].<22 ]) [)? ())$
		hand			" "%.possibleValues.highestValue.|"Bust"
		solution		"\n"%.hand@." "$
		result			solution"A T
2 K 4
3 A Q 8
A 3 3 3 A"
	*/
		it("solved", () => expect(result).eql("21 16 Bust 21"));
		it("hand('8 A A A') eql 21", () => expect(hand("8 A A A")).eql(21));
		it('highestValue([41, 31, 21, 11]) eql 21', () => expect(highestValue([41, 31, 21, 11])).eql(21));
		it('possibleValues(["8", "A", "A", "A"]) eql [41, 31, 21, 11]', () => expect(possibleValues(["8", "A", "A", "A"])).eql([41, 31, 21, 11]));
		it("aceValues(4) eql [4, 14, 24, 34, 44]", () => expect(aceValues(4)).eql([4, 14, 24, 34, 44]));
		it('splitHand(["2", "A", "J", "A"]) eql [["2", "J"], 2]', () => expect(splitHand(["2", "A", "J", "A"])).eql([["2", "J"], 2]));
		it('sumFixed(["3", "J"]) eql 13', () => expect(sumFixed(["3", "J"])).eql(13));
	});

	describe("128. Combinations Counting", () => {
	/*ts
		factorial		((=0 1`) +1^.*$)?
		C				.([.factorial .(] -$).factorial@.*$)./$
		solution		(2 )%.(C.0')@." "$
		result			solution(3 0
4 2
5 2)
	*/
		it("solved", () => expect(result).eql("1 6 10"));
	});

	describe("94. Fool's Day 2014", () => {
	/*ts
		value			^2@.+$
		solution		"\n"%.(" "%.0+@.value)@." "$
		result			solution"1 2
1 2 3
2 3 4
2 4 6 8 10
7 11 19"
	*/
		it("solved", () => expect(result).eql("5 14 29 220 531"));
	});

	describe("59. Bulls and Cows", () => {
	/*ts
		hint			:.(""%@.~.=$@ ,(@,~ ""%).@$).(((; 1`) 0`)?@.+$)@.([ _.-$)."-"$
		solution		"\n"%." "%@,([.(hint ).[ ;).@$." "$
		result			solution("1492 5
2013 1865 1234 4321 7491")
	*/
		it('hint("1234", "5678") eql "0-0"', () => expect(hint("1234", "5678")).eql("0-0"));
		it('hint("1492", "7491") eql "2-1"', () => expect(hint("1492", "7491")).eql("2-1"));
		it("solved", () => expect(result).eql("0-2 1-0 1-2 0-3 2-1"));
	});

	describe("22. Two Printers 1", () => {
	/*ts
		//notFinished		,(1/.* 1/.* `).(#.).(2%.[.[@.+$ ]).<$
		notFinished		,(1/.* 1/.* `).(;.).:(2%.[.[@.+$ ]).(.$).:(<$).(.$)
		//testCase		.(notFinished +1`).^$.(1,)
		testCase		{"([X, Y, N]) => {
			// ts performance not good enough
			let days = 1;
			while (1) {
				const xPages = Math.floor(days / X);
				const yPages = Math.floor(days / Y);

				if ((xPages + yPages) >= N) break;

				days += 1;
			}
			return days;
		}"
		solution		(3 )%.testCase@." "$
		result			solution(1 1 5 
3 5 4)
	*/
		it("intermediate", () => expect(notFinished([3, 5, 4])(9)).eql(false));
		it("solved", () => expect(result).eql("3 9"));
	});

	describe("61. Prime Numbers Generation 4", () => {
	/*ts
		maxPrime		2750161
		primes			{"(() => {
			// i couldn't get my ts non-destructive algorithms to be performant enough
			let A = [];
			for (var n = 0; n < maxPrime; n += 1) A.push(n);
			let limit = Math.floor(Math.sqrt(maxPrime));
			for (var i = 2; i < limit; i += 1) {
				if (A[i]) {
					var start = i * i;
					for (var j = start; j < maxPrime; j += i) A[j] = 0;
				}
			}
			let result = [];
			for (var m = 2; m < maxPrime; m++) {
				var value = A[m];
				if (value) result.push(value);
			}
			return result;
		})()"
		solution		(-1.'primes)@." "$
		result			solution(7 1 4)
	*/
		it("solved", () => expect(result).eql("17 2 7"));
	});

	describe("61. Prime Numbers Generation 3", () => {
	/*ts
		maxIndex		;<.]
		any				*.#.>0
		isNotPrime		,(+1.% ;).@$.=0any
		addPrime		((] .(1' .([ )).+$) 1')?
		nextPrime		.([.+1 ] !isNotPrime).([ addPrime)
		primes			.(maxIndex.>.(].#.) nextPrime`).^$.((2 (2 )),).]
		solution		.(primes.(',~) -1@).@$." "$
		result			solution(7 1 4)
	*/
		it("solution([3, 4, 1]) eql '5 7 2'", () => expect(solution([3, 4, 1])).eql("5 7 2"));
		it("primes([3, 4, 1]) eql [2, 3, 5, 7]", () => expect(primes([3, 4, 1])).eql([2, 3, 5, 7]));
		it("nextPrime([[6, [2, 3, 5]]) eql [7, [2, 3, 5, 7]]", () => expect(nextPrime([6, [2, 3, 5]])).eql([7, [2, 3, 5, 7]]));
		it("nextPrime([[5, [2, 3, 5]]) eql [6, [2, 3, 5]]", () => expect(nextPrime([5, [2, 3, 5]])).eql([6, [2, 3, 5]]));
		it("addPrime([6, [2, 3, 5], false]) eql [2, 3, 5]", () => expect(addPrime([6, [2, 3, 5], false])).eql([2, 3, 5]));
		it("addPrime([5, [2, 3], true]) eql [2, 3, 5]", () => expect(addPrime([5, [2, 3], true])).eql([2, 3, 5]));
		it("solved", () => expect(result).eql("17 2 7"));
	});

	describe("61. Prime Numbers Generation 2", () => {
	/*ts
		maxPrime		20 75016
		startGrid		1`^maxPrime
		factors			^0.5.[.+2^
		indices			.(.((].<maxPrime)` +,(].)) .(*2 )).^$._1%.[
		filter			.(.((:._.>$)` ]) [.indices.(.(.(; ) 0``))@).$$
		filterGrid		:._.(('$.=0 ]) filter)?
		sieve			.((filterGrid startGrid)` factors).$$
		primes			maxPrime.(;^ sieve),~,(].=1)*,~,[,2%,]
		solution		(-1.'primes)@." "$
		result			solution(7 1 4)
	*/
		it("solved", () => expect(result).eql("17 2 7"));
	});

	describe("61. Prime Numbers Generation 1", () => {
	/*ts
		maxIndex		;<.]
		sumNotFactor	,(+1.% ;).@$.((>0 1`) 0`)?@.+$
		addPrime		((] .(1' .([ )).+$) 1')?
		nextPrime		].([.+1 ] .(sumNotFactor ].#).=$).([ addPrime)
		primes			.(maxIndex.>.(].].#.) nextPrime`).^((2 (2 )) ).].]
		solution		.(primes.(',~) -1@).@$." "$
		result			solution(7 1 4)
	*/
		it("solution([3, 4, 1]) eql '5 7 2'", () => expect(solution([3, 4, 1])).eql("5 7 2"));
		it("primes([3, 4, 1]) eql [2, 3, 5, 7]", () => expect(primes([3, 4, 1])).eql([2, 3, 5, 7]));
		it("nextPrime([[6, [2, 3, 5]]) eql [7, [2, 3, 5, 7]]", () => expect(nextPrime([[6, [2, 3, 5]]])).eql([7, [2, 3, 5, 7]]));
		it("nextPrime([[5, [2, 3, 5]]) eql [6, [2, 3, 5]]", () => expect(nextPrime([[5, [2, 3, 5]]])).eql([6, [2, 3, 5]]));
		it("addPrime([6, [2, 3, 5], false]) eql [2, 3, 5]", () => expect(addPrime([6, [2, 3, 5], false])).eql([2, 3, 5]));
		it("addPrime([5, [2, 3], true]) eql [2, 3, 5]", () => expect(addPrime([5, [2, 3], true])).eql([2, 3, 5]));
		it("sumNotFactor([9, [2, 3, 5, 7]]) eql 2", () => expect(sumNotFactor([9, [2, 3, 5, 7]])).eql(2));
		it("solved", () => expect(result).eql("17 2 7"));
	});

	describe("55. Matching Words", () => {
	/*ts
		addEntry	:._.(,(.(; ) ((; +1) 1`)?`) ]).>$
		wordsToDict	(addEntry \( ))$
		solution	" "%.wordsToDict.\.(].>1)*.[@.;<." "$
		result		solution("nun lam mip tex bal pif sot bal bod tex")
	*/
		it("intermediate", () => expect(wordsToDict(["abc", "def", "abc"])).eql({"abc": 2, "def": 1}));
		it("solved", () => expect(result).eql("bal tex"));
	});

	describe("58. Card Names", () => {
	/*ts
		suits		("Clubs" "Spades" "Diamonds" "Hearts")
		ranks		("2" "3" "4" "5" "6" "7" "8" "9" "10" "Jack" "Queen" "King" "Ace")
		suit		/13.[.'suits
		rank		%13.'ranks
		name		.(rank suit)."-of-"$
		solution	name@." "$
		result		solution(25 32 51 20 6)
	*/
		it("solved", () => expect(result).eql("Ace-of-Spades 8-of-Diamonds Ace-of-Hearts 9-of-Spades 8-of-Clubs"));
	});

	describe("49. Rock Paper Scissors", () => {
	/*ts
		round			((""%.=$ 0`) (="RS"|(="SP")|(="PR") _1`) 1`)?
		match			" "%.round@.+$
		whoWins			((<0 1`) (>0 2`) 0`)?
		solution		"\n"%.(match.whoWins)@." "$
		result			solution("SS PR
PR RS PS PP SP
PS RR PS RP")
	*/
		it("solved", () => expect(result).eql("1 1 2"));
	});
	
	describe("104. Triangle Area", () => {
	/*ts
		semiPerimeter	+$./2
		area			.(.(semiPerimeter ) ;).+$.([ .([ 1').-$ .([ 2').-$ .([ ]).-$).*$.^0.5
		length			~.(-$.^2)@.+$.^0.5
		abc				(2 )%.(2%.[.length 1%.].length .([ ]).length)
		solution		(6 )%.(abc.area.1')@." "$
		result			solution(1 3 9 5 6 0
1 0 0 1 10000 10000
7886 5954 9953 2425 6250 2108)
	*/
		it("solved", () => expect(result).eql("17 9999.5 6861563"));
	});

describe("Problems 5", () => {
	describe('(""%.(:.(([.].=0 [) ((].@"([{<" .(.([.[ ]).+$ 1`)) (].@")]}>" ((.([.[.] ]).(,(="(" =")") ,(="[" ="]") ,(="{" ="}") ,(="<" =">")).&$@.|$ [,(_1%.[ 1`)) ("" 0)`)?) [)?)? ("" 1))$.([.#.=0 ].=1).&$.((; 1`) 0`)?)@." "$', () => {
	/*ts
		openingBracket	].@"([{<"
		addBracket		.(.([.[ ]).+$ 1`)
		closingBracket	].@")]}>"
		matchingPair	.([.[.] ]).(,(="(" =")") ,(="[" ="]") ,(="{" ="}") ,(="<" =">")).&$@.|$
		removeBracket	[,(_1%.[ 1`)
		fail			("" 0)`
		ignore			[
		checkPass		.([.#.=0 ].=1).&$.((; 1`) 0`)?
		matchBrackets	((openingBracket addBracket) (closingBracket ((matchingPair removeBracket) fail)?) ignore)?
		iterate			:.(([.].=0 [) matchBrackets)?
		parseString		""%.(iterate ("" 1))$.checkPass
		solution		parseString@." "$
		result			solution("(a+[b*c]-{d/3})"
"(a + [b * c) - 17]"
"(((a * x) + [b] * y) + c"
"auf(zlo)men [gy<psy>] four{s}")
	*/
		it("intermediate", () => expect(iterate(["", 1], "(")).eql(["(", 1]));
		it("solved", () => expect(result).eql("1 0 0 1"));
	});

	describe('(2 )%.((%6.+1)@.+$)@." "$', () => {
	/*ts
		pips			%6.+1
		solution		(2 )%.(pips@.+$)@." "$
		result			solution(193170145 1912748246
753156389 614113621
1824520917 53700559
1288077384 911939603
1939066598 1695763253
1905581606 1811712139
878644967 1090885451)
	*/
		it("solved", () => expect(result).eql("5 8 6 7 9 5 12"));
	});

	describe(".(.((].#.>1)` ].(:.(,(; #).%$ ]).%$._.+$ ).[.(].).:(_1%.[).(.$)) .([.+1^ )).^$.].[", () => {
	/*ts
		rotate			:.(,(; #).%$ ]).%$._.+$
		cull			].(rotate ).[.(].).:(_1%.[).(.$)
		solution		.(.((].#.>1)` cull) .([.+1^ )).^$.].[
		result			solution(10 3)
	*/
		it("intermediate3", () => expect(rotate(3, [1, 2, 3, 4, 5])).eql([4, 5, 1, 2, 3]));
		it("intermediate", () => expect(cull([10, 3])([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]])).eql([4, 5, 6, 7, 8, 9, 10, 1, 2]));
		it("solved", () => expect(result).eql(4));
	});

	describe(`(5 )%.(.(.(].+1.>.(#.) .([.* 1'.+ 2'.~%).(.$).(].)) .(3' )).^$.])@." "$`, () => {
	/*ts
		check			].+1.>.(#.)
		iterate			.([.* 1'.+ 2'.~%).(.$).(].)
		random			.(.(check iterate) .(3' )).^$.]
		solution		(5 )%.random@." "$
		result			solution(3 7 12 1 2
2 3 15 8 10)
	*/
		it("solved", () => expect(result).eql("1 11"));
	});

	describe('(3 )%.(,(*100 *100 /100.+1).(.(.(.(1\'.> !()``) ()``).?.(].) ].*.(].).:[.(.$)) .([ )).^$.#.-1)@." "$', () => {
	/*ts
		addInterest		].*.(].).:[.(.$)
		lessRequired	.(.(1'.> !()``) ()``).?.(].)
		iterate			.(.(lessRequired addInterest) .([ )).^$.#.-1
		wait			,(*100 *100 /100.+1).iterate
		solution		(3 )%.wait@." "$
		result			solution(1000 10000 8
50 100 25)
	*/
		it("intermediate", () => expect(addInterest([1, 2])([3, 4.2])).eql(8));
		it("solved", () => expect(result).eql("30 4"));
	});

	describe(`(3 )%.(.(.(1' [).*$ .(1' ]).+$)./$)@." "$`, () => {
	/*ts
		distance		.(.(1' [).*$ .(1' ]).+$)./$
		solution		(3 )%.distance@." "$
		result			solution(10 1 1
20 1 2)
	*/
		it("solved", () => expect(result).eql("5 6.666666666666667"));
	});
	describe('.(.([ ) .(2%.] 1%.]._1%.[ _2%.[).~.(+$./3)@ .(] )).+$." "$.("_" "-")@', () => {
	/*ts
		//middle			(1 _2 0)%(1 2 3 4 5)

		tripleAverage	.(2%.] 1%.]._1%.[ _2%.[).~.(+$./3)@
		solution		.(.([ ) tripleAverage .(] )).+$." "$.("_" "-")@
		result			solution(32.6 31.2 35.2 37.4 44.9 42.1 44.1)
	*/
		//it("(1 _2 0)%(1 2 3 4 5) eql [[1], [2, 3], [4, 5]]", () => expect(middle).eql([[1], [2, 3], [4, 5]]));
		it("solved", () => expect(result).eql("32.6 33 34.6 39.166666666666664 41.46666666666667 43.699999999999996 44.1"));
	});

	describe(':,(:,(.(%(""%"ABCDEFGHIJKLMNOPQRSTUVWXYZ")._.+$ (""%"ABCDEFGHIJKLMNOPQRSTUVWXYZ")`).~.+((" " " ") ).\\.~\' ""%).@$.""$ "\n"%.(_1%.[)@).@$.+"."@." "$', () => {
	/*ts
		letters			""%"ABCDEFGHIJKLMNOPQRSTUVWXYZ"
		key				.(%letters._.+$ letters`).~.+((" " " ") ).\.(',~)
		unshift			:,(key ""%).@$.""$
		solution		:,(unshift "\n"%.(_1%.[)@).@$.+"."@." "$
		result			3solution"YHQL YLGL YLFL.
HYHQ BRX EUXWXV."
	*/
		it('unshift(3, "YHQL YLGL YLFL") eql "VENI VIDI VICI"', () => expect(unshift(3, "YHQL YLGL YLFL")).eql("VENI VIDI VICI"));
		it("solved", () => expect(result).eql("VENI VIDI VICI. EVEN YOU BRUTUS."));
	});

	describe('(((<0 +1._1*.((].[.>0 ].[.(/2.[ %2))` .(.(; ) )).^$.1%.].]@._.("" )+.+$.32(:.(.([ ].#).-$."0"`^.""$ ]).+$).""%.((="0" "1"`) "0"`)?@.""$) .((].[.>0 ].[.(/2.[ %2))` .(.(; ) )).^$.1%.].]@._.("" )+.+$)?.""%.(:,(; 0+).+$ 0)$)@." "$', () => {
	/*ts
		positive		.((].[.>0 ].[.(/2.[ %2))` .(.(; ) )).^$.1%.].]@._.("" )+.+$
		leftPad			:.(.([ ].#).-$."0"`^.""$ ]).+$
		invert			32leftPad.""%.((="0" "1"`) "0"`)?@.""$
		negative		+1._1*.positive.invert
		toBinary		((<0 negative) positive)?
		count			toBinary.""%.(:,(; 0+).+$ 0)$
		solution		count@." "$
		result			solution(1 100 _1)
	*/
		it("count(-1) eql 32", () => expect(count(-1)).eql(32));
		it("solved", () => expect(result).eql("1 3 32"));
	});

	describe('.(.(#<.].#.(:.(.([ ].#).-$."0"`^.""$ ]).+$ ).[ ;).@$.;<.].((:.((.(#@.>$ .(#@.=$ >$).&$).|$ !()`) ()`)?),(].) (~2%.].(:.(#@.;<.].+1.(:.(.([ ].#).-$."0"`^.""$ ]).+$ ).[ ;).@$._@.~.(:.([.[ .([.1%.] ]).+$.0+@.+$.""+.2(:.(.([ ].#).-$."0"`^.""$ ]).+$).""%).(.([ ].]).+$ ].[) ("" "0"))$.[.((].="0" _1%.[) ;)?._)$)`).^("0" "1").(@,~) ;).@$." "$', () => {
	/*ts
		stringMore		:.((.(#@.>$ .(#@.=$ >$).&$).|$ !()`) ()`)?
		leftPad			:.(.([ ].#).-$."0"`^.""$ ]).+$
		padStrings		:.(#@.;<.].+1.(leftPad ).[ ;).@$
		addStep			:.([.[ .([.1%.] ]).+$.0+@.+$.""+.2leftPad.""%).(.([ ].]).+$ ].[)
		stringAdd		padStrings._@.~.(addStep ("" "0"))$.[.((].="0" _1%.[) ;)?._
		largest			.(#<.].#.(leftPad ).[ ;).@$.;<.]
		sequence		largest.(stringMore,(].) (_2%.].stringAdd$)`).^("0" "1")
		solution		.(sequence.(@,~) ;).@$." "$
		result			solution("610"
"34"
"0"
"1346269"
"10946")

		stringLess		:.((.(#@.<$ .(#@.=$ <$).&$).|$ !()`) ()`)?
		temp			:.#@.;<.].+1.leftPad"67"
	*/
		it(`largest(["9", "87", "234", "12"]) eql "234"`, () => expect(largest(["9", "87", "234", "12"])).eql("234"));
		it('stringAdd("99", "2") eql "101"', () => expect(stringAdd("99", "2")).eql("101"));
		it('stringAdd("24", "19") eql "43"', () => expect(stringAdd("24", "19")).eql("43"));
		it('addStep(["3", "1"], ["7", "8"]) eql ["36", "1"]', () => expect(addStep(["3", "1"], ["7", "8"])).eql(["36", "1"]));
		it(':.#@.;<.].+1.leftPad"67"("9", "12") eql "067"', () => expect(temp("9", "12")).eql("067"));
		it(':.(#@.;<.].+1 ;).leftPad@$("12", "345") eql ["0012", "0345"]', () => expect(padStrings("12", "345")).eql(["0012", "0345"]));
		it(`:.(#@.<$ <$).|$("9", "12") eql true`, () => expect(stringLess("9", "12")).eql(true));
		it(`:.(#@.<$ <$).|$("123", "92") eql false`, () => expect(stringLess("123", "92")).eql(false));
		it(`:.(#@.<$ <$).|$("12", "23") eql true`, () => expect(stringLess("12", "23")).eql(true));
		it(`sequence(["7", "10"]) eql ["0", "1", "1", "2", "3", "5", "8", "13"]`, () => expect(sequence(["7", "10"])).eql(["0", "1", "1", "2", "3", "5", "8", "13"]));
		it("solved", () => expect(result).eql("15 9 0 31 21"));
	});

	describe(`(.(; ).(_1%.(].[ [).*$.! ].^2.""+.8(:.(.([ ].#).-$."0"\`^.""$ ]).+$).(2 4)%.1'.0+)^.#.-1)@." "$`, () => {
	/*ts
		leftPad			:.(.([ ].#).-$."0"`^.""$ ]).+$
		iterate			^2.""+.8leftPad.(2 4)%.1'.0+
		converge		.(; ).(_1%.(].[ [).@$.! ].iterate)^.#.-1
		temp			.(; ).(_1%.(].[ [).@$.! ].iterate)^
		solution		converge@." "$
		result			solution(1 4100 5761)
	*/
		it("solved", () => expect(result).eql("2 4 88"));
		it(`^2.""+.8leftPad.(2 4)%.1'.0+(1891) eql 5758`, () => expect(iterate(1891)).eql(5758));
		it(".(; ).(_1%._.contains$.! ].iterate)^.#.-1(4100) eql 4", () => expect(converge(4100)).eql(4));
	});

	describe('(3 )%.(.(] 2%.[.^2@.+$.^0.5).((<$ "A"`) (>$ "O"`) "R"`)?)@." "$', () => {
	/*ts
		hyp				2%.[.^2@.+$.^0.5
		nature			.(] hyp).((<$ "A"`) (>$ "O"`) "R"`)?
		solution		(3 )%.nature@." "$
		result			solution(6 8 9
9 12 15
16 12 22)
	*/
		it("solved", () => expect(result).eql("A R O"));
	});

	describe('(2 )%.(%._.+$)$@." "$', () => {
	/*ts
		rotate			%._.+$
		solution		(2 )%.rotate$@." "$
		result			solution(3 "forwhomthebelltolls"
_6 "verycomplexnumber")
	*/
		it("solved", () => expect(result).eql("whomthebelltollsfor numberverycomplex"));
	});

	describe('(""%.(>|="a"&(<|="z")|(>|="A"&(<|="Z")))*.""$.{"x => x.toLowerCase()".(; _).((=$ "Y"`) "N"`)?)@." "$', () => {
	/*ts
		toLowerCase		{"x => x.toLowerCase()"
		isPalim			""%.(>|="a"&(<|="z")|(>|="A"&(<|="Z")))*.""$.toLowerCase.(; _).((=$ "Y"`) "N"`)?
		solution		isPalim@." "$
		result			solution("Stars"
"O, a kak Uwakov lil vo kawu kakao!"
"Some men interpret nine memos")
	*/
		it('{"x => x.toLowerCase()""AbC" eql "abc', () => expect(toLowerCase("AbC")).eql("abc"));
		it("solved", () => expect(result).eql("N Y Y"));
	});

	describe('(:.(([.[ ((.([.[.] ]).>$ .(.([.[._1% .(] )).([.[ ] [.]).+$ [.].+1)) .(.([.[ .(] )).+$ [.]))?) .(.(] ) [.]))? (( ) 0))$.(] [.(+.*113.%10000007 0)$)." "$', () => {
	/*ts
		checksum		(+.*113.%10000007 0)$
		append			.(.([.[ .(] )).+$ [.])
		swap			.(.([.[._1% .(] )).([.[ ] [.]).+$ [.].+1)
		needsSwap		.([.[.] ]).>$
		fullStep		((needsSwap swap) append)?
		step			:.(([.[ fullStep) .(.(] ) [.]))?
		pass			(step (( ) 0))$
		solution		pass.(] [.checksum)." "$
		result			solution(1 4 3 2 6 5)
	*/
		it("solved", () => expect(result).eql("3 5242536"));
	});

	describe('.(; #.+1^).~.[<.~.]." "$', () => {
	/*ts
		solution		.(; #.+1^).~.[<.~.]." "$
		result			solution(50 98 17 79)
	*/
		it("solved", () => expect(result).eql("3 1 4 2"));
	});
	
	describe('(2 )%.(:.(].+1.>.(#.) .(;` [./).(].).:(+$./2).(.$)).^(1 ).])$@." "$', () => {
	/*ts
		test			.(+ ).([.)
		testPipe		.(test ).[
		size			#.(; ).[
		intTwo			[./
		intermediate	.(;` [./).([.)
		intermediateB	.(;` [./).([.).:(+$).(.$)
		root			:.(].+1.>.(#.) .(;` [./).(].).:(+$./2).(.$)).^(1 ).]
		solution		(2 )%.root$@." "$
		result			solution(150 0
5 1
10 3)
	*/
		it(".(+ ).([.)(2)([3, 4]) eql [3]", () => expect(test(2)([3, 4])).eql([5]));
		it("#.(; ).[([1, 2, 3]) eql 3", () => expect(size([1, 2, 3])).eql(3));
		it("[./([10, 3])(2) eql 5", () => expect(intTwo([10, 3])(5)).eql(2));
		it(".(;` [./).([.).+$([10, 3])([5, 6]) eql 7", () => expect(intermediateB([10, 3])([5, 6])).eql(7));
		it(".(;` [./).([.)([10, 3])([5, 6]) eql [5, 2]", () => expect(intermediate([10, 3])([5, 6])).eql([5, 2]));
		it("10root3 eql 3.196", () => expect(root(10, 3).toFixed(3)).eql("3.196"));
		it("solved", () => expect(result).eql("1 3 3.196005081874647"));
	});

	describe(`(2 )%.((:.((:.(; ).(].!=$ ].;<.([ _.-$))^.].[)$ [ ]).([ .(.(1' ]).*$ [)./$))$.""+)@." "$`, () => {
	/*ts
		gcd				:.(; ).(].!=$ ].;<.([ _.-$))^.].[
		gdcLcm			:.(gcd$ [ ]).([ .(.(1' ]).*$ [)./$)
		solution		(2 )%.(gdcLcm$.""+)@." "$
		result			solution(2 3
4 10)
	*/
		it("2gdcLcm3 eql [1, 6]", () => expect(gdcLcm(2, 3)).eql([1, 6]));
		it("solved", () => expect(result).eql("(1 6) (2 20)"));
		it("(20 35) => 5", () => expect(gcd(20, 35)).eql(5));
	});

	describe(".((_2%.].!=$ ].(.((:.(([.[ ((.([.[.] ]).>$ .(.([.[._1% .(] )).([.[ ] [.]).+$ [.].+1)) .(.([.[ .(] )).+$ [.]))?) .(.(] ) [.]))?)` .(( )` ])) [).$$)` .(.(; 0`) )).^$.(#.-1 ].]).\" \"$", () => {
	/*ts
		append			.(.([.[ .(] )).+$ [.])
		swap			.(.([.[._1% .(] )).([.[ ] [.]).+$ [.].+1)
		needsSwap		.([.[.] ]).>$
		fullStep		((needsSwap swap) append)?
		step			:.(([.[ fullStep) .(.(] ) [.]))?
		initial			.(.(; 0`) )
		makePass		].(.(step` .(( )` ])) [).$$
		solution		.((_2%.].!=$ makePass)` initial).^$.(#.-1 ].])." "$
		result			solution(3 1 4 1 5 9 2 6)

		pass			(step (( ) 0))$
		test			solution(3 1 4 1)
		setup			(3 1 4 1).(3` initial)
		firstCheck		(_2%.=$)((3 1 4 1) )
		passOne			pass(3 1 4 1)
		thirdStep		((1 3) 1)step4
		firstFull		fullStep(((3 ) 0) 1)
		checkNeedsSwap	needsSwap(((3 ) 0) 1)
		negSplit		_1%(3 )
		firstStep		(( ) 0)step3
		secondStep		((3 ) 0)step1
		firstSwap		swap(((3 ) 0) 1)
	*/
		it("solved", () => expect(result).eql("5 8"));
		it(".(.(; 0`) )([1, 2, 3, 4]) eql [[[1, 2, 3, 4], 0]]", () => expect(initial([1, 2, 3, 4])).eql([[[1, 2, 3, 4], 0]]));
		it("(3 1 4 1).(3` .(.(; 0`) )) eql [3, [[3, 1, 4, 1], 0]]", () => expect(setup).eql([3, [[[3, 1, 4, 1], 0]]]));
		it("(_2%.=$)((3 1 4 1) ) eql false", () => expect(firstCheck).eql(false));
		it("solution(3 1 4 1) eql [2, 3]", () => expect(test).eql("3 3"));
		it("pass(3 1 4 1 5 9 2 6) eql [[1, 3, 1, 4], 2]", () => expect(passOne).eql([[1, 3, 1, 4], 2]));
		it("((1 3) 1)step4 eql [[1, 3, 4], 1]", () => expect(thirdStep).eql([[1, 3, 4], 1]));
		it("fullStep(((3 ) 0) 1) eql [[1, 3], 1]", () => expect(firstFull).eql([[1, 3], 1]));
		it("needsSwap(((3 ) 0) 1) eql true", () => expect(checkNeedsSwap).eql(true));
		it("_1%(3 ) eql [[], [3]]", () => expect(negSplit).eql([[], [3]]));
		it("swap(((3 ) 0) 1) eql [[1, 3], 1]", () => expect(firstSwap).eql([[1, 3], 1]));
		it("(( ) 0)step3 eql [[3], 0]", () => expect(firstStep).eql([[3], 0]));
		it("((3 ) 0)step1 eql ((1 3) 1)", () => expect(secondStep).eql([[1, 3], 1]));
	});
});

describe("Problems 4", () => {
	describe(`"\\n"%._1%.([ .(].[.(\` ).[ [.#).^$).~.+$.""$.(" " "")@.("\\t" "")@."/*ts "+.+" */".{`, () => {
	/*ts
		interleave		"\n"%._1%.([ .(].[.(` ).[ [.#).^$).~.+$.""$
		solution		interleave.(" " "")@.("\t" "")@."/*ts "+.+" */".{
		data			"5
		+ 3
		* 7
		+ 10
		* 2
		* 3
		+ 1
		% 11"
		intermediate	interleave(data)
		result			solution(data)
	*/
		it("solved", () => expect(result).eql(1));
	});

	describe(`(8 )%.(4%._.(:(86400 3600 60 1).~.*$@.+$)@.-$.0:.(; ).(].].>0 .(].] #.-1.'(86400 3600 60 1)).(/$.[ %$))^.1%.].[@.""+)@." "$`, () => {
	/*ts
		divisors		(86400 3600 60 1)
		toSeconds		:divisors.~.*$@.+$
		fromSeconds		0:.(; ).(].].>0 .(].] #.-1.'divisors).(/$.[ %$))^.1%.].[@
		solution		(8 )%.(4%._.toSeconds@.-$.fromSeconds.""+)@." "$
		result			solution(1 0 0 0 2 3 4 5
5 3 23 22 24 4 20 45
8 4 6 47 9 11 51 13)
	*/
		it("solved", () => expect(result).eql("(1 3 4 5) (19 0 57 23) (1 7 44 26)"));
	});

	describe("(.(; ).(].!=1 ].((%2.=0 /2) *3.+1)?)^.#.-1)@", () => {
	/*ts
		collatz			.(; ).(].!=1 ].((%2.=0 /2) *3.+1)?)^
		solution		(collatz.#.-1)@
		result			solution(2 15 97)
	*/
		it("solved", () => expect(result).eql([1, 17, 118]));
	});
});

describe("Problems 3", () => {
	describe(`(4 )%.(.([ 1' .(.(] 1').-$ .(2' [).-$)./$).(] .(1' .(] [).*$).-$)." "$."("+.+")")@." "$`, () => {
	/*ts
		a			.(.(] 1').-$ .(2' [).-$)./$
		c			.(1' .(] [).*$).-$
		ac			.([ 1' a).(] c)
		solution	(4 )%.(ac." "$."("+.+")")@." "$.("_" "-")@
		result		solution(0 0 1 1
1 0 0 1)
	*/
		it("solved", () => expect(result).eql("(1 0) (-1 1)"));
	});
});

describe("Problems 2", () => {
	describe(`:,(.((:._,(.(-1.(; ) +1\`) ;).'$)\` 0\`^) ;).$$." "$`, () => {
	/*ts
		dummy			:,(.(:` 0`^) ;)
		returnPlusOne	+1`
		update			:._,(.(-1.(; ) +1`) ;).>$
		intermediateB	((update (0 0 0)) (3 2 1 2 3 1 1 1 1 3)),$$
		intermediate	(update (0 0 0))$(3 2 1 2 3 1 1 1 1 3)
		array			3,0`^
		arrayB			3.(; 0`^)
		solution		:,(.(update` 0`^) ;).$$." "$
		result			3solution(3 2 1 2 3 1 1 1 1 3)
	*/
		it("((update (0 0 0)) (3 2 1 2 3 1 1 1 1 3)).$$ eql [5, 2, 3]", () => expect(intermediateB).eql([5, 2, 3]));
		it("3.(; 0`^) eql [3, [0, 0, 0]]", () => expect(arrayB).eql([3, [0, 0, 0]]));
		it("3,0`^ eql [0, 0, 0]", () => expect(array).eql([0, 0, 0]));
		it("(:._,(.(-1.(; ) +1`) ;).'$ (0 0 0))$(3 2 1 2 3 1 1 1 1 3) eql [5, 2, 3]", () => expect(intermediate).eql([5, 2, 3]));
		it(":._,(.(-1.(; ) +1`) ;).'$([0, 0, 0], 3) eql [0, 0, 1]", () => expect(update([0, 0, 0], 3)).eql([0, 0, 1]));
		it("solved", () => expect(result).eql("5 2 3"));
	});

	describe("(+.*113.%10000007 0)$", () => {
	/*ts
		solution		(+.*113.%10000007 0)$
		result			solution(3 1 4 1 5 9)
	*/
		it("solved", () => expect(result).eql(8921379));
	});

	describe('_', () => {
	/*ts
		solution		_
		result			solution"four score and seven years ago"
	*/
		it("solved", () => expect(result).eql("oga sraey neves dna erocs ruof"));
	});

	describe('(*6.{"Math.floor".+1)@." "$', () => {
	/*ts
		solution		(*6.{"Math.floor".+1)@." "$
		result			solution(0.59558786964
0.861037873663
0.385597702116
0.246237673331
0.808033385314
0.0544673665427)
	*/
		it("solved", () => expect(result).eql("4 6 3 2 5 1"));
	});
});

describe("Problems", () => {
	describe(`_1%._.+$.=0%.1%.].(1%.].(+$ #)./$.{"Math.round")@`, () => {
	/*ts
		avg			.(+$ #)./$
		solution	_1%._.+$.=0%.1%.].(1%.].avg.{"Math.round")@
	*/
		it("solution([2, 3, 7, 0, 20, 10, 0, 1, 0]) eql [4, 15, 1]", () => expect(solution([2, 3, 7, 0, 20, 10, 0, 1, 0])).eql([4, 15, 1]));
	});

	describe('(.((].[.>0 ].[.(/10.{"Math.floor" %10))` .(.(; 0`) )).^$.1%.]._.]@.(; .(+1` #).^$).~.*$@.+$)@', () => {
	/*ts
		digits					.((].[.>0 ].[.(/10.{"Math.floor" %10))` .(.(; 0`) )).^$.1%.]._.]@
		weightedSumOfDigits		digits.(; .(+1` #).^$).~.*$@.+$
		solution				weightedSumOfDigits@
	*/
		it('solution([9, 15, 1776]) eql [9, 11, 60]', () => expect(solution([9, 15, 1776])).eql([9, 11, 60]));
	});

	describe('(2 )%.(,(; ^2)./$.((<18.5 "under"`) (<25 "normal"`) (<30 "over"`) "obese"`)?)@', () => {
	/*ts
		category		((<18.5 "under"`) (<25 "normal"`) (<30 "over"`) "obese"`)?
		bmi				,(; ^2)./$
		solution		(2 )%.(bmi.category)@
		example			solution(80 1.73 55 1.58 49 1.91)
	*/
		it("solution(80 1.73 55 1.58 49 1.91) eql ['over', 'normal', 'under']", () => expect(example).eql(["over", "normal", "under"]));
	});

	describe('(3 )%.(;<.2%,(+$ [).((!<$ 1`) 0`)?)@', () => {
	/*ts
		isValid			;<.2%,(+$ [).((!<$ 1`) 0`)?
		solution		(3 )%.isValid@
		example			solution(3 4 5 1 2 4)
	*/
		it("solution(3 4 5 1 2 4) eql [1, 0]", () => expect(example).eql([1, 0]));
	});

	describe("(3 )%.(;<.1')@", () => {
	/*ts
		solution		(3 )%.(;<.1')@
		example			solution(7 3 5 15 20 40 300 550 137)
	*/
		it("(3 )%.(;<.1')@(7 3 5 15 20 40 300 550 137) eql [5, 20, 300]", () => expect(example).eql([5, 20, 300]));
	});

	describe("(3 )%.(1%,([.+ ,(* ;).^$).@$.+$)@", () => {
	/*ts
		sequence		1%,([.+ ,(* ;).^$).@$
		solution		(3 )%.(sequence.+$)@
		intermediateD	,(* ;)
		intermediateC	,(* ;).^$
		intermediateB	(2* 3),^$
		intermediate	(2 3),(* ;),^$
	*/
		it(",(* ;).^$(2, 3) eql [0, 2, 4]", () => expect(intermediateC([2, 3])).eql([0, 2, 4]));
		it("(2* 3)^$ eql [0, 2, 4]", () => expect(intermediate).eql([0, 2, 4]));
		it("(2 3),(* ;).^$ eql [0, 2, 4]", () => expect(intermediate).eql([0, 2, 4]));
		it("1%,(+ ,(* ;).^$).@$([5, 2, 3]) eql [5, 7, 9]", () => expect(sequence([5, 2, 3])).eql([5, 7, 9]));
		it("solution([5, 2, 3, 3, 0, 10]) eql [21, 30]", () => expect(solution([5, 2, 3, 3, 0, 10])).eql([21, 30]));
	});

	// describe('(3 )%.(2%.([.*$ ]).+$.((].[.>0 ].[.(/10.{"Math.floor" %10))` .(.(; 0`) )).^$.]@.+$)@', () => {
	// /*ts
	// 	sumOfDigits		.((].[.>0 ].[.(/10.{"Math.floor" %10))` .(.(; 0`) )).^$.]@.+$
	// 	solution		(3 )%.(2%.([.*$ ]).+$.sumOfDigits)@
	// */
	// 	it('.((].>0 ]./10.{"Math.floor")` .(; )).^$.#(1492) eql 16', () => expect(sumOfDigits(1492)).eql(16));
	// 	it("solution([11,9,1,14,90,232,111,15,111]) eql [1, 16, 21]", () => expect(solution([11,9,1,14,90,232,111,15,111])).eql([1, 16, 21]));
	// });

	describe('"\n"%.(""%.(=@("a" "e" "i" "o" "u" "y"),|$)*.#)@', () => {
	/*ts
		isVowel		=@("a" "e" "i" "o" "u" "y"),|$
		solution	"\n"%.(""%.isVowel*.#)@
		result		solution"iorbikcgf qbh h gzpydg rmllrzctid g ensjvk
fryeietdjbibtpsmnuhsgoe    qqehovn z udcf kyucrrgylrbpm
k e fmcb kbo ldxxtioet kafcbotqlots  unnmwqyhae t
haucki sgnnu qxaifusappqveral ba fcejwwtllxsc
s bvycmvaharhmfqmzovilso f fivbwck jsggs  lczvzmvoham ozlp
plm tu dvspnmuytuutnzvuzhdohvqsmcgyihm ffizx y 
cnwbkabzdc ya rcmxgok gvxf eln  cdo dc nmbtmh
talbooo wzsred lipvyk hdvolq adjatquwsjtscmwmahqpfw 
gkh ueaujjid y zporznnlnicfjylolukxynzbijghplppbq  g
so u qczs ocs xsjucvkxh npxowdeqggssuorvv
epouhlyr qptwdltgjylylwxfaaivwxomzeoldsxaj x fs txrakpzvq
z wxnkwsmhif et upmvv tn fd bo bndydtiu 
 szf y dsdy e nkeoryhatsye cboth tsho r lxaprnywqxi
xxxeumhfncshemwy naf oagq c egmiflbhepsszlb
eecx dd ffsolojqho   obrqalpmssrwuqqgaeqfw
wzb hdhbwjjpykbvuaptxrlpel twrntqvjeywgigv mgohjoidavtpa
kvfbk z pemmkqz klslac emnahfavtv i  u ib psinyn
x    f jgb gipcfspsvkviwmvobophavpbqouy da h
u hsmfcjj ofbc xqht plhrrturnl rfvkxb  qohocrjbjwuv nf"
	*/
		it('"\\n"%.(""%.(=@("a" "e" "i" "o" "u" "y"),|$)*.#)@', () => expect(result).eql([6,14,12,12,10,11,6,12,13,8,14,7,14,10,10,12,10,9,6]));
	});

	describe('(-32./9.*5.{"Math.round")@', () => {
	/*ts
		solution	(-32./9.*5.{"Math.round")@
		result		solution(252 88 260 462 40 167 372 131 566 187 357 596 369 332 514 204 492 139 576 393 570 269 44 175 572 529 95 421 600 503 288 252 559 517 114 567 83 454)
	*/
		it('(-32./9.*5.{"Math.round")@', () => expect(result).eql([122,31,127,239,4,75,189,55,297,86,181,313,187,167,268,96,256,59,302,201,299,132,7,79,300,276,35,216,316,262,142,122,293,269,46,297,28,234]));
	});

	describe('(2 )%.(/$.{"Math.round")@', () => {
	/*ts
		solution	(2 )%.(/$.{"Math.round")@
		result		solution(5992507 247 3950322 866 3446203 4385519 14 4 7373253 370 5624298 _3125699 844559 _1690772 6877455 801 14 4 6667 1730 _3888168 _1150238 10341 1540 14425 1016 1220338 1020425 16783 896 5 2 5665515 633 15265 858 3064099 _108763 _6899092 1557793 1665442 4613709 8139 972 6009446 _4909093 50 4 7882577 _1310345 18045 1188 3 2 1012452 2143361 17667 988 3638032 523 28 8)
	*/
		it('(2 )%.(/$.{"Math.round")@', () => expect(result).eql([24261,4562,1,4,19928,-2,-0,8586,4,4,3,7,14,1,19,3,8950,18,-28,-4,0,8,-1,13,-6,15,2,0,18,6956,4]));
	});

	describe(';<.(] [)', () => {
	/*ts
		solution	;<.(] [)
		result		solution(_10632 5581 _42270 31268 77120 32680 _13419 _39979 10007 29274 _27131 _78780 36696 28024 29786 72263 41564 _53871 57484 _8013 _31163 50889 26073 _39717 _27047 _64555 _58483 _70906 35999 16182 48081 _54633 _58237 _74189 56634 _61117 38491 _36785 _21096 _31502 72489 31773 _30283 29186 _20203 79503 21449 _58639 _54368 _1067 13348 _5531 _30178 _40579 34752 22775 _25135 56268 31869 _69135 _7550 _50 _43769 14213 5761 _67134 33096 _35748 _23919 _67999 12749 _31430 43773 62465 77755 _56429 61969 19205 _35068 _72398 _61862 58279 2070 _12040 _62299 _43178 _69265 _7434 _66909 42603 3430 5541 _37446 39661 _60246 48314 52526 52850 _67434 _51393 64850 25315 _2824 28624 7781 _5068 52195 _10250 _65863 _62873 _2649 _47726 75406 79421 20234 _66892 _43756 30969 5673 _30666 _6427 _70896 54875 36126 48764 74628 4441 21290 47479 17006 49896 32329 _37678 _32927 _19046 50102 42004 _46851 _40148 56140 _29725 37203 _71585 _34318 36624 28649 _21211 72867 _20382 64462 _37799 53191 73565 _62924 9317 42329 _68295 _66242 _16380 59183 30764 _46484 11513 73085 589 72466 43188 _37407 _54385 _76960 _61266 _4110 40242 _52851 41572 _3134 55797 _59639 _10267 _44584 _75177 31934 _71393 78387 49010 17924 40717 60714 31682 _55663 39898 _17553 _22147 _28588 _24468 58441 _36122 _61280 _58965 _10507 _58240 _40231 65383 62002 _13083 26955 _21131 _37285 47316 48601 _1869 52138 536 6738 50526 _30454 _55338 11244 _49739 56344 35580 70159 _41209 _66567 _38429 14323 71874 5449 33043 _67091 74942 54803 _27323 60325 36805 39594 7281 _64326 _77691 _25403 64275 439 _53264 _15188 _72823 77262 34357 _48161 8506 64618 _71816 _35914 54777 _33026 _22481 _63651 61297 _30607 21797 14340 _17698 16739 _10857 34979 _2935 _54051 _5427 _75653 _38378 _3118 _21056 _54102 77321 5680 10709 _75501 2942 _34933 _43663 _68552 _50315 _35480 _24466 _75537 11494 33053 _59189 _7209 _77553 42608 _72868 _15252 _20652 _3726 _60272 56413 22222 14301 60759 63844)
	*/
		it(";<.(] [)", () => expect(result).eql([79503,-78780]));
	});

	describe("(3 )%.(;<.[)@", () => {
	/*ts
		solution	(3 )%.(;<.[)@
		result		solution(_5736433 _6507265 4137218 6934565 315940 4290973 _6640420 9140331 8243864 _2183497 834907 _8304631 _8474017 _360798 _7496087 _8303239 _6336871 708034 3997681 7011683 6556172 _6565027 _7931546 _3105172 _4844364 4159534 2102511 8941524 _3033595 _7028141 _7500216 1229971 _3535406 6637001 _1835463 6780533 927975 1524117 5920864 _828160 9340620 _3244229 867208 _9133397 6394972 3371121 _7436637 _9941898 _5920844 6561044 7069785 _9364672 9996016 9138238 _2469845 _4848348 3297772 9632666 _5906823 _9735822 _7395474 _3407040 1494149)
	*/
		it("(3 )%.(;<.[)@", () => expect(result).eql([-6507265,315940,-6640420,-8304631,-8474017,-8303239,3997681,-7931546,-4844364,-7028141,-7500216,-1835463,927975,-3244229,-9133397,-9941898,-5920844,-9364672,-4848348,-9735822,-7395474]));
	});


	describe("(2 )%.(;<.[)@", () => {
	/*ts
		solution	(2 )%.(;<.[)@
		result		solution(9832798 _4814536 8819877 _4120785 2761394 1311039 _3452954 2096241 _4270034 4918540 6331564 _6412346 7224917 6039577 _224011 _7868812 _454871 2454591 _8805254 4751352 1653735 1011844 4677861 6966042 _1014686 _5824679 _8838357 9153809 _6382937 3876611 1434699 _6550138 9062074 254576 _670924 1823468 _8434384 5876121 _6080291 _2704418 794661 _9748726 883235 _1980421 6290850 _9340775 150767 _4164020 3113815 1345512 _9412667 _5232450)
	*/
		it("(2 )%.(;<.[)@", () => expect(result).eql([-4814536,-4120785,1311039,-3452954,-4270034,-6412346,6039577,-7868812,-454871,-8805254,1011844,4677861,-5824679,-8838357,-6382937,-6550138,254576,-670924,-8434384,-6080291,-9748726,-1980421,-9340775,-4164020,1345512,-9412667]));
	});

	describe("%.+$@", () => {
	/*ts
		result		(992270 350010 456747 303770 248390 607460 969243 71786 369004 627666 823332 538815 83603 449626 692531 363364 718618 390143 114018 50275 954460 204997 249325 963654 304556 945257 929184 969612 355572 729079),((2 )%.+$@)
	*/
		it("(2 )%.+$@", () => expect(result).eql([1342280,760517,855850,1041029,996670,1362147,533229,1055895,1108761,164293,1159457,1212979,1249813,1898796,1084651]));
	});

	describe("+$", () => {
	/*ts
		result		+$(968 868 72 712 1022 1278 685 851 671 947 195 1181 380 465 1239 1053 1168 1206 904 925 136 1034 1284 363 416 1250 1094 1201 390 37 647 58 895 710 761 617 687 145 167 57 1083)
	*/
		it("+$", () => expect(result).eql(29822));
	});
});

};