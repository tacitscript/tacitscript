import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";
import Table from "../components/table.js";
import getOperationExamples from "../logic/get-operation-examples.js";
import commonStyles from "../styles/common-styles.js";

const {equationStyle} = commonStyles;

const mean = array => R.reduce(R.add, 0, array) / array.length;
const std = array => {
	const xbar = mean(array);
	
	return R.pipe(R.map(x => Math.pow(x - xbar, 2)), mean, Math.sqrt)(array);
};

export default {
	id: "std",
	name: "Piping After Value Intake",
	description: <div>
		<p>Suppose we construct an operator that takes an array and calculates its length. Then it pairs the result with a new input number, and calculates the average of two numbers.</p>
		<p>We can define this as follows:</p>
		<div className="code-block">{getOperationExamples([
			["lengthThenAverageANN", "#.:.+$./2"],
		])}</div>
		<p>Here, it's important to note that <span className="code">#.:</span> produces a binary operator by <a href="#unaryBinaryPipe">(.) unaryBinaryPipe</a>, and infact the whole expression defines a binary operator that takes in two arguments <i>at the start</i>, as indicated by the name <b>lengthThenAverageANN</b>.</p>
		<p>It's tempting to think that we are intaking values partway through the pipeline, but this is not the case here. The piping operators <span className="code">.</span> and <span className="code">,</span> only ever yield (zero-order) values, unary (first-order) operators, or binary (second-order) operators. They will not work after we take in further values, for instance, following a pipeline inversion.</p>
		<p>We will see more advanced techniques to alleviate this restriction in the next section.</p>
		<p>As an aside, <b>lengthThenAverageANN</b> can be simplified to <span className="code">#.+./2</span>. The version above makes the illustration slightly clearer.</p>
	</div>,
	exercise: {
		question: <div>
			<div>The <a href="https://en.wikipedia.org/wiki/Standard_deviation" target="_blank">standard deviation</a> is typically given as:</div>
			<div className="equation" {...equationStyle}><img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/28b5c5f2e0d8e28d96a6c66e6628d96240a916d2"/></div>
			<p>where x<sub>n</sub> are the observed values of the sample items, and x̄ is the mean value of these observations, while the denominator N stands for the size of the sample.</p>
			<p>Define <b>stdAN</b> that takes an array of number and calculates the standard deviation such that:</p>
		</div>,
		getJs: ({def, solutions}) => `
/*ts
		meanAN ${solutions["average"].def}
		solution ${def}
*/
`,
		getHtml: details => <React.Fragment><br/><div className="rule"/><br/><Table>{[
			[<div className="name">meanAN</div>, (({def, pass} = {}) => (def && pass) ? <div className="expression">{def}</div> : <a href="#average">Please solve this first</a>)(details.solutions["average"])],
			[<div className="name">stdAN</div>, <TextEdit {...{...details, solution: '.(meanAN.-.^2 ;).@$.meanAN.^0.5', disabled: (({def, pass}) => !def || !pass)(details.solutions["average"] || {})}}/>],
		]}</Table></React.Fragment>,
		hint1: "Use operators: - . $ @ ^ meanAN",
		hint2: "Take mean of numbers, square the difference of each number from this mean via a map, take mean of the result and root it",
		getTestValues: () => [R.times(() => Math.floor(Math.random() * 10), 10)],
		tests: [
			{description: testValue => <span><b>stdAN</b>{`${ts.toString(testValue)} equals ${std(testValue).toFixed(2)}`}</span>, condition: ({solution, testValue}) => Math.abs(std(testValue) - solution(testValue)) < 1e-9},
			{description: <span><b>stdAN</b> uses <b>meanAN</b> <i>twice!</i></span>, condition: ({def}) => def.split("meanAN").length === 3},
		],
	},
};