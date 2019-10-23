require('typeface-roboto');

const React = require('react');
const ReactDOM = require('react-dom');
const { Provider } = require('react-redux');
const { createStore } = require('redux');

const surveyApp = require('./app/reducers');
const App = require('./app/app');

//let store = createStore(surveyApp);

ReactDOM.render(
        <App />
   , document.getElementById('root'));
