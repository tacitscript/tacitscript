export default {
	id: "a",
	name: "Arithmetic Operations",
	description: <div>
		<p>tacitscript uses the standard binary arithmetic operators <a href="#add">+ (add)</a>, <a href="#subtract">- (subtract)</a>, <a href="#multiply">* (multiply)</a> and <a href="#divide">/ (divide)</a>.</p>
		<p>Except for the operators <a href="#dot">.</a> and <a href="#comma">,</a> all tacitscript operators have equal precedence, and are strictly <i>left-associative</i>.</p>
		<div className="code-block">2+3*4</div>
		<p>is intepreted as</p>
		<div className="code-block">(2+3)*4</div>
		<p>Parentheses are used to override the default evaluation order.</p>
		<div className="code-block">2+(3*4)</div>
		<p>Note that spaces cannot be used to separate terms in tacitscript (their meaning will be detailed below.)</p>
	</div>,
};