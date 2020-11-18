
export default R.pipe(
    R.map(R.join("")),
    R.join("\n"),
);