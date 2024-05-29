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
					["(VB)AA", <span>This binary operation takes an operation that maps a <i>value</i>-type (non-operator) to a <i>boolean</i> on the left,<br/>
					and an <i>array</i> on the right, and returns an <i>array</i>, eg. <a href="#filter">(*) filter</a>, <span className="code">&lt;5*(2 4 6)=(2 4)</span></span>],
				])}</div>
				<p>The complete list of type symbols is given below:</p>
				<div className="code-block table-data">{getOperationExamples([
					["N", "An integer, or decimal Number (using a decimal point), eg. 10, 3.14"],
					["S", <span>A double-quote delimited multi-line String, possibly using escaped characters eg. "header1\theader2<br/>value1\tvalue2"</span>],
					["B", <span>A Boolean value, <span className="code">0</span> <i>false</i>, or <span className="code">1</span> <i>true</i>. Booleans are a subset of the Numbers.</span>],
					["A", 'A mixed-type array, eg. (10 "string" +)'],
					["D", <span>A Dictionary with string keys and where values may be of any mixed types (including non-<i>value</i> types), eg. \(("a" 10) ("b" +))</span>],
					["V", <span>A <i>Value</i>, ie. non-operator, type. Any of <b>N</b>, <b>S</b>, <b>B</b>, <b>A</b> or <b>D</b>.<br/>The types of multiple <b>V</b>s in a signature do not have to match.</span>],
					["?", <span>Any type (either <i>value</i> or operator).<br/>Type does not have to match other <b>?</b>s in signature.</span>],
					["X, Y, Z, W", <span>Any type.<br/>Matches other instances of this symbol in signature.</span>],
				])}</div>
			</div>
		</div> : null}
	</div>;
};