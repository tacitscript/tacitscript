
export default (value, places) => {
	const multiple = Math.pow(10, places);

	return Math.round(value * multiple) / multiple;
};