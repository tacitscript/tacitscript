import TextEdit from "../components/text-edit.js";
import toDecimalPlaces from "../../common/src/to-decimal-places.js";
import ts from "tacitscript";
import Table from "../components/table.js";

const euclideanDistance = (left, right) => Math.sqrt(R.pipe(R.map(([a, b]) => Math.pow(a - b, 2)), R.reduce(R.add, 0))(R.zip(left, right)));

export default {
	id: "zipping",
	name: "Zipping",
	operations: <React.Fragment><a href="#binaryUnaryPipe">(.) binaryUnaryPipe</a>, <a href="#zip">(*) zip</a></React.Fragment>,
	description: <div>
		<p>The <a href="#zip">(*) zip</a> operation takes two arrays of equal length, and combines them to a single array with pairing at each index.</p>
		<div className="code-block">(1 2 3)*(7 8 9)=((1 7) (2 8) (3 9))</div>
	</div>,
	exercise: {
		question: <div>
			<div>The <a href="https://en.wikipedia.org/wiki/Euclidean_distance" target="_blank">Euclidean distance</a> calculates the length of a vector between any two points in n-dimensions.</div>
			<p>The <a href="#processing-arrays">hypotenuse</a> algorithm, used in the previous lesson, implicitly scales to n-dimensions.</p>
			<p>Define the <b>eDistanceAAN</b> binary operator, that builds on <b>hypotenuse</b> to calculate the euclidean distance, when placed between two vectors.</p>
		</div>,
		getJs: ({def, solutions}) => `
/*ts
		hypotenuseAN ${solutions["processing-arrays"].def}
		solution ${def}
*/
`,
		getHtml: details => <React.Fragment><br/><div className="rule"/><br/><Table>{[
			[<div className="name">hypotenuseAN</div>, (({def, pass} = {}) => (def && pass) ? <div className="expression">{def}</div> : <a href="#processing-arrays">Please solve this first</a>)(details.solutions["processing-arrays"])],
			[<div className="name">eDistanceAAN</div>, <TextEdit {...{...details, solution: '*.-$@.hypotenuseAN', disabled: (({def, pass}) => !def || !pass)(details.solutions["processing-arrays"] || {})}}/>],
		]}</Table></React.Fragment>,
		getTestValues: () => {
			const length = Math.floor(Math.random() * 3) + 3;

			return [R.times(() => R.times(() => Math.floor(Math.random() * 10), length), 2)];
		},
		hint1: "Use operators: - * . $ @ hypotenuseAN",
		hint2: "zip, difference-map then hypotenuse",
		tests: [
			{description: ([left, right]) => <span>{ts.toString(left)}<b>eDistanceAAN</b>{`${ts.toString(right)} equals ${toDecimalPlaces(euclideanDistance(left, right), 4)}`}</span>, condition: ({solution, testValue}) => Math.abs(euclideanDistance.apply(null, testValue) - solution.apply(null, testValue)) < 1E-10},
			{description: () => <span><b>eDistanceAAN</b> uses <a href="#zip">(*) zip</a></span>, condition: ({es6}) => es6.includes("ts.asterisk")},
			{description: () => <span><b>eDistanceAAN</b> uses <b>hypotenuseAN</b></span>, condition: ({def}) => def.includes("hypotenuseAN")},
		],
	},
};