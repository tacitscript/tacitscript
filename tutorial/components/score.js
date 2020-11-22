import lessons from "../lessons/lessons.js";

export default React.memo(({solutions}) => {
	const score = (() => {
		if (R.isEmpty(solutions)) return "";

		const passed = R.pipe(
			R.values,
			R.filter(R.prop("pass")),
			R.length,
		)(solutions);

		return `${passed} / ${lessons.length}`;
	})();

	return <div className="score">{score}</div>
}, (prev, curr) => {
	return R.pipe(
		R.map(R.mapObjIndexed(R.prop("pass"))),
		([a, b]) => sanctuary.equals(a)(b),
	)([prev.solutions, curr.solutions]);
});