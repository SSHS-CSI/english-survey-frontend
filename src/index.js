require("typeface-roboto");
require("regenerator-runtime/runtime");

const React = require("react");
const ReactDOM = require("react-dom");
const { BrowserRouter: Router, Route } = require("react-router-dom");
const { Provider } = require("react-redux");
const { createStore, applyMiddleware } = require("redux");
const thunk = require("redux-thunk").default;

const rootReducer = require("./app/reducers.js");
const App = require("./app");
const Login = require("/login.js");

let store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route exact path="/" component={Login} />
            <Route exact path="/survey" component={App} />
        </Router>
    </Provider>,
    document.getElementById("root")
);
