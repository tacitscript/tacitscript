import lessons from "../lessons/lessons.js";

const {useSelector} = ReactRedux;

export default () => {
	const solutions = useSelector(R.path(["solutions"]), (previous, current) => R.pipe(
		R.mapObjIndexed(R.prop("pass")),
		([prev, curr]) => sanctuary.equals(prev)(curr),
	)([previous, current]));
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
};