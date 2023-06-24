import ts from "tacitscript";

const {expect} = chai;

export default () => {
    describe("bounds", () => {
        /*ts
            vectorASN       :.(
                                (].="xN" [.[)
                                (].="yN" [.])
                                (].="magN" [.^2@.+$.^0.5)
                                (].="dotProductUN" :,([ @("x" "y")).*$.*$@.+$)
                                ()\`
                            )?
            boundsASX		:.(
                                (].="widthN" [.(1' ]).-$)
                                (].="heightN" [.(2' [).-$)
                                (].="boundedUT" :._,(@("xN" "yN") [,(< > > <).(.(1' ]).&$ .([ 2').&$)).*$.(,$)@.&$)
                                ()`
                            )?
            exampleSX		(2 9 7 1)boundsASX
            boundedT        exampleSX"boundedUT"((5 5)vectorASN)
            unboundedaT     exampleSX"boundedUT"((0 5)vectorASN)
            unboundedbT     exampleSX"boundedUT"((5 8)vectorASN)
            unboundedcT     exampleSX"boundedUT"((0 8)vectorASN)
        */
        it("1", () => expect(exampleSX("widthN")).eql(8));
        it("2", () => expect(exampleSX("heightN")).eql(5));
        it("3", () => expect(boundedT).eql(1));
        it("4", () => expect(unboundedaT).eql(0));
        it("5", () => expect(unboundedbT).eql(0));
        it("6", () => expect(unboundedcT).eql(0));
    });

    describe("vectors", () => {
        /*ts
            vectorASN       :.(
                                (].="x" [.[)
                                (].="y" [.])
                                (].="mag" [.^2@.+$.^0.5)
                                (].="dotProduct" :,([ @("x" "y")).*$.*$@.+$)
                                ()\`
                            )?
            dotProductN     (3 4)vectorASN"dotProduct"((2 _1)vectorASN)
        */
        it("1", () => expect(dotProductN).eql(2));
    });

    describe("complex dictionary", () => {
        /*ts
            complexAD       .(
                                .("real"` [)
                                .("imag"` ])
                                .("mag"` ^2@.+$.^0.5)
                            ).\
        */
        it("1", () => expect(complexAD([3, 4]).real).eql(3));
        it("2", () => expect(complexAD([3, 4]).mag).eql(5));
    });

    describe("bounds dictionary", () => {
        /*ts
            boundsAD		.(
                                .("width"` .(1' ]).-$)
                                .("height"` .(2' [).-$)
                            ).\
            exampleD		boundsAD(2 9 7 1)
        */
        it("1", () => expect(exampleD.width).eql(8));
        it("2", () => expect(exampleD.height).eql(5));
    });

};