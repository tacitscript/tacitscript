const {css} = Glamor;

const style = css({
	display: "table",
	"> .row": {
		display: "table-row",
		"> .cell": {
			display: "table-cell",
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