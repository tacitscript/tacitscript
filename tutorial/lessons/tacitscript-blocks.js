import TextEdit from "../components/text-edit.js";

export default {
	id: "d",
	name: "tacitscript Blocks",
	description: <div>
		<p>A tacitscript program will consist of a vertical list of name-expression pairs, each pair delimited by tabs/spaces and typically notated in two columns.</p>
		<p>Names must contain alphabetic characters <i>only</i>.</p>
		<div className="code-block">{`pi\t\t3.14159\nradius\t\t10\narea\t\tpi*radius*radius\t\t\t\tnames also count as symbols within expressions`}</div>
		<p>Characters occuring after the tacitscript expression are treated as comments.</p>
		<div className="code-block">{`quoteA\t\t"Java is to JavaScript what car is to Carpet.\n\t– Chris Heilmann"\t\t\t\t\tSo true!\nquoteB\t\t"Features, quality, time: pick two."\nquotes\t\t(quoteA quoteB)\t\t\t\t\tlook, an array :)`}</div>
		<p>When an operator and its argument are both names, parentheses are required to delimit the terms.</p>
		<div className="code-block">{`negative\t_\t\t\t\t\t\tcreate an alias\ntwo\t\t2\nnegativeTwoA\tnegative(two)\t\t\t\t\tthese expressions…\nnegativeTwoB\t(negative)two\t\t\t\t\t…give the same result`}</div>
		<p>Alternatively, we can use the <a href="#applyTo">, (applyTo)</a> operation that applys an argument to an operator.</p>
		<div className="code-block">{`negativeTwoC\ttwo,negative\t\t\t\t\talso 2,_`}</div>
	</div>,
	exercise: {
		question: "Define a tacitscript program that:",
		getJs: def => `/*ts\n${def}\n*/`,
		getHtml: details => <div className="single-line"><TextEdit {...{...details, multiline: true, solution: `plus\t\t+
solution\t3plus7\t\tthis is a comment`}}/></div>,
		tests: [
			{description: "contains two name-expression pairs", condition: ({es6}) => (match => match && (match.length === 2))(es6.match(/const /g))},
			{description: 'defines an alias for a binary operator you have learned', condition: ({def}) => {
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