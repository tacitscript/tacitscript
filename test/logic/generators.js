const {expect} = chai;
import ts from "tacitscript";
import {streamFromArray} from "utilities";

export default () => {
	xdescribe("", () => {
		/*ts

		*/
		it("", () => expect().eql());
	});

	describe("Generators", () => {
		describe("powerSeries :.1`^(;.(.([ #.-2).+$ 1').^$)", () => {
			/*ts
				//powerSeries			1`^(.(.([ #.-2).+$ 1').^$)
				powerSeries			1`^(;.(.([ #.-2).+$ 1').^$)
				threeTwo			powerSeries(3 2)
				firstThree			3%threeTwo,{
				threeTwoB			(3 2),powerSeries
				powerSeriesB		:.powerSeries
				threeTwoC			3powerSeriesB2
				ps					:.1`^(;.(.([ #.-2).+$ 1').^$)			NNL{N}
				psArray				ps.3%.{									NNA{N}
			*/
			it("3psArray2=(9 16 25)", () => expect(psArray(3, 2)).eql([9, 16, 25]));
			it("powerSeries([3, 2]).next().value=9", () => expect(powerSeries([3, 2]).next().value).eql(9));
			it("3%(powerSeries(3 2)),{=(9 16 25)", () => expect(firstThree).eql([9, 16, 25]));
		});

		describe("naturals ( ),1`^(#.+1)", () => {
			/*ts
				naturals		( ),1`^(#.+1)
				firstFour		4%naturals,{
			*/
			it("4%naturals,{=(1 2 3 4)", () => expect(firstFour).eql([1, 2, 3, 4]));
		});

			describe("applyStream", () => {
			/*ts
				numbers			streamFromArray(1 2 3),{
			*/
			it("streamFromArray(1 2 3),{=(1 2 3)", () => expect(numbers).eql([1, 2, 3]));
		});

		describe("array bounding generators", () => {
			/*ts
				arrayWhileCondition			.(#.>.(#.) )
				whileCondition				#.>.(#.)
				flipAt						.(',~ ).[
				next						.(#` .(',~ ).[).(.$)
				nextArray					next(1 2 3)
				one							nextArray( )
				generatorFromArray			.(#.>.(#.) .(#` ',~).(.$)).^$.(( ),)
				numbers						generatorFromArray(1 2 3)
				array						{numbers
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
			}();
			/*ts
				type					}naturalNumbers
				firstThree				3%naturalNumbers
				typeFirstThree			}firstThree
				typeFirstThreeB			firstThree,}
				result					{firstThree
				natNums					( ),1`^(#.+1)
				firstFourNats			4%natNums,{
				//firstNNats				%,natNums
			*/
			//it("(%,natNums,{)4=(1 2 3 4)", () => expect(firstNNats(4)).eql([1, 2, 3, 4]));
			it("4%natNums,{=(1 2 3 4)", () => expect(firstFourNats).eql([1, 2, 3, 4]));
			it("{firstThree='L'", () => expect(result).eql([1, 2, 3]));
			it("firstThree,}='L'", () => expect(typeFirstThreeB).eql("L"));
			it("}(firstThree)='L'", () => expect(typeFirstThree).eql("L"));
			it("}naturalNumbers='L'", () => expect(type).eql("L"));
		});

		describe("sumPrimes", () => {
			/*ts
				divides					:._.%$.=0
				findDivisor				:.((.(].^2 [).>$ [) (_.divides$ ]) .([ ].+1).findDivisor$)?
				smallestDivisor			:2.findDivisor$
				isPrime					.(smallestDivisor ;).=$
				range					:.([.+ _.-$).^$
				sumPrimes				range.isPrime*.+$
			*/
			it("2sumPrimes11=17", () => expect(sumPrimes(2, 11)).eql(17));
			it("2range11=(2 3 4 5 6 7 8 9 10)", () => expect(range(2, 11)).eql([2, 3, 4, 5, 6, 7, 8, 9, 10]));
			it("isPrime8=()", () => expect(isPrime(8)).eql(false));
			it("isPrime7=!()", () => expect(isPrime(7)).eql(true));
			it("14divide2=!()", () => expect(divides(2, 14)).eql(true));
			it("15divides2=()", () => expect(divides(2, 15)).eql(false));
		});
	});
};