const {css} = Glamor;

export default {
	equationStyle: css({
		display: "flex",
		justifyContent: "center",
		"> img": {
			backgroundColor: "white",
			border: "5px solid white",
			borderRadius: "5px",
		},
	}),
};