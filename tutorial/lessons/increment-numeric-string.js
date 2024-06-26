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
			["radiusN", '2.5', "a number"],
			["timesNNN", "*", <span>a binary operator that takes a number (<b>N</b>), on left and right, and returns a number</span>],
			["diameterN", "2(timesNNN)radiusN", "a number equal to 5"],
		])}</div>
		<p>The symbols of some types we've already seen are given below:</p>
		<div className="code-block">{getOperationExamples([
			["T", <span>A Boolean (<b>T</b>ruth) value, <b>1</b> (true) or <b>0</b> (false).</span>],
			["I", <span>An <b>Integer</b>. This type includes Booleans.</span>],
			["N", <span>A (real) <b>N</b>umber, expressible in decimal format. This type includes Integers.</span>],
			["S", <span>A <b>S</b>tring, bounded by double-quotes.</span>],
			["A", <span>An <b>A</b>rray.</span>],
		])}</div>
		<p>Note that, in tactiscript, types are used only to resolve those operations that are invoked. Tacitscript employs implicit type promotion; operations on real numbers can equally be applied
			to integers and Booleans.
		</p>
	</div>,
	exercise: {
		question: <div>
			<div>Name and define a unary operator that increments a numeric string:</div>
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