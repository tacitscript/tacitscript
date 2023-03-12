import shuffle from "./shuffle.js";

export default () => {
	const letters = shuffle("abcde".split(""));

	return letters.map(char => R.repeat(char, Math.floor(Math.random() * 5) + 1).join("")).join("");
};