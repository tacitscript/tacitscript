import TextEdit from "../components/text-edit.js";

export default {
	id: "c",
	name: "Operator Overloading",
	description: <div>
		<p>The <a href="#plus">plus (+)</a> operator can be used for <a href="#concat">(+) concat</a> operations over strings and arrays.</p>
		<div className="code-block">{`(1 2 3)+(4 5 6)\n"Hello, "+"World"`}</div>
		<p>The operations of a particular operator will be related in meaning, and either all <b>binary</b> (taking arguments to the left and right), or all <b>unary</b> (taking one argument to the right.)<br/>
		To denote negative numbers, we use the <a href="#negative">_ (negative)</a> operation of the unary <a href="#underscore">underscore (_)</a> operator.</p>
		<div className="code-block">_5.5</div>
		<p>Many operators take other operators as arguments. With strict left-associativity, <span className="code">2+_1</span> becomes a syntax error, as the two operators have equal precedence and there is no operation that 
		supports <a href="#plus">plus (+)</a> to the left of <a href="#underscore">underscore (_)</a>. Parentheses are required in this case.</p>
		<div className="code-block">2+(_1)</div>
		<p>The operation that resolves will depend on the types of the arguments used. <a href="#add">(+) add</a>, and <a href="#concat">(+) concat</a> over strings, act as type-conversion operations by supporting any 
		non-operator type to the right.</p>
		<div className="code-block">{`"I am "+45+" years old"\n2+"5"`}</div>
	</div>,
	exercise: {
		question: "Define a tacitscript expression that:",
		getJs: def => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line"><TextEdit {...details}/></div>,
		tests: [
			{description: "is an array of two elements", condition: ({solution}) => solution.length === 2},
			{description: 'contains the minimal conversion of "2" to give element 2', condition: ({def}) => def.replace(/\s+/g, " ").replace(/[\(\)]/g, "").split(" ").slice(0, 2).includes('0+"2"')},
			{description: 'contains the minimal conversion of 3 to give element "3"', condition: ({def}) => def.replace(/\s+/g, " ").replace(/[\(\)]/g, "").split(" ").slice(0, 2).includes('""+3')},
		],
	},
};