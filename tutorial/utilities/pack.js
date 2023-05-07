export default string => string.split("").reduce((acc, char) => {
	if (R.isEmpty(acc)) return [char];

	if (acc[acc.length - 1][0] === char) return [...acc.slice(0, -1), [...acc[acc.length - 1], acc[acc.length - 1][0]].join("")];

	return [...acc, char];
}, []);