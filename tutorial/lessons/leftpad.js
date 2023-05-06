import TextEdit from "../components/text-edit.js";

export default {
	id: "leftpad",
	name: "Leftpad",
	exercise: {
		question: <div>
			<div>An algorithm with a <a href="https://en.wikipedia.org/wiki/Npm_(software)#Left-pad_incident" target="_blank">storied</a> past is leftpad.</div>
			<p>Define <b>leftpadNSS</b> that takes an integer <b>n</b> and a string <b>s</b> and returns a string of length <b>n</b>, ending with <b>s</b>, and front-padded with the character "0".</p>
			<p>For example, given <span className="code">8leftpadNSS"101"</span>, return <span className="code">"00000101"</span>:</p>
		</div>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">leftpadNSS</div>
			<TextEdit {...{...details, multiline: true, solution: ':.(.([ ].#).-$."0"`^.""$ ]).+$'}}/>
		</div>,
		getTestValues: () => [(bits => [bits, Math.floor(Math.random() * Math.pow(2, bits)).toString(2)])((Math.floor(Math.random() * 2) + 1) * 8)],
		hint1: "Use operators: + - . $ # : ^ [ ] `",
		hint2: "Calculate the number of 0s to pad, generate them and concatenate with string",
		tests: [
			{description: ([n, s]) => <span>{n}<b>leftpadNSS</b>{`"${s}" equals "${`${s}`.padStart(n, "0")}"`}</span>, condition: ({solution, testValue: [n, s]}) => `${s}`.padStart(n, "0") === solution(n, s)},
		],
	},
};