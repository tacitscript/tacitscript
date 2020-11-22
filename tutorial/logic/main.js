import reducer from "./reducer.js";
import App from "../components/app.js";
import createDebounce from "common/lib/redux-debounced.js";
import asyncDispatchMiddleware from "common/lib/redux-async.js";
import "./tutorial.js";


const {applyMiddleware, createStore} = Redux;
const {Provider} = ReactRedux;

const store = createStore(
	reducer,
	applyMiddleware(asyncDispatchMiddleware),
	applyMiddleware(createDebounce())
);

const render = () => {
	ReactDOM.render(<Provider store={store}><App key="app"/></Provider>, document.getElementById("app"));
};

store.subscribe(render);
render();
