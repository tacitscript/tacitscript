import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";
import parser from "common/src/parser.js";

const {ts2es6} = parser;
window.ts = ts; // required in release mode for eval

const leastSquareDiffGt = ".((.(; -1).^2@.-$)` >).(.$).^(+1).(1,)";

const es6 = ts2es6(`/*ts
	leastSquareDiffGtNN			${leastSquareDiffGt}
*/`);
eval(es6.replace(/const /g, "var "));

export default {
	id: "iterating-a-value",
	name: "Iterating a Value",
	operations: <React.Fragment><a href="#while">(^) while</a></React.Fragment>,
	exercise: {
		question: <div>
			<div>Define the operator <b>leastSquareDiffGtNN</b> that takes an integer <b>m</b> and returns the least positive integer <b>n</b>, where the difference of <b>n*n</b> and <b>(n-1)*(n-1)</b> is greater than <b>m</b>.</div>
		</div>,
		getJs: ({def}) => `
/*ts
		solution ${def}
*/
`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">leastSquareDiffGtNN</div>
			<TextEdit {...{...details, multiline: true, solution: leastSquareDiffGt}}/>
		</div>,
		hint1: "Use operators: + - , . $ @ ; ^ ` >",
		hint2: "Construct a while expression that iterates through the integers calculating the square difference, and terminating when it exceeds the given value.",
		getTestValues: () => [Math.floor(Math.random() * 900) + 100],
		tests: [
			{description: testValue => <span><b>leastSquareDiffGtNN</b>{`${testValue} equals ${leastSquareDiffGtNN(testValue)}`}</span>, condition: ({solution, testValue}) => leastSquareDiffGtNN(testValue) === solution(testValue)},
		],
	},
};