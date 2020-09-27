import tacitscriptBlocksLesson from "../data/tacitscript-blocks-lesson.js";
import operatorsLesson from "../data/operators-lesson.js";
import TacitscriptBlocks from "./tacitscript-blocks.js";

const {css} = Glamor;
const {useEffect} = React;

const style = css({
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
	" .section": {
		width: "85%",
		margin: "0 auto 1rem",
		backgroundColor: "var(--brown)",
		padding: "0.5rem 1.2rem",
		borderRadius: "0.5rem",
		position: "relative",
		"> h2": {margin: "0.5rem 0"},
		"> h3": {marginTop: "2.5rem", fontSize: "1.25rem"},
		"> hr": {marginBottom: "1.5rem"},
		"> ul": {paddingInlineStart: "2rem"},
		".contents": {
			backgroundColor: "var(--background)",
			"> hr": {
				borderColor: "var(--yellow)",
				marginBottom: "1rem",
			},
			"> h4": {
				margin: "1rem 0",
				fontSize: "1rem",
			},
			"> .listings": {
				display: "flex",
				flexWrap: "wrap",
				marginBottom: "1.5rem",
				"> a": {
					width: "15rem",
					lineHeight: "1.3rem",
				},
			},
			" a": {
				color: "white",
				":hover,:focus": {color: "var(--yellow)"},
			},
		},
	},
	" a": {
		color: "var(--yellow)",
		textDecoration: "none",
		":hover,:focus": {
			color: "white",
		},
	},
	" .code": {
		fontFamily: "Roboto Mono, monospace",
		color: "var(--orange)",
	},
	" .code-block": {
		display: "flex",
		flexDirection: "column",
		fontFamily: "Roboto Mono, monospace",
		backgroundColor: "var(--orange)",
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
		backgroundColor: "var(--yellow)",
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
			grep: /^tacitscript-blocks-lesson/,
		});
		mocha.run(null, "tacitscript-blocks-lesson");
		mocha.setup({
			grep: /^operators-lesson/,
		});
		mocha.run(null, "operators-lesson");
	}, []);

	return <div {...style}>
		<h1>tacitscript</h1>

		<div className="preview">
			<div className="code">avg .(+$ #)./$</div>
		</div>

		<div className="section">
			<p><strong>tacitscript - a symbolic language for building algorithms</strong></p>
			<p>tacitscript is an esolang optimized for building algorithms from concise, composable parts. To learn more about the ideas behind tacitscript, see <a href="#background">here</a>.</p>
			<ul>
				<li><a href="#concepts"><b>Part 1</b></a> is a tutorial that takes you through the main language concepts with examples and interactive exercises</li>
				<li><a href="#operator-reference"><b>Part 2</b></a> is a comprehensive operator reference</li>
				<li>The <a href="#appendices"><b>Appendices</b></a> contains a live repl and background details about the language</li>
			</ul>
			<p>Throughout this document are test blocks that execute against the live contents of the page.</p>
		</div>

		<div className="section contents">
			<h2 className="heading">Contents</h2>
			<hr/>
			<h4><a href="#concepts">Part 1: Concepts</a></h4>
			<div className="listings">
				<a href="#tacitscript-blocks">1. tacitscript (ts) Blocks</a>
				<a href="#operators">2. Operators</a>
				<a href="#functions">3. Functions</a>
				<a href="#function-application">4. Function Application</a>
				<a href="#higher-order-operators">5. Higher-Order Operators</a>
			</div>
			<h4><a href="#operator-reference">Part 2: Operator Reference</a></h4>
			<h4><a href="#appendices">Appendices</a></h4>
		</div>

		<h2 id="concepts">Part 1: Concepts</h2>

		<div className="section" id="tacitscript-blocks">
			<h2 className="heading">Lesson 1. tacitscript (ts) Blocks</h2>
			<hr/>
			<p>tacitscript blocks of code are embedded within JavaScript code.</p>
			<p>They are defined within special comment blocks beginning with a <span className="code">/*ts</span> and ending with a <span className="code">*/</span>. The tacitscript transpiler will convert these blocks to standard JavaScript code. Definitions are shared freely between js and ts code.</p>
			<p>A ts block consists of either a list of name-value bindings, or an inline expression.</p>
			<div className="code-block">
				<div>{tacitscriptBlocksLesson}</div>
				<div id="tacitscript-blocks-lesson" className="mocha"></div>
			</div>
			<ul>
				<li>Each ts name is made from upper and lower-case alphabetic characters <i>only</i>.</li>
				<li>The value bound to a name can be any valid ts expression.</li>
				<li>Any characters on the line following a closed ts expression are considered a comment.</li>
			</ul>
			<h3>Exercise</h3>
			<TacitscriptBlocks/>
		</div>

		<div className="section" id="operators">
			<h2 className="heading">Lesson 2. Operators</h2>
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
			Negation in tacitscript is therefore represented by a different operator, <span className="code">~</span>.</p>
			<p>In mathematics, the order in which operations resolved, is dependent on operator precedence rules. These rules are often ported into programming languages. For instance,
				in JavaScript, <span className="code">2+3*4</span> gives the same result as <span className="code">3*4+2</span>, because multiplication operations take precedence over addition.
				In tacitscript, there are typically no precedence rules and all operators are <i>left-associative</i>.</p>
			<div className="code-block">
				<div>{operatorsLesson}</div>
				<div id="operators-lesson" className="mocha"></div>
			</div>
			<ul>
				<li><span className="code">5+~2</span> would be a syntax error as no implementation of operator <span className="code">+</span> takes a right hand operand of the same type
				as the <span className="code">~</span> operator</li>
			</ul>
		</div>
		<div className="section" id="functions">
			<h2 className="heading">Lesson 3: Functions</h2>
			<hr/>
		</div>
		<div className="section" id="function-application">
			<h2 className="heading">Lesson 4: Function Application</h2>
			<hr/>
		</div>
		<div className="section" id="higher-order-operators">
			<h2 className="heading">Lesson 5: Higher-Order Operators</h2>
			<hr/>
		</div>

		<h2 id="operator-reference">Part 2: Operator Reference</h2>

		<div className="section" id="plus">
			<h2 className="heading">+</h2>
			<hr/>
		</div>

		<h2 id="appendices">Appendices</h2>

		<div className="section" id="repl">
			<h2 className="heading">Appendix A: Live REPL</h2>
			<hr/>
		</div>

		<div className="section" id="background">
			<h2 className="heading">Appendix B: Background</h2>
			<hr/>
		</div>

	</div>;
};


