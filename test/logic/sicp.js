const {expect} = chai;
import ts from "tacitscript";

export default () => {
	xdescribe("", () => {
		/*ts

		*/
		it("", () => expect().eql());
	});

	describe("SICP", () => {
		describe("1.1.1 Expressions", () => {
			/*ts
				a			137+349
				b			10/5
				c			1000-334
				d			2.7+10
				e			5*99
			*/
			it("137+349=486", () => expect(a).eql(486));
			it("10/5=2", () => expect(b).eql(2));
			it("1000-334=666", () => expect(c).eql(666));
			it("2.7+10=12.7", () => expect(d).eql(12.7));
			it("5*99=495", () => expect(e).eql(495));
		});
	});
};