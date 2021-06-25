const {css} = Glamor;

const style = css({
	display: "table",
	whiteSpace: "nowrap",
	"> .row": {
		display: "table-row",
		"> .cell": {
			display: "table-cell",
			":first-child": {
				width: "11.5rem",
			},
			":nth-child(3)": {
				width: "calc(100% - 29.5rem)",
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