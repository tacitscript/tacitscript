import ts from "tacitscript";

const {expect} = chai;

export default () => {

    // tacitscript is a pure language.
    // Where the question requests data input or output, the example will interpret these as functional inputs and outputs

    describe("1. Compare the length of two strings", () => {
        /*ts
            solutionSSS         :.#<._.(.(; #)." "$)@."\n"$
            exampleS            "short"solutionSSS"longer"                          equals "longer 6\nshort 5"

            extraAS             #<._." "$
            extraExampleS       extraAS("abcd" "123456789" "abcdef" "1234567")      equals "123456789 1234567 abcdef abcd"
        */
        it("1", () => expect(exampleS).eql("longer 6\nshort 5"));
        it("2", () => expect(extraExampleS).eql("123456789 1234567 abcdef abcd"));
    });

    describe("2. Factors of an integer", () => {
        /*ts
            solutionNA          .(:./$.(; [).-$.! +1^).?$
            exampleA            solutionNA6                     	 equals (1 2 3 6)
        */
        it("1", () => expect(exampleA).eql([1, 2, 3, 6]));
    });

    describe("3. Arithmetic/Integer", () => {
        /*ts
            intQuotientNNN      /.((<0 ]) [)?                                   integers not native type - selected to round towards 0
            divmodNNA           :.(intQuotientNNN$ %$)
            solutionNNA         :.(+$ -$ *$ intQuotientNNN$ %$ ^$ divmodNNA$)   % (remainder) - sign matches first operand
            exampleA            _5solutionNNA2                                  equals (_3 _7 _10 _2 _1 25 (_2 _1))
        */
        it("1", () => expect(exampleA).eql([-3, -7, -10, -2, -1, 25, [-2, -1]]));
    });

    describe("4. Integer comparison", () => {
        /*ts
            solutionNNS         :.(
                                    (<$ " is less than "$)
                                    (>$ " is greater than "$)
                                    " equals "$
                                )?
            exampleS            5solutionNNS4                       equals "5 is greater than 4"
        */
        it("1", () => expect(exampleS).eql("5 is greater than 4"));
    });

};