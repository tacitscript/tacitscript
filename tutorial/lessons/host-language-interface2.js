import TextEdit from "../components/text-edit.js";
import getOperationExamples from "../logic/get-operation-examples.js";

const {css} = Glamor;

const labelStyle = css({
	margin: "0 2.5rem 0 1.9rem",
});

const pangrams = [
	"Mr Jock, TV quiz PhD, bags few lynx",
	"Watch 'Jeopardy!', Alex Trebek’s fun TV quiz game",
	"GQ’s oft lucky whiz Dr. J, ex-NBA MVP",
];

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
		question: <span>Define the operator <b>toLowerCaseSS</b> that exposes the <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase">standard JavaScript</a> string operation of the same name, such that:</span>,
		getJs: def => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">toLowerCaseSS</div>
			<TextEdit {...{...details, multiline: true, solution: '{"string => string.toLowerCase()"'}}/>
		</div>,
		getTestValues: () => [, pangrams[Math.floor(Math.random() * pangrams.length)]],
		hint1: "Use { only",
		tests: [
			{description: <span>it uses the (&#123;) eval operation</span>, condition: ({def}) => def.includes('{"')},
			{description: testValue => <span><b>toLowerCaseSS</b>{`"${testValue}" equals "${testValue.toLowerCase()}"`}</span>, condition: ({solution, testValue}) => solution(testValue) === testValue.toLowerCase()},
		],
	},
	epilogue: <div>
		<p>Although tacitscript operations are by-design pure, use of <a href="#eval">(&#123;) eval</a> is one clear escape-hatch out of this world into the full power of your host environment.</p>
	</div>,
};