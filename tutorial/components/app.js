import React from "react";
import l1 from "../data/1.js";

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
		borderRadius: "1rem",
		position: "relative",
		"> h2": {margin: "0.5rem 0"},
		"> h3": {marginTop: "2.5rem", fontSize: "1.25rem"},
		"> hr": {marginBottom: "1.5rem"},
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
			marginLeft: "1rem",
		},
		" pre": {
			margin: 0,
		},
	},
	" .exercises": {
		backgroundColor: "#f8dca0"
	},
});

export default ({store}) => {
	const {} = store.getState().app;

	useEffect(() => {
		mocha.setup({
			grep: /^Lesson 1 Tests/,
		});
		mocha.run(null, "lesson-1-tests");		
	});

	return <div {...style}>
		<h1>tacitscript tutorial</h1>
		<div className="section">
			<p><strong>tacitscript - a language for building algorithms</strong></p>
			<p>tacitscript is an esolang optimized for building algorithms from concise, composable parts. To learn more about the ideas behind tacitscript, see <a href="#appendix-a">here</a>.</p>
			<p>This tutorial will introduce the language incrementally through example and interactive exercises.</p>
		</div>

		<div className="section">
			<h2 className="heading">Lesson 1: tacitscript (ts) Blocks</h2>
			<hr/>
			<p>tacitscript blocks of code are embedded within JavaScript code.</p>
			<p>They are defined within special comment blocks beginning with a <span className="code">/*ts</span> and ending with a <span className="code">*/</span>. The tacitscript transpiler will convert these blocks to standard JavaScript code. Definitions are shared freely between js and ts code.</p>
			<p>Each ts block consists of a list of name-value bindings.</p>
			<div className="code-block">
				<div dangerouslySetInnerHTML={{__html: l1}}/>
				<div id="lesson-1-tests" className="mocha"></div>
			</div>
			<ul>
				<li>Each ts name is made from upper and lower-case alphabetic characters <i>only</i>.</li>
				<li>The value bound to a name can be any valid ts expression.</li>
				<li>Any characters on the line following a closed ts expression are considered a comment.</li>
			</ul>
			<h3>Exercises</h3>
			<div className="code-block exercises">
				<li>Define an array <b>numbers</b> that contains multiple numbers, and only numbers, that add up to 20.</li>
				<div id="lesson-1-exercise-tests" className="mocha"></div>
			</div>
		</div>
		<div className="section">
			<h2 className="heading">Lesson 2: Operators</h2>
			<hr/>
			<p>
				tacitscript is a language of operators. Most non-alphabetic characters on the standard keyboard have been repurposed to act as operators within a ts block.
				Operators in tacitscript are each a single character long.
			</p>
			<p>The standard arithmetic operators +, -, * and /, all retain their meaning in tacitscript.</p>
		</div>
		<div className="section">
			<h2 className="heading">Lesson 3: Functions</h2>
			<hr/>
		</div>
		<div className="section">
			<h2 className="heading">Lesson 4: Chaining</h2>
			<hr/>
		</div>
		<div className="section">
			<h2 className="heading">Lesson 5: Higher-Order Operators</h2>
			<hr/>
		</div>

	</div>;
};