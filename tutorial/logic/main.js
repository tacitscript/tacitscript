import reducer from "./reducer.js";
import App from "../components/app.js";
import createDebounce from "common/lib/redux-debounced.js";
import asyncDispatchMiddleware from "common/lib/redux-async.js";

const {applyMiddleware, createStore} = Redux;

const store = createStore(
	reducer,
	applyMiddleware(asyncDispatchMiddleware),
	applyMiddleware(createDebounce())
);

const render = () => {
	ReactDOM.render(<App key="app" store={store}/>, document.getElementById("app"));
};

store.subscribe(render);
render();
