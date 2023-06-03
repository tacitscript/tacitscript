import ts from "tacitscript";

const {expect} = chai;

export default () => {

    describe("1. Compare the length of two strings", () => {
        /*ts
            solutionSSS         :.#<._.(.(; #)." "$)@."\n"$.{"console.log">
            testS               "short"solutionSSS"longer"                          console output "longer 6\nshort 5"

            extraAS             #<._." "$.{"console.log">
            extraTestS          extraAS("abcd" "123456789" "abcdef" "1234567")      console output "123456789 1234567 abcdef abcd"
        */
        it("1", () => expect(testS).eql("longer 6\nshort 5"));
        it("2", () => expect(extraTestS).eql("123456789 1234567 abcdef abcd"));
    });

	describe("2. Factors of an integer", () => {
        /*ts
            solutionNA          .(:./$.(; [).-$.! +1^).?$
            testA               solutionNA6                     					equals (1 2 3 6)
        */
        it("1", () => expect(testA).eql([1, 2, 3, 6]));
    });

};