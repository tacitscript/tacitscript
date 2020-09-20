import React from "react";
import ReactDOM from "react-dom";
import reducer from "./reducer.js";
import App from "../components/app.js";
import createDebounce from "common/lib/redux-debounced.js";
import asyncDispatchMiddleware from "common/lib/redux-async.js";
import {createBrowserHistory} from "history";
import routerReducer from "common/lib/redux-first/reducer.js";
import routerMiddleware from "common/lib/redux-first/middleware.js";
import routerListener from "common/lib/redux-first/listener.js";
import processRoute from "./process-route.js";
import "./tutorial.js";


const {applyMiddleware, createStore, combineReducers} = Redux;
const {css} = Glamor;

const history = createBrowserHistory();
const historyMiddleware = routerMiddleware(history);

const rootReducer = combineReducers({
	url: (a, b, ...args) => routerReducer(a, b, details => processRoute(store, details), ...args),
	app: reducer
});

const store = createStore(
	rootReducer,
	applyMiddleware(historyMiddleware),
	applyMiddleware(asyncDispatchMiddleware),
	applyMiddleware(createDebounce())
);

routerListener(history, store);

const render = () => {
	ReactDOM.render(<App key="app" store={store}/>, document.getElementById("app"));
};

store.subscribe(render);
render();
