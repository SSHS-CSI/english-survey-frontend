require("typeface-roboto");
require("@babel/polyfill");

const React = require("react");
const ReactDOM = require("react-dom");
const { Provider } = require("react-redux");
const { createStore, applyMiddleware } = require("redux");
const { default: thunk } = require("redux-thunk");

const surveyApp = require("./app/reducers.js");
const App = require("./app/app");

let store = createStore(surveyApp, {}, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
