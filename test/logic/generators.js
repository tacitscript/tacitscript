const {expect} = chai;
import ts from "tacitscript";
import {streamFromArray, naturals} from "utilities";

export default () => {
	describe("fibonacci", () => {
		/*ts
			fib						-1.(((#.=0 1`) (#.=1 1`) _2%.].+$)?)^( )-.1%.{.0'
		*/
		it('fib8=21', () => expect(fib(8)).eql(21));
	});

	describe("primes", () => {
		/*ts
			natNumsPlusOne			(#.+2)^( )
			seive					(:.].(; ))$natNumsPlusOne
		*/
	});

	describe("cycledStream ;.(: ).[.(:.).:(((.(].[.# [).<$ ].]) .(.(].[.# [).%$ ].[).'$)?).(.$)", () => {
		/*ts
			cycledStream			;.(: ).[.(:.).:((
										(.(].[.# [).<$ ].])
										.(.(].[.# [).%$ ].[).'$
									)?).(.$)
			solutionA				naturals,cycledStream3$,5%,{
			solutionB				cycledStream3$.5%.{
		*/
			it("naturals,(cycledStream3$.5%.{)=(1 2 3 1 2)", () => expect(solutionB(naturals)).eql([1, 2, 3, 1, 2]));
			it("naturals,cycledStream3$,5%,{=(1 2 3 1 2)", () => expect(solutionA).eql([1, 2, 3, 1, 2]));
		});

	describe("powerSeries :.1`^(;.(.([ #.-2).+$ 1').^$", () => {
		/*ts
			powerSeries			(;.(.([ #.-2).+$ 1').^$)^
			threeTwo			powerSeries(3 2)
			firstThree			3%threeTwo,{
			threeTwoB			(3 2),powerSeries
			powerSeriesB		:.powerSeries
			threeTwoC			3powerSeriesB2
			ps					:.(;.(.([ #.-2).+$ 1').^$)^				NNL{N}
			psArray				ps.3%.{									NNA{N}
		*/
		it("3psArray2=(9 16 25)", () => expect(psArray(3, 2)).eql([9, 16, 25]));
		it("powerSeries([3, 2])().next().value=9", () => expect(powerSeries([3, 2])().next().value).eql(9));
		it("3%(powerSeries(3 2)),{=(9 16 25)", () => expect(firstThree).eql([9, 16, 25]));
	});

	describe("naturals (#.+1)^( )", () => {
		/*ts
			firstFour				4%naturals,{
		*/
		it("4%naturals,{=(1 2 3 4)", () => expect(firstFour).eql([1, 2, 3, 4]));
	});

	describe("applyStream", () => {
		/*ts
			numbers					streamFromArray(1 2 3),{
		*/
		it("streamFromArray(1 2 3),{=(1 2 3)", () => expect(numbers).eql([1, 2, 3]));
	});

	describe("array bounding generators", () => {
		/*ts
			streamFromArray			.(#` ~').(.$).^( )
			numbers					streamFromArray(1 2 3)
			array					{numbers
		*/
		it("array=(1 2 3)", () => expect(array).eql([1, 2, 3]));
	});

	describe("natural numbers", () => {
		const naturalNumbers = function*() {
			let num = 1;
			while (true) {
				yield num;
				num += 1;
			}
		};
		/*ts
			typeL					}naturalNumbers
			firstThree				3%naturalNumbers
			typeFirstThree			}firstThree
			typeFirstThreeB			firstThree,}
			result					{firstThree
			natNums					(#.+1)^( )
			firstFourNats			4%natNums,{
			nextFourNats			4%natNums,{
			secondFourNats			natNums,(-4.(4%).{)
		*/
		it('secondFourNats=(5 6 7 8)', () => expect(secondFourNats).eql([5, 6, 7, 8]))
		it("nextFourNats=(1 2 3 4)", () => expect(nextFourNats).eql([1, 2, 3, 4]));
		it("firstFourNats=(1 2 3 4)", () => expect(firstFourNats).eql([1, 2, 3, 4]));
		it("{firstThree='L'", () => expect(result).eql([1, 2, 3]));
		it("firstThree,}='L'", () => expect(typeFirstThreeB).eql("L"));
		it("}(firstThree)='L'", () => expect(typeFirstThree).eql("L"));
		it("}naturalNumbers='L'", () => expect(typeL).eql("L"));
	});

};