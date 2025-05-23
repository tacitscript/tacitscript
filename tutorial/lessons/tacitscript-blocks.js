import TextEdit from "../components/text-edit.js";
import getOperationExamples from "../logic/get-operation-examples.js";

export default {
	id: "tacitscript-blocks",
	name: "tacitscript Blocks",
	operations: <React.Fragment><a href="#applyTo">, (applyTo)</a></React.Fragment>,
	description: <div>
		<p>A tacitscript program will consist of a vertical list of name-expression pairs, each pair delimited by tabs/spaces and typically notated in two columns.</p>
		<p>Names represent new symbols that can be used as aliases in future expressions. They must contain alphabetic characters <i>only</i>.</p>
		<div className="code-block">{getOperationExamples([
			["pi", "3.14159"],
			["radius", '10'],
			["area", 'pi*radius*radius'],
		])}</div>
		<p>Characters occuring after the tacitscript expression, on the same line, are treated as comments.</p>
		<div className="code-block">{getOperationExamples([
			["quoteA", '"Java is to JavaScript what car is to Carpet.'],
			["", <pre>   – Chris Heilmann"</pre>, "So true!"],
			["quoteB", '"Features, quality, time: pick two."'],
			["quotes", '(quoteA quoteB)', "look, an array :)"],
		])}</div>
		<p>Operators, themselves, can also be bound to names.</p>
		<p>When an operator and its operand are both names, parentheses are required to delimit the terms.</p>
		<div className="code-block">{getOperationExamples([
			["negative", '_', "create an alias"],
			["two", "2"],
			["negativeTwoA", 'negative(two)', "these expressions…"],
			["negativeTwoB", '(negative)two', "…give the same result"],
		])}</div>
		<p>Alternatively, we can use the <a href="#applyTo">, (applyTo)</a> operation that applys an operand to an operator.</p>
		<div className="code-block">{getOperationExamples([
			["negativeTwoC", 'two,negative', "also 2,_"],
		])}</div>
	</div>,
	exercise: {
		question: "Define a tacitscript expression that:",
		getJs: ({def}) => `/*ts\n${def}\n*/`,
		getHtml: details => <div className="single-line"><TextEdit {...{...details, multiline: true, solution: `plus\t\t+
solution\t3plus7\t\tthis is a comment`}}/></div>,
		tests: [
			{description: "contains two name-expression pairs", condition: ({es6}) => (match => match && (match.length === 2))(es6.match(/const /g))},
			{description: 'defines an alias for a standard infix operator you have learned', condition: ({def}) => {
				const firstLine = def.split("\n")[0].split(/\s+/);

				if (firstLine.length < 2) return false;

				return ["+", "-", "/", "*", ","].some(operator => firstLine[1].includes(operator));
			}},
			{description: <span>binds the name <b>solution</b> to an expression using your alias</span>, condition: ({es6}) => {
				const names = R.map(R.slice(6, -2), es6.match(/const (.*) =/g));

				if (names[1] !== "solution") return false;

				const expressions = es6.match(/=(.*);/g);

				return expressions[1] && expressions[1].includes(names[0]);
			}},
			{description: <span>defines <b>solution</b> equal to 10</span>, condition: ({solution}) => solution === 10},
			{description: 'contains a comment', condition: ({es6}) => es6.includes("//")},
		],
	},
};