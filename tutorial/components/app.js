import lesson1 from "../data/lesson1.js";
import lesson2 from "../data/lesson2.js";
import Exercise1 from "./exercise1.js";

const {css} = Glamor;
const {useEffect} = React;

const style = css({
	" .primary": {backgroundColor: "#55423d"},
	"> h1": {
		color: "#fffffe",
		fontSize: "3rem",
		fontWeight: 700,
		lineHeight: 1.3,
		textAlign: "center",
		marginBottom: 0,
	},
	"> h2": {
		marginLeft: "7.5%",
		fontSize: "1.7rem",
		marginTop: "2rem",
	},
	" .secondary": {
		backgroundColor: "#ffc0ad",
		color: "#271c19"
	},
	" .highlight": {color: "#e78fb3"},
	" .tertiary": {color: "#9656a1"},
	" .section": {
		width: "85%",
		margin: "0 auto 1rem",
		backgroundColor: "#55423d",
		padding: "0.5rem 1.5rem",
		borderRadius: "0.5rem",
		position: "relative",
		"> h2": {margin: "0.5rem 0"},
		"> h3": {marginTop: "2.5rem", fontSize: "1.25rem"},
		"> hr": {marginBottom: "1.5rem"},
		"> ul": {paddingInlineStart: "2rem"},
	},
	" a": {
		color: "rgba(20, 13, 11, 1)",
		fontWeight: "bold",
		textDecoration: "none",
		":hover": {
			color: "rgba(20, 13, 11, 0.7)",
		},
	},
	" .code": {
		fontFamily: "Roboto Mono, monospace",
		color: "#ffc0ad",
	},
	" .code-block": {
		fontFamily: "Roboto Mono, monospace",
		backgroundColor: "#ffc0ad",
		color: "#271c19",
		whiteSpace: "pre-wrap",
		padding: "0.5rem",
		borderRadius: "0.25rem",
		fontSize: "0.8rem",
		"> li": {
			margin: "0.5rem 0 1rem 0.8rem",
		},
		" pre": {
			margin: "0 0 0.5rem",
		},
	},
	" .exercises": {
		backgroundColor: "#f8dca0",
		marginBottom: "0.5rem",
	},
	"> .preview": {
		whiteSpace: "pre-wrap",
		display: "flex",
		flex: "1 1 auto",
		alignItems: "center",
		flexDirection: "column",
		margin: "1rem 0",
		fontSize: "1.2rem",
	},
});

export default () => {
	useEffect(() => {
		mocha.setup({
			grep: /^Lesson 1 Tests/,
		});
		mocha.run(null, "lesson-1-tests");		
		mocha.setup({
			grep: /^Lesson 2 Tests/,
		});
		mocha.run(null, "lesson-2-tests");
	}, []);

	return <div {...style}>
		<h1>tacitscript tutorial</h1>
		<div className="preview">
			<div className="code">avg .(+$ #)./$</div>
		</div>
		<div className="section">
			<p><strong>tacitscript - a symbolic language for building algorithms</strong></p>
			<p>tacitscript is an esolang optimized for building algorithms from concise, composable parts. To learn more about the ideas behind tacitscript, see <a href="#appendix-a">here</a>.</p>
			<p>This tutorial will introduce the language incrementally through example and interactive exercises.</p>
			<ul>
				<li><b>Part 1</b> will take you through the main language concepts</li>
				<li><b>Part 2</b> is a comprehensive operator reference</li>
			</ul>
		</div>

		<h2>Part 1: Concepts</h2>

		<div className="section" id="lesson1">
			<h2 className="heading">Lesson 1: tacitscript (ts) Blocks</h2>
			<hr/>
			<p>tacitscript blocks of code are embedded within JavaScript code.</p>
			<p>They are defined within special comment blocks beginning with a <span className="code">/*ts</span> and ending with a <span className="code">*/</span>. The tacitscript transpiler will convert these blocks to standard JavaScript code. Definitions are shared freely between js and ts code.</p>
			<p>Each ts block consists of a list of name-value bindings.</p>
			<div className="code-block">
				<div>{lesson1}</div>
				<div id="lesson-1-tests" className="mocha"></div>
			</div>
			<ul>
				<li>Each ts name is made from upper and lower-case alphabetic characters <i>only</i>.</li>
				<li>The value bound to a name can be any valid ts expression.</li>
				<li>Any characters on the line following a closed ts expression are considered a comment.</li>
			</ul>
			<h3>Exercise 1</h3>
			<Exercise1/>
		</div>
		<div className="section" id="lesson2">
			<h2 className="heading">Lesson 2: Operators</h2>
			<hr/>
			<p>
				tacitscript is a language of operators. Most non-alphabetic characters on the standard keyboard have been repurposed to act as operators within a ts block.
				Operators in tacitscript are each a single character long.
			</p>
			<p>In programming languages, operators typically come in two flavours:</p>
			<ul>
				<li><b>binary</b> - requiring operands to the left and right, eg. addition <span className="code">+</span></li>
				<li><b>unary</b> - requiring one operand, typically to the right, eg. not <span className="code">!</span></li>
			</ul>
			<p>The standard binary arithmetic operators +, -, * and /, all retain their meaning in tacitscript.</p>
			<p>Some operators may have different meanings depending on context, eg. in JavaScript, <span className="code">+</span> can represent numeric addition as well as string concatenation.
			tacitscript also <i>overloads</i> operators in this way, where the actual operation depends on the types of operands involved. In tacitscript, <span className="code">+</span> can
			also represent string, and array, concatenation.</p>
			<p>In some languages, an operator may act as both a <i>binary</i> and <i>unary</i> operator. In JavaScript, <span className="code">-</span> can represent binary <i>minus</i>, or
			unary <i>negative</i>. In tacitscript, operators are either always binary, or always unary. 
			Negation in tacitscript is therefore represented by a different operator, <span className="code">~</span>. All unary operators in tacitscript take their operand to the right.</p>
			<p>In mathematics, the order in which operations resolved, is dependent on operator precedence rules. These rules are often ported into programming languages. For instance,
				in JavaScript, <span className="code">2+3*4</span> gives the same result as <span className="code">3*4+2</span>, because multiplication operations take precedence over addition.
				In tacitscript, there are typically no precedence rules and all operators are <i>left-associative</i>.</p>
			<div className="code-block">
				<div>{lesson2}</div>
				<div id="lesson-2-tests" className="mocha"></div>
			</div>
			<ul>
				<li><span className="code">5+~2</span> would be a syntax error as no implementation of operator <span className="code">+</span> takes a right hand operand of the same type
				as the <span className="code">~</span> operator</li>
			</ul>
		</div>
		<div className="section" id="lesson3">
			<h2 className="heading">Lesson 3: Functions</h2>
			<hr/>
		</div>
		<div className="section" id="lesson4">
			<h2 className="heading">Lesson 4: Chaining</h2>
			<hr/>
		</div>
		<div className="section" id="lesson5">
			<h2 className="heading">Lesson 5: Higher-Order Operators</h2>
			<hr/>
		</div>

	</div>;
};


