
export default {
	id: "i",
	name: "Logic Operations",
	description: <div>
		<p>In tacitscript, the values <i>false</i> and <i>undefined</i> are considered <i>falsey</i>. All other values are <i>truthy</i>. These qualities are used in
		resolving the logic operations below.</p>
		<p>The <a href="#andValue">& (andValue)</a> operation returns the right argument if the left argument is <i>falsey</i>. Otherwise, it returns <i>false</i>.</p>
		<div className="code-block"><span>check           1&2                                             equals 2</span></div>
		<p><a href="#andPredicate">& (andPredicate)</a> checks whether a value conforms to two conditions.</p>
		<div className="code-block"><span>doubleCheck     &gt;2&amp;(&lt;6)                                         doubleCheck7=()</span></div>
		<p>The <a href="#orValue">| (orValue)</a> operation returns the right argument, if the left is <i>falsey</i>. Otherwise, it returns the left.</p>
		<div className="code-block">
			<span>falseOrTwo      ()|2                                            equals 2</span>
		</div>
		<p><a href="#orPredicate">| (orPredicate)</a> tests a value against the left condition; if <i>falsey</i>, it tests against the right.</p>
		<div className="code-block">
			<span>positiveOrEven  &gt;0|(%2.=0)                                      positiveOrEven(_2) is <i>true</i></span>
		</div>
		<p><a href="#orComparator">| (orComparator)</a> applies an <i>or</i> operation between the results of two binary tests.</p>
		<div className="code-block">
			<span>lessOrEqual     &lt;|=                                             2lessOrEqual2 is <i>true</i></span>
		</div>
		<p><a href="#notValue">! (notValue)</a> returns <i>true</i> when passed a <i>falsey</i>, or <i>false</i> otherwise.</p>
		<div className="code-block">
			<span>notZero         !2                                              is <i>false</i></span>
		</div>
		<p><a href="#notPredicate">! (notPredicate)</a> negates the result of a check.</p>
		<div className="code-block">
			<span>notOdd         !(%2.=1)                                         notOdd0 is <i>true</i></span>
		</div>
		<p><a href="#notComparator">! (notComparator)</a> negates the result of a comparison.</p>
		<div className="code-block">
			<span>notLess        !&lt;                                               2notLess2 is <i>true</i></span>
		</div>
	</div>,
};