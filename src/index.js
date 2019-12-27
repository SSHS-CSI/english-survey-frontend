require("typeface-roboto");
require("regenerator-runtime/runtime");

const React = require("react");
const ReactDOM = require("react-dom");
const { Provider } = require("react-redux");
const { BrowserRouter: Router } = require("react-router-dom");
const { createStore, applyMiddleware } = require("redux");
const thunk = require("redux-thunk").default;

const rootReducer = require("./app/reducers.js");
const App = require("./app");

let store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById("root")
);
