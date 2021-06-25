import getOperationExamples from "../logic/get-operation-examples.js";

const {css} = Glamor;
const {useState} = React;

const style = css({
	color: "white",
	"> .heading": {
		userSelect: "none",
		color: "#ccc",
	},
});

export default () => {
	const [open, setOpen] = useState(false);

	return <div className={`panel${open ? " open" : ""}`} {...style}>
		<div className="heading" tabIndex={0} onClick={() => setOpen(!open)} onKeyDown={e => {if (e.key === "Enter") setOpen(!open);}}>
			<div className="index">A.</div>
			<div className="name">Type Signatures</div>
		</div>
		{open ? <div className="contents">
			<hr/>
			<div>
				<p>Operator type signatures contain either two components (unary) or three components (binary).</p>
				<div className="code-block">{getOperationExamples([
					["AN", <span>This unary operator takes an array and returns a number, eg. <a href="#hash">(#) length</a>, <span className="code">#(7 8 9)=3</span></span>],
				])}</div>
			</div>
		</div> : null}
	</div>;
};