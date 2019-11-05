require("typeface-roboto");

const React = require("react");
const ReactDOM = require("react-dom");
const { Provider } = require("react-redux");
const { createStore } = require("redux");

const surveyApp = require("./app/reducers.js");
const App = require("./app/app");

const data = [
    {
        type: "objective",
        content: "hmmmm...?",
        selectCount: 5,
        response: 1
    },
    {
        type: "objective",
        content: "hmmmm...?",
        selectCount: 4,
        response: 1
    },
    {
        type: "objective",
        content: "hmmmm...?",
        selectCount: 6,
        response: 1
    },
    {
        type: "descriptive",
        content: "How do you do?",
        response: ""
    }
];

let store = createStore(surveyApp, { response: data });

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
