import TextEdit from "../components/text-edit.js";
import toDecimalPlaces from "../../common/src/to-decimal-places.js";
import getOperationExamples from "../logic/get-operation-examples.js";
import ts from "tacitscript";

const geometricMean = array => Math.pow(R.reduce(R.multiply, 1, array), 1 / array.length);

export default {
	id: "power",
	name: "Power",
	operations: <React.Fragment><a href="#power">(^) power</a></React.Fragment>,
	description: <div>
		<p>The <a href="#power">(^) power</a> operation takes a number to the left, and raises it to the power of the number on the right.</p>
		<div className="code-block">{getOperationExamples([
			["eightN", "2^3"],
			["squareNN", "^2"],
			["sqrtNN", "^0.5"],
		])}</div>
	</div>,
	exercise: {
		question: <div>
			<div>Given an array of numbers, define <b>gMeanAN</b> that calculates the <a href="https://en.wikipedia.org/wiki/Geometric_mean" target="_blank">geometric mean</a>.</div>
		</div>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">gMeanAN</div>
			<TextEdit {...{...details, multiline: true, solution: ".(*$ #.1/).^$"}}/>
		</div>,
		getTestValues: () => [R.times(() => Math.floor(Math.random() * 9) + 1, 5)],
		hint1: "Use operators: * / . $ # ^",
		hint2: "times-reduce then raise the result to power of one over the length",
		tests: [
			{description: testValue => <span><b>gMeanAN</b>{`${ts.toString(testValue)} equals ${toDecimalPlaces(geometricMean(testValue), 4)}`}</span>, condition: ({solution, testValue}) => Math.abs(geometricMean(testValue) - solution(testValue)) < 1E-10},
		],
	},
};