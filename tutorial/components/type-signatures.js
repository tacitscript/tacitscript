import getOperationExamples from "../logic/get-operation-examples.js";
import {push} from "common/lib/redux-first/actions.js";

const {css} = Glamor;
const {useState} = React;

const style = css({
	color: "white",
	"> .heading": {
		userSelect: "none",
		color: "#ccc",
	},
});

export default ({dispatch}) => {
	const [open, setOpen] = useState(false);
	const openByHash = location.hash === "#type-signatures";
	const isOpen = open || openByHash;

	const setIsOpen = value => {
		if (!value && openByHash) dispatch(push({
			hash: "",
		}));

		if (value !== open) setOpen(value);
	};

	return <div id="type-signatures" className={`panel${isOpen ? " open" : ""}`} {...style}>
		<div className="heading" tabIndex={0} onClick={() => setIsOpen(!isOpen)} onKeyDown={e => {if (e.key === "Enter") setIsOpen(!isOpen);}}>
			<div className="index">B.</div>
			<div className="name">Type Signatures</div>
		</div>
		{isOpen ? <div className="contents">
			<hr/>
			<div>
				<p>Operation type signatures contain either two components (unary) or three components (binary).</p>
				<div className="code-block table-data">{getOperationExamples([
					["AN", <span>This unary operation takes an <i>array</i> and returns a <i>number</i>, eg. <a href="#length">(#) length</a>, <span className="code">#(7 8 9)=3</span></span>],
					["SAS", <span>This binary operation takes a <i>string</i> and <i>array</i> to the left and right respectively, and returns a <i>string</i>,<br/>eg. <a href="#concat">(+) concat</a>, <span className="code">"Array: "+(1 2 3)="Array: (1 2 3)"</span></span>],
				])}</div>
				<p>When an operation argument is itself an operation, we use parentheses.</p>
				<div className="code-block table-data">{getOperationExamples([
					["(VT)AA", <span>This binary operation takes an operation that maps a <i>value</i>-type (non-operator) to a <i>Boolean (truth)</i> on the left,<br/>
					and an <i>array</i> on the right, and returns an <i>array</i>, eg. <a href="#filter">(*) filter</a>, <span className="code">&lt;5*(2 4 6)=(2 4)</span></span>],
				])}</div>
				<p>When using a type signature to denote the type of a symbol (a form of <a href="https://en.wikipedia.org/wiki/Hungarian_notation">Hungarian notation</a>), operators are reduced to <b>U</b> for unary operators and <b>B</b> for binary operators.</p>
				<div className="code-block table-data">{getOperationExamples([
					["filterUAA", <span>An alias for the <a href="#filter">(*) filter</a> operation.</span>],
				])}</div>
				<p>The complete list of type symbols is given below:</p>
				<div className="code-block table-data">{getOperationExamples([
					["N", <span>An integer, or decimal <b>N</b>umber (using a decimal point), eg. 10, 3.14</span>],
					["S", <span>A double-quote delimited multi-line <b>S</b>tring, possibly using escaped characters eg. "header1\theader2<br/>value1\tvalue2"</span>],
					["T", <span>A Boolean <i>(<b>T</b>ruth)</i> value, <span className="code">0</span> <i>false</i>, or <span className="code">1</span> <i>true</i>. Booleans are a subset of the Numbers.</span>],
					["A", <span>Any <b>A</b>rray, including mixed-type arrays, eg. (10 "string" +)</span>],
					["C", <span>A ve<b>C</b>tor, ie. any string or array.<br/>Matches other instances of this symbol in signature.</span>],
					["D", <span>A <b>D</b>ictionary, with string keys and where values may be of any mixed types (including non-<i>value</i> types), eg. \(("a" 10) ("b" +))</span>],
					["V", <span>A <i><b>V</b>alue</i>, ie. non-operator, type. Any of <b>N</b>, <b>S</b>, <b>T</b>, <b>A</b> or <b>D</b>.<br/>The types of multiple <b>V</b>s in a signature do not have to match.</span>],
					["U", <span>A <b>U</b>nary operator.</span>],
					["B", <span>A <b>B</b>inary operator.</span>],
					["Q", <span>(For <b>Q</b>uestion.) Any type (either <i>value</i> or operator).<br/>Type does not have to match other <b>Q</b>s in signature.</span>],
					["X, Y, Z, W", <span>Any type.<br/>Matches other instances of this symbol in signature.</span>],
				])}</div>
			</div>
		</div> : null}
	</div>;
};