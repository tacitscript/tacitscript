const {InputBase} = MaterialUI;
const {css} = Glamor;
const {useDispatch} = ReactRedux;


const style = css({
	width: "100%",
	"> .MuiInputBase-root": {
		width: "100%",
		borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
		".MuiInputBase-multiline": {
			padding: 0,
		},
	},
	" .MuiInputBase-input": {
		":not(.MuiInputBase-inputMultiline)": {padding: "0 0 2px"},
		fontFamily: "Roboto Mono, monospace",
		fontSize: "0.8rem",
		color: "black",
	},
});

const update = _.debounce(({dispatch, path, value}) => dispatch({
	type: "ANSWER",
	payload: {
		path: ["definitions", ...path],
		value,
	},
}), 300);

export default ({path, multiline}) => {
	const dispatch = useDispatch();

	return <span {...style}><InputBase inputProps={{spellCheck: false}} multiline={multiline} onChange={(event) => update({dispatch, path, value: event.target.value})}/></span>;
};