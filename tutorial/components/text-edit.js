const {InputBase} = MaterialUI;
const {css} = Glamor;
const {useDispatch} = ReactRedux;


const style = css({
	width: "100%",
	marginRight: "4rem",
	"> .MuiInputBase-multiline": {
		width: "100%",
		padding: "0 !important",
		borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
		color: "#271c19",
	},
	" .MuiInputBase-input": {
		fontFamily: "Roboto Mono, monospace",
		fontSize: "0.8rem",
	},
});

const update = _.debounce(({dispatch, path, value}) => dispatch({
	type: "ANSWER",
	payload: {
		path,
		value,
	},
}), 300);

export default ({path}) => {
	const dispatch = useDispatch();

	return <span {...style}><InputBase inputProps={{spellCheck: false}} multiline onChange={(event) => update({dispatch, path, value: event.target.value})}/></span>;
};