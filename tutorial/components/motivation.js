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
			<div>
				<p>tacitscript is an experiment in programming language design.</p>
				<p>It seeks to be a pure expression of the maxim <b>programming is data transformation</b>.</p> 
				<p>tacitscript is built upon a minimal set of higher-order functions.
					It contains no special constructs for features such as loops, control flow, or macros.
					This gives it a very regular, concise syntax.</p>
				<p>Notably, it adopts a strict <a href="https://en.wikipedia.org/wiki/Tacit_programming">point-free</a> style that eschews representation of function arguments.
					This follows the agenda set out by John Backus in his 1977 Turing Award lecture, in which he calls for a change in language design philosphy:</p>
				<Quotation>Programming languages appear to be in trouble. Each successive language incorporates, with a little cleaning up, all the features of its predecessors plus a few more. [...] Each new language claims new and fashionable features... but the plain fact is that few languages make programming sufficiently cheaper or more reliable to justify the cost of producing and learning to use them.</Quotation>
				<p>Point-free coding has achieved some support, particularly among stack-based (<a href="https://en.wikipedia.org/wiki/Joy_(programming_language)">Joy</a>, <a href="https://en.wikipedia.org/wiki/Factor_(programming_language)">Factor</a>), and array (<a href="https://en.wikipedia.org/wiki/APL_(programming_language)">APL</a>, <a href="https://en.wikipedia.org/wiki/J_(programming_language)">J</a>) languages.</p>
				<p>Syntactically, tacitscript shares much in common with J. It uses standard ASCII punctuation characters for the inventory of core programming operations. 
					In contrast to J, each symbol represents a distinct operator. In J, the operators <span className="code">+:</span> and <span className="code">+.</span> share no relation to the operator <span className="code">+</span>.
					In tacitscript, <span className="code">+:</span> is the application of <span className="code">+</span> and <span className="code">:</span> operators.</p>
				<p>While superficially appearing similar to J, semantically, the language shares far more DNA with functional languages.
					It borrows from the ML family (automatic currying, purity) and LISP family (homoiconicity). However, it is unusual in missing the core <i>lambda</i> construct.
				</p>
				<p>The absence of traditional syntactic boilerplate makes tacitscript very terse. Complex algorithms can be derived mathematically, typically on paper first.</p>
			</div>
		</div> : null}
	</div>;
};