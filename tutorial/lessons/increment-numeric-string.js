import TextEdit from "../components/text-edit.js";
import getOperationExamples from "../logic/get-operation-examples.js";

const getName = def => (def || "").split(/\s+/)[0];

export default {
	id: "increment-numeric-string",
	name: "Type Annotation",
	description: <div>
		<p>Although not strictly part of the language specification, a sometimes useful convention (that we will adopt universally from now on) is for tacitscript identifiers to detail the type at the end,
			according to the rules <a href="#type-signatures">here</a>.</p>
		<div className="code-block">{getOperationExamples([
			["radiusR", '2.5', <span>a <b>R</b>eal (expressible in decimal format) number</span>],
			["timesRRR", "*", <span>an infix operator that takes a Real (<b>R</b>), on the left and right, and returns a Real.</span>],
			["diameterR", "2(timesRRR)radiusR", "a number equal to 5"],
		])}</div>
		<p>The symbols of some common types are given below:</p>
		<div className="code-block">{getOperationExamples([
			["N", <span>A <b>N</b>atural number (a positive integer or zero.) The Naturals are a subset of the Reals.</span>],
			["B", <span>A <b>B</b>oolean value, <b>1</b> (true) or <b>0</b> (false). Booleans are a subset of the Naturals.</span>],
			["S", <span>A <b>S</b>tring, bounded by double-quotes.</span>],
			["A", <span>An <b>A</b>rray.</span>],
		])}</div>
		<p>Note that, in tactiscript, types are used only to determine which operations are invoked.</p>
		<p>Tacitscript employs implicit type promotion; operations on Real numbers can equally be applied to Naturals, or even Booleans.</p>
	</div>,
	exercise: {
		question: <div>
			<div>Name and define an infix operator that increments a numeric string:</div>
		</div>,
		getJs: ({def}) => `const solution = /*ts ${def.split(/\s+/).slice(1).join(" ")} */;`,
		getHtml: details => <div className="single-line name-expression">
			<TextEdit {...{...details, multiline: true, solution: `incrementSS    0+.+1.""+`}}/>
		</div>,
		getTestValues: () => [`${Math.floor(Math.random() * 100)}`, `${Math.floor(Math.random() * -1000) / 10}`.replace(/-/, "_")],
		hint1: "Use operators: . +",
		hint2: "convert to number, increment, convert to string",
		tests: [
			{description: (testValue, def) => <span><b>{getName(def)}</b>"{`${testValue}" equals "${+testValue + 1}"`}</span>, condition: ({solution, testValue}) => Math.abs(+solution(testValue) - testValue - 1) < 1E-10},
			{description: (testValue, def) => <span><b>{getName(def)}</b>{`"${testValue}" equals "${(+testValue.replace(/_/, "-") + 1).toFixed(1).replace(/-/, "_")}"`}</span>, condition: ({solution, testValue}) => Math.abs(+solution(testValue).replace(/_/, "-") - testValue.replace(/_/, "-") - 1) < 1E-10},
			{description: (testValue, def) => <span><b>{getName(def)}</b> has the correct type annotation</span>, condition: ({def}) => getName(def).endsWith("SS")},
		],
	},
};