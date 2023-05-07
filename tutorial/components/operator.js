import {push} from "common/lib/redux-first/actions.js";

const {css} = Glamor;
const {useState} = React;

const style = css({
	fontFamily: "monospace",
	"> .heading": {
		"> .name": {
			width: "11rem",
		},
	},
	"> .status": {
		fontSize: "2rem !important",
	},
	"> .contents": {
		"> h3": {
			display: "flex",
			"> .name": {
				width: "11rem",
				whiteSpace: "nowrap",
			},
			"> a.type-signature": {
				letterSpacing: "0.15rem",
				whiteSpace: "pre-wrap",
			},
		},
	},
});

export default ({id, symbol, sections, type, dispatch}) => {
	const ids = [id, ...R.map(R.prop("id"), sections)];
	const [open, setOpen] = useState(false);
	const openByHash = (hash => hash && ids.includes(hash.slice(1)))(location.hash);
	const isOpen = open || openByHash;

	const setIsOpen = value => {
		if (!value && openByHash) dispatch(push({
			hash: "",
		}));

		if (value !== open) setOpen(value);
	};

	return <div id={id} className={`panel${isOpen ? " open" : ""}`} {...style}>
		<div className="heading" tabIndex={0} onClick={() => setIsOpen(!isOpen)} onKeyDown={e => {if (e.key === "Enter") setIsOpen(!isOpen);}}>
			<div className="name">{id}</div>
			<div className="symbol">{`${symbol}`}</div>
		</div>
		<b className="status" title={type}>{type[0]}</b>
		{isOpen ? <div className="contents">
			<hr/>
			{sections.map(({id, type, examples}) => <React.Fragment key={id}>
				<h3><div id={id} className="name">{id}</div><a className="type-signature" href="#type-signatures">{type}</a></h3>
				<div className="code-block">
					{examples}
				</div>
			</React.Fragment>)}
		</div> : null}
	</div>;
};