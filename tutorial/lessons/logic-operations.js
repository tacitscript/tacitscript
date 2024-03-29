import getOperationExamples from "../logic/get-operation-examples.js";

export default {
	id: "i",
	name: "Logic Operations",
	description: <div>
		<p>In tacitscript, the values <i>false</i> and <i>undefined</i> are considered <i>falsey</i>. All other values are <i>truthy</i>. (Note in particular that <b>0</b> is considered <i>truthy.</i>)</p>
		<p>These qualities are used in resolving the logic operations below.</p>
		<p>The <a href="#andValue">& (andValue)</a> operation returns the right argument if the left argument is <i>falsey</i>. Otherwise, it returns <i>false</i>.</p>
		<div className="code-block">{getOperationExamples([
			["check", '1&2', "equals 2"],
		])}</div>
		<p><a href="#andPredicate">& (andPredicate)</a> checks whether a value conforms to two conditions.</p>
		<div className="code-block">{getOperationExamples([
			["doubleCheck", '>2&(<6)', <span>doubleCheck7 is <i>false</i></span>],
		])}</div>
		<p>The <a href="#orValue">| (orValue)</a> operation returns the right argument, if the left is <i>falsey</i>. Otherwise, it returns the left.</p>
		<div className="code-block">{getOperationExamples([
			["falseOrTwo", '()|2', "equals 2"],
		])}</div>
		<p><a href="#orPredicate">| (orPredicate)</a> tests a value against the left condition; if <i>falsey</i>, it tests against the right.</p>
		<div className="code-block">{getOperationExamples([
			["positiveOrEven", '>0|(%2.=0)', <span>positiveOrEven(_2) is <i>true</i></span>],
		])}</div>
		<p><a href="#orComparator">| (orComparator)</a> applies an <i>or</i> operation between the results of two binary tests.</p>
		<div className="code-block">{getOperationExamples([
			["lessOrEqual", '<|=', <span>2lessOrEqual2 is <i>true</i></span>],
		])}</div>
		<p><a href="#notValue">! (notValue)</a> returns <i>true</i> when passed a <i>falsey</i>, or <i>false</i> otherwise.</p>
		<div className="code-block">{getOperationExamples([
			["notTwo", '!2', <span>is <i>false</i></span>],
		])}</div>
		<p><a href="#notPredicate">! (notPredicate)</a> negates the result of a check.</p>
		<div className="code-block">{getOperationExamples([
			["notOdd", '!(%2.=1)', <span>notOdd0 is <i>true</i></span>],
		])}</div>
		<p><a href="#notComparator">! (notComparator)</a> negates the result of a comparison.</p>
		<div className="code-block">{getOperationExamples([
			["notLess", '!<', <span>2notLess2 is <i>true</i></span>],
		])}</div>
	</div>,
};