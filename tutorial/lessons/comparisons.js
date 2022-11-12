import getOperationExamples from "../logic/get-operation-examples.js";

export default {
	id: "h",
	name: "Comparisons",
	description: <div>
		<p>Comparison operators return a boolean.</p>
		<p><a href="#equality">= (equality)</a> makes a deep <i>by-value</i> comparison.</p>
		<div className="code-block">{getOperationExamples([
			["deepCheck", '("abc" (1 2 3))=("abc" (1 2 4))', <span>is <i>false</i></span>],
		])}</div>
		<p><a href="#lessThan">&lt; (lessThan)</a> supports number comparison, and string comparison by <i>dictionary-order</i>.</p>
		<div className="code-block">{getOperationExamples([
			["numberLess", "2<3", <span>is <i>true</i></span>],
			["stringLess", '"cad"<"bad"', <span>is <i>false</i></span>],
		])}</div>
		<p><a href="#greaterThan">&gt; (greaterThan)</a></p>
		<div className="code-block">{getOperationExamples([
			["numberGreater", '2>3', <span>is <i>false</i></span>],
			["stringGreater", 'cad">"bad"', <span>is <i>true</i></span>],
		])}</div>
	</div>,
};