import TextEdit from "../components/text-edit.js";

export default {
	id: "c",
	name: "Operator Overloading",
	description: <div>
		<p>The <a href="#plus">plus (+)</a> operator can also be used for <a href="#concat">+ (concat)</a> operations over strings and arrays.</p>
		<div className="code-block">{`(1 2 3)+(4 5 6)\n"Hello, "+"World"`}</div>
		<p>The operations of a particular operator will be related in meaning, and either all <b>binary</b> (taking arguments to the left and right), or all <b>unary</b> (taking one argument to the right.)<br/>
		To denote negative numbers, we use the <a href="#negate">_ (negate)</a> operation of the unary <a href="#underscore">underscore (_)</a> operator.</p>
		<div className="code-block">_5.5</div>
		<p>Many operators take other operators as arguments. With strict left-associativity, <span className="code">2+_1</span> becomes a syntax error, as the two operators have equal precedence and there is no operation that 
		supports <a href="#plus">plus (+)</a> to the left of <a href="#underscore">underscore (_)</a>. Parentheses are required in this case.</p>
		<div className="code-block">2+(_1)</div>
		<p>The operation that resolves will depend on the types of the arguments used. <a href="#add">+ (add)</a>, and <a href="#concat">+ (concat)</a> over strings, support any non-operator type to the right 
		(which is then converted to the type on the left.)</p>
		<div className="code-block">{`I am "+45+" years old"\n2+"5"`}</div>
	</div>,
	exercise: {
		question: "Define a tacitscript expression that:",
		getJs: def => `const solution = /*ts ${def} */`,
		getHtml: details => <div className="single-line"><TextEdit {...details}/></div>,
		tests: [
			{description: "equals 10", condition: ({solution}) => solution === 10},
			{description: "uses all four arithmetic operators", condition: ({def}) => ["+", "-", "*", "/"].every(symbol => def.includes(symbol))},
			{description: "does not contain whitespace", condition: ({def}) => !def.match(/\s/)},
		],
	},
};