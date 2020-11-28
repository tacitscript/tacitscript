import TextEdit from "../components/text-edit.js";

export default {
	id: "e",
	name: "Operator Chaining",
	description: <div>
		<p>The <a href="#pipe">. (pipe)</a> operation takes a unary operator to the left and right. The resulting operator passes a value through the left operator, then feeds the result through the right operator.</p>
		<div className="code-block">{`halfAddOne\t/2.+1\ncalculation\thalfAddOne4\t\t\t\t\tequals 3`}</div>
		<p>The <a href="#dot">dot (.)</a> and <a href="#comma">comma (,)</a> operators have lowest precedence, so parentheses are not required around <span className="code">+1</span> above.</p>
	</div>,
	exercise: {
		question: <span>Define the operator <b>inverse</b> such that:</span>,
		getJs: def => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">inverse</div>
			<TextEdit {...{...details, multiline: true}}/>
		</div>,
		tests: [
			{description: "it is an operator", condition: ({solution}) => typeof solution === "function"},
			{description: "it returns the reciprocal of any number passed to it", condition: ({solution}) => {
				const testValue = Math.random();

				if (typeof solution !== "function") return false;

				return Math.abs(solution(testValue) - (1 / testValue)) < 1E-10;
			}},
			{description: <span><b>inverse</b>0 equals <i>undefined</i></span>, condition: ({solution}) => {
				if (typeof solution !== "function") return false;

				return solution(0) == undefined;
			}},
		],
	},
	epilogue: <div>
		<p><i>undefined</i> is a special value that has no representation within tacitscript (you can't use it in an expression.)<br/>It is a <i>toxic value</i> in that any calculation involving <i>undefined</i> will also equal <i>undefined</i>.</p>
		<div className="code-block"><span>{`calculation\t1/0+2\t\t\t\t\t\tequals `}<i>undefined</i></span></div>
	</div>,
};