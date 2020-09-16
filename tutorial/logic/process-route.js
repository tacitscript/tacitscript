const handlers = [];

const processPath = ({store, route, handler}) => {
	const {type, getUrl, errorMessage, onSuccess, immediateResponse} = handler;
	const url = getUrl(store);

	if (url) {
		const request = SabreWeb.DataManager.ajax({
			dataType: "json",
			url,
			success: onSuccess ? onSuccess({store, parameters}) : response => {
				store.dispatch({
					type,
					payload: S.Right(response)
				});
			},
			error: ({statusText}) => {
				if (statusText !== "abort") {
					store.dispatch({
						type,
						payload: S.Left(errorMessage)
					});
				}
			}
		});

		if (immediateResponse) immediateResponse({store, parameters, request});

		return true;
	}

	return false;
};

export default (store, route) => {
	handlers.forEach(handler => processPath({store, route, handler}));

	return route.nextRoute;
};
