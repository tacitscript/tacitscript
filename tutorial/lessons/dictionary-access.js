import TextEdit from "../components/text-edit.js";
import ts from "tacitscript";

const testValues = [
	[{language: "English", script: "Roman"}, {language: "Korean", script: "Hangul"}, {language: "Hindi", script: "Devanagari"}],
	[{name: "penny", value: 1}, {name: "nickel", value: 5}, {name: "dime", value: 10}, {name: "quarter", value: 25}],
];

export default {
	id: "dictionary-access",
	name: "Dictionary Access",
	operations: <React.Fragment><a href="#prop">(') prop</a></React.Fragment>,
	description: <div>
		<p>The <a href="#prop">(') prop</a> operation takes a string <b>key</b> and a dictionary <b>d</b>, and retrieves the value associated with <b>key</b> in <b>d</b> (or <i>undefined</i> if absent.)</p>
		<div className="code-block">"age"'(\(("firstName" "Darryl") ("surname" "Morris") ("age" 48)))=48</div>
	</div>,
	exercise: {
		question: <div>Define the operator <b>pluckSAA</b> that a string <b>key</b> and an array of dictionaries <b>dicts</b>, and extracts the value associated with <b>key</b> from all elements of <b>dicts</b>:</div>,
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line name-expression">
			<div className="name">pluckSAA</div>
			<TextEdit {...{...details, multiline: true, solution: ":,(' ;).@$"}}/>
		</div>,
		hint1: "Use operators: , . $ ; @ ; : '",
		hint2: "prop the key, then map over the array",
		getTestValues: () => [(values => [R.keys(values[0])[Math.floor(Math.random() * 2)], values])(testValues[Math.floor(Math.random() * 2)])],
		tests: [
			{description: ([key, dicts]) => <span>{`"${key}"`}<b>pluckSAA</b>{ts.toString(dicts)} equals {ts.toString(R.pluck(key, dicts))}</span>, condition: ({solution, testValue: [key, dicts]}) => JSON.stringify(R.pluck(key, dicts)) === JSON.stringify(solution(key, dicts))},
		],
	},
};