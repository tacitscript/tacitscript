const {css} = Glamor;

const style = css({
	width: "100%",
	"> tbody > tr": {
		"> td:first-child": {
			paddingRight: "1rem",
			verticalAlign: "top",
		},
		"> td:nth-child(2)": {
			width: "100%",
		},
	},
});

export default ({children}) => {
	return <table {...style}>
		<tbody>
			{children.map((row, i) => <tr key={i}>{
				row.map((cell, j) => <td key={j}>{cell}</td>)
			}</tr>)}
		</tbody>
	</table>;
}