import TextEdit from "../components/text-edit.js";

export default {
	id: "data-types",
	name: "Data Types",
	operations: <React.Fragment><a href="#equality">(=) equality</a></React.Fragment>,
	description: <div>
		<p><b>Strings</b> may contain newlines and are delimted by double-quotes only. Where required, a character may be escaped by a backslash eg. \", \\.</p>
		<div className="code-block">{`"\\"Make things as simple as possible but no simpler.\\"\n\t- Albert Einstein"`}</div>
		<p><b>Arrays</b> are bounded by parentheses with elements delimited by whitespace (space, tabs and newlines.) Elements may be of different types, including other arrays.</p>
		<div className="code-block">{`(("top"		7.5)
 ("side"	2+3))`}</div>
		<p>An array enclosing only whitespace denotes an empty array. A single element array must also include whitespace.</p>
		<div className="code-block">{`( )
("alone" )`}</div>
		<p>Strings and arrays share many common properties, and will sometimes be referred to together, as <b>vectors</b>.</p>
		<p>The <b>Boolean</b> value <b>False</b> is denoted by <span className="code">()</span>. <b>True</b> is denoted by <span className="code">!()</span>.</p>
		<p><a href="#equality">(=) equality</a> compares <i>by-value</i> the contents of its left and right-hand arguments, and return a <i>Boolean</i>.</p>
		<div className="code-block">1+2*3=9</div>
	</div>,
	exercise: {
		question: "Define a tacitscript expression that:",
		getJs: ({def}) => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line"><TextEdit {...{...details, multiline: true, solution: `(1 "line1\nline2" ( ) 1="string" +)`}}/></div>,
		tests: [
			{description: "is an array", condition: ({solution}) => Array.isArray(solution)},
			{description: "contains a number", condition: ({solution}) => R.any(element => !isNaN(element), solution)},
			{description: "contains a multi-line string", condition: ({solution}) => R.any(element => (typeof element === "string") && element.match(/\n/), solution)},
			{description: "contains an empty array", condition: ({solution}) => R.any(element => Array.isArray(element) && !element.length, solution)},
			{description: "contains a boolean created by evaluating an = operation", condition: ({es6}) => es6.includes(", ts.equal),")},
			{description: "contains an operator", condition: ({solution}) => R.any(element => typeof element === "function", solution)},
		],
	},
};