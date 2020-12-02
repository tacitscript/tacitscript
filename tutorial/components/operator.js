
const {css} = Glamor;
const {useState} = React;

const style = css({
	fontFamily: "monospace",
	"> .heading": {
		"> .name": {
			width: "12rem",
		},
	},
	"> .status": {
		fontSize: "2.2rem !important",
		marginTop: "-0.2rem !important",
	},
	"> .contents": {
		"> h3": {
			display: "flex",
			"> .name": {
				width: "9.2rem",
				whiteSpace: "nowrap",
			},
			"> a.type-signature": {
				letterSpacing: "0.15rem",
				marginLeft: "3rem",
			},
		},
	},
});

export default ({id, name, symbol, sections, type}) => {
	const [open, setOpen] = useState(false);

	return <div id={id} className={`panel${open ? " open" : ""}`} {...style}>
		<div className="heading" tabIndex={0} onClick={() => setOpen(!open)} onKeyDown={e => {if (e.key === "Enter") setOpen(!open);}}>
			<div className="name">{name}</div>
			<div className="symbol">{`(${symbol})`}</div>
		</div>
		<b className="status" title={type}>{type[0]}</b>
		{open ? <div className="contents">
			<hr/>
			{sections.map(({name, type, examples}) => <React.Fragment>
				<h3><div className="name">{name}</div><a className="type-signature" href="#types">{type}</a></h3>
				<div className="code-block">
					{examples}
				</div>
			</React.Fragment>)}
		</div> : null}
	</div>;
};