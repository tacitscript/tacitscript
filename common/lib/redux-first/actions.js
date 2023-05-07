export const push = href => ({
	type: "ROUTER/PUSH",
	payload: href
});

export const replace = href => ({
	type: "ROUTER/REPLACE",
	payload: href
});

export const go = index => ({
	type: "ROUTER/GO",
	payload: index
});

export const goBack = () => ({
	type: "ROUTER/GO_BACK"
});

export const goForward = () => ({
	type: "ROUTER/GO_FORWARD"
});

export const locationChange = ({pathname, search, hash}) => ({
	type: "ROUTER/LOCATION_CHANGE",
	payload: {
		pathname,
		search,
		hash
	}
});