import {locationChange} from "./actions.js";

export default (history, store) => {
	store.dispatch(locationChange({
		pathname: history.location.pathname,
		search: history.location.search,
		hash: history.location.hash
	}));

	history.listen(({pathname, search, hash}) => store.dispatch(locationChange({pathname, search, hash})));
};