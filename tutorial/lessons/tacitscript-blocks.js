import TextEdit from "../components/text-edit.js";

export default {
	id: "d",
	name: "tacitscript Blocks",
	description: <div>
		<p>A tacitscript program will consist of a vertical list of name-expression pairs, each pair delimited by tabs/spaces and typically notated in two columns.<br/>Names must contain alphabetic characters <i>only</i>.</p>
		<div className="code-block">{`pi\t\t3.14159\nradius\t\t10\narea\t\tpi*radius*radius`}</div>
		<p>Characters occuring after the tacitscript expression are treated as comments.</p>
		<div className="code-block">{`quoteA\t\t"Java is to JavaScript what car is to Carpet.\n\t– Chris Heilmann"\t\t\t\t\tSo true!\nquoteB\t\t"Features, quality, time: pick two."\nquotes\t\t(quoteA quoteB)\t\t\t\t\tlook, an array :)`}</div>
		<p>When an operator and its argument are both names, parentheses are required to delimit the terms.</p>
		<div className="code-block">{`negative\t_\t\t\t\t\t\tcreate an alias\nfive\t\t5\nminusFiveA\tnegative(five)\t\t\t\t\tthese expressions…\nminusFiveB\t(negative)five\t\t\t\t\t…give the same result`}</div>
		<p>Alternatively, we can use the <a href="#apply-to">, (applyTo)</a> operation that applys an argument to an operator.</p>
		<div className="code-block">{`minusFiveC\tfive,negative\t\t\t\t\talso 5,_`}</div>
	</div>,
	exercise: {
		question: "Define a tacitscript program that:",
		getJs: def => `/*ts\n${def}\n*/`,
		getHtml: details => <div className="single-line"><TextEdit {...{...details, multiline: true}}/></div>,
		tests: [
			{description: "contains two name-expression pairs", condition: ({es6}) => (match => match && (match.length === 2))(es6.match(/const /g))},
			{description: 'defines the alias of a binary operator you have learned', condition: ({def}) => {
				const firstLine = def.split("\n")[0].split(/\s+/);

				if (firstLine.length < 2) return false;

				return ["+", "-", "/", "*", ","].some(operator => firstLine[1].includes(operator));
			}},
			{description: 'binds the name "solution" to an expression using your alias', condition: ({es6}) => {
				const names = R.map(R.slice(6, -2), es6.match(/const (.*) =/g));

				if (names[1] !== "solution") return false;

				const expressions = es6.match(/=(.*);/g);

				return expressions[1] && expressions[1].includes(names[0]);
			}},
			{description: 'the value of "solution" equals 10', condition: ({solution}) => solution === 10},
			{description: 'contains a comment', condition: ({es6}) => es6.includes("//")},
		],
	},
};