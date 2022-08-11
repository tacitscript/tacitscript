const {css} = Glamor;

const style = css({
	display: "table",
	whiteSpace: "nowrap",
	"> .row": {
		display: "table-row",
		"> .cell": {
			display: "table-cell",
			":first-child": {
				width: "8.5rem",
			},
			":nth-child(3)": {
				width: "50%",
			},
		},
	},
});

export default details => {
	return <div className="table" {...style}>
		{details.map((fields, index) => <div key={index} className="row">
			{fields.map((property, index) => <div key={index} className="cell">{property}</div>)}
		</div>, details)}
	</div>;
};