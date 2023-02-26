import TextEdit from "../components/text-edit.js";
import getOperationExamples from "../logic/get-operation-examples.js";

const {css} = Glamor;

const labelStyle = css({
	margin: "0 2.5rem 0 1.9rem",
});

export default {
	id: "host-language-interface2",
	name: "Host Language Interface 2",
	operations: <a href="#eval">(&#123;) eval</a>,
	description: <div>
		<p><a href="#host-language-interface">Section 6</a> introduced implicit import of symbols from the host language environment.</p>
		<p>Note, as in that example, symbols not directly scoped to the global namespace (eg. <span className="code">Math.PI</span>) cannot be used in a tacitscript expression without first being aliased.</p>
		<p>A more flexible way to reference the host environment through the <a href="#eval">(&#123;) eval</a> operation.</p>
		<div className="code-block">{getOperationExamples([
			["highestValue", '{"array => Math.max.apply(null, array)"(1 3 2)', "equals 3"],
		])}</div>
		<p>Within your host environment block, you can also use the <span className="code">/*ts */</span> markers to recursively embed tacitscript code.</p>
	</div>,
	exercise: {
		question: <span>Define the operator <b>toLowerCase</b> that follows exposes the <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase">standard JavaScript</a> string operation of the same name:</span>,
		getJs: def => `
const marathonMiles = 26.2188;
const speed = (distance, time) => distance / time;
/*ts
		marathonSpeed ${def}
*/
const solution = marathonSpeed(2.0272);`,
		getHtml: details => <div><br/><div className="rule"/><span>{`
const marathonMiles = 26.2188;
const speed = (distance, time) => distance / time;
/*ts`}</span><span className="single-line name-expression">
		<span className="name" {...labelStyle}>marathonSpeed</span>
		<TextEdit {...{...details, solution: "marathonMiles,speed"}}/>
	</span><span>{`*/
const recordMph = marathonSpeed(2.0275);`}</span></div>,
		getTestValues: () => R.times(() => Math.floor(Math.random() * 99) + 1, 2),
		hint1: "Use parentheses or ,",
		hint2: "marathonMiles applyTo speed",
		tests: [
			{description: <span>it uses <i>marathonMiles</i> and <i>speed</i></span>, condition: ({def}) => ["marathonMiles", "speed"].every(token => def.includes(token))},
			{description: "it calculates the record average speed for a marathon run: 12.9mph (marathon record was set at 2:01:09.)", condition: ({solution}) => (solution - 12.9498) < 1E-5},
		],
	},
	epilogue: <div>
		<p>Although tacitscript operations are by-design pure, use of <a href="#eval">(&#123;) eval</a> is one clear escape-hatch out of this world into the full power of your host environment.</p>
	</div>,
};