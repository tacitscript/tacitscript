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
		<div className="code-block">{`negative\t_\nfive\t\t5\nminusFiveA\tnegative(five)\t\t\t\t\tthese expressions…\nminusFiveB\t(negative)five\t\t\t\t\t…give the same result`}</div>
		<p>Alternatively, we can use the <a href="#apply-to">, (applyTo)</a> operation that applys an argument to an operator.</p>
		<div className="code-block">{`minusFiveC\tfive,negative\t\t\t\t\talso 5,_`}</div>
	</div>,
	exercise: {
		question: "Define a tacitscript expression that:",
		getJs: def => `const solution = /*ts ${def} */`,
		getHtml: details => <div className="single-line"><TextEdit {...details}/></div>,
		tests: [
			{description: "is an array of two elements", condition: ({solution}) => solution.length === 2},
			{description: 'contains the minimal conversion of "2" to give element 2', condition: ({def}) => def.replace(/\s+/g, " ").replace(/[\(\)]/g, "").split(" ").slice(0, 2).includes('0+"2"')},
			{description: 'contains the minimal conversion of 3 to give element "3"', condition: ({def}) => def.replace(/\s+/g, " ").replace(/[\(\)]/g, "").split(" ").slice(0, 2).includes('""+3')},
		],
	},
};