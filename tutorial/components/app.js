import React from "react";

const {css} = Glamor;

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

	return <div {...style}>
		<h1>tacitscript tutorial</h1>
		<div class="section">
			<p><strong>tacitscript - a language for building algorithms</strong></p>
			<p>tacitscript is a programming language optimized for building algorithms from composable parts, using a simplified syntax. To learn more about the ideas behind tacitscript, see <a href="#appendix-a">here</a>.</p>
			<p>This tutorial will introduce the language incrementally through example and interactive exercises.</p>
		</div>

		<div class="section">
			<h2 class="heading">Lesson 1: tacitscript (ts) blocks</h2>
			<hr/>
			<p>tacitscript blocks of code are embedded within normal JavaScript code.</p>
			<p>They are defined within special comment blocks beginning with a <span class="code">/*ts</span> and ending with a <span class="code">*/</span>. The tacitscript transpiler will convert these blocks to normal JavaScript code. Definitions are shared freely between js and ts code.</p>
			<p><div class="code-block">const jsVariable = 4;
<p>
<pre>/*ts
<pre>    number             3                              // this is a number</pre>
<pre>    decimal            3.5                            also a number. NB: terminating line comments need not be prefixed with //</pre>
<pre>    string             "strings may continue</pre>
<pre>over several lines"         strings are delimited by double-quotes <i>only</i></pre>

<pre>	falsey			()		there is only one falsey value, <strong>undefined</strong>, denoted ()</pre>

<pre>	array		(1 "hello"
			() number)	arrays are bounded by brackets and delimited by any kind of whitespace</pre>

<pre>	expression	2*jsVariable	js variables in scope may be directly referenced within ts block</pre>

<pre>	pitfall		4 + number	NB: tokens <i>cannot</i> be freely separated by whitespace</pre>
*/</pre>
</p>
const calculation = jsVariable + array[3];
	<div id="lesson-1-tests" class="mocha"></div>
</div></p>
			<ul>
				<li>Each ts block consists of a list of name-value bindings.</li>
				<li>Each ts name is made from upper and lower-case alphabetic characters <i>only</i>.</li>
				<li>The value bound to a name is given by any valid ts expression.</li>
				<li>Any characters on the line following a closed ts expression are considered to be a comment.</li>
			</ul>
			<h3>Exercises</h3>
			<p>Please select the file <span class="code">tutorial.js</span> in the panel to the left. This will display the interactive exercises for these lessons.</p>
			<p>The exercises are a sequence of automated tests, whose results are output on this page on save. The first set of tests is driving the assertions made in the lesson above. The second block of tests
				contains stubs for ts declarations, initially left undefined. Replace these null definitions with your own submissions, and click Save to see the tests run against them. (Remove the <i>x</i> before
				the test declaration to enable it.)</p>
			<p><div class="code-block exercises">
				<li>Define an array <b>numbers</b> that contains multiple numbers, and only numbers, that add up to 20.</li>
				<div id="lesson-1-exercise-tests" class="mocha"></div>
			</div></p>
		</div>
	</div>;
};