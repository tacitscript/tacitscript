import lessons from "../lessons/lessons.js";

const {useSelector} = ReactRedux;
const {createSelector, createSelectorCreator, defaultMemoize} = Reselect;

const createObjectComparisonSelector = createSelectorCreator(defaultMemoize, (prev, curr) => sanctuary.equals(prev)(curr));
const selector = createSelector(
	R.path(["solutions"]),
	R.pipe(
		R.toPairs,
		R.sortBy(R.first),
		R.map(([key, {pass}]) => [key, pass]),
		JSON.stringify,	
	),
);

export default () => {
	const solutions = useSelector(selector, (prev, curr) => {
		console.log({prev, curr});
	});
	const score = (() => {
		if (R.isEmpty(solutions)) return "";

		const passed = R.pipe(
			R.values,
			R.filter(R.identity),
			R.length,
		)(solutions);

		return `${passed} / ${lessons.length}`;
	})();

	return <div className="score">{score}</div>
};