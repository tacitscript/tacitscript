import TextEdit from "../components/text-edit.js";

export default {
	id: "precedence",
	name: "Precedence",
	operations:<React.Fragment><a href="#add">(+) add</a>, <a href="#subtract">(-) subtract</a>, <a href="#multiply">(*) multiply</a>, <a href="#divide">(/) divide</a></React.Fragment>,
	description: <div>
		<p>In tacitscript, each standard <i>operator</i>, eg. <a href="#plus">plus (+)</a>, may represent one of many possible <i>operations</i>, eg. <a href="#add">(+) add</a> or <a href="#concat">(+) concat</a>.</p>
		<p>tacitscript uses the standard arithmetic operations <a href="#add">(+) add</a>, <a href="#subtract">(-) subtract</a>, <a href="#multiply">(*) multiply</a> and <a href="#divide">(/) divide</a>.</p>
		<p>tacitscript operators have equal precedence, and are <i>left-associative</i>.</p>
		<div className="code-block">2+3*4</div>
		<p>is intepreted as</p>
		<div className="code-block">(2+3)*4</div>
		<p>Parentheses are used to override the default evaluation order.</p>
		<div className="code-block">2+(3*4)</div>
		<p>Note that spaces cannot be used to separate tokens in tacitscript (their meaning will be detailed later.)</p>
	</div>,
	exercise: {
		question: "Define a tacitscript expression that:",
		getJs: def => `const solution = /*ts ${def} */;`,
		getHtml: details => <div className="single-line"><TextEdit {...details} solution="5*6-3/9+7"/></div>,
		tests: [
			{description: "equals 10", condition: ({solution}) => solution === 10},
			{description: "uses all four arithmetic operators", condition: ({es6}) => ["ts.plus", "ts.minus", "ts.asterisk", "ts.slash"].every(symbol => es6.includes(symbol))},
			{description: "does not contain whitespace", condition: ({def}) => !def.match(/\s/)},
		],
	},
};