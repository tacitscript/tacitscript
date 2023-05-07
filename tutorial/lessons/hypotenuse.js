import TextEdit from "../components/text-edit.js";
import toDecimalPlaces from "../../common/src/to-decimal-places.js";
import ts from "tacitscript";

const hypotenuse = array => Math.sqrt(R.pipe(R.map(x => x * x), R.reduce(R.add, 0))(array));

export default {
	id: "processing-arrays",
	name: "Processing Arrays",
	operations: <React.Fragment><a href="#map">(@) map</a></React.Fragment>,
	description: <div>
		<p>To process each element of an array in the same way, we use the <a href="#map">(@) map</a> operation.</p>
		<p>This takes a unary operator to the left, that is applied to each element in the array on the right.</p>
		<p>Below, we assert the lengths of strings contained in an array</p>
		<div className="code-block">#@("and" "a" "no")=(3 1 2)</div>
	</div>,
	exercise: {
		question: <div>
			<div>The hypotenuse of a right triangle can be deduced through the <a href="https://en.wikipedia.org/wiki/Pythagorean_theorem" target="_blank">Pythagorean theorem</a>.</div>
			<p>Define the operator <b>hypotenuseAN</b> that takes an array containing the lengths of the two legs of a right triangle, and returns the length of the hypotenuse:</p>
		</div>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">hypotenuseAN</div>
			<TextEdit {...{...details, multiline: true, solution: "^2@.+$.^0.5"}}/>
		</div>,
		getTestValues: () => [R.times(() => Math.floor(Math.random() * 9) + 1, 2)],
		hint1: "Use operators: + . $ ^ @",
		hint2: "square-map, sum then square root",
		tests: [
			{description: testValue => <span><b>hypotenuseAN</b>{`${ts.toString(testValue)} equals ${toDecimalPlaces(hypotenuse(testValue), 4)}`}</span>, condition: ({solution, testValue}) => Math.abs(hypotenuse(testValue) - solution(testValue)) < 1E-10},
			{description: () => <span><b>hypotenuseAN</b> uses <a href="#map">(@) map</a></span>, condition: ({es6}) => es6.includes("ts.atsign")},
		],
	},
};