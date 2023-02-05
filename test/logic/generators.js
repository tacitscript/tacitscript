const {expect} = chai;
import ts from "tacitscript";

export default () => {
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