import pack from "./pack.js";

export default R.pipe(
	pack,
	R.map(string => [string.length, string[0]]),
);