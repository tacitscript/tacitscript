import ts from "tacitscript";

const {expect} = chai;

export default () => {
	describe("Problems", () => {

		describe("97", () => {
			/*ts
				possNoOfPigs	.(_.-$./2.>,(].) (].+1)`).^(1 )
				girls			.([.[ ].*4).-$./2
				n				,(_.-$ *2)./$.+2
				isPosInteger	.(>0 .(; 0').=$).&$
				filter			:.(n girls).isPosInteger@.&$
				solutions		.(filter possNoOfPigs).?$.#
				solution		(2 )%.solutions@." "$
				result			solution(6 10
26 136
106 336
200 500)
				answer			solution(80 290
178 260
30 162
130 380
108 300
34 202
1204 1964
260 956
124 460
320 420
8 22
40 136
378 706
572 1090
78 398)
			*/
			it("solved", () => expect(result).eql("1 2 3 9"));
			it("filter test", () => expect(filter([6, 10], 2)).eql(false));
			it("filter test 2", () => expect(filter([6, 10], 1)).eql(true));
			it("girls test", () => expect(girls([[6, 10], 2])).eql(-1));
			it("possNoOfPigs test", () => expect(possNoOfPigs([6, 10])).eql([1, 2]));
			it("answer", () => expect(answer).eql("5 2 4 3 9 6 11 8 12 6 1 6 5 3 7"));
		});

		describe("135", () => {
			/*ts
				table			\((" " "11") ("t" "1001") ("n" "10000") ("s" "0101") ("r" "01000") ("d" "00101") ("!" "001000")
								("c" "000101") ("m" "000011") ("g" "0000100") ("b" "0000010") ("v" "00000001") ("k" "0000000001") ("q" "000000000001")
								("e" "101") ("o" "10001") ("a" "011") ("i" "01001") ("h" "0011") ("l" "001001") ("u" "00011")
								("f" "000100") ("p" "0000101") ("w" "0000011") ("y" "0000001") ("j" "000000001") ("x" "00000000001") ("z" "000000000000"))
				hex				""%"0123456789ABCDEF"
				padRight		:.(] ,(; #).-$.((=0 ""`) "0"`^.+$)?).+$
				charToHex		_.""%.(0+@ #.2^^).*$.*$@.+$.'hex
				byteToHex		(4 )%.charToHex@.+$
				solution		""%.'table@.+$.(8 )%.(8padRight.byteToHex)@." "$
				result			solution"entertaining interpreter"
				answer			solution"may define a !tyrant is unfit to be the ruler of a free people !nor have !we !he has abdicated !government here by declaring us out of his !protection and its foundation on such principles and organizing its powers in such form"
			*/
			it("solved", () => expect(result).eql("B0 9A 89 69 82 60 13 4C 26 A0 2A 2C D4 00"));
			it("byteToHex test", () => expect(byteToHex("00101010")).eql("2A"));
			it("charToHex test", () => expect(charToHex("1010")).eql("A"));
			it("padRight test", () => expect(padRight(8, "123")).eql("12300000"));
			it("answer", () => expect(answer).eql("0D 81 CB 44 4C 2E F2 24 0A 1C 27 4A E3 80 89 9E 63 82 BC 9D D0 32 6A 38 89 BC 44 5B 85 B1 0A 4D C8 84 51 9B 01 B9 00 EE 41 DC DA EC 11 52 2B 9A 5C 80 91 01 A8 80 76 13 9D 45 C1 01 CB 45 25 A1 30 09 8D 78 8E 78 89 9A 57 20 2A 23 34 59 4C 61 B8 17 4C AE 24 47 02 B9 4C 61 C6 1A 8C 53 C2 A1 30 15 21 49 AB B8 17 8A 02 38 24 00 13 00 9A 65 70 B1 07 50 BA 61 A8 C5 3C 48 A0 30"));
		});

		describe("105", () => {
			/*ts
				semiPerimeter	+$./2
				area			.(.(semiPerimeter ) ;).+$.([ .([ 1').-$ .([ 2').-$ .([ ]).-$).*$.^0.5
				length			*$.(-$.^2)@.+$.^0.5
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
				answer			solution(4862 55
7238 1125
7757 1509
9652 5057
9673 6053
7481 9281
4021 9901
2580 8120
1950 7216
1115 3147
1206 2089
2890 517)
	*/
			it("solved", () => expect(result).eql(3274.5));
			it("sextets test", () => expect(sextets([[0, 1], [2, 3], [4, 5], [6, 7], [8, 9]])).eql([[0, 1, 2, 3, 4, 5], [0, 1, 4, 5, 6, 7], [0, 1, 6, 7, 8, 9]]));
			it("extract test", () => expect(extract([0, 2, 3], [[0, 1], [2, 3], [4, 5], [6, 7]])).eql([[0, 1], [4, 5], [6, 7]]));
			it("indices test", () => expect(indices(5)).eql([[0, 1, 2], [0, 2, 3], [0, 3, 4]]));
			it("answer", () => expect(answer).eql(60712662.00000001));
		});

		describe("73", () => {
			/*ts
				angle			60/180*({"Math.PI")
				x				angle,{"Math.cos"
				y				angle,{"Math.sin"
				move			\(("A" (1 0)) ("B" (x y)) ("C" (_x y)) ("D" (_1 0)) ("E" (_x _y)) ("F" (x _y)))
				dist			^2@.+$.^0.5
				line			""%.'move@.(*.{@)$.+$@.dist.8'
				solution		"\n"%.line@." "$
				result			solution"AABF
FEDCBA
BCB"
				answer			solution"CADDABEADCCBFAECF
FEACDBEADCEBFEBBFBACAACFFAADBAA
FDBABFACBB
ACEBFCCDFCBAEEEF
CDEDEEDDDCDBDFDBEAAFBABFCBFE
EFACDCFABEBCACCEEDEFCCA
EAEBFCBFDABABBD
BBFAAAFEBAAFDAEC
DEAEDFEFECEEFEBAAAFCBEAA
FACBFFDBAFCADBAB
CCFFAFFDADFEFFDDDDFC
EEDCBCFAEFEBAAFBBC
BBCCDEEBBBDECDEBDFEEDFAEACE
AADBCDAACA
EEFFCDCEDEDFBFEEDDDBDA"
			*/
			it("solved", () => expect(result).eql("3 0 2.64575131"));
			it("answer", () => expect(answer).eql("1.73205081 7.54983444 4.35889894 1 4.58257569 1.73205081 3.46410162 6.55743852 7.21110255 5.29150262 5.56776436 2 5 3.60555128 8.71779789"));
		});

		describe("172", () => {
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
				answer			solution(962 23.5884 51.7127
1736 26.3361 63.4349
3139 24.9444 62.9817
765 33.3475 52.4178
632 33.3449 60.7830
2703 26.4518 62.5325
634 28.3942 56.5587
1132 29.1899 59.4761
2360 22.9661 59.8889
2009 22.5341 62.5154
654 35.7369 65.3231
1208 33.5180 54.2362
1472 30.3244 67.6860
1017 31.6808 54.2328
701 34.4002 64.8106
2519 23.6819 52.7722
1056 26.0067 65.3289
1356 29.3270 53.8830
1169 30.3134 53.4893)
			*/
			it("solved", () => expect(result).eql("1207 1609 1163"));
			it("answer", () => expect(answer).eql("641 1142 1914 1020 658 1814 533 943 1326 1063 703 1530 1133 1130 708 1657 664 1291 1205"));
		});

		describe("74", () => {
			/*ts
				pi				{"Math.PI"
				sin				{"Math.sin"
				cos				{"Math.cos"
				hours			,(%12.*pi./6 /360.*pi).+$.(sin.*6.+10 cos.*6.+10)
				minutes			]./30.*pi.(sin.*9.+10 cos.*9.+10)
				positions		":"%.0+@.(hours minutes).+$
				solution		" "%.positions@.+$." "$
				result			solution"12:00 15:00 09:30"
				answer			solution"09:17 22:10 16:23 23:03 18:49 04:40 09:42 14:02"
			*/
			it("solved", () => expect(result).eql("10 16 10 19 16 10 10 19 4.20444504226559 11.552914270615123 10.000000000000002 1"));
			it("answer", () => expect(answer).eql("4.065904819828498 10.88685646677766 18.80332840660425 8.128794782640167 5.085087734266049 13.441458618106276 17.794228634059948 14.5 14.493734324734014 6.024279710705576 16.02217545722972 3.311696570703451 7.137047438442348 15.27290267597179 12.781152949374526 18.559508646656383 7.511840544062566 4.540232374740741 1.77809088121659 13.660629787682197 13.856725658119236 5.403733341286133 2.2057713659400546 5.4999999999999964 4.398517441016789 12.150207697271803 1.440491353343619 7.218847050625472 15.247718242836374 12.908857721478022 11.871205217359833 18.80332840660425"));
		});

		describe("80", () => {
			/*ts
				chance			/100@.([ 1-@.*$.1-.1/).*$.100*.0'
				solution		(2 )%.chance@." "$
				result			solution(30 50
20 15)
				answer			solution(66 38
58 54
30 77
58 64
22 36
80 47
80 51
69 70
75 29
34 20
48 23
67 55
12 60
30 73
65 75
68 33
26 71
68 73
76 36
34 63
53 54
35 10
86 81
49 61
38 38
35 29
61 10
11 54
66 78
30 34)
			*/
			it("solved", () => expect(result).eql("46 63"));
			it("answer", () => expect(answer).eql("84 72 36 68 44 89 89 76 91 72 80 79 19 37 71 87 33 74 90 45 68 84 88 61 62 65 94 19 71 56"));
		});

		describe("59", () => {
			/*ts
				hint			:.(""%@.*$.=$@ ,(~@ ""%).@$).(((; 1`) 0`)?@.+$)@.([ _.-$)."-"$
				solution		"\n"%." "%@,([.(hint ).[ ;).@$." "$
				result			solution("1492 5
	2013 1865 1234 4321 7491")
				answer			solution"4237 15
	9627 2768 7639 0284 8609 7962 7948 0792 4089 8926 7382 0682 3946 9267 9236"
			*/
			it('hint("1234", "5678") eql "0-0"', () => expect(hint("1234", "5678")).eql("0-0"));
			it('hint("1492", "7491") eql "2-1"', () => expect(hint("1492", "7491")).eql("2-1"));
			it("solved", () => expect(result).eql("0-2 1-0 1-2 0-3 2-1"));
			it("answer", () => expect(answer).eql("1-1 0-2 1-1 1-1 0-0 0-2 0-2 0-2 1-0 0-1 0-3 0-1 0-2 2-0 2-0"));
		});

		describe("134", () => {
			/*ts
				boundLeft		(([.[.<0 ((0 0) 1`)>.((2 0) _1*)>) ;)?
				boundTop		(([.].<0 ((0 1) 1`)>.((2 1) _1*)>) ;)?
				boundRight		((.([.[ 1'.[).=$ ((0 0) -2)>.((2 0) _1*)>) ;)?
				boundBottom		((.([.] 1'.]).=$ ((0 1) -2)>.((2 1) _1*)>) ;)?
				bound			boundLeft.boundTop.boundRight.boundBottom.([ ])
				nextPosAndDir	:.(].*$.+$@ [.(.([ ]).-$.+1 1') ].]).bound
				next			nextPosAndDir,(].)
				start			(((0 0) (1 1)) )
				whileCond		#.<101
				solution		.(.(whileCond` next) start`).^$.[@.+$." "$
				result			solution(9 3 4)
				answer			solution(41 19 4)
			*/
			it("solved", () => expect(result).eql("0 0 1 1 2 2 3 1 4 0 5 1 4 2 3 1 2 0 1 1 0 2 1 1 2 0 3 1 4 2 5 1 4 0 3 1 2 2 1 1 0 0 1 1 2 2 3 1 4 0 5 1 4 2 3 1 2 0 1 1 0 2 1 1 2 0 3 1 4 2 5 1 4 0 3 1 2 2 1 1 0 0 1 1 2 2 3 1 4 0 5 1 4 2 3 1 2 0 1 1 0 2 1 1 2 0 3 1 4 2 5 1 4 0 3 1 2 2 1 1 0 0 1 1 2 2 3 1 4 0 5 1 4 2 3 1 2 0 1 1 0 2 1 1 2 0 3 1 4 2 5 1 4 0 3 1 2 2 1 1 0 0 1 1 2 2 3 1 4 0 5 1 4 2 3 1 2 0 1 1 0 2 1 1 2 0 3 1 4 2 5 1 4 0 3 1 2 2 1 1 0 0"));
			it("nextPosAndDir test", () => expect(nextPosAndDir([5, 6, 3], [[0, 0], [1, 1]])).eql([[1, 1], [1, 1]]));
			it("bound test 1", () => expect(bound([[-1, -1], [5, 5], [-1, -1]])).eql([[1, 1], [1, 1]]));
			it("bound test 2", () => expect(bound([[-1, 5], [5, 5], [-1, 1]])).eql([[1, 3], [1, -1]]));
			it("bound test 3", () => expect(bound([[5, -1], [5, 5], [1, -1]])).eql([[3, 1], [-1, 1]]));
			it("bound test 4", () => expect(bound([[5, 5], [5, 5], [1, 1]])).eql([[3, 3], [-1, -1]]));
			it("nextPosAndDir test 2", () => expect(nextPosAndDir([9, 3, 4], [[2, 2], [1, 1]])).eql([[3, 1], [1, -1]]));
			it("answer", () => expect(answer).eql("0 0 1 1 2 2 3 3 4 4 5 5 6 6 7 7 8 8 9 9 10 10 11 11 12 12 13 13 14 14 15 15 16 16 17 17 18 18 19 17 20 16 21 15 22 14 23 13 24 12 25 11 26 10 27 9 28 8 29 7 30 6 31 5 32 4 33 3 34 2 35 1 36 0 37 1 36 2 35 3 34 4 33 5 32 6 31 7 30 8 29 9 28 10 27 11 26 12 25 13 24 14 23 15 22 16 21 17 20 18 19 17 18 16 17 15 16 14 15 13 14 12 13 11 12 10 11 9 10 8 9 7 8 6 7 5 6 4 5 3 4 2 3 1 2 0 1 1 0 2 1 3 2 4 3 5 4 6 5 7 6 8 7 9 8 10 9 11 10 12 11 13 12 14 13 15 14 16 15 17 16 18 17 17 18 16 19 15 20 14 21 13 22 12 23 11 24 10 25 9 26 8"));
		});

		describe("171", () => {
			/*ts
				pi				{"Math.PI"
				height			,([ -90.*pi./180.{"Math.tan").*$.0'
				solution		(2 )%.height@." "$
				result			solution(71 134.182
	47 139.994
	121 109.983)
				answer			solution(175 110.950
	33 139.764
	51 117.897
	65 118.980
	99 122.057
	17 136.637
	49 116.095
	104 111.038
	53 135.000
	73 106.049
	51 117.897
	84 128.991
	53 130.956)
			*/
			it("solved", () => expect(result).eql("69 56 44"));
			it("answer", () => expect(answer).eql("67 39 27 36 62 18 24 40 53 21 27 68 46"));
		});

		describe("further very high order operators", () => {
			/*ts
				lengthPlusAU	#.:.+$./2
				lengthPlusbAU	#.+./2
				// temp			+,(#.).+1
			*/
			it("lengthPlusANN", () => expect(lengthPlusAU([1, 2, 3, 4], 2)).eql(3));
			it("lengthPlusbANN", () => expect(lengthPlusbAU([1, 2, 3, 4], 2)).eql(3));
			// it("inversion", () => expect(temp(2)([1, 2, 3])).eql(6));
		});

		describe("39", () => {
			/*ts
				mean			.(+$ #)./$
				std				.(mean.-.^2 ;).@$.mean.^0.5
				buy				.(std mean.*0.04).>$
				process			" "%.1%,(; 0+@.buy)
				solution		"\n"%.process@.]?.([.[)@." "$
				result			solution"JOOG 99 99 99 99 99 99 99 101 101 101 101 101 101 101
GOLD 95 105 95 105 95 105 95 105 95 105 95 105 95 105"
				answer			solution"GOLD 21 19 17 21 19 15 11 12 9 13 15 16 20 22
PNSN 102 104 107 110 112 113 114 116 118 121 123 121 123 121
FOTA 44 41 40 37 38 41 43 47 51 55 51 48 49 47
ZEOD 174 171 173 173 173 172 170 166 169 165 163 165 164 168
GEEK 47 49 51 49 51 49 50 50 52 50 52 54 56 56
SLVR 24 23 22 23 24 25 26 26 27 26 26 27 27 26
SUGR 173 173 170 166 170 171 171 168 169 172 172 170 168 171
YUKA 72 72 73 74 73 72 72 73 72 73 74 74 75 76
MARU 51 49 49 48 44 46 42 39 43 40 36 37 40 44
FANT 108 109 111 111 113 111 112 113 111 109 110 112 115 114
INSX 32 30 32 30 28 30 28 27 28 29 30 30 30 30
MYTH 23 24 25 26 27 26 27 28 27 26 26 25 24 23
FLNT 25 25 28 25 24 25 24 26 23 27 23 24 23 20
IMIX 50 50 50 51 52 53 52 53 52 53 53 52 52 52
VDKL 38 40 39 40 41 41 41 40 40 38 40 42 43 45
CKCL 69 67 66 63 66 65 63 61 64 66 64 66 68 67
OBAM 65 64 65 67 66 68 67 66 65 63 61 59 61 60
BLEP 112 109 106 104 107 108 106 106 109 112 110 107 110 108"
			*/
			it("solved", () => expect(result).eql("GOLD"));
			it("std test", () => expect(Math.round(std([2500, 250, 250]))).eql(1061));
			it("answer", () => expect(answer).eql("GOLD PNSN FOTA GEEK SLVR MARU INSX MYTH FLNT VDKL OBAM"));
		});
	

	describe("75", () => {
		/*ts
			any					?.#.>0
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
			result				s	describe("further very high order operators", () => {
		/*ts
			lengthPlusAU	#.:.+$./2
			lengthPlusbAU	#.+./2
			// temp			+,(#.).+1
		*/
		it("lengthPlusANN", () => expect(lengthPlusAU([1, 2, 3, 4], 2)).eql(3));
		it("lengthPlusbANN", () => expect(lengthPlusbAU([1, 2, 3, 4], 2)).eql(3));
		// it("inversion", () => expect(temp(2)([1, 2, 3])).eql(6));
	});

	describe("39", () => {
		/*ts
			mean			.(+$ #)./$
			std				.(mean.-.^2 ;).@$.mean.^0.5
			buy				.(std mean.*0.04).>$
			process			" "%.1%,(; 0+@.buy)
			solution		"\n"%.process@.]?.([.[)@." "$
			result			solution"JOOG 99 99 99 99 99 99 99 101 101 101 101 101 101 101
GOLD 95 105 95 105 95 105 95 105 95 105 95 105 95 105"
			answer			solution"GOLD 21 19 17 21 19 15 11 12 9 13 15 16 20 22
PNSN 102 104 107 110 112 113 114 116 118 121 123 121 123 121
FOTA 44 41 40 37 38 41 43 47 51 55 51 48 49 47
ZEOD 174 171 173 173 173 172 170 166 169 165 163 165 164 168
GEEK 47 49 51 49 51 49 50 50 52 50 52 54 56 56
SLVR 24 23 22 23 24 25 26 26 27 26 26 27 27 26
SUGR 173 173 170 166 170 171 171 168 169 172 172 170 168 171
YUKA 72 72 73 74 73 72 72 73 72 73 74 74 75 76
MARU 51 49 49 48 44 46 42 39 43 40 36 37 40 44
FANT 108 109 111 111 113 111 112 113 111 109 110 112 115 114
INSX 32 30 32 30 28 30 28 27 28 29 30 30 30 30
MYTH 23 24 25 26 27 26 27 28 27 26 26 25 24 23
FLNT 25 25 28 25 24 25 24 26 23 27 23 24 23 20
IMIX 50 50 50 51 52 53 52 53 52 53 53 52 52 52
VDKL 38 40 39 40 41 41 41 40 40 38 40 42 43 45
CKCL 69 67 66 63 66 65 63 61 64 66 64 66 68 67
OBAM 65 64 65 67 66 68 67 66 65 63 61 59 61 60
BLEP 112 109 106 104 107 108 106 106 109 112 110 107 110 108"
		*/
		it("solved", () => expect(result).eql("GOLD"));
		it("std test", () => expect(Math.round(std([2500, 250, 250]))).eql(1061));
		it("answer", () => expect(answer).eql("GOLD PNSN FOTA GEEK SLVR MARU INSX MYTH FLNT VDKL OBAM"));
	});

6 1 3 6 5
2 4 3 4 6)
		*/
		it("solved", () => expect(result).eql("pair full-house small-straight"));
		it("answer", () => expect(answer).eql("pair four two-pairs big-straight small-straight big-straight three none pair pair small-straight pair small-straight small-straight pair big-straight three yacht big-straight big-straight small-straight pair small-straight small-straight small-straight pair pair"));
	});

		describe("72", () => {
			/*ts
				check			].+1.>,(#.)
				iterate			.([.* 1'.+ 2'.~%).(.$).(].)
				random			.(.(check iterate) .(3' )).^$.1%.]
				params			(445 700001 2097152)
				randoms			:.params:.+$.random
				consonants		""%"bcdfghjklmnprstvwxz"
				vowels			""%"aeiou"
				consonant		%19.'consonants
				vowel			%5.'vowels
				letter			((].%2.=0 [.consonant) [.vowel)?
				word			.(; #.;^).*$.letter@.""$
				solutions		:.(] ,(; +$).randoms$).%$.word@." "$
				result			0solutions(4 5 6)
				resultb			2014solutions(9 9 9 9)
				answer			954635solutions(3 7 4 8 5 3 7 3 7 6 5 4 7 6 6 7 3 3 7 6 4)
			*/
			it("solved", () => expect(result).eql("fami wovaw kelasi"));
			it("solved2", () => expect(resultb).eql("foravanad zibecefeb wagabenip wedivonow"));
			it("answer", () => expect(answer).eql("sek keniziw kupe vakelavo winoz pix warefos buw jinuguw saxixi porap sepe bevawuk tafaro xagoge xuvovom fuc wit sacapof cagisa fota"));
		});

		describe("46", () => {
			/*ts
				sequences		.(~%.[ #.+1^).@$
				turnNumber		:,(+,(*2.) #).^$
				trials			:.(].sequences turnNumber$).*$
				wins			(3 )%"123456789147258369159357",(""%.@@.&$)@
				hasWon			.(, ).[.@wins.|$
				moves			" "%.(; #.;^).*$.((].%2.=0)? (].%2.=1)?).[@@.((1 2)` ;).*$
				tests			moves.trials$@.+$.]<
				turnWon			tests.([.hasWon)'.((; ]) 0`)?
				solution		"\n"%.turnWon@." "$
				result			solution"7 5 4 1 9 2 8 3 6
5 1 3 7 6 4 2 9 8
5 1 2 8 6 4 7 3 9"
				answer			solution"2 1 3 8 7 9 6 4 5
7 5 8 9 1 2 4 3 6
2 5 7 6 9 4 1 8 3
9 2 6 1 3 4 7 8 5
7 1 4 2 9 5 6 3 8
4 6 7 3 1 2 5 9 8
6 8 2 7 3 9 4 1 5
5 1 3 4 8 9 2 7 6
4 8 1 2 6 9 3 7 5
1 6 9 5 7 8 2 4 3
2 4 1 5 9 3 7 6 8
5 9 7 3 2 4 8 6 1
6 4 3 8 7 2 1 9 5
5 4 9 6 8 1 2 3 7
3 1 4 8 5 2 7 6 9
3 7 2 4 8 5 6 9 1"
			*/
			it("answer", () => expect(answer).eql("9 7 6 5 8 5 6 7 8 8 8 7 9 7 7 9"));
		});

		describe("45", () => {
			/*ts
				ranks			""%"A23456789TJQK"
				suits			""%"CDHS"
				cards			(+,@ranks)@suits,+$																this is interesting!
				swap			:,(;<.([ 1` _.-$.-1 1` 0`) +(0 )).%$.([ 3' 2' 1' ]).+$._1%.[
				swapIndices		.(%52@ (;^52)`).*$.!=$?															final clause to remove duplicates
				shuffle			:._.swap$
				solution		.((shuffle cards)` swapIndices).$$." "$
				result			solution(5814 1316 2080 2712 0 647 8098 315 44 6354 7867 100 61 763 6731 685 42 9309 569 92 701 562
85 8311 698 220 929 71 684 518 113 61 19 168 745 16 655 9548 6018 2686 25 785 81 721
964 85 44 614 4 509 8708 19)
				answer			solution(88 35 899 693 1679 774 4484 2184 12 271 70 26 379 419 3787 350 7079 8888 4382 5799 3058 6127 12 5285 1703 6569 3394 8891 8689 8104 2213 86 7596 9067 5741 88 280 620 870 90 6980 917 43 7016 8 64 77 96 659 12 856 503)
			*/
			it("solved", () => expect(result).eql("C5 D5 S4 C8 CQ S3 HK C9 H3 H6 D3 ST DT HT C6 CK DA H9 SJ SK DK C2 DQ S5 H4 D7 S7 S2 C4 D9 CT HJ HQ D2 SA CA H5 H2 C7 D4 CJ D6 S9 HA S8 D8 S6 SQ C3 DJ H8 H7"));
			it("swap test 1", () => expect(swap([5, 2], [1, 2, 3, 4, 5, 6, 7, 8])).eql([1, 2, 6, 4, 5, 3, 7, 8]));
			it("swap test 2", () => expect(swap([0, 3], [1, 2, 3, 4, 5, 6, 7, 8])).eql([4, 2, 3, 1, 5, 6, 7, 8]));
			it("swap test 3", () => expect(swap([3, 7], [1, 2, 3, 4, 5, 6, 7, 8])).eql([1, 2, 3, 8, 5, 6, 7, 4]));
			it("answer", () => expect(answer).eql("C8 HT D3 DA H7 H3 CK D4 H4 CQ D6 HA SJ D5 CT HK HJ DK S5 DJ C2 H6 C5 H8 SQ C6 CJ SK S8 H5 S6 H9 C3 S3 D2 D7 S4 C4 DQ C9 DT H2 D9 HQ S9 S2 ST C7 CA S7 SA D8"));
		});

		describe("37", () => {
			/*ts
				term			1'.(/1200).1+.1/
				denominator		.(term.^ ].+1^).@$.+$
				solution		.([ denominator)./$.]
				result			solution(800000 6 103)
				answer			solution(3300000 9 84)
			*/
			it("solved", () => expect(result).eql(9957));
			it("answer", () => expect(answer).eql(53094));
		});

		describe("120", () => {
			/*ts
				swapLast		:.%$.([ ].1%.].((#.<2 ;) _1%._.+$)?).+$
				maxIndex		.(; #.;^).*$.[<.].]
				process			].[.(maxIndex ;).(swapLast$ [)
				check			].[.#.>1
				solution		.(.(; 0`) ).(check process)^.]@.1%.]." "$
				result			solution(31 41 59 26 53 58)
				answer			solution(199 101 191 60 47 6 164 198 106 90 66 103 185 51 41 5 154 7 176 178 24 175 189 167 48 169 70 139 14 79 129 58 126 49 171 197 77 29 87 107 91 82 190 61 166 184 120 97 67 38 59 69 33 25 52 73 8 4 84 37 86 30 65 94 45 104 149 78 76 44 98 57 46 99 81 108 168 145 18 71 152 160 141 88 109 182 72 68 134 137 105 43 40 127 17 123 138 116 135 56 114 122 93 31 186 153 100 21 16 9 75 11 151 133 55 13 172 80 121 156 117 3 150 162 159 39 95 187 89)
			*/
			it("solved", () => expect(result).eql("2 2 2 1 0"))
			it("answer", () => expect(answer).eql("0 7 35 2 42 22 7 104 12 45 85 19 18 21 18 34 25 76 23 44 6 22 81 42 45 16 42 80 25 7 66 77 82 27 82 89 66 88 34 30 30 32 27 80 80 46 12 77 25 25 75 39 8 34 65 11 1 39 11 11 47 35 63 42 40 9 0 46 38 38 58 41 42 19 29 35 36 47 23 19 27 25 26 25 32 27 10 0 27 3 23 31 3 7 18 29 13 29 24 4 1 27 11 24 14 9 2 19 9 3 16 11 4 7 9 2 4 4 6 1 3 3 2 2 4 2 2 0"))
		});

		describe("53", () => {
			/*ts
				map				(""%"abcdefgh" +1^8),*$,\
				coord			""%,('map 0+)
				coords			" "%.coord@
				sameRow			]@.=$
				sameColumn		[@.=$
				diagonal		*$.(-$.#)@.=$
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
				answer			solution"b5 d4
f2 e1
h3 a7
a7 f6
e3 e2
b4 e5
h2 g3
a4 b6
e5 h7
h2 d1
b4 b6
d1 b2
b8 d3
f2 d1
e4 d3
a5 c5
e4 d2
g5 f8
c2 e6
f6 c2
f8 e5
h8 e4
b7 f3
d3 f2"
			*/
			it("solved", () => expect(result).eql("Y Y Y Y N N N N"));
			it("answer", () => expect(answer).eql("N Y N N Y N Y N N N Y N N N Y Y N N N N N N Y N"));
		});

		describe("leftpad", () => {
			/*ts
				leftpad		:.:.:({.(.(1'.` .([ ].#).-$).^$.""$ ]).+$).(.$)
				result		(8leftpad"0")"111"
			*/
			it("result", () => expect(result).eql("00000111"));
		});

		describe("33", () => {
			/*ts
				leftPad			:.(.([ ].#).-$."0"`^.""$ ]).+$
				toBinary		.((].[.>0 ].[.(/2.[ %2))` .(.(; 0`) )).^$.1%.]._.]@.""$.8leftPad
				numOfBits		""%.0+@.+$
				decodeBinary	toBinary.(; numOfBits).((].%2.=0 [.1%.]) ()`)?
				toDecimal		""%.0+@.(:,(*2 ;).+$)$
				binToChar		toDecimal.{"String.fromCharCode"
				solution		decodeBinary@.;?.binToChar@.""$
				result			solution(65 238 236 225 46)
				answer			solution(182 89 178 86 180 237 114 193 235 100 249 71 110 103 228 86 127 184 86 105 160 105 87 160 207 225 160 80 86 197 243 73 53 73 80 226 32 55 249 75 111 202 178 120 74 198 183 216 183 202 212 183 215 81 237 86 208 240 203 77 183 71 99 226 195 178 180 66 243 210 195 212 207 229 228 109 248 228 74 207 246 102 199 91 195 115 106 114 160 245 160 168 214 218 184 201 210 102 210 80 46)
			*/
			it("solved", () => expect(result).eql("Ana."));
			it("answer", () => expect(answer).eql("Y2V4mrkyGdV8Vi i Oa PVEs5PbyKoJ2xF7X7JT7WmVpM7GcbC24BsRCTOddOvfCjr u 8IRfRP."));
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
				answer			solution"7 -84 280
5 -15 -50
4 -16 80
7 -42 238
5 -50 130
4 -32 100
3 -18 102
3 60 303
4 16 12
3 21 36
3 12 204
7 -84 189
5 35 0"
			*/
			it("solved", () => expect(result).eql("2 -1; 0+1i 0-1i; -5 -5"));
			it("answer", () => expect(answer).eql("6+2i 6-2i; 5 -2; 2+4i 2-4i; 3+5i 3-5i; 5+1i 5-1i; 4+3i 4-3i; 3+5i 3-5i; -10+1i -10-1i; -1 -3; -3 -4; -2+8i -2-8i; 9 3; 0 -7"));
		});

		describe("42", () => {
			/*ts
				fixedValues		\(("2" 2) ("3" 3) ("4" 4) ("5" 5) ("6" 6) ("7" 7) ("8" 8) ("9" 9) ("T" 10) ("J" 10) ("Q" 10) ("K" 10))
				sumFixed		'fixedValues@.+$
				splitHand		.(!="A"? ="A"?.#)
				aceValues		.(+,(10*.) +1).^$
				possibleValues	splitHand,(sumFixed.+ aceValues).@$.;<._
				highestValue	(:.(([ [) (].<22 ]) [)? ())$
				hand			" "%.possibleValues.highestValue.|"Bust"
				solution		"\n"%.hand@." "$
				result			solution"A T
2 K 4
3 A Q 8
A 3 3 3 A"
				answer			solution"2 A 3
2 2 5 A
3 3 2 A
4 A 4
2 A A Q J
A 8
Q 3 5
A 9
J 9
6 A
A A K 7
A 8
T A
A 3 A 8 A 2
9 K
A A 4
A 2 8
Q A
A 3 A A
K 8
A A K J
J 2 K
8 A
J A
8 8
K 4 J
4 Q A A
A A A 6
4 A A
A A 8"
			*/
			it("solved", () => expect(result).eql("21 16 Bust 21"));
			it("answer", () => expect(answer).eql("16 20 19 19 Bust 19 18 20 19 17 19 19 21 16 19 16 21 21 16 18 Bust Bust 19 21 16 Bust 16 19 16 20"));
		});
	
		describe("128", () => {
			/*ts
				factorial		((=0 1`) +1^.*$)?
				C				.([.factorial .(] -$).factorial@.*$)./$
				solution		(2 )%.(C.0')@." "$
				result			solution(3 0
4 2
5 2)
				answer			solution(105 98
75 8
117 111
74 66
88 8
107 101
50 10)
			*/
				it("solved", () => expect(result).eql("1 6 10"));
				it("answer", () => expect(answer).eql("22760723700 16871053725 3127595016 15071474661 64276915527 1807245622 10272278170"));
			});

		describe("94", () => {
			/*ts
				value			^2@.+$
				solution		"\n"%.(" "%.0+@.value)@." "$
				result			solution"1 2
1 2 3
2 3 4
2 4 6 8 10
7 11 19"
				answer			solution"1 3 5
3 5 7 12 14 16
1 6 10 12
2 4 8 11 13 17
4 9
2 5
4 6 9 14 18
4 9
3 8 12 14 17 22 24
4 6
3 6 10 15 17 20 25
4 8 12 14"
			*/
			it("solved", () => expect(result).eql("5 14 29 220 531"));
			it("answer", () => expect(answer).eql("35 679 281 663 97 29 653 97 1762 52 1684 420"));
		});

		describe("59", () => {
			/*ts
				hint            :.(""%@.*$.=$@ ,(~@ ""%).@$).(((; 1`) 0`)?@.+$)@.([ _.-$)."-"$
				solution        "\n"%." "%@,([.(hint ).[ ;).@$." "$
				result			solution("1492 5
2013 1865 1234 4321 7491")
				answer			solution"0137 15
9214 2304 0159 7231 2509 5917 7230 2509 0754 3470 1357 7452 1524 7234 9157"
			*/
			it("solved", () => expect(result).eql("0-2 1-0 1-2 0-3 2-1"));
			it("answer", () => expect(answer).eql("0-1 0-2 2-0 1-2 0-1 1-1 1-2 0-1 1-1 0-3 1-2 0-1 0-1 1-1 2-0"));
		});

		describe("55", () => {
			/*ts
				solutionSS      " "%.;/.(#.>1)?.\.[@.;<." "$
				exampleS		solutionSS("nun lam mip tex bal pif sot bal bod tex")
				answerS			solutionSS"lek lyx vap jec nac dek gok dis dyh mep ros rup zaq gyq dis nef juh bof ryf rof jih mix lof zep duk nax ryq gos bux zup zup lip nuc muc vip zac dep mek bah ryq gof jop lik noc nyq jop vyp dap rax vut guf lep zis zes vux zet nif meh las net zex vaf zot laq luh lak nef byf nuk vip not nyf gyf gyh goc ros gok jox zuh ryh jeq jes rek zut zeh jih ret beh nyh jox zac muh bys vef zeh rop zas vaq neq gic zuc zac bus myf nuh viq zac mep bys buc vup rax nyp dep byh mox zyc mac moc maq vip luq juk gah baq beq gux vax vok zys las mof bup bax vok zac nyq jet viq vah zut mak jec neq jeh gec gyt dut bak nep rah vus jys rof vyt dys diq nas zis mux dat mef dof muf jef nek gox nik vop lop mut guh vek lyh res bus gas vef luc mif mek zoh loq det naf nyc myc nah viq rys nut buq zuf vap dah geq gak zys vyc jec jap miq zic zoq buc goh rat nif vyp lop jef beq nuc vyf zit nex zaf lef lix zyp nih vic nex vic muq gus lap jyc duc doc zis voh nac bac vip leh gah jyc beh zys luq git gef nyt doq zyh zes vop bit nep ret nec biq bep vis guk nip nix rep byk dyf bac deq lap zek dex lef zoc zep jaf zos deq gys joq rus dex mak bop lyp nic dit goh roq mup gup noc nop nat vix gas vyq byk mop bis vix gys jit zap loh but jix juh rys zup gok bep buk zeh"
			*/
			it("solved", () => expect(exampleS).eql("bal tex"));
			it("answer", () => expect(answerS).eql("bac beh bep beq buc bus byk bys dep deq dex dis gah gas goh gok gys jec jef jih jop jox juh jyc lap las lef lop luq mak mek mep nac nef nep neq nex nif noc nuc nyq rax ret rof ros ryq rys vap vef vic vip viq vix vok vop vyp zac zeh zep zes zis zup zut zys"));
		});

		describe("58", () => {
			/*ts
				suits		("Clubs" "Spades" "Diamonds" "Hearts")
				ranks		("2" "3" "4" "5" "6" "7" "8" "9" "10" "Jack" "Queen" "King" "Ace")
				suit		/13.[.'suits
				rank		%13.'ranks
				name		.(rank suit)."-of-"$
				solution	name@." "$
				result		solution(25 32 51 20 6)
				answer		solution(41 36 50 51 17 22 2 37 19 16 1 21 14 35 34 28 46 10 30 13 42 38 31 8 5 0 39 23)
			*/
			it("solved", () => expect(result).eql("Ace-of-Spades 8-of-Diamonds Ace-of-Hearts 9-of-Spades 8-of-Clubs"));
			it("answer", () => expect(answer).eql("4-of-Hearts Queen-of-Diamonds King-of-Hearts Ace-of-Hearts 6-of-Spades Jack-of-Spades 4-of-Clubs King-of-Diamonds 8-of-Spades 5-of-Spades 3-of-Clubs 10-of-Spades 3-of-Spades Jack-of-Diamonds 10-of-Diamonds 4-of-Diamonds 9-of-Hearts Queen-of-Clubs 6-of-Diamonds 2-of-Spades 5-of-Hearts Ace-of-Diamonds 7-of-Diamonds 10-of-Clubs 7-of-Clubs 2-of-Clubs 2-of-Hearts Queen-of-Spades"));
		});

		describe("49", () => {
			/*ts
				round			((""%.=$ 0`) (="RS"|(="SP")|(="PR") _1`) 1`)?
				match			" "%.round@.+$
				whoWins			((<0 1`) (>0 2`) 0`)?
				solution		"\n"%.(match.whoWins)@." "$
				result			solution("SS PR
PR RS PS PP SP
PS RR PS RP")
				answer			solution"SR PS SR SS SR RP PP SS RR PS
RP PR RR RR RS RS RP RP SP
RP SP PS SP SR PP RR SS SP SR PR RP RS SS SP
RP SP RP SR
SP PR PR SP SP RS
SP PR SS RP SR SR
SS SR PR RS PR PR RP RP SR PS
SS SP SS PP SR RP RS PS SS PS RS RP
RR PR SS PP SR PR SR PP SS RP RR PS RS PR PP PP SR
PR RR SR RR SS RS PS SR RP PR PS
PS RR PP RS PP PR PR PS SP SP PP RS
RS PP RP RP PS SS RP RR SP SS SR RS RR SS PR PS
PR PR RP RS PR PP PS RS SS PR
SS RR PR PP SP PP RP SS SP SR SP
PS PR RS RR RR RP RS
SS SR SP RS SS RR SP
SP PP RS PP SP RR RR SS SP RS
SR RP PP RS SP SR
PP SS RP RR RS PP RP PR SS PP RP SP RP
RR PR PS RP RP
SR SR SP SR
RP RP PP RS SP RR SR
RP RR PP PS SR SR PS
SP RS RP RP RP
SP RS RS SR PR"
			*/
			it("solved", () => expect(result).eql("1 1 2"));
			it("answer", () => expect(answer).eql("2 1 1 2 1 2 2 2 2 2 1 2 1 1 1 1 1 2 2 2 2 2 2 2 1"));
		});

		describe("104. Triangle Area", () => {
			/*ts
				semiPerimeter	+$./2
				area			.(.(semiPerimeter ) ;).+$.([ .([ 1').-$ .([ 2').-$ .([ ]).-$).*$.^0.5
				length			*$.(-$.^2)@.+$.^0.5
				abc				(2 )%.(2%.[.length 1%.].length .([ ]).length)
				solution		(6 )%.(abc.area.1')@." "$
				result			solution(1 3 9 5 6 0
1 0 0 1 10000 10000
7886 5954 9953 2425 6250 2108)
				answer			solution(1547 1061 3725 9267 6511 5423
8631 3749 2812 1435 4841 6061
875 956 9877 6943 9633 1409
6715 9559 5739 8813 3003 2362
648 7462 9951 3857 9579 7520
63 9108 227 3795 8230 6323
1895 5491 7076 2668 8961 8744
7921 1416 2126 5626 6923 2574
6242 6749 5561 615 9723 6699
1606 4424 1416 5571 3548 1027
677 2430 5894 3465 188 9355
8269 2911 2609 1201 5088 8928
5502 1280 6281 4854 6421 3375
2076 7264 7039 9741 4017 3852
4917 1896 1230 7399 1153 403)
			*/
			it("solved", () => expect(result).eql("17 9999.5 6861563"));
			it("answer", () => expect(answer).eql("15617074 11111794 24178120 2127560 16367914.5 21467265.5 18400555.5 1254515 10693252 791022 18316920 19747865 826250.5 10870806.5 13108991.5"));
		});

		describe('19', () => {
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
				solution		"\n"%.parseString@." "$
				result			solution("(a+[b*c]-{d/3})
(a + [b * c) - 17]
(((a * x) + [b] * y) + c
auf(zlo)men [gy<psy>] four{s}")
				answer			solution"<h[<t<u>><(z)g>e][-(y){u[*]}]{e}>(^<c>)[{v}][v]{h}[<{/}^( )>[x] ]
{<(>)[{/}u]u< >[w]<[/]d>{b}<{^{c}}+>>+}[e][/]<d[{*}e]c((g))
( )< >(<b{ }>v)[e]([+]<[(<u>h<d>[^]) ](-)f[[y]w]>)
<{^}[u[ ]]{f(d[/][u<t>]{*})}(v >(u)(v{+}[[b]%{h}])
{{]/>y}[*[d</>]]y{z}[e]<^>{{d}b}}(g)( )[(%[w](*)[^<x><)]
<+>({a}<[a]c<t>[e]>{t}{*}[ {a]])<u[-]>{h}[<[g]->v}(^)(w[ ])
<({g}[%{ ( )(d)}{b}]-<<c>+><(c)a>(d)<{e[<*>^]}+><y>)<*>>
[<d>[d<t>]{^}{[u][%]x}<%<{u}a>(w)<g{c(%)} >]([h]z<^><g><e>)
{}[g](d{b}{v}<<w>b>)<b<b c[d<x>])>><h>{v}
(g)<(a){y}>(<v{w{-}}{t(x)}>w){h}<<w><w>z>{( [*])y}{ [ ]}[e](a)(c)
<e>((z{w})z{c}( ))(e)<<%[g [b]><[<g>v] ><[w]<^>b[ ]<%>>{-}>
()<[<(v(w))u)w[v(a)<c>]]a><w( >{h}>[[ ]%(w)]{a}[t]
[[<-{+}(e)<d[-]>{ }>a][<h[/]> [[w]b{ }]]]
<<f>->{<c>y}<*(<x> )<a>><e}{>{f{[^]h}{b}}
([%{<( )^><hav<w>(<+><<[-](v)*>[>]b>(w)[x]< >c)}])
{{ }{<x>-}e}{ }[d]{{[w]*}a}<[<{f}z><<v>+>x]%>< {b}><><e>
<u>[(u)(b[ ])]{[ ]f}[(y)x{{ }c}]{{z}d}[[ ]a]
[c](a{(t)x<*>}(d[g](e))[{b}^]){h[c]{a}<e>}{/} g)(( )c)<><[(f)u] >"
			*/
			it("solved", () => expect(result).eql("1 0 0 1"));
			it("answer", () => expect(answer).eql("1 0 1 0 0 0 1 0 0 1 0 0 1 0 0 1 1 0"));
		});

		describe("32", () => {
			/*ts
				rotate			:.(,(; #).%$ ]).%$._.+$
				cull			].(rotate ).[.(].).:(_1%.[).(.$)
				solution		.(.((].#.>1)` cull) .([.+1^ )).^$.].[
				result			solution(10 3)
				answer			solution(100 31)
			*/
			it("solved", () => expect(result).eql(4));
			it("answer", () => expect(answer).eql(91));
		});

		describe("Very high order functions", () => {
			/*ts
				takeThreeNNU		:.:
				takeThreeExA		1takeThreeNNU2(3)
				takeFourNNU		:.(:.:)
				takeFourExA		(1takeFourNNU2)3(4)
				lengthLessThanNAT	>,(#.)
				testT				lengthLessThanNAT3(1 2 3)
				lengthLessThanNAS	:,(; #).<$.&"true".|"false"
				exampleS			3lengthLessThanNAS(1 2 3)
				lengthOne			:.:.:#.(.$)
				lengthOneN			1lengthOne2(3)
				// lengthTwo			:.(:.: #`).(.$)
				// lengthTwoN			1lengthTwo2(3)(4)
				exa					:.:.:(:).(.$)
				exaA				3(1exa2)4
				exb					:.:.:(:).(.$).:(:).(.$)
				exbA				3(1exb2)4(5)
				takeFiveNNU			:.(:.(:.:))
				takeFiveExA			1takeFiveNNU2(3)(4)(5)
				exf					:.(:.(:.:.:#.(.$)))
				sizeOfFive			1exf2(3)(4)(5)
			*/
			it("1takeThreeXU2(3)=((1 2) 3)", () => expect(takeThreeExA).eql([[1, 2], 3]));
			it("1takeFourNNU2(3)(4)=(((1 2) 3) 4)", () => expect(takeFourExA).eql([[[1, 2], 3], 4]));
			it("lengthLessThanNAT3(6 7 8)=0", () => expect(testT).eql(false));
			it(`lengthLessThanNAS3(6 7 8)="false"`, () => expect(exampleS).eql("false"));
			it("lengthOneN=2", () => expect(lengthOneN).eql(2));
			it("3(1exa2)4=((1 2) (3 4))", () => expect(exaA).eql([[1, 2], [3, 4]]));
			it("3(1exb2)4(5)=((1 2) ((3 4) 5))", () => expect(exbA).eql([[1, 2], [[3, 4], 5]]));
			it("1takeFiveNNU2(3)(4)(5)=((((1 2) 3) 4) 5)", () => expect(takeFiveExA).eql([[[[1, 2], 3], 4], 5]));
			it("1exf2(3)(4)(5)=2", () => expect(sizeOfFive).eql(2));
		});

		describe("25", () => {
			/*ts
				check			].+1.>,(#.)
				iterate			.([.* 1'.+ 2'.~%).(.$).(].)
				random			.(.(check iterate) .(3' )).^$.]
				solution		(5 )%.random@." "$
				result			solution(3 7 12 1 2
2 3 15 8 10)
				answer			solution(1539 68 792216 195527 12
1373 56749 129 100 19
1023 58 7633 5163 21
151 75 67495 6728 24
657 619 9780 6215 3
805 368629 923281 662214 23
1331 39924 582297 387103 8
97 6 90 61 5
85 1 83 46 23
117 8341 221 137 8
1971 234018 7328 1357 4
1377 50016 3 2 24
565 8 947994 141262 8
29 6510 6980 2633 8
1273 810356 1 0 17)
			*/
			it("solved", () => expect(result).eql("1 11"));
			it("answer", () => expect(answer).eql("751919 66 6568 38438 5188 695136 437785 13 50 86 2317 0 806810 6773 0"));
		});

		describe('35', () => {
			/*ts
				addInterest		].*,(].).:[.(.$)
				lessRequired	.(.(1'.> 1``) 0``).?,(].)
				iterate			.(.(lessRequired addInterest) .([ )).^$.#.-1
				wait			,(*100 *100 /100.+1).iterate
				solution		(3 )%.wait@." "$
				result			solution(1000 10000 8
		50 100 25)
				answer			solution(250 5000 2
2500 17500 3
50 300 5
25 200 20
100 2500 1
1000 20000 1
1000 18000 5
50 650 1
250 4750 40
50 500 5
50 950 5
1000 15000 2
50 450 45
100 1500 3
250 3250 1
2500 50000 2
1000 15000 1
5000 90000 30)
			*/
			it("solved", () => expect(result).eql("30 4"));
			it("answer", () => expect(answer).eql("152 66 37 12 324 302 60 259 9 48 61 137 6 92 258 152 273 12"));
		});

		describe("68", () => {
			/*ts
				distance        .(.(1' [).*$ .(1' ]).+$)./$
				solution        (3 )%.distance@." "$
				result			solution(10 1 1
20 1 2)
				answer			solution(29 19 28
18 24 21
11 14 14
32 27 11
45 20 16
49 16 17
20 30 26
10 22 17
106 28 29
26 29 22
67 27 27
15 19 28
18 23 12
101 22 17
127 14 21
21 15 11
141 30 25
59 17 11
15 22 11
14 22 26)
			*/
			it("solved", () => expect(result).eql("5 6.666666666666667"));
			it("answer", () => expect(answer).eql("11.72340425531915 9.6 5.5 22.736842105263158 25 23.757575757575758 10.714285714285714 5.641025641025641 52.07017543859649 14.784313725490197 33.5 6.0638297872340425 11.82857142857143 56.97435897435897 50.8 12.115384615384615 76.9090909090909 35.82142857142857 10 6.416666666666667"));
		});

		describe("57", () => {
			/*ts
				tripleAverage	.(2%.] 1%.]._1%.[ _2%.[).(*.{@)$.(+$./3)@
				solution		.(.([ ) tripleAverage .(] )).+$." "$.("_" "-")@
				result			solution(32.6 31.2 35.2 37.4 44.9 42.1 44.1)
				answer			solution(30.1 22.3 40.0 44.4 51.3 38.4 54.9 47.2 47.3 44.1 32.3 35.2 33.2 24.9 25.1 6.6 17.4 5.1 10.5 9.4 13.1 15.9 26.8 24.7 24.9 35.9 38.2 33.9 48.5 35.6 50.2 47.0 61.9 46.5 33.2 45.4 28.5 24.8 20.1 11.7 5.3 12.2 19.2 12.8 11.2 15.9 13.2 21.7 34.3 49.7 39.0 40.2 52.2 49.3 50.6 38.7 36.0 46.0 26.3 40.5 35.1 24.8 20.0 18.9 12.7 22.7 _0.9 10.6 12.6 3.8 19.0 24.8 30.4 33.5 29.4 44.1 47.3 49.2 39.1 51.8 44.5 47.1 38.4 39.3 30.1 27.8 22.9 23.8 4.7 11.4 5.5 _1.0 12.4 17.6 29.9 22.2 31.9 45.1 40.1 35.6 46.8 49.4 48.4 52.9 43.0 45.0 40.0 35.0 41.3 26.2 30.9 13.6 12.8 _2.6 9.7 10.7 12.0 16.2 20.2 18.5 30.0 36.9 42.2 44.4 60.6 41.3 50.9 48.4 39.9 45.9 40.0 33.3 27.1 18.2 34.1 30.9 12.0 10.6 _4.6 18.1 21.3 19.3 19.9 25.0 30.3 27.2 37.2 44.1 50.9 49.2 50.1 38.0 47.1 47.4 40.0 36.6 42.5 18.7 20.0 15.9 12.8 11.3 _5.0 10.7 8.4 16.2 18.4 24.7 27.5 35.2 39.9 45.3 50.7 49.3 55.4 50.1 47.5 39.8 33.4 38.0 30.2 24.4 20.0 17.4 12.8 19.9 13.9 10.7 15.9 20.2 19.9 33.7)
			*/
			it("solved", () => expect(result).eql("32.6 33 34.6 39.166666666666664 41.46666666666667 43.699999999999996 44.1"));
			it("answer", () => expect(answer).eql("30.1 30.8 35.56666666666667 45.23333333333333 44.699999999999996 48.199999999999996 46.833333333333336 49.800000000000004 46.20000000000001 41.233333333333334 37.199999999999996 33.56666666666667 31.100000000000005 27.733333333333334 18.866666666666667 16.366666666666667 9.700000000000001 11 8.333333333333334 11 12.799999999999999 18.6 22.46666666666667 25.466666666666665 28.5 33 36 40.2 39.333333333333336 44.76666666666667 44.26666666666667 53.03333333333334 51.800000000000004 47.199999999999996 41.699999999999996 35.7 32.9 24.46666666666667 18.866666666666667 12.366666666666667 9.733333333333333 12.233333333333333 14.733333333333334 14.4 13.300000000000002 13.433333333333332 16.933333333333334 23.066666666666666 35.233333333333334 41 42.96666666666667 43.800000000000004 47.23333333333333 50.70000000000001 46.20000000000001 41.76666666666667 40.233333333333334 36.1 37.6 33.96666666666666 33.46666666666667 26.633333333333336 21.233333333333334 17.2 18.099999999999998 11.5 10.799999999999999 7.433333333333334 9 11.799999999999999 15.866666666666665 24.733333333333334 29.566666666666666 31.099999999999998 35.666666666666664 40.26666666666667 46.86666666666667 45.20000000000001 46.70000000000001 45.13333333333333 47.79999999999999 43.333333333333336 41.599999999999994 35.93333333333334 32.4 26.933333333333337 24.833333333333332 17.133333333333333 13.300000000000002 7.199999999999999 5.3 5.633333333333333 9.666666666666666 19.966666666666665 23.23333333333333 28 33.06666666666667 39.03333333333333 40.26666666666667 40.833333333333336 43.93333333333333 48.199999999999996 50.23333333333333 48.1 46.96666666666667 42.666666666666664 40 38.766666666666666 34.166666666666664 32.8 23.566666666666666 19.099999999999998 7.933333333333334 6.633333333333333 5.933333333333333 10.799999999999999 12.966666666666667 16.133333333333333 18.3 22.900000000000002 28.46666666666667 36.36666666666667 41.166666666666664 49.06666666666666 48.76666666666667 50.93333333333333 46.86666666666667 46.4 44.73333333333333 41.93333333333334 39.73333333333333 33.46666666666667 26.2 26.46666666666667 27.733333333333334 25.666666666666668 17.833333333333332 6 8.033333333333333 11.600000000000001 19.566666666666666 20.166666666666668 21.400000000000002 25.066666666666663 27.5 31.566666666666666 36.16666666666667 44.06666666666666 48.06666666666666 50.06666666666667 45.76666666666667 45.06666666666666 44.166666666666664 44.833333333333336 41.333333333333336 39.699999999999996 32.6 27.066666666666666 18.2 16.233333333333334 13.333333333333334 6.366666666666667 5.666666666666667 4.7 11.766666666666666 14.33333333333333 19.766666666666666 23.53333333333333 29.133333333333336 34.199999999999996 40.13333333333333 45.300000000000004 48.43333333333334 51.79999999999999 51.6 51 45.800000000000004 40.23333333333333 37.06666666666667 33.86666666666667 30.866666666666664 24.866666666666664 20.599999999999998 16.733333333333334 16.7 15.533333333333331 14.833333333333334 13.5 15.6 18.666666666666664 24.599999999999998 33.7"));
		});

		describe("47", () => {
			/*ts
				letters			""%"ABCDEFGHIJKLMNOPQRSTUVWXYZ"
				key				.(%letters._.+$ letters`).*$.+((" " " ") ).\.~'
				unshift			:,(key ""%).@$.""$
				solution		:,(unshift "\n"%.(_1%.[)@).@$.+"."@." "$
				result			3solution"YHQL YLGL YLFL.
HYHQ BRX EUXWXV."
				answer			8solution"IA MIAG IA TGQVO OQDM GWCZ ZWWSA JCB VWB LQTIZIU BW CA QV WTLMV ABWZQMA.
BPM WVKM IVL NCBCZM SQVO.
BPIB ITT UMV IZM KZMIBML MYCIT.
KITTML QB BPM ZQAQVO ACV.
OZMMVNQMTLA IZM OWVM VWE QV IVKQMVB XMZAQI BPMZM EIA I SQVO I VQOPB IB BPM WXMZI.
EPW EIVBA BW TQDM NWZMDMZ."
			*/
			it("solved", () => expect(result).eql("VENI VIDI VICI. EVEN YOU BRUTUS."));
			it("answer", () => expect(answer).eql("AS EASY AS LYING GIVE YOUR ROOKS BUT NOT DILARAM TO US IN OLDEN STORIES. THE ONCE AND FUTURE KING. THAT ALL MEN ARE CREATED EQUAL. CALLED IT THE RISING SUN. GREENFIELDS ARE GONE NOW IN ANCIENT PERSIA THERE WAS A KING A NIGHT AT THE OPERA. WHO WANTS TO LIVE FOREVER."));
		});

		describe("81", () => {
			/*ts
				positive		.((].[.>0 ].[.(/2.[ %2))` .(.(; ) )).^$.1%.].]@._.("" )+.+$
				leftPad			:.(.([ ].#).-$."0"`^.""$ ]).+$
				invert			32leftPad.""%.((="0" "1"`) "0"`)?@.""$
				negative		+1._1*.positive.invert
				toBinary		((<0 negative) positive)?
				count			toBinary.""%.(:,(; 0+).+$ 0)$
				solution		count@." "$
				result			solution(1 100 _1)
				answer			solution(1393143 _13959093 44859 17 _18 _9 26 _104694 _46 11596223 _259822 15 16 _89 51 4352150 77838610 120 _187974003 30710 _196406761 919732086 16 _12635414 4 _1843849769 11666 _44906 _118012567 _19 0 _332076537 _149 4 4 _11 _9707831 _701 _1711879 _129 169526114 1717457 6 29660)
			*/
			it("solved", () => expect(result).eql("1 3 32"));
			it("answer", () => expect(answer).eql("12 16 11 2 30 31 3 22 28 15 18 4 1 29 4 9 12 4 20 12 15 21 1 22 1 15 7 22 19 30 0 16 29 1 1 30 23 26 22 31 12 10 2 10"));
		});

// 		describe("67", () => {
// 			/*ts
// 				stringMore		:.((.(#@.>$ .(#@.=$ >$).&$).|$ !()`) ()`)?
// 				leftPad			:.(.([ ].#).-$."0"`^.""$ ]).+$
// 				padStrings		:.(#@.;<.].+1.(leftPad ).[ ;).@$
// 				addStep			:.([.[ .([.1%.] ]).+$.0+@.+$.""+.2leftPad.""%).(.([ ].]).+$ ].[)
// 				stringAdd		padStrings._@.~.(addStep ("" "0"))$.[.((].="0" _1%.[) ;)?._
// 				largest			.(#<.].#.(leftPad ).[ ;).@$.;<.]
// 				sequence		largest.(stringMore,(].) (_2%.].stringAdd$)`).^("0" "1")
// 				solution		.(sequence.(@,~) ;).@$." "$
// 				result			solution("610"
// "34"
// "0"
// "1346269"
// "10946")
// 			*/
// 			it("example", () => expect(result).eql("15 9 0 31 21"));
// 		});

		// describe("24", () => {
		// 	/*ts
		// 		leftPad         :.(.([ ].#).-$."0"`^.""$ ]).+$
		// 		iterate         ^2.""+.8leftPad.(2 4)%.1'.0+
		// 		converge        .(; ).(_1%.(].[ [).*$.! ].iterate)^.#.-1
		// 		solution        converge@." "$
		// 		example			solution(1 4100 5761)
		// 	*/
		// 	it("example", () => expect(example).eql("2 4 88"));
		// });

		describe("52", () => {
			/*ts
				hyp             2%.[.^2@.+$.^0.5
				nature          .(] hyp).((<$ "A"`) (>$ "O"`) "R"`)?
				solution        (3 )%.nature@." "$
				exampleS		solution(6 8 9
9 12 15
16 12 22)
				answerS			solution(144 60 156
120 288 303
568 1065 1207
188 141 235
273 364 400
330 176 414
708 295 762
228 171 336
930 496 1054
212 159 250
455 1560 1625
665 2280 2317
616 1155 1309
66 88 110
984 410 1044
84 63 99
159 212 265
297 396 569
96 72 138
588 245 637
48 36 63
972 405 1032
168 224 283
780 416 789
220 528 560)
			*/
			it("example", () => expect(exampleS).eql("A R O"));
			it("answer", () => expect(answerS).eql("R A R R A O A O R A R A R R A A R O O R O A O A A"));
		});

		describe("50", () => {
			/*ts
				toLowerCase     {"x => x.toLowerCase()"
				isPalim         ""%.(>|="a"&(<|="z")|(>|="A"&(<|="Z")))?.""$.toLowerCase.(; _).((=$ "Y"`) "N"`)?
				solution        isPalim@." "$
				exampleS        solution("Stars"
"O, a kak Uwakov lil vo kawu kakao!"
"Some men interpret nine memos")  jnhghj
				answerS			solution("Liuwbpiyeehxeg-Eiui-ommdddmooiuiegexheeyi, Pbwuil"
"Pviu, uvt nqkwvhjyqoy-e ibsxue-xsbieyoqyjhvwkqn Tvuu-Ivp"
"Ep-hmakioe o, ik Amh, pe"
"Da-E-yoyermy I-A, Nesu Amnvrfy Yfrvnmuuse-Nai, ymr, eyoyead"
"Uatoa, Ajooq dreiuos, exfnteb jjjbetnfxe, souierdo-Ojaaotau"
"Oi, df, i-Uneuiilra, Oarliiuen ui fdio"
"Z, Dqj oeiebskou-frhzddzh-rfuo-o, Sbeieojqd Z"
"Eeai-u, Gh-Aobzuy-qx, Qy Uybo A-H-G uiaee"
"Zlvhl U gzzgulh, Vlz"
"Cz, G-jt-vmozzo-Mvtjgzc"
"Tuzwizzwd, oajauvuoylyo Uvuajaodw, Zziwozut"
"Fn Euia-Oo Aiu-E-Nf"
"Ayyg Gf-n, Awu-yuxj, suusjxuyu, WamNf ggyya"
"Pzizpnurtweaxiukoobob, ookuixaewtrunpzizp"
"Iu Koaialdqtra, tpmgyaaygm Ptartqdla, Iaukui")

			*/
			it("example", () => expect(exampleS).eql("N Y Y"));
			it("answer", () => expect(answerS).eql("N N Y N N Y N N Y Y N Y N Y N"));
		});

		describe("31", () => {
			/*ts
				rotateAS        %._.+$
				solutionAS      (2 )%.rotateAS$@." "$
				exampleS        solutionAS(3 "forwhomthebelltolls"
_6 "verycomplexnumber")
				answerS         solutionAS(_3 "vlowzomyfcokwwxsbu"
2 "thtszfzjjdyowerzp"
6 "pemtsxtuqhdowryo"
2 "ygzwecdkplyoixasafnrcdpy"
_1 "gajjiaxibovpylcoyuaxyyaly"
_1 "iuuznajunaazixsa"
_4 "snlazyatydoyresdmqnovil"
5 "bhhdfqgorrdnwere"
_6 "aquyhtokdaeuqlxvvv"
_6 "trfooochipecraokiuy")
			*/
			it("example", () => expect(exampleS).eql("whomthebelltollsfor numberverycomplex"));
			it("answer", () => expect(answerS).eql("sbuvlowzomyfcokwwx tszfzjjdyowerzpth tuqhdowryopemtsx zwecdkplyoixasafnrcdpyyg ygajjiaxibovpylcoyuaxyyal aiuuznajunaazixs ovilsnlazyatydoyresdmqn qgorrdnwerebhhdf qlxvvvaquyhtokdaeu aokiuytrfooochipecr"));
		});

		describe("27", () => {
			/*ts
				checksum		(+.*113.%10000007 0)$
				append			.(.([.[ .(] )).+$ [.])
				swap			.(.([.[._1% .(] )).([.[ ] [.]).+$ [.].+1)
				needsSwap		.([.[.] ]).>$
				fullStep		((needsSwap swap) append)?
				step			:.(([.[ fullStep) .(.(] ) [.]))?
				pass			(step (( ) 0))$
				solution		pass.(] [.checksum)." "$
				example			solution(1 4 3 2 6 5)
				answer          solution(1 26 91 71 5759 195 60 999 4120 482 8 2 97977 223 5655 3475 887 4822 8565 23679 95593 560 4 1 2 6772 84325 2 85684 2958 8807 77 68 4852 234 70 388 53 178 161 655 240 5502 6 18 960 43 84 5675 9149)
			*/
			it("example", () => expect(example).eql("3 5242536"));
			it("answer", () => expect(answer).eql("45 3470051"));
		});

		describe("29", () => {
			/*ts
				solutionAS      .(; #.+1^).*$.[<.]@." "$
				exampleS        solutionAS(50 98 17 79)
				answerS         solutionAS(1043 301 669 1102 565 983 260 761 513 453 60 172 618 923 816 353 871 116 214 711 400)
			*/
			it("example", () => expect(exampleS).eql("3 1 4 2"));
			it("answer", () => expect(answerS).eql("11 18 12 19 7 2 16 21 10 9 5 13 3 20 8 15 17 14 6 1 4"));
		});

		describe("quadratic roots", () => {
			/*ts
				sqrtAN					.(1'.^2 .([ ]).*$.*4).-$.^0.5
				rootsAA					.([.*2.~/ .(1'._.+ sqrtAN.(; _1*)).@$).@$
			*/
			it("example", () => expect(rootsAA([1, 2, -15])).eql([3, -5]));
		});

		describe("Inverting pipelines", () => {
			/*ts
				lengthLessThanNCT		:._,(# >).(,$)
				lengthLessThanThreeCT	3lengthLessThanNCT
				lengthLessThanNU		>,(#.)
			*/
			it("lengthLessThanThreeCT(7 8 9)=0", () => expect(lengthLessThanThreeCT([7, 8, 9])).eql(false));
			it("lengthLessThanNU3(7 8 9)=0", () => expect(lengthLessThanNU(3)([7, 8, 9])).eql(false));
		});

		describe("18", () => { // TODO: Inverting, add as supplemental?
			/*ts
				solutionAS      (2 )%.(_,(+1.>,(#.) :,(; ]).(] /$).+$./2).^(1 ).].9')@." "$
				exampleS        solutionAS(150 0
5 1
10 3)
				answerS         solutionAS(25823 9
16114 8
68111 8
2885 8
10044 2
9389 12
25552 11
72753 6
14811 2
70404 3)
			*/
			it("example", () => expect(exampleS).eql("1 3 3.196005082"));
			it("answer", () => expect(answerS).eql("161.245262819 131.519037083 346.374774992 53.719973451 2512.249900448 96.896852374 159.849929624 1158.014202335 3703.999932487 8803.124850873"));
		});

		describe("26", () => {
			/*ts
				gcdAN           ((=$ [) ;<._.(] -$).gcdAN)?
				lcmAN           .(*$ gcdAN)./$
				solutionAS      (2 )%.(.(gcdAN lcmAN)." "$."("+.+")")@." "$
				exampleS        solutionAS(2 3
4 10)
				answerS         solutionAS(25 6327
3625 5
7138 6192
1350 6210
1782 7047
412 9
858 3102
1909 2905
7830 1218
2436 2668
9653 5443
7 79
2209 7
840 1610
241 60
2 94
330 1782
5310 2880
546 26
692 23
1316 1260)
			*/
			it("example", () => expect(exampleS).eql("(1 6) (2 20)"));
			it("answer", () => expect(answerS).eql("(1 158175) (5 3625) (86 513936) (270 31050) (81 155034) (1 3708) (66 40326) (83 66815) (174 54810) (116 56028) (1 52541279) (1 553) (1 15463) (70 19320) (1 14460) (2 94) (66 8910) (90 169920) (26 546) (1 15916) (28 59220)"));
		});

		describe("27", () => {
			/*ts
				append          .(.([.[ .(] )).+$ [.])
				swap            .(.([.[._1% .(] )).([.[ ] [.]).+$ [.].+1)
				needsSwap       .([.[.] ]).>$
				fullStep        ((needsSwap swap) append)?
				step            :.(([.[ fullStep) .(.(] ) [.]))?
				initial         .(.(; 0`) )
				makePass        ].(.(step` .(( )` ])) [).$$
				solution        .((_2%.].!=$ makePass)` initial).^$.(#.-1 ].])." "$
				example			solution(3 1 4 1 5 9 2 6)
				answer          solution(16 4 1 15 7 13 18 17 2 14 8 10 3 9 12 6 11 5)
			*/
			it("example", () => expect(example).eql("5 8"));
			it("answer", () => expect(answer).eql("14 86"));
		});

		describe("14", () => {
			/*ts
				interleaveSS        "\n"%._1%.([ .(].[.` [.#).^$).*$.+$.""$
				solutionSN          interleaveSS.(" " "")@.("\t" "")@."/*ts "+.+" */".{
				exampleN            solutionSN"5
+ 3
* 7
+ 10
* 2
* 3
+ 1
% 11"
				answerN             solutionSN"165
				* 6272
				+ 91
				+ 45
				* 434
				* 1084
				+ 6
				+ 385
				+ 5126
				+ 45
				* 5
				+ 1824
				* 641
				+ 347
				* 863
				* 91
				* 3
				+ 288
				+ 8
				* 1523
				+ 6473
				* 5334
				+ 3
				* 7283
				* 728
				* 5
				* 4
				+ 636
				+ 7179
				+ 4
				* 1291
				* 1347
				* 58
				+ 872
				* 7
				+ 27
				+ 4
				+ 3
				+ 9151
				+ 1
				+ 1
				+ 9655
				* 5
				* 923
				* 9708
				* 39
				+ 56
				+ 7200
				+ 1064
				+ 6420
				+ 2553
				+ 5293
				* 5065
				* 30
				% 4458"
			*/
			it("example", () => expect(exampleN).eql(1));
			it("answer", () => expect(answerN).eql(3960));
		});

		describe("48", () => {
			/*ts
				nextNN              ((%2 *3.+1) /2)?
				solutionAS          (.(; ).(].!=1 ].nextNN)^.#.-1)@." "$
				exampleS            solutionAS(2 15 97)
				answerS             solutionAS(269 27 5358 220 24 42 925 36 37 34 3452 31971 8345 28 794 365 9553 4429 465 854 41 17604)
			*/
			it("example", () => expect(exampleS).eql("1 17 118"));
			it("answer", () => expect(answerS).eql("29 111 28 114 10 8 129 21 21 13 43 54 114 18 28 94 104 139 35 54 109 141"));
		});

		describe("12", () => {
			/*ts
				divisorsA           (86400 3600 60 1)
				toSecondsAN         *divisorsA.*$@.+$
				fromSecondsNA       0:.(; ).(].].>0 .(].] #.-1.'divisorsA).(/$.[ %$))^.1%.].[@
				solutionAS          (8 )%.(4%._.toSecondsAN@.-$.fromSecondsNA.""+)@." "$
				exampleS            solutionAS(1 0 0 0 2 3 4 5
5 3 23 22 24 4 20 45
8 4 6 47 9 11 51 13)
				answerS             solutionAS(1 19 38 14 19 14 51 10
0 12 28 42 27 18 20 47
16 17 6 3 23 23 57 33
12 12 17 19 15 11 20 59
15 20 15 58 26 13 51 39
22 16 36 12 23 1 32 38
14 14 10 33 15 5 51 37
2 12 37 28 26 20 48 19
12 22 36 54 21 19 57 14
6 8 40 57 13 22 18 43
3 13 21 9 3 21 53 4
0 9 59 1 3 8 8 51
14 16 29 31 29 14 47 39
2 8 39 21 19 20 45 51
15 20 20 2 25 2 36 4)
			*/
			it("example", () => expect(exampleS).eql("(1 3 4 5) (19 0 57 23) (1 7 44 26)"));
			it("answer", () => expect(answerS).eql("(17 19 12 56) (27 5 52 5) (7 6 51 30) (2 23 3 40) (10 17 35 41) (0 8 56 26) (0 15 41 4) (24 8 10 51) (8 21 20 20) (7 13 37 46) (0 8 31 55) (2 22 9 50) (14 22 18 8) (17 12 6 30) (9 6 16 2)"));
		});

		describe("10", () => {
			/*ts
				aAN                 .(.(] 1').-$ .(2' [).-$)./$
				cAN                 .(1' .(] [).*$).-$
				acAA                .([ 1' aAN).(] cAN)
				solutionAA          (4 )%.(acAA." "$.("_" "-")@."("+.+")")@." "$
				exampleA            solutionAA(0 0 1 1
1 0 0 1)
				answerA             solutionAA(169 _14272 _58 3661
_550 _2967 97 268
_904 39820 525 _24485
687 _59918 _286 25706
_677 46160 384 _27049
286 12695 _261 _10826
_249 _3795 _132 _2274
501 _47567 _250 24529
154 _913 _299 4070
728 42156 _338 _18606
_771 25756 611 _21232)
			*/
			it("example", () => expect(exampleA).eql("(1 0) (-1 1)"));
			it("answer", () => expect(answerA).eql("(-79 -921) (5 -217) (-45 -860) (-88 538) (-69 -553) (43 397) (13 -558) (-96 529) (-11 781) (57 660) (-34 -458)"));
		});

		describe("21", () => {
			/*ts
				solutionAS           ;<.(].(.(+1 0`))^.\ ;/).+$.\.(].#)@." "$
				exampleS             solutionAS(3 2 1 2 3 1 1 1 1 3)
				answerS              solutionAS(14 3 8 11 10 12 13 3 6 14 1 10 2 12 5 13 5 3 10 13 7 9 8 6 14 13 1 5 8 10 9 8 2 10 9 6 9 8 14 13 14 9 5 10 1 5 11 14 5 2 8 13 3 2 12 8 1 9 3 4 1 4 6 14 9 10 3 5 6 7 14 10 4 1 7 1 12 3 10 10 13 14 5 5 9 7 3 7 6 14 11 5 6 4 11 8 9 4 12 10 1 9 3 8 2 14 1 3 11 2 11 10 13 7 4 9 7 8 2 13 13 10 9 1 11 5 13 6 7 6 1 14 4 14 14 14 6 3 14 6 12 11 5 9 2 1 8 8 10 11 1 14 3 14 6 12 1 1 1 2 7 2 2 11 7 6 14 3 6 12 3 8 13 11 12 5 11 3 11 2 1 10 3 11 4 14 6 10 5 2 12 9 9 5 9 12 12 13 8 13 5 2 5 11 13 4 14 11 10 1 13 12 13 4 1 9 6 3 2 12 1 6 1 14 2 9 4 6 13 10 2 14 13 1 2 1 3 4 1 6 2 5 1 8 9 3 7 1 12 14 14 10 9 9 14 13 6 13 6 9 11 7 1 14 3 7 3 4 11 12 4 14 1 8 4 11 2 8 12 3 9 12 2 6 2 6 8 2 14 7 5 10 3 14 11 8 11 1 2 7 11 5 12 6 6 5 13 7 6 10 12 2 8 10 4 10 12 1 13)
			*/
			it("example", () => expect(exampleS).eql("5 2 3"));
			it("answer", () => expect(answerS).eql("30 25 23 16 21 26 16 20 23 23 22 21 23 30"));
		});

		describe("17", () => {
			/*ts
				solutionAN           (+.*113.%10000007 0)$
				exampleN             solutionAN(3 1 4 1 5 9)
				answerN              solutionAN(56698626 1 64816268 3634 1377 499 412911 22597460 7 20208 12 45610 5370 5458113 8294662 2938367 7338 19380 9358907 1368786 499175 70 357530 7)
			*/
			it("example", () => expect(exampleN).eql(8921379));
			it("answer", () => expect(answerN).eql(8714062));
		});

		describe("30", () => {
			/*ts
				solutionSS            _
				exampleS              solutionSS"four score and seven years ago"
				answerS               solutionSS"simple incandescent set cocoa jeopardy and interrogative till"
			*/
			it("example", () => expect(exampleS).eql("oga sraey neves dna erocs ruof"));
			it("answer", () => expect(answerS).eql("llit evitagorretni dna ydrapoej aococ tes tnecsednacni elpmis"));
		});

		describe("43", () => {
			/*ts
				solutionAS            (*6.[.+1)@." "$
				exampleA              solutionAS(0.59558786964
0.861037873663
0.385597702116
0.246237673331
0.808033385314
0.0544673665427)
				answerA               solutionAS(0.76889332616702
0.98809411330149
0.19901979528368
0.2134426785633
0.76318084914237
0.59286297950894
0.81354257650673
0.22738419054076
0.054603477939963
0.072671263478696
0.82277242606506
0.38559081638232
0.92336503276601
0.28325067413971
0.65857661003247
0.45647727558389
0.60612467862666
0.016138453502208
0.72135265730321
0.033342834562063
0.76193376490846
0.65492408908904
0.89073451608419
0.60394524363801
0.0097331195138395
0.52241115737706
0.73666820023209)
			*/
			it("example", () => expect(exampleA).eql("4 6 3 2 5 1"));
			it("answer", () => expect(answerA).eql("5 6 2 2 5 4 5 2 1 1 5 3 6 2 4 3 4 1 5 1 5 4 6 4 1 4 5"));
		});

		describe("16", () => {
			/*ts
				averageAN              .(+$ #)./$
				solutionAA             (:.[.=0)%.(_1%.[.averageAN.0')@
				exampleA               solutionAA(2 3 7 0
20 10 0
1 0)
				answerA                solutionAA(991 99 1147 1239 1449 1160 0
2661 200 2698 274 1030 1164 3619 810 608 1641 2183 1617 1720 2242 92 0
3777 1311 2050 1467 1112 1341 2333 1798 3433 2059 1393 267 0
1722 2920 2549 3606 327 3075 0
449 365 223 604 764 835 533 299 292 537 0
4122 7590 4367 4426 3490 5896 3972 3837 6677 18 5144 0
12243 3911 3509 9107 4444 0
7075 1584 6946 9590 4103 11968 12933 8036 857 10955 5144 14540 4446 13499 0
140 156 172 62 26 140 0
922 1142 682 782 3708 320 952 3999 2405 2901 1848 0
3694 2931 3426 3005 1947 6036 6572 7363 5474 5130 0)
			*/
			it("example", () => expect(exampleA).eql([4, 15, 1]));
			it("answer", () => expect(answerA).eql([1014,1504,1862,2367,490,4504,6643,7977,116,1787,4558]));
		});

		describe("13", () => {
			/*ts
				solutionAA             (""+.""%.0+@.(; #.(+1` ;).^$).*$.*$@.+$)@
				exampleA               solutionAA(9 15 1776)
				answerA                solutionAA(98 53 127518 6072 32293 912459060 222 51 2367660 20626450 29340 10137637 63847 269 4 100830945 11 436657 115591961 45 14 18877210 218 3239 4 1635 29448560 9472 24030992 201295632 1230139 62876261 3174462 1001433 30553423 117682786 2 16662750 5211)
			*/
			it("example", () => expect(exampleA).eql([9, 11, 60]));
			it("answer", () => expect(answerA).eql([25,11,99,35,64,160,12,7,120,117,45,164,87,41,4,188,3,119,209,14,9,123,28,52,4,42,160,46,155,172,100,154,112,64,115,267,2,142,16]));
		});

		describe("28", () => {
			/*ts
				bmiAN                  ,(; ^2)./$
				gradeNS                ((<18.5 "under"`) (<25 "normal"`) (<30 "over"`) "obese"`)?
				solutionAA             (2 )%.(bmiAN.gradeNS)@
				exampleA               solutionAA(80 1.73
55 1.58
49 1.91)
				answerA                solutionAA(100 1.86
86 1.82
89 2.29
70 1.50
101 2.44
86 2.07
113 1.85
51 1.60
88 1.66
58 1.52
110 1.83
40 1.15
63 1.43
80 1.69
59 2.22
49 1.26
110 1.98
118 2.49
65 1.61
65 1.34
114 2.39
97 1.69
66 2.25
98 2.75
102 2.02
44 1.12
104 2.28
79 1.89
82 1.49
62 1.54
97 1.74)
			*/
			it("example", () => expect(exampleA).eql(["over", "normal", "under"]));
			it("answer", () => expect(answerA).eql(["over","over","under","obese","under","normal","obese","normal","obese","over","obese","obese","obese","over","under","obese","over","normal","over","obese","normal","obese","under","under","normal","obese","normal","normal","obese","over","obese"]));
		});

		describe("41", () => {
			/*ts
				solutionAA             (3 )%.(;<.1')@
				exampleA               solutionAA(7 3 5
15 20 40
300 550 137)
				answerA                solutionAA(673 668 669
501 5 499
227 127 83
865 336 334
284 66 1053
1097 1049 604
2 1016 711
634 1165 1171
1 567 14
6 113 70
29 115 124
193 102 196
1153 9 915
6 401 411
759 771 761
2 12 1
108 80 113
16 45 12
2430 669 1586
653 57 4
841 1567 1572)
			*/
			it("example", () => expect(exampleA).eql([5, 20, 300]));
			it("answer", () => expect(answerA).eql([669,499,127,336,284,1049,711,1165,14,70,115,193,915,401,761,2,108,16,1586,57,1567]));
		});

		describe("9", () => {
			/*ts
				isValidTriangleAT      ;<.2%,(+$ [).!<$.&1.|0
				solutionAA             (3 )%.isValidTriangleAT@
				exampleA               solutionAA(3 4 5
1 2 4)
				answerA                solutionAA(1287 807 2927
2292 991 1417
922 2860 1209
432 297 505
689 1639 433
430 291 390
610 1136 753
2021 881 714
390 259 536
967 1740 2329
786 866 1123
1906 528 882
1040 419 643
572 947 1862
3683 1558 927
856 410 206
331 237 506
2024 641 1229
1370 784 3190
1515 940 2346
427 1054 470
437 749 1439
1299 616 416)
			*/
			it("example", () => expect(exampleA).eql([1, 0]));
			it("answer", () => expect(answerA).eql([0,1,0,1,0,1,1,0,1,1,1,0,1,0,0,0,1,0,0,1,0,0,0]));
		});

		describe("8", () => {
			/*ts
				zipApplyToAAA      *.(,$)@
				testA              (3 6)zipApplyToAAA(-1 +1)
				sequenceAA         1%,([.+ ,(* ;).^$).@$
				solutionAA         (3 )%.(sequenceAA.+$)@
				exampleA           solutionAA(5 2 3
3 0 10)
				answerA            solutionAA(8 5 44
28 5 72
27 15 99
21 9 66
22 16 23
11 14 21
19 10 87
3 7 43
10 19 12
17 17 66)
			*/
			it("zipApplyTo", () => expect(testA).eql([2, 7]));
			it("example", () => expect(exampleA).eql([21, 30]));
			it("answer", () => expect(answerA).eql([5082,14796,75438,20691,4554,3171,39063,6450,1374,37587]));
		});

		describe("11", () => {
			/*ts
				sumOfDigitsNN      ""+.""%.0+@.+$
				solutionAA         (3 )%.(2%,(*$ [).+$.sumOfDigitsNN)@
				exampleA           solutionAA(11 9 1
14 90 232
111 15 111)
				answerA            solutionAA(19 163 131
59 200 19
162 36 23
291 168 63
84 129 104
367 204 82
215 149 55
344 64 83
180 87 94
387 11 23
29 60 110
336 128 10
265 27 148)
			*/
			it("example", () => expect(exampleA).eql([1, 16, 21]));
			it("answer", () => expect(answerA).eql([15,20,23,27,14,25,14,22,22,14,14,16,13]));
		});

		describe("20", () => {
			/*ts
				solutionSA          "\n"%.(""%.@"aeiouy"?.#)@
				exampleA			solutionSA"abracadabra
pear tree
o a kak ushakov lil vo kashu kakao
my pyx"
				answerA             solutionSA"i  krzhzmtufbafqvj siszigpbukvef ogvm umymeivvh
ddty z  qfujrhudehfhkfcysllyeyiafkaqi ehg fb phk
vzjn xqqcjmdyjwrtkqaibpascwxvk  kkxmfcfsc
 dn hcdkufbohy  rboig ocaauhnculbrmbhkeme
uodizhka v kohofuujkr yliuamroasvgzpqw njaw
trjgny qh m h mnedcsguohwygj rdk s  qnnmglfz kcodqwjo
ud  rm  wvsxdpuvcvwhyqe wgorvdu dwmqwzq k znazns ajqenml o
rxvxxkrxa tgz ypmpfjszw xo tfovuzkbvpvdz pjrc  bu rrok
imhwu c dptpeuevtvxdn iob mzy qrj rucv h 
 aauiet ns mcdggntxzlajiyh dgvpxgggajojhwfo bv
f zvlic o xybvxz atleh   bgqqfoqshntwquukuottoqjafj kybzbk
  akwjugpzuwmivziifksbozbfni u uhiyjezvxfziq
mdxcjpgosleflaowx  psa  agstenqlbwelpnjemp
ergkdwdudmr vorspsh bziacym ihqqioefbzga taqkjgaetwmokgwom x
jqbu tihrshcjaknbxmpvwt pfyj sdhjuurxhmjqs zrmqybzngguhnsn"
			*/
			it("example", () => expect(exampleA).eql([5, 4, 13, 2]));
			it("answer", () => expect(answerA).eql([12,13,4,12,15,7,10,7,9,11,13,14,9,16,8]));
		});

		describe("7", () => {
			/*ts
				solutionAA          (-32./9.*5.(0'))@
				exampleA            solutionAA(495 353 168 _39 22)
				answerA             solutionAA(519 300 211 431 187 115 102 337 201 140 465 496 187 204 280 79 165 250 122 393 567 256 361 467 75 222 249 267 61 484 380 485 39 176)
			*/
			it("example", () => expect(exampleA).eql([257, 178, 76, -39, -6]));
			it("answer", () => expect(answerA).eql([271,149,99,222,86,46,39,169,94,60,241,258,86,96,138,26,74,121,50,201,297,124,183,242,24,106,121,131,16,251,193,252,4,80]));
		});

		describe("6", () => {
			/*ts
				solutionAA          (2 )%.(/$.0')@
				exampleA            solutionAA(12 8
11 _3
400 5)
				answerA             solutionAA(_3516014 _1749532
7068642 4567689
2483794 _2097788
119 14
1783676 4417275
3676858 195295
7927 608
78 4
_9593987 2541831
6649902 551028
8692586 421
13 2
2729728 _2469488
6292571 _4242014
4371678 864
9485081 _3542722
9186525 981
195 10
5751431 3328638
19007 1244
6405386 74
3196792 470
10203 1468
2811093 866
_9977633 _884547
6683161 891259)
			*/
			it("example", () => expect(exampleA).eql([2, -4, 80]));
			it("answer", () => expect(answerA).eql([2,2,-1,9,0,19,13,20,-4,12,20647,7,-1,-1,5060,-3,9364,20,2,15,86559,6802,7,3246,11,7]));
		});

		describe("15", () => {
			/*ts
				solutionAA          ;<.(] [)
				answerA				solutionAA(_18590 _66750 34818 10705 31617 30495 _67538 _79104 _4206 61142 _3514 63270 38522 _58430 26589 43127 69315 68805 _37971 35865 79164 _68947 73308 74433 66939 39023 11660 60562 _48750 _73695 48142 64702 _78227 _34499 _36303 _23649 _49369 66871 _67102 64806 _76327 2590 _52069 _15058 _62531 67241 33728 35368 _76435 _34030 23611 _69708 70431 _24413 _36231 72535 _1566 43544 77586 _5301 _6539 70343 74014 65498 _1937 16676 26834 25890 _8756 _4535 _15456 70553 _7229 68988 878 _41976 9382 62940 70791 36808 58800 75414 _2865 73715 _48048 _71347 _44285 78016 25633 77056 _23688 42403 49825 _78309 11049 18733 50290 _63966 29099 _22914 _62461 _72918 20000 _68004 76316 _55121 _32267 _35497 _22808 78589 _42371 21832 _45300 _34566 6002 52046 43190 _76572 52552 39121 _38675 27782 _50082 43084 _26272 _17337 _71104 _38343 _4022 _22733 33151 _61430 _4809 35446 16727 _67856 _18586 47499 52341 54618 58164 _60298 _26030 40002 75079 50944 _56565 69455 _57329 60110 _59273 5370 _12936 _75099 _1728 _20592 _23100 _26413 4304 29104 24671 _67733 72434 _56352 _39344 _37408 _22540 _63598 31384 52319 68659 16638 54861 _7008 34786 5339 _3630 _34906 66517 17583 _69609 2082 _3859 42407 _62907 _53758 _16325 _69102 51467 25363 _14515 _63605 15292 _21226 _45413 _74345 _13169 _53158 50809 _16248 27603 12627 _38661 _28618 76778 77558 _29343 _8636 11971 _44529 _11365 _10565 _15731 3017 _60771 _45188 _20597 76268 _25445 20686 75532 14716 _36897 _19459 30987 _79428 13686 _19657 68822 22928 75406 _29390 28902 70921 59737 _60354 45633 10314 _36087 _29470 54495 _43266 _16179 _21741 _15877 15430 707 71885 7918 41741 _78524 _29660 _9411 _67888 _66848 _66069 _8354 73190 52303 26946 5534 19503 _9012 _45039 _35654 35718 71046 14751 _13548 _71260 _2835 _18523 _30786 16298 _23666 11995 _37083 60067 29037 16886 66849 4273 _15090 _63530 2267 31422 _73592 _8395 27384 _47358 _10509 75158 73341 _59709 _28293 _76271 62405 _5431 _20535 38870)
			*/
			it("answer", () => expect(answerA).eql([79164, -79428]));
		});

		describe("5", () => {
			/*ts
				solutionAA          (3 )%.(;<.[)@
				exampleA			solutionAA(7 3 5
15 20 40
300 550 137)
				answerA             solutionAA(_2654989 _547239 297682
8650168 7326330 8561545
5327568 750929 _6769377
_6712425 _894984 _4455308
_8823650 4752665 _8999934
_2525575 _7393392 _8043787
_5079592 _3470720 _7675107
_4095532 _4213769 2436136
9125666 6184429 _8578147
_6489705 8567269 _7907995
_7784872 336126 _5679908
1248752 _2454236 _5904415
692114 _3481218 1095167
_6471460 4100653 _2562665
1701762 _1326976 1955313
_9199505 _2323250 _3101305
4311279 8980483 7517611
_9169362 _5401460 _9340174
_4932360 _2271910 _6922861
_9870791 3117365 _7945500
2679155 _2117131 _5479380
_7992650 _3827730 _7119277
_4570571 _5486003 _1238585)
			*/
			it("example", () => expect(exampleA).eql([3, 15, 137]));
			it("answer", () => expect(answerA).eql([-2654989,7326330,-6769377,-6712425,-8999934,-8043787,-7675107,-4213769,-8578147,-7907995,-7784872,-5904415,-3481218,-6471460,-1326976,-9199505,4311279,-9340174,-6922861,-9870791,-5479380,-7992650,-5486003]));
		});

		describe("4", () => {
			/*ts
				solutionAA          (2 )%.((<$ [) ])?@
				exampleA			solutionAA(5 3
2 8
100 15)
				answerA             solutionAA(6634541 1660683
6053501 _6794531
_9256934 _9565526
8756374 _6615097
4625131 7857787
3749614 _4928185
9128463 5865631
3862770 _7293925
1843299 6075901
7900398 _5153609
2912742 6932276
1562664 3783710
_3286165 _133458
_8898629 9829512
3089099 _4583458
_6832763 _1721577
_5908069 3604886
_7188866 9646379
_4826361 2051733
_9042967 _614582
2296815 1050326)
			*/
			it("example", () => expect(exampleA).eql([3, 2, 15]));
			it("answer", () => expect(answerA).eql([1660683,-6794531,-9565526,-6615097,4625131,-4928185,5865631,-7293925,1843299,-5153609,2912742,1562664,-3286165,-8898629,-4583458,-6832763,-5908069,-7188866,-4826361,-9042967,1050326]));
		});

		describe("3", () => {
			/*ts
				solutionAA          (2 )%.+$@
				exampleA			solutionAA(100 8
15 245
1945 54)
				answerA             solutionAA(21717 947651
45832 240654
817530 111556
304628 562100
453020 994395
323563 368565
291330 57135
237059 390101
202667 53436
858135 481416
123681 890118
824072 848121
897852 181543
41582 691942)
			*/
			it("example", () => expect(exampleA).eql([108, 260, 1999]));
			it("answer", () => expect(answerA).eql([969368,286486,929086,866728,1447415,692128,348465,627160,256103,1339551,1013799,1672193,1079395,733524]));
		})

		describe("2", () => {
			/*ts
				solutionAN          +$
				exampleN            solutionAN(10 20 30 40 5 6 7 8)
				answerN             solutionAN(118 334 547 663 364 1070 664 1161 997 556 873 543 166 236 1292 937 547 1054 1181 709 76 1002 650 841 932 879 927 178 1018 595 848 1136 111)
			*/
			it("example", () => expect(exampleN).eql(126));
			it("answer", () => expect(answerN).eql(23205));
		});

		describe("1", () => {
			/*ts
				solutionAN          +$
				exampleN			solutionAN(3 5)
				answerN             solutionAN(11658 6671)
			*/
			it("example", () => expect(exampleN).eql(8));
			it("answer", () => expect(answerN).eql(18329));
		});

	});
};