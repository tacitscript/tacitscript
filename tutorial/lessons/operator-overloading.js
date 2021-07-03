import TextEdit from "../components/text-edit.js";

export default {
	id: "c",
	name: "Operator Overloading",
	description: <div>
		<p>The particular operation that an operator resolves to depends on the types of its surrounding symbols.</p>
		<p><a href="#plus">plus (+)</a> resolves to <a href="#add">(+) add</a> between numbers, but between strings or arrays, it resolves to a <a href="#concat">(+) concat</a> operation.</p>
		<div className="code-block">{`(1 2 3)+(4 5 6)=(1 2 3 4 5 6)\n"Hello, "+"World"="Hello, World"`}</div>
		<p>The operations of a particular operator will be related in meaning, and be either all <b>binary</b> (taking arguments to the left and right), or all <b>unary</b> (taking one argument to the right.)</p>
		<p>To denote negative numbers, we use the <a href="#negative">_ (negative)</a> operation of the unary <a href="#underscore">underscore (_)</a> operator.</p>
		<div className="code-block">_5.5</div>
		<p>Many operations take other operations as arguments. With strict left-associativity on symbols, <span className="code">2+_1</span> becomes a syntax error on trying to resolve the
		operator <a href="#underscore">underscore (_)</a> into the expression. Parentheses are required in this case.</p>
		<div className="code-block">2+(_1)</div>
		<p><a href="#plus">(+) plus</a> also yields type-conversion operations depending on its left-hand argument.</p>
		<div className="code-block">{`"I am "+45+" years old"="I am 45 years old"\n2+"5"=7`}</div>
	</div>,
	exercise: {
		question: "Define a tacitscript expression that:",
		getJs: def => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line"><TextEdit {...details} solution={`(0+"2" ""+3)`}/></div>,
		tests: [
			{description: "is an array of two elements", condition: ({solution}) => solution.length === 2},
			{description: 'contains the minimal conversion of "2" to give element 2', condition: ({def}) => def.replace(/\s+/g, " ").replace(/[\(\)]/g, "").split(" ").slice(0, 2).includes('0+"2"')},
			{description: 'contains the minimal conversion of 3 to give element "3"', condition: ({def}) => def.replace(/\s+/g, " ").replace(/[\(\)]/g, "").split(" ").slice(0, 2).includes('""+3')},
		],
	},
};