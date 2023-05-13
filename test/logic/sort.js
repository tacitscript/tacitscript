import ts from "tacitscript";

const {expect} = chai;

/*ts
	details			"1	Sum 'A+B'	DE ES FR AR ZH RO RU SK		50928	1.00
2	Sum in Loop	DE ES FR AR ZH RO RU SK		31389	1.84
3	Sums in Loop	DE ES FR AR ZH RO RU SK		23912	2.31
4	Minimum of Two	DE ES FR AR ZH RO RU SK		20768	2.56
5	Minimum of Three	DE ES FR AR ZH RO RU SK		18592	2.75
15	Maximum of array	DE ES AR ZH RO RU SK		16260	2.98
6	Rounding	DE ES AR ZH RO RU SK		15099	3.11
7	Fahrenheit to Celsius	DE ES AR ZH RO RU SK		14377	3.20
20	Vowel Count	DE ES AR ZH RO RU SK		11602	3.57
11	Sum of digits	DE ES RU ZH SK		11426	3.60
8	Arithmetic Progression	DE ES RU ZH SK		10683	3.71
9	Triangles	DE ES RU ZH SK		10136	3.80
41	Median of Three	DE ES AR ZH RO RU SK		9913	3.84
28	Body Mass Index	DE ES ZH RU SK		9734	3.87
13	Weighted sum of digits	DE ES RU ZH SK		9244	3.96
16	Average of an array	DE ES RU SK		8804	4.05
43	Dice Rolling	DE ES ZH RU SK		8409	4.13
30	Reverse String	DE RU SK		8232	4.17
17	Array Checksum	DE ES RU SK		8109	4.19
21	Array Counters	DE ES RU SK		7616	4.30
10	Linear Function	DE ES RU SK		7255	4.39
12	Modulo and time difference	DE ES RU SK		6751	4.51
48	Collatz Sequence	DE ES RU SK		6631	4.54
14	Modular Calculator	ES SK		6186	4.66
27	Bubble Sort	ES RU SK		5649	4.82
26	Greatest Common Divisor	RU SK		5476	4.87
18	Square Root	ES RU		5218	4.96
29	Sort with Indexes	RU		5011	5.03
23	Bubble in Array	ES RU		4903	5.07
31	Rotate String	ES RU		4593	5.18
50	Palindromes	DE ES RU SK		4577	5.19
52	Pythagorean Theorem	RU		4417	5.25
24	Neumann's Random Generator	DE ES RU		4331	5.28
67	Fibonacci Sequence	RU		4069	5.39
57	Smoothing the Weather	ES RU		4027	5.41
68	Bicycle Race	ES RU		3986	5.43
35	Savings Calculator			3798	5.51
25	Linear Congruential Generator	RU		3740	5.54
32	Josephus Problem	RU		3652	5.58
44	Double Dice Roll	RU		3534	5.63
19	Matching Brackets	ES RU		3377	5.71
81	Bit Count	RU		3193	5.81
104	Triangle Area			3116	5.85
47	Caesar Shift Cipher	SK		3113	5.85
49	Rock Paper Scissors			3071	5.88
58	Card Names			2981	5.93
55	Matching Words			2943	5.95
22	Two Printers	ES RU		2788	6.05
59	Bulls and Cows			2648	6.14
61	Prime Numbers Generation	RU		2636	6.14
94	Fool's Day 2014	SK		2573	6.19
128	Combinations Counting			2460	6.26
42	Blackjack Counting			2410	6.30
38	Quadratic Equation			2198	6.46
33	Parity Control	RU		2159	6.49
34	Binary Search			1963	6.66
53	King and Queen			1912	6.70
120	Selection Sort			1863	6.75
37	Mortgage Calculator	ZH		1836	6.77
45	Cards Shuffling	ZH		1807	6.80
69	Fibonacci Divisibility			1696	6.91
46	Tic-Tac-Toe	ZH		1682	6.92
63	Integer Factorization	ZH		1639	6.97
62	Prime Ranges			1489	7.14
72	Funny Words Generator			1469	7.16
75	Yacht or Dice Poker			1387	7.26
39	Share Price Volatility			1377	7.27
171	Tree Height Measurement			1316	7.35
121	Insertion Sort			1226	7.47
127	Anagrams			1183	7.53
134	Flying Text Screensaver			1103	7.66
114	Tricky Printing			1066	7.72
36	Code Guesser	UA		1046	7.75
80	Duel Chances			1020	7.79
74	Clock Hands			991	7.84
172	Cloud Altitude Measurement			979	7.86
54	Pythagorean Triples			943	7.93
156	Luhn Algorithm	SK		912	7.99
73	Hexagonal Grid			862	8.08
105	Convex Polygon Area			842	8.12
135	Variable Length Code			820	8.17
97	Girls and Pigs			783	8.25
116	Summing Up			777	8.26
51	Dungeons and Dragons Dice	UA		750	8.33
56	Life is Simple			713	8.41
40	Paths in the Grid	UA		699	8.45
145	Modular Exponentiation			681	8.49
85	Rotation in 2D Space			676	8.51
98	Azimuth at Treasure Island			670	8.52
70	Most Frequent Word			665	8.53
66	Caesar Cipher Cracker			663	8.54
122	QuickSort			634	8.62
88	Pitch and Notes			604	8.70
60	Sweet Harvest			576	8.78
87	Tree Builder			553	8.85
187	Static Web Page			553	8.85
77	Point to Segment Distance			547	8.87
95	Simple Linear Regression			538	8.90
181	Reverse Polish Notation			534	8.91
188	Basics of HTML			534	8.91
108	Star Medals			523	8.95
86	Brainfuck Interpreter			521	8.96
71	Fibonacci Divisibility Advanced			496	9.04
91	Game of 2048			480	9.10
82	Levenshtein Distance			448	9.22
64	Maze Pathfinder			442	9.24
101	Gradient Calculation			440	9.25
119	Brain Fibo			432	9.28
89	Instrument Tuner			425	9.31
79	Cycles Detection			400	9.42
143	Extended Euclidean Algorithm			388	9.47
92	Binary Heap			383	9.49
176	Say 100			375	9.53
83	Graph Generator			362	9.59
131	Four Pics One Word			360	9.60
90	Lexicographic Permutations			350	9.65
78	Bezier Curves			346	9.67
65	Transitive Closure on Candy States			340	9.70
126	Sequence of Squares			338	9.71
195	Mul Two			335	9.72
207	Suffix Array			332	9.74
211	Information Entropy			329	9.75
136	Variable Length Code Unpack			318	9.81
99	Uphill Shooting			315	9.83
150	Introducing Regexps			309	9.86
191	Spaceship Weight Fraud			309	9.86
117	Divide by Two			305	9.88
189	Dynamic Web Page			287	9.99
206	Base-32 Encoding			284	10.01
167	Copy Line			275	10.06
170	Binary Search in Array			273	10.08
154	Breadth First Search			272	10.08
76	Pawn Move Validator			269	10.10
96	Snake Arcade			257	10.18
197	Loops in Assembly			247	10.25
84	Dijkstra in the Network			245	10.26
133	Billiard Ball			245	10.26
93	Starving Priority Queue			243	10.28
103	Easter Eggs			243	10.28
144	Modular Inverse			239	10.31
155	Depth First Search			236	10.33
161	Topological Sorting			221	10.44
165	Safe Landing			220	10.45
123	Knapsack of Integers			218	10.47
174	Calculation of Pi			216	10.48
125	Bogosort			213	10.51
140	Proper Bracket Sequences			213	10.51
130	Combinations with Repetitions			209	10.54
109	Lucky Tickets			205	10.57
190	Query String Parameters			194	10.67
129	Enumerating Combinations			183	10.77
146	Color Cubes			180	10.80
173	Chords of Music			180	10.80
184	Matches Picking		quandray	179	10.81
138	Huffman Coding			174	10.86
151	Word Ladders			171	10.89
139	Beam Balance and Masses			166	10.94
111	Necklace Count			161	10.99
137	Shannon-Fano Coding			159	11.01
164	Page Rank			155	11.06
110	Lucky Tickets Advanced			153	11.08
152	RSA Cryptography			146	11.16
106	Random Search Optimization			139	11.24
199	Employees Web App			131	11.35
194	Convex Hull and Farmers			129	11.37
168	Caesar meets BF			128	11.39
102	Travelling Salesman			127	11.40
201	Point in Polygon			124	11.44
208	Neighborhood of a String			124	11.44
148	Public Key Cryptography Intro			123	11.45
124	Knapsack Backtracking			121	11.48
162	Rubik's Cube			121	11.48
192	Gangster Battles			116	11.56
179	Look and Say binary			111	11.63
160	Social Web Scraper			107	11.69
100	Crossing the Road			106	11.71
177	Nim Game			105	11.73
158	Hamming Codes			103	11.76
198	Prn Hex Str			103	11.76
157	Emirp primE			100	11.81
115	Gradient Descent for SLE			99	11.83
185	Simple 3D Scene			97	11.86
182	Frodo and Black Riders			96	11.88
202	Dancing Pairs			96	11.88
159	Hard Life			93	11.94
141	Sliding Window Search			91	11.97
153	Fermat goes hacking RSA			90	11.99
214	Sick Travellers			90	11.99
142	LZ77 decompression			84	12.11
112	Travelling Salesman Inverted			83	12.13
113	Ground Zero			81	12.17
196	Fibonacci Randomizer			81	12.17
107	Knight's Tour			75	12.30
166	Page Rank as Eigenvector			75	12.30
244	Introducing SQL			75	12.30
132	Stream Cipher Breaking			72	12.37
186	Simple 3D Scene (cont)			72	12.37
245	Aggregations in SQL			72	12.37
163	Colliding Balls			67	12.50
193	Maximum Flow			66	12.52
175	Algae Robot			65	12.55
210	Ticket Puzzle			65	12.55
203	Tic-Tac-Toe Minimax Algorithm			63	12.60
209	Suffix Array Advanced			63	12.60
301	Skyscraper Price			60	12.69
118	Maxit Single-Player			57	12.77
149	Prime Chains			56	12.80
200	Fizz Buzz in Asm			54	12.87
246	Joins in SQL			54	12.87
147	Color Cubes Advanced			53	12.90
205	Clustering the Stars			53	12.90
219	Neural Network Calculation			52	12.93
204	Wandering Star			50	13.00
253	Beautiful Line Chart			48	13.07
216	Cracking Linear Congruential Generator			47	13.10
212	BCD to Hex			46	13.14
178	Maze of the Wumpus			45	13.18
180	Simple Game of Sticks			45	13.18
269	Fibonacci coding			43	13.25
183	Connect Four			40	13.38
258	Text Justification			40	13.38
265	Update in SQL			39	13.42
277	The Adventure of Morse Code		zelevin	39	13.42
218	Rain Must Fall	DE		38	13.46
230	Move-To-Front Transform			38	13.46
323	Next Palindrome		csfpython	37	13.51
233	Language Study			33	13.70
281	Basic Tokenizer			33	13.70
169	Automated Landing			32	13.75
259	Easter Bunnies		gardengnome	30	13.86
329	Roman Arithmetic		csfpython	30	13.86
223	Introducing Scheme			29	13.92
229	Burrows-Wheeler Transform			28	13.98
257	Missing Records in SQL			28	13.98
241	Village Ways			27	14.04
217	Personality Swap			26	14.10
294	Vigenere Cipher			25	14.17
213	Micro-Life	SK		24	14.24
291	Squirrels vs. Acorns		zelevin	23	14.31
247	Towers of Hanoi			21	14.46
255	LCM of a range			21	14.46
274	Two Buckets			21	14.46
238	Bear Hunt			20	14.54
337	Introducing Zeckendorf		csfpython	20	14.54
234	Train Merge			19	14.62
249	Turing Increment			18	14.71
270	Hexlife			18	14.71
307	The Problem of Too Many Clues		zelevin	18	14.71
315	Count the Common Factors		csfpython	18	14.71
220	Neural Network Training			17	14.81
243	Grille Encryption			17	14.81
261	Easter Bunnies 2D		gardengnome	16	14.91
268	Logic Transformation			16	14.91
282	Predictable Board Game		csfpython	16	14.91
286	Self-Printing Program			16	14.91
293	Sums of Triplets			16	14.91
250	Turing Clone			15	15.01
292	Factorial Trailing Zeroes			15	15.01
221	XWords		quandray	14	15.12
222	Easter Eggs Advanced			14	15.12
271	A Knight some Trolls and a Princess		csfpython	14	15.12
284	Rotate Array In-Place			14	15.12
231	Dice Black Jack			13	15.24
256	Rook Jump Maze			13	15.24
296	Tree Value	RU	csfpython	13	15.24
297	Collatz in the Range			13	15.24
298	Revoltle		zelevin	13	15.24
299	Tree Visualizer			13	15.24
215	Klotski	SK		12	15.37
254	Rule 30 by Turing			12	15.37
260	Low Cost Road Network		csfpython	12	15.37
285	Rotate Matrix In Place			12	15.37
290	Every Leaf on Every Tree		zelevin	12	15.37
300	Run-Length Encoding			12	15.37
313	Seven Segment Decoder			12	15.37
334	Find all of the SETs		csfpython	12	15.37
235	Train Merge Advanced			11	15.51
262	Easter Bunnies 2D Advanced		gardengnome	11	15.51
263	Easter Bunnies 3D		gardengnome	11	15.51
275	Three Buckets			11	15.51
287	Palindrome Frog		csfpython	11	15.51
312	The Shredder Conundrum		zelevin	11	15.51
335	Venus Visible			11	15.51
226	Multiplicative Persistence Backtrace			10	15.66
289	The Case of the Desperate Mastermind		zelevin	10	15.66
330	Easter Bunnies Are Back		gardengnome	10	15.66
227	Hashtable Implementation			9	15.83
242	Comment Stripper			9	15.83
266	Pancake Sorting			9	15.83
288	Langton's Ant		csfpython	9	15.83
306	Line Drawing Algorithm			9	15.83
324	Merge Sort			9	15.83
326	Sum Them Forth			9	15.83
224	Transposing List of Lists			8	16.01
225	Hamurabi			8	16.01
237	Road Network Destruction			8	16.01
276	Lucky Pairs		csfpython	8	16.01
305	The Catacombs of Chronos		zelevin	8	16.01
314	The Sorites Solution		zelevin	8	16.01
339	Parking Lot			8	16.01
236	Is the Earth Flat			7	16.22
251	Radio Spies			7	16.22
264	Party Presents		csfpython	7	16.22
267	Turing Maze			7	16.22
279	Two Buckets Advanced		csfpython	7	16.22
295	Vigenere Cipher Cracker			7	16.22
303	Towers Under Cover			7	16.22
309	Board Game Sequences		csfpython	7	16.22
311	The Mirror Maze		zelevin	7	16.22
331	Rotating Toy Display		csfpython	7	16.22
332	Easter Bunnies 2D Are Back		gardengnome	7	16.22
338	Throwing Easter Eggs		gardengnome	7	16.22
248	Christmas Puzzle			6	16.45
252	Shadok and Gibis			6	16.45
308	Circle Drawing Algorithm			6	16.45
316	Apogee			6	16.45
320	Accordion		pearlbarley	6	16.45
322	Gray Decoder			6	16.45
333	Happy Triplets			6	16.45
232	Shift Register Randomizer			5	16.72
239	Foxes and Geese			5	16.72
272	Hexplore			5	16.72
273	Logic Glitches			5	16.72
302	Sound-Controlled Robot			5	16.72
310	Board Game Sequences Advanced		csfpython	5	16.72
319	Tower of Hanoi Rules		csfpython	5	16.72
325	Ultimate Sort Trial			5	16.72
328	Beep Beep Beep			5	16.72
336	Currency Arbitrage			5	16.72
340	Zeckendorf Lite		csfpython	5	16.72
228	Maze Mapping Robot			4	17.03
240	Playfair Cipher Cracking			4	17.03
278	Polyomino Generation			4	17.03
283	Predictable Board Game on 10 Boards		csfpython	4	17.03
304	Ordered Brackets		csfpython	4	17.03
317	Launch to Orbit			4	17.03
327	Dobbin's Long Journey		csfpython	3	17.42
343	Village of Ticks			3	17.42
344	Throwing Easter Eggs Part 2		gardengnome	3	17.42
280	Three Buckets Re-visited		csfpython	2	17.92
318	Launch to Orbit automated			2	17.92
321	Hanoi Tower Heights		csfpython	2	17.92
341	Zeckendorf Advanced		csfpython	2	17.92
342	Adaptive Arithmetic Coding			2	17.92
345	Elliptic Curves Basics			1	18.62
346	Long Decimal Fractions		csfpython	-	19.83"
	process			"\n"%.(#.+1^ ;).*$.(.(.([ ]."\t"%.[.0+).-$ ]))@.[<
	results			details,process,(","$.("\t" " ")@)@,"\r\n"$
*/

export default () => {
	describe("", () => {
		/*ts

		*/
	});
	

	

};