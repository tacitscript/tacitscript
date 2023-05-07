import TextEdit from "../components/text-edit.js";
import getOperationExamples from "../logic/get-operation-examples.js";
import Table from "../components/table.js";

const nextCollatz = value => ((value % 2) === 0) ? (value / 2) : (3 * value) + 1;
const collatzSteps = value => {
	const result = [value];

	while (result[result.length - 1] !== 1) result.push(nextCollatz(result[result.length - 1]));

	return result.length - 1;
}

export default {
	id: "generating-sequences2",
	name: "Generating Sequences 2",
	operations: <React.Fragment><a href="#scan">(^) scan</a></React.Fragment>,
	description: <div>
		<p>A more general way to generate sequences is through the <a href="#scan">(^) scan</a> operation.</p>
		<p><a href="#scan">(^) scan</a> takes arrays to the left and right. The array on the right is the starting sequence. The array on the left has two components: the <b>condition</b> and the <b>consequent</b>.</p>
		<p>The <b>condition</b> is evaluated against the current sequence. If <i>false</i>, the operation completes, returning the current sequence. If <i>true</i>, the <b>consequent</b> is evaluated against the sequence, and the result is added to the sequence. We then loop back to evaluation of the <b>condition</b> against the expanded sequence.</p>
		<p>We could calculate the first 6 numbers in the <a href="#recursion">Fibonacci sequence</a> as follows:</p>
		<div className="code-block">{getOperationExamples([
			["fibA", "(#.<6 _2%.].+$)^(1 1)", "equals (1 1 2 3 5 8)"],
		])}</div>
	</div>,
	exercise: {
		question: <div>
			<div>Define <b>collatzStepsNN</b> that takes an integer and returns the number of steps required to reach <b>1</b> by generating the <a href="#conditionals">Collatz sequence</a>:</div>
		</div>,
		getJs: ({def, solutions}) => `
/*ts
		nextCollatzNN ${solutions["conditionals"].def}
		solution      ${def}
*/
`,
		getHtml: details => <React.Fragment><br/><Table>{[
			[<div className="name">nextCollatzNN</div>, (({def, pass} = {}) => (def && pass) ? <div className="expression">{def}</div> : <a href="#conditionals">Please solve this first</a>)(details.solutions["conditionals"])],
			[<div className="name">collatzStepsNN</div>, <TextEdit {...{...details, solution: '.(; ).(].!=1 ].nextCollatzNN)^.#.-1', disabled: (({def, pass}) => !def || !pass)(details.solutions["conditionals"] || {})}}/>],
		]}</Table></React.Fragment>,
		getTestValues: () => R.pipe(R.times(() => Math.floor(Math.random() * 10) + 2), x => x.map((value, index) => value * 2 + index), R.sortBy(Math.random))(2),
		hint1: "Use operators: - = . # ; ! ] ^",
		hint2: "encapsulate in array, then scan while last element is not 1, by adding the last two elements, then take length of sequence and minus 1",
		tests: [
			...R.times(() => ({description: testValue => <span><b>collatzStepsNN</b>{`${testValue} equals ${collatzSteps(testValue)}`}</span>, condition: ({solution, testValue}) => collatzSteps(testValue) === solution(testValue)}), 2),
			{description: () => <span><b>collatzStepsNN</b> uses <a href="#question">hat (^)</a></span>, condition: ({es6}) => es6.includes("ts.hat")},
			{description: () => <span><b>collatzStepsNN</b> uses <b>nextCollatzNN</b></span>, condition: ({def}) => def.includes("nextCollatzNN")},
		],
	},
};