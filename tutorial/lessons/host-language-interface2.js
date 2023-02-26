import TextEdit from "../components/text-edit.js";

const {css} = Glamor;

const labelStyle = css({
	margin: "0 2.5rem 0 1.9rem",
});

export default {
	id: "host-language-interface2",
	name: "Host Language Interface 2",
	description: <div>
		<p><a href="#host-language-interface">Section 6</a> introduced implicit import of symbols from the host language environment.</p>
		<p>Typically, tacitscript definitions will be embedded within a host language. The canonical implementation is for JavaScript, in which tacitscript expressions and blocks are demarcated by <span className="code">/*ts */</span> comments.</p>
		<p>tacitscript expressions can freely reference symbols from the current environment. tacitscript blocks implicity export defined symbols.</p>
		<div className="code-block">{`const pi = Math.PI;
const degressToRadians = /*ts *(pi/180) */;
const arcLength = (r, theta) => r * theta;
/*ts
    unitArcLength	1arcLength\r
*/
const circumference = unitArcLength(degreesToRadians(360)); // equals 2pi`}</div>
		<p>Note that binary operators are imported and exported as functions of two arguments.</p>
	</div>,
	exercise: {
		question: <span>Define the operator/function <b>marathonSpeed</b> such that:</span>,
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
		<p>That completes the language syntax. The remaining sections detail the standard library of operations.</p>
		<p>All tacitscript operators are single character punctuation symbols taken from the standard
			US keyboard.</p>
		<p>A minimal example tacitscript application (debuggable with source maps) is given <a href="https://plnkr.co/edit/pg9UymjRiyxdyx7p">here</a>.</p>
	</div>,
};