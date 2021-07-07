import TextEdit from "../components/text-edit.js";

export default {
	id: "host-language-interface",
	name: "Host Language Interface",
	description: <div>
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
		question: <span>Define the operator/function <b>weight</b> such that:</span>,
		getJs: def => `const solution = /*ts ${def} */;`,
		getHtml: details => <div>
			const g = 9.81; // m/s
			const force = (mass, acceleration) =&gt; m * a;
			/*ts
			
			*/
			<TextEdit {...details} solution="(force)g"/>
		</div>,
		getTestValue: () => Math.floor(Math.random() * 99) + 1,
		tests: [
			{description: "it is an operator", condition: ({solution}) => typeof solution === "function"},
			{description: <span><b>inverse</b>0 is <i>undefined</i></span>, condition: ({solution}) => {
				if (typeof solution !== "function") return false;

				return solution(0) == undefined;
			}},
		],
	},
	epilogue: <div>
		<p><i>undefined</i> is a special value that has no direct representation within tacitscript.</p>
		<p>It is a <i>toxic value</i> in that, if applied to any operator,
		the resulting calculation will also be <i>undefined</i>.</p>
		<div className="code-block"><span>{`calculation\t1/0+2\t\t\t\t\t\t is `}<i>undefined</i></span></div>
	</div>,
};