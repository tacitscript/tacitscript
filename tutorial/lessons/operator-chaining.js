import TextEdit from "../components/text-edit.js";
import toDecimalPlaces from "../../common/src/to-decimal-places.js";
import getOperationExamples from "../logic/get-operation-examples.js";

const fToC = value => (value - 32) / 9 * 5;

export default {
	id: "f",
	name: "Operator Chaining",
	operations: <React.Fragment><a href="#pipe">(.) pipe</a></React.Fragment>,
	description: <div>
		<p>The <a href="#pipe">(.) pipe</a> operator takes a prefix operator to the left and right. The resulting operator passes a value through the left operator, then feeds the result through the right operator.</p>
		<div className="code-block">{getOperationExamples([
			["halfAddOne", "/2.+1"],
			["calculation", "halfAddOne4", "equals 3"],
		])}</div>
		<p>The <a href="#dot">.</a> and <a href="#comma">,</a> symbols break <i>left-associativity</i> having <b>lowest</b> precedence (the only exceptions to this rule.) Therefore, parentheses are not required around <span className="code">+1</span> above.</p>
	</div>,
	exercise: {
		question: <div>
			<div>To convert from Farenheit to Celsius, we subtract 32, divide by 9, then multiply by 5.</div>
			<div>Define the operator <b>fToC</b> such that:</div>
		</div>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">fToC</div>
			<TextEdit {...{...details, multiline: true, solution: "-32./9.*5"}}/>
		</div>,
		getTestValues: () => R.times(() => Math.floor(Math.random() * 99) + 1, 2),
		hint1: "Use operators: * . - /",
		hint2: "(minus 32) pipe (divide 9) pipe (times 5)",
		tests: [
			{description: "it is an operator", condition: ({solution}) => typeof solution === "function"},
			{description: testValue => <span><b>fToC</b>{`${testValue} equals ${toDecimalPlaces(fToC(testValue), 4)}`}</span>, condition: ({solution, testValue}) => Math.abs(solution(testValue) - fToC(testValue)) < 1E-10},
		],
	},
};