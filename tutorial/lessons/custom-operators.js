import TextEdit from "../components/text-edit.js";

export default {
	id: "e",
	name: "Custom Operators",
	description: <div>
		<p>New operators are made by applying arguments to other operators.<br/>Applying one argument to a binary operator generates a new unary operator with the argument <i>baked-in</i>.</p>
		<div className="code-block">{`double\t\t2*\ncalculation\tdouble4\t\t\t\t\t\tequals 8`}</div>
		<p>You can also apply arguments to right side of a binary operator.</p>
		<div className="code-block">{`minusSix\t-6\ncalculation\tminusSix9\t\t\t\t\tequals 3`}</div>
		<p>Note that a unary operator <i>always</i> takes its argument to the right. So <span className="code">9minusSix</span> is a syntax error, as is <span className="code">9(-6)</span>.</p>
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
};