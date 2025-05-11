import TextEdit from "../components/text-edit.js";


export default {
	id: "operator-overloading",
	name: "Operator Overloading",
	operations: <React.Fragment><a href="#concat">+ (concat)</a>, <a href="#negative">_ (negative)</a>, <a href="#reverse">_ (reverse)</a></React.Fragment>,
	description: <div>
		<p>The particular operation that a standard operator resolves to depends on the types of its surrounding operands.</p>
		<p><a href="#plus">+</a> resolves to <a href="#add">+ (add)</a> between numbers, but between arrays or strings, it resolves to the <a href="#concat">+ (concat)</a> operation.</p>
		<div className="code-block">{`(1 2 3)+(4 5 6)=(1 2 3 4 5 6)\n"Hello, "+"World!"="Hello, World!"`}</div>
		<p><a href="#plus">+</a> also yields type-conversion operations depending on the left-hand operand.</p>
		<div className="code-block">{`"I am "+45+" years old"="I am 45 years old"\n2+"5"=7`}</div>
		<p>The operations that resolve from a standard operator will all be either <b>infix</b> (taking operands to the left and right), or <b>prefix</b> (taking one operand to the right.) These operators are typically related in meaning.</p>
		<p>To denote negative numbers, we use the prefix <a href="#negative">(_) negative</a> operation.</p>
		<div className="code-block">_5.5</div>
		<p>Many operators take other operators as operands. Expressions are resolved from left to right, and with strict left-associativity, <span className="code">2+_1</span> becomes a syntax error on parsing the symbol <a href="#underscore">_</a>. Parentheses are required in this case.</p>
		<div className="code-block">2+(_1)</div>
		<p>Before vectors, <a href="#underscore">_</a> resolves to the <a href="#reverse">(_) reverse</a> operator.</p>
		<div className="code-block">{`_(1 2 3)=(3 2 1)\n_"Hello, World!"="!dlroW ,olleH"`}</div>
	</div>,
	exercise: {
		question: "Using the empty string below, define an expression that:",
		getJs: ({def}) => `const solution = /*ts ""${def} */;`,
		getHtml: details => <div className="single-line">""<TextEdit {...details} solution={`+(_1)`}/></div>,
		hint1: "Remember, only + is a type conversion operator",
		hint2: "Order precedence may require use of parentheses",
		tests: [
			{description: `generates the string "_1"`, condition: ({solution}) => solution === "_1"},
			{description: 'does not use further strings', condition: ({def}) => R.pipe(R.split(""), R.count(R.equals('"')))(`""${def}`) === 2},
		],
	},
};