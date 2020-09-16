
export default history => () => next => action => {
	switch(action.type) {
		case "ROUTER/PUSH":
			history.push(action.payload);
			break;

		case "ROUTER/REPLACE":
			history.replace(action.payload);
			break;

		case "ROUTER/GO":
			history.go(action.payload);
			break;

		case "ROUTER/GO_BACK":
			history.goBack();
			break;

		case "ROUTER/GO_FORWARD":
			history.goForward();
			break;

		default:
			return next(action);
	}
};