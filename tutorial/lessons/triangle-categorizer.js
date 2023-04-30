import TextEdit from "../components/text-edit.js";
import toDecimalPlaces from "../../common/src/to-decimal-places.js";
import ts from "tacitscript";
import Table from "../components/table.js";

const getTwoRandom = () => R.times(() => (Math.random() * 9) + 1, 2);
const hypotenuse = array => Math.sqrt(R.pipe(R.map(x => x * x), R.reduce(R.add, 0))(array));
const triangleType = R.pipe(R.sortBy(R.identity), R.splitAt(2), ([feet, [longest]]) => {
	const feetHypotenuse = hypotenuse(feet);

	if (Math.abs(feetHypotenuse - longest) < 1e-8) return "right";
	if (feetHypotenuse > longest) return "acute";

	return "obtuse";
});

export default {
	id: "triangle-categorizer",
	name: "Triangle Categorizer",
	exercise: {
		question: <div>
			<div>We created an operator to calculate the <a href="#processing-arrays">hypotenuse</a> of a right triangle.</div>
			<p>The longest side of an <i>acute</i> triangle is <i>shorter</i> than its hypotenuse should be if it were a right triangle.</p>
			<p>The longest side of an <i>obtuse</i> triangle is <i>longer</i> than its hypotenuse should be if it were a right triangle.</p>
			<p>Using these facts, define the operator <b>triangleTypeAS</b> such that:</p>
		</div>,
		getJs: ({def, solutions}) => `
/*ts
		hypotenuseAN ${solutions["processing-arrays"].def}
		solution ${def}
*/
`,
		getHtml: details => <React.Fragment><br/><div className="rule"/><br/><Table>{[
			[<div className="name">hypotenuseAN</div>, (({def, pass} = {}) => (def && pass) ? <div className="expression">{def}</div> : <a href="#processing-arrays">Please solve this first</a>)(details.solutions["processing-arrays"])],
			[<div className="name">triangleTypeAS</div>, <TextEdit {...{...details, solution: ';<.2%,(hypotenuseAN [).((>$ "acute"`) (<$ "obtuse"`) "right"`)?', disabled: (({def, pass}) => !def || !pass)(details.solutions["processing-arrays"] || {})}}/>],
		]}</Table></React.Fragment>,
		hint1: "Use operators: , . $ ; ? ` % < > hypotenuseAN",
		hint2: "Sort, split at 2, check hypotenuse against longest side in cond",
		getTestValues: () => R.pipe(R.map(R.sortBy(Math.random)), R.sortBy(Math.random))([
			(([a, b]) => [a, b, hypotenuse([a, b]) - 1])(getTwoRandom()),
			(([a, b]) => [a, b, hypotenuse([a, b]) + 1])(getTwoRandom()),
			(([a, b]) => [a, b, hypotenuse([a, b])])(getTwoRandom()),
		]),
		tests: [
			...R.times(() => ({description: testValue => <span><b>triangleTypeAS</b>{`${ts.toString(testValue.map(x => +x.toFixed(2)))} equals "${triangleType(testValue)}"`}</span>, condition: ({solution, testValue}) => triangleType(testValue) === solution(testValue)}), 3),
			{description: () => <span><b>triangleTypeAS</b> uses <b>hypotenuseAN</b></span>, condition: ({def}) => def.includes("hypotenuseAN")},
		],
	},
};