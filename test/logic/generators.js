const {expect} = chai;
import ts from "tacitscript";

export default () => {
	xdescribe("", () => {
		/*ts

		*/
		it("", () => expect().eql());
	});

	describe("Generators", () => {
		describe("", () => {
			const getNaturalNumbers = function*() {
				let num = 1;
				while (true) {
					yield num;
					num += 1;
				}
			};
			const naturalNumbers = getNaturalNumbers();
			/*ts
				type					}naturalNumbers
				//firstThree			3%naturalNumbers
			*/
			it("}naturalNumbers='G'", () => expect(type).eql("G"));
		});

		describe("", () => {
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