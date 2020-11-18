const {css} = Glamor;
const {useState} = React;

const style = css({
	width: "85%",
	margin: "0 auto 1rem",
	backgroundColor: "var(--brown)",
	padding: "0.5rem 1.2rem",
	borderRadius: "0.25rem",
	position: "relative",
	"> button.heading": {
		margin: "0.5rem 0",
		fontSize: "1.2rem",
		" .operator": {
			fontSize: "1.3rem",
			fontFamily: "Roboto Mono, monospace",
		},
	},
	"> h3": {marginTop: "2.5rem", fontSize: "1.25rem"},
	"> hr": {marginBottom: "1.5rem"},
	"> ul": {paddingInlineStart: "2rem"},
	".contents": {
		backgroundColor: "var(--background)",
		"> hr": {
			borderColor: "var(--yellow)",
			marginBottom: "1rem",
		},
		"> h4": {
			margin: "1rem 0",
			fontSize: "1rem",
		},
		" a": {
			color: "var(--text-color)",
			":hover,:focus": {
				color: "var(--yellow)",
			},
		},
		"> .listings": {
			display: "flex",
			flexWrap: "wrap",
			marginBottom: "1.5rem",
			"> a": {
				lineHeight: "1.3rem",
				backgroundColor: "#1a110e",
				border: "3px solid var(--background)",
				borderRadius: "6px",
				":hover,:focus": {
					color: "var(--text-color)",
					backgroundColor: "var(--brown)"
				},
				".lesson": {
					width: "14.35rem",
					padding: "2px 5px",
				},
				".operator": {
					width: "15rem",
					fontSize: "1.1rem",
					fontFamily: "Roboto Mono, monospace",
					display: "flex",
					flex: "0 1 auto",
					lineHeight: "1.5rem",
					"> .symbol": {
						display: "flex",
						flex: "1 1 auto",
						justifyContent: "center",
					},
					"> .type": {
						display: "flex",
						justifyContent: "center",
						width: "1.5rem",
						backgroundColor: "var(--brown)",
						flex: "0 0 auto",
						color: "var(--background)",
						fontWeight: "bold",
						borderBottomRightRadius: 3,
						borderTopRightRadius: 3,
						borderLeft: "1px solid #1a110e",
					}
				},
			},
		},
	},
});

export default ({id, name, description}) => {
	const [open, setOpen] = useState(false);

	return <div className="lesson" {...style}>
		<div className="heading" onClick={() => setOpen(!open)}>{name}</div>
		{open ? <div className="contents">
			<hr/>
			{description}			
		</div> : null}
	</div>;
}