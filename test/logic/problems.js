import ts from "tacitscript";

const {expect} = chai;

export default () => {
	describe("Problems", () => {
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