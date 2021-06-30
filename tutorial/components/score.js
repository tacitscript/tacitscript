import lessons from "../lessons/lessons.js";

export default ({solutions}) => {
	const score = (() => {
		if (R.isEmpty(solutions)) return "";

		const unrevealedLessons = R.reject(({id}) => R.path([id, "revealed"], solutions), lessons);
		const passed = R.filter(({id}) => R.path([id, "pass"], solutions), unrevealedLessons);

		return `${passed.length} / ${unrevealedLessons.length}`;
	})();

	return <div className="score">{score}</div>
};