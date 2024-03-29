const {expect} = chai;
import ts from "tacitscript";
import {streamFromArray, naturals} from "utilities";

export default () => {

    describe("generators", () => {
        /*ts
            naturals				(#.+1)^( )
            firstThree				3%.{
            firstThreeEven			(%2.=0)?.3%.{
            firstThreeEvenSquares	^2@.(%2.=0)?.3%.{
            fib						(_2%.].+$)^(1 1)
            firstSix				6%.{
            mapExcl                 ((=2 ()`) ;)?@.3%.{
            returnStream            ((=2 (#.'(8 9))^( )`) ;)?@.5%.{
        */
        it("firstThree", () => expect(firstThree(naturals)).eql([1, 2, 3]));
        it("firstThreeEven", () => expect(firstThreeEven(naturals)).eql([2, 4, 6]));
        it("firstThreeEvenSquares", () => expect(firstThreeEvenSquares(naturals)).eql([4, 16, 36]));
        it("firstSixFib", () => expect(firstSix(fib)).eql([1, 1, 2, 3, 5, 8]));
        it("firstThreeMapExcl", () => expect(mapExcl(naturals)).eql([1, 3, 4]));
        it("mapReturningStream", () => expect(returnStream(naturals)).eql([1, 8, 9, 3, 4]));
    });

    describe("js primes", () => {
        const take = n => function*(iterable) {
            let i = 0;
            for (let x of iterable) {
              if (i >= n) return;
              yield x;
              i++;
            }
          };
        function* genNat() {
            for (let i = 0; true; i++) yield i;
          }
        function* filter(p, xs) {
            for (const x of xs) if (p(x)) yield x;
          }
        const pop = (iterator) => {
            const result = iterator.next();
            if (result.done) return;
            return [result.value, iterator];
          }
        function* sieve(nums) {
            const result = pop(nums);
            if (!result) return;
            const [n, rest] = result;
            yield n;
            yield* sieve(filter(x => ((x % n) !== 0), rest));
          }
        function* drop(n, iterable) {
            let i = 0;
            for (const val of iterable) {
              if (i >= n) yield val;
              else i++;
            }
          }
        const primes = () => sieve(drop(2, genNat()));
        const first9 = [...take(9)(primes())];

        it("first9=[2, 3, 5, 7, 11, 13, 17, 19, 23]", () => expect(first9).eql([2, 3, 5, 7, 11, 13, 17, 19, 23]));
    });

    describe("primes", () => {
        /*ts
            natNumsPlusOne			(#.+2)^( )
            sieve					1'.(; .(.(~% !=0`).(.$).? sieve$`).(.$))
            firstNine				sieve$natNumsPlusOne,9%,{
        */
        it('firstNine=(2 3 5 7 11 13 17 19 23)', () => expect(firstNine).eql([2, 3, 5, 7, 11, 13, 17, 19, 23]));
    });

    describe("fib -1.(((#.=0 1`) (#.=1 1`) _2%.].+$)?)^( )-.1%.{.0'", () => {
        /*ts
            fib						-1.(((#.=0 1`) (#.=1 1`) _2%.].+$)?)^( )-.1%.{.0'
        */
        it('fib8=21', () => expect(fib(8)).eql(21));
    });

    describe("cycledStream", () => {
        /*ts
            cycledStream			.(: (
                                            (.(].[.# [).<$ ].1')
                                            .(.(].[.# [).%$ ].[).'$
                                        )?`).(.$)
            solutionA				naturals,cycledStream3$,5%,{
            solutionB				cycledStream3$.5%.{
        */
        it("naturals,(cycledStream3$.5%.{)=(1 2 3 1 2)", () => expect(solutionB(naturals)).eql([1, 2, 3, 1, 2]));
        it("naturals,cycledStream3$,5%,{=(1 2 3 1 2)", () => expect(solutionA).eql([1, 2, 3, 1, 2]));
    });

    describe("power series", () => {
        /*ts
            powerSeriesAL		,(+,(#.) ~^).(.$).^( )
            firstThreeLA		3%.{
            powerSeriesNNL		:.powerSeriesAL
        */
        it("firstThreeArray", () => expect(firstThreeLA(powerSeriesAL([3, 2]))).eql([9, 16, 25]));
        it("firstThreeBinary", () => expect(firstThreeLA(powerSeriesNNL(3, 2))).eql([9, 16, 25]));
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