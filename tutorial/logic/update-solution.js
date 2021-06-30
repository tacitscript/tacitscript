
export default ({state, action}) => {
	const {id, status, value, revealed} = action.payload;

	const newState = R.over(R.lensPath(["solutions"]), existingSolutions => {
		if (status) {
			if (status === "empty") return R.omit([id], existingSolutions);

			return R.set(R.lensPath([id, "pass"]), status === "pass", existingSolutions);	
		} else {
			return R.pipe(
				R.set(R.lensPath([id, "def"]), value),
				solutions => revealed ? R.set(R.lensPath([id, "revealed"]), true, solutions) : solutions,
			)(existingSolutions);
		}
	}, state);

	localStorage.setItem("tacitscript-tutorial", JSON.stringify(newState.solutions));

	return newState;
};