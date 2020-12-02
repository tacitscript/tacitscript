
const {css} = Glamor;
const {useState} = React;

const style = css({

});

export default ({id, name, sections}) => {
	const [open, setOpen] = useState(false);

	return <div id={id} className={`panel${open ? " open" : ""}`} {...style}>
		<div className="heading" tabIndex={0} onClick={() => setOpen(!open)} onKeyDown={e => {if (e.key === "Enter") setOpen(!open);}}>
			<div className="name">{name}</div>
		</div>
		{open ? <div className="contents">
			<hr/>
			{sections.map(({name, type, examples}) => <React.Fragment>
				<h3>{name}</h3>
				<div className="code-block">
					{examples}
				</div>
			</React.Fragment>)}
		</div> : null}
	</div>;
};