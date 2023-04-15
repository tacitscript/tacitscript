import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";

const getHeight = () => Math.floor(165 + (Math.random() * (188 - 165)));
const getMass = height => Math.floor(15 + (Math.random() * (35 - 15))) * height * height;
const getBmi = ([mass, height]) => mass / height / height;

export default {
	id: "further-zip-applications",
	name: "Further Zip Applications",
	operations: <React.Fragment><a href="#zipApplyTo">(,) zipApplyTo</a></React.Fragment>,
	description: <div>
		<p><a href="#comma">comma (,)</a> before an array represent a zipping pipe/application operation.</p>
		<p>In addition to <a href="#reject">(,) binaryZipPipe</a> detailed above, there are a couple of other variations, detailed in this section and the next.</p>
		<p>The <a href="#zipApplyTo">(,) zipApplyTo</a> operation takes two arrays and performs a pairwise application. This is essentially the same as <span className="code">*.(,$)@</span></p>
		<div className="code-block">(3 6),(-1 +1)=(2 7)</div>
	</div>,
	exercise: {
		question: <div>
			<div><a href="https://en.wikipedia.org/wiki/Body_mass_index">Body mass index (BMI)</a> is used as a convenient measure of a person's build.</div>
			<p>Define unary operator<b>bmiAN</b> that takes an array of a person's mass (in kg) and height (in metres), and returns their BMI:</p>
		</div>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">bmiAN</div>
			<TextEdit {...{...details, multiline: true, solution: ',(; ^2)./$'}}/>
		</div>,
		getTestValues: () => [(height => [getMass(height), height])(getHeight())],
		hint1: "Use operators: / , . $ ; ^",
		hint2: "zip apply to identity and square, then divide-reduce",
		tests: [
			{description: testValue => <span><b>bmiAN</b>{`${ts.toString(testValue)} equals ${getBmi(testValue).toFixed(2)}`}</span>, condition: ({solution, testValue}) => Math.abs(getBmi(testValue) - solution(testValue)) < 1e-10},
			{description: <span><b>bmiAN</b> uses <a href="#comma">comma (,)</a></span>, condition: ({es6}) => es6.includes("ts.comma")},
		],
	},
};