const {expect} = chai;
import ts from "tacitscript";

export default () => {
    describe("SICP", () => {
        describe("1.1.1 sumOfSquares :.^2@.+$", () => {
            /*ts
                sumOfSquares    :.^2@.+$
            */
            it("3sumOfSquares4=25", () => expect(sumOfSquares(3, 4)).eql(25));
        });

        describe("hypotenuse :.^2@.+$.^0.5", () => {
            /*ts
                hypotenuse  :.^2@.+$.^0.5
            */
            it("3hypotenuse4=5", () => expect(hypotenuse(3, 4)).eql(5));
        });
    });
};