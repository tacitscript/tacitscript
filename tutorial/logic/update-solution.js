
export default ({state, action}) => {
	const {id, status, value} = action.payload;

	const newState = R.over(R.lensPath(["solutions"]), existingSolutions => {
		if (status) {
			if (status === "empty") return R.omit([id], existingSolutions);

			return R.set(R.lensPath([id, "pass"]), status === "pass", existingSolutions);	
		} else {
			return R.set(R.lensPath([id, "def"]), value, existingSolutions);
		}
	}, state);

	localStorage.setItem("tacitscript-tutorial", JSON.stringify(newState.solutions));

	return newState;
};