const {css} = Glamor;
const {useState} = React;

const style = css({
	width: "calc(85% + 2rem)",
	margin: "0 auto 1rem",
	backgroundColor: "var(--brown)",
	borderRadius: "0.25rem",
	display: "flex",
	flexDirection: "column",
	"> .heading": {
		padding: "0.5rem 1rem",
		fontSize: "1.2rem",
		display: "flex",
		fontWeight: "bold",
		":hover,:focus": {
			color: "var(--yellow)",
			cursor: "pointer",
		},
		"> .index": {
			width: "2rem",
		},
	},
	"> .contents": {
		"margin": "0 1rem 1rem",
		"> hr": {
			borderColor: "var(--yellow)",
			margin: "-1px 0 1rem",
		},
	},
});

export default ({id, name, description, index}) => {
	const [open, setOpen] = useState(false);

	return <div className="lesson" {...style}>
		<div className="heading" tabIndex={0} onClick={() => setOpen(!open)} onKeyDown={e => {if (e.key === "Enter") setOpen(!open);}}>
			<div className="index">{`${index + 1}.`}</div>
			<div className="name">{name}</div>
		</div>
		{open ? <div className="contents">
			<hr/>
			{description}			
		</div> : null}
	</div>;
}