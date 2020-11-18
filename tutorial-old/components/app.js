import tacitscriptBlocksLesson from "../data/tacitscript-blocks-lesson.js";
import operatorsLesson from "../data/operators-lesson.js";
import theApplicationOperatorLesson from "../data/the-application-operator-lesson.js";
import TacitscriptBlocks from "./tacitscript-blocks.js";
import Repl from "./repl.js";

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
		"> h2": {
			margin: "0.5rem 0",
			" .operator": {
				fontSize: "1.3rem",
				fontFamily: "Roboto Mono, monospace",
			},
		},
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
			" a": {
				color: "var(--text-color)",
				":hover,:focus": {
					color: "var(--yellow)",
				},
			},
			"> .listings": {
				display: "flex",
				flexWrap: "wrap",
				marginBottom: "1.5rem",
				"> a": {
					lineHeight: "1.3rem",
					backgroundColor: "#1a110e",
					border: "3px solid var(--background)",
					borderRadius: "6px",
					":hover,:focus": {
						color: "var(--text-color)",
						backgroundColor: "var(--brown)"
					},
					".lesson": {
						width: "14.35rem",
						padding: "2px 5px",
					},
					".operator": {
						width: "15rem",
						fontSize: "1.1rem",
						fontFamily: "Roboto Mono, monospace",
						display: "flex",
						flex: "0 1 auto",
						lineHeight: "1.5rem",
						"> .symbol": {
							display: "flex",
							flex: "1 1 auto",
							justifyContent: "center",
						},
						"> .type": {
							display: "flex",
							justifyContent: "center",
							width: "1.5rem",
							backgroundColor: "var(--brown)",
							flex: "0 0 auto",
							color: "var(--background)",
							fontWeight: "bold",
							borderBottomRightRadius: 3,
							borderTopRightRadius: 3,
							borderLeft: "1px solid #1a110e",
						}
					},
				},
			},
		},
	},
	" a": {
		color: "var(--yellow)",
		textDecoration: "none",
		":hover,:focus": {
			color: "var(--text-color)",
		},
	},
	" .code": {
		fontFamily: "Roboto Mono, monospace",
		color: "var(--orange)",
		fontSize: "0.85rem",
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
		margin: "1rem 0 1.5rem",
		"> .code": {
			fontSize: "1.1rem",
		},
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
				<li>The <a href="#appendices"><b>Appendices</b></a> contains a live repl and other technical and background details about the language</li>
			</ul>
			<p>Throughout this document are test blocks that execute against the live contents of the page.</p>
		</div>

		<div className="section contents">
			<h2 className="heading">Contents</h2>
			<hr/>
			<h4><a href="#concepts">Part 1: Concepts</a></h4>
			<div className="listings">
				<a href="#tacitscript-blocks" className="lesson">1. tacitscript (ts) Blocks</a>
				<a href="#operators" className="lesson">2. Operators</a>
				<a href="#arrays" className="lesson">3. Arrays</a>
				<a href="#custom-operators" className="lesson">4. Custom Operators</a>
				<a href="#the-application-operator" className="lesson">5. The Application (dot) Operator</a>
			</div>
			<h4><a href="#operator-reference">Part 2: Operator Reference</a></h4>
			<div className="listings">
				<a href="#plus" className="operator"><div className="symbol">+</div><div className="type">B</div></a>
				<a href="#minus" className="operator"><div className="symbol">-</div><div className="type">B</div></a>
				<a href="#asterix" className="operator"><div className="symbol">*</div><div className="type">B</div></a>
				<a href="#slash" className="operator"><div className="symbol">/</div><div className="type">B</div></a>
				<a href="#dot" className="operator"><div className="symbol">.</div><div className="type">B</div></a>
			</div>
			<div className="listings">
				<a href="#tilde" className="operator"><div className="symbol">~</div><div className="type">U</div></a>
			</div>
			<h4><a href="#appendices">Appendices</a></h4>
			<div className="listings">
				<a href="#repl">A. Multiline REPL</a>
				<a href="#type-signatures">B. Type Signatures</a>
				<a href="#background">C. Background</a>
			</div>
		</div>

		<h2 id="concepts">Part 1: Concepts</h2>

		<div className="section" id="tacitscript-blocks">
			<h2 className="heading">Lesson 1. tacitscript (ts) Blocks</h2>
			<hr/>
			<p>tacitscript blocks of code are embedded within JavaScript code.</p>
			<p>They are defined within special comment blocks beginning with a <span className="code">/*ts</span> and ending with a <span className="code">*/</span>. The tacitscript transpiler will convert these blocks to standard JavaScript code. Definitions are shared freely between js and ts code.</p>
			<p>A ts block consists of either a list of name-value bindings, or an inline expression.</p>
			<div className="code-block">
				<div dangerouslySetInnerHTML={{__html: tacitscriptBlocksLesson}}/>
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
			<p>The standard binary arithmetic operators <a href="#add">+ (add)</a>, <a href="#subtract">- (subtract)</a>, <a href="#multiply">* (multiply)</a> and <a href="#divide">/ (divide)</a>, all retain their meaning in tacitscript.</p>
			<p>Some operators may have different meanings depending on context, eg. in JavaScript, <span className="code">+</span> can represent numeric addition as well as string concatenation.
			tacitscript also <i>overloads</i> operators in this way, where the actual operation depends on the types of operands involved. In tacitscript, <span className="code">+</span> can
			also represent <a href="#string-cat">string</a>/<a href="#array-cat">array</a> concatenation. We call the symbol, <span className="code">plus (+)</span> the <i>operator</i> and associated implementations
			like <span className="code">plus</span> or <span className="code">stringCat</span>, <i>operations</i>.</p>
			<p>In some languages, an operator may act as both a <i>binary</i> and <i>unary</i> operator. In JavaScript, <span className="code">-</span> can represent binary <i>minus</i>, or
			unary <i>negative</i>. In tacitscript, operations of an operators are either all binary, or all unary. 
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
				as the <span className="code">~</span> operator.</li>
				<li>All unary operators take their operand to the right.</li>
				<li>For operation <span className="code">2+3</span>, we say operands <span className="code">2</span> and <span className="code">3</span> are <i>applied</i> to operator <span className="code">+</span>.</li>
			</ul>

			--- Exercise use all operators ---
		</div>
		<div className="section" id="arrays">
			<h2 className="heading">Lesson 3: Arrays</h2>
			<hr/>
			<p>tacitscript supports mixed-type arrays; that is, elements may be of any type including simple data, other arrays or operators.</p>
		</div>
		<div className="section" id="custom-operators">
			<h2 className="heading">Lesson 4: Custom Operators</h2>
			<hr/>
			<p>You have now learnt the entirety of tacitscript syntax. tacitscript expressions are understood solely in terms of the application of its operators. We can think of these as functions of
				either one or two arguments. (Indeed, the tacitscript transpiler exports the language's inbuilt and custom operators in this way.) Throughout this document, the terms <i>function</i> and <i>operator</i> are used
				interchangeably.</p>
			<p>tacitscript does not provide an explicit lambda construct, that is, there's no way of defining a function in terms of an arbitrary list of arguments. Instead, we build custom operators
				by applying values to existing operators.
			</p>
			<p>A new unary operator, <span className="code">double</span>, that doubles from any number passed to it, is defined by the expression <span className="code">2*</span>. The new operator is created
			by <i>baking-in</i> the value of <span className="code">2</span> to the left-side of the <span className="code">*</span> operator. This operator can now be used in expressions such
			as <span className="code">double4</span>, which yields a value of <span className="code">8</span>.
			</p>
			<p>
				We can also bake-in values to the right-side of a binary operator. The unary operator <span className="code">minusThree</span>, defined as <span className="code">-3</span>, will
				subtract <span className="code">3</span> from any number passed to it. <span className="code">minusThree7</span> yields <span className="code">4</span>. 
				(Note that all unary operators take their operands to the right, so <span className="code">7minusThree</span> is a syntax error. This extends to the use of parentheses,
				so <span className="code">7(-3)</span> is a syntax error, while <span className="code">(-3)7</span> gives the intended result, 4.)</p>

			--- Exercise inverse ---
		</div>
		<div className="section" id="the-application-operator">
			<h2 className="heading">Lesson 5: The Application (dot) Operator</h2>
			<hr/>
			<p>Within a ts expression, whitespace is used to delimit terms in an array only. This has the potential to cause symbol boundary ambiguity when attempting to apply custom named operand to custom named operator,
				for instance, <span className="code">four</span> (holding value <span className="code">4</span>) to operator <span className="code">double</span>. We may use parentheses to demarcate boundaries
				- <span className="code">double(four)</span> which, indeed, suggests function application, although <span className="code">(double)four</span> works equally well.</p>
			<p>Alternatively, we can use the <a href="#apply-to">. (applyTo)</a> operation, which takes the operand-to-apply on the left, and the operator-to-apply-to on the right, ie. <span className="code">four.double</span>. This is
			the first example of a higher-order operator - an operator that takes another operator as an operand.</p>
			<p>The related <a href="#pipe">. (pipe)</a> operation takes unary operators to the left and right, and returns a new unary operator that <i>pipes</i> a value through the left function and then, the result of this, through the right.
			(This is directly connected to function composition in mathematics.) The pipe operation allows us to chain many processing steps together in a pipeline.</p>

			<div className="code-block">
				<div>{theApplicationOperatorLesson}</div>
				<div id="this-application-operator-lesson" className="mocha"></div>
			</div>

			<ul>
				<li>When mentally parsing a ts expression, the dot operator can be read as <i>then</i>.</li>
				<li>For neighboring binary operators, there is a choice of which operator to apply to which. Which way round the application goes depends on the types of the available operations. We first attempt
					to apply the first operator as an operand of the second. Failing that, we attempt to find a type match for the reverse.</li>
				<li>The function expansion of <a href="#apply-to">applyTo</a> could be written <span className="code">(value, fn) =&gt; fn(value)</span> in js.</li>
				<li>The function expansion of <a href="#pipe">pipe</a> could be written <span className="code">(leftFn, rightFn) =&gt; value =&gt; rightFn(leftFn(value))</span> in js.</li>
			</ul>

			---exercise farenheit to celsius---
		</div>

		<h2 id="operator-reference">Part 2: Operator Reference</h2>

		<div className="section" id="plus">
			<h2 className="heading"><span className="operator">+</span> (plus)</h2>
			<hr/>
		</div>

		<div className="section" id="minus">
			<h2 className="heading"><span className="operator">-</span> (minus)</h2>
			<hr/>
		</div>

		<div className="section" id="asterix">
			<h2 className="heading"><span className="operator">*</span> (asterix)</h2>
			<hr/>
		</div>

		<div className="section" id="slash">
			<h2 className="heading"><span className="operator">/</span> (slash)</h2>
			<hr/>
		</div>

		<div className="section" id="tilde">
			<h2 className="heading"><span className="operator">~</span> (tilde)</h2>
			<hr/>
		</div>

		<div className="section" id="dot">
			<h2 className="heading"><span className="operator">.</span> (dot)</h2>
			<hr/>
		</div>

		<h2 id="appendices">Appendices</h2>

		<div className="section" id="repl">
			<h2 className="heading">Appendix A: Multiline REPL</h2>
			<hr/>
			<p>The value of <span className="code">result</span> will be output below.</p>
			<Repl/>
		</div>

		<div className="section" id="type-signatures">
			<h2 className="heading">Appendix B: Type Signatures</h2>
			<hr/>
		</div>

		<div className="section" id="background">
			<h2 className="heading">Appendix C: Background</h2>
			<hr/>
		</div>

	</div>;
};


