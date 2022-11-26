import {push} from "common/lib/redux-first/actions.js";
import Quotation from "./quotation.js";

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
	const openByHash = location.hash === "#motivation";
	const isOpen = open || openByHash;

	const setIsOpen = value => {
		if (!value && openByHash) dispatch(push({
			hash: "",
		}));

		if (value !== open) setOpen(value);
	};

	return <div id="motivation" className={`panel${isOpen ? " open" : ""}`} {...style}>
		<div className="heading" tabIndex={0} onClick={() => setIsOpen(!isOpen)} onKeyDown={e => {if (e.key === "Enter") setIsOpen(!isOpen);}}>
			<div className="index">A.</div>
			<div className="name">Motivation</div>
		</div>
		{isOpen ? <div className="contents">
			<hr/>
			<h3>What</h3>
			<p>tacitscript is an experiment in programming language design.</p>
			<p>It seeks to be a pure, minimal expression of the maxim <b>programming is data transformation</b>.</p> 
			<h3>How</h3>
			<p>tacitscript is built upon a set of core operators.
				It contains no dedicated constructs for language features such as loops or control flow.
				This gives it a very regular, concise syntax.</p>
			<p>Notably, it adopts a strict <a href="https://en.wikipedia.org/wiki/Tacit_programming">point-free</a> style that excludes representation of function arguments.
				This style is seen predominantly among stack-based (<a href="https://en.wikipedia.org/wiki/Joy_(programming_language)">Joy</a>, <a href="https://en.wikipedia.org/wiki/Factor_(programming_language)">Factor</a>), and array (<a href="https://en.wikipedia.org/wiki/APL_(programming_language)">APL</a>, <a href="https://en.wikipedia.org/wiki/J_(programming_language)">J</a>) languages.</p>
			<p>Syntactially, tacitscript is similar to J, using standard ASCII punctuation characters as an inventory of core programming operations. 
				Semantically, the language shares more DNA with functional languages, borrowing from the ML (automatic currying, purity) and LISP (homoiconicity) families.
			</p>
			<p>tacitscript is a general-purpose language, and has full interoperability with its native host environment.
				The canonical implementation is built upon JavaScript for the web.
				As such, it is able to reference all JavaScript APIs (including the DOM API), and export functionality to be consumed by those APIs.
			</p>
			<h3>Why</h3>
			<p>The absence of traditional syntactic boilerplate makes tacitscript very terse. Complex algorithms can be derived mathematically, typically on paper first.</p>
		</div> : null}
	</div>;
};