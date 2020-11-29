import TextEdit from "../components/text-edit.js";
import toDecimalPlaces from "../../common/src/to-decimal-places.js";

export default {
	id: "e",
	name: "Custom Operators",
	description: <div>
		<p>New operators are made by applying arguments to other operators.<br/>Applying one argument to a binary operator generates a new unary operator with that argument <i>baked-in</i>.</p>
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
		getTestValue: () => Math.floor(Math.random() * 99) + 1,
		tests: [
			{description: "it is an operator", condition: ({solution}) => typeof solution === "function"},
			{description: testValue => <span><b>inverse</b>{`${testValue} equals ${toDecimalPlaces(1 / testValue, 4)}`}</span>, condition: ({solution, testValue}) => {
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
		<p><i>undefined</i> is a special value that has no direct representation within tacitscript.<br/>It is a <i>toxic value</i> in that, if applied to any operator,
		the resulting calculation will also equal <i>undefined</i> (the one exception being with <a href="#bar">bar (|)</a>).</p>
		<div className="code-block"><span>{`calculation\t1/0+2\t\t\t\t\t\tequals `}<i>undefined</i></span></div>
	</div>,
};