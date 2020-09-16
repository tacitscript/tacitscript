const initialState = {
	pathname: "/",
	search: "",
	hash: ""
};

export default (state = initialState, action = {}, processRoute = undefined) => {
	switch(action.type) {
		case "ROUTER/LOCATION_CHANGE": return processRoute ? processRoute({currentRoute: state, nextRoute: action.payload}) : action.payload;
		default: return state;
	}
};