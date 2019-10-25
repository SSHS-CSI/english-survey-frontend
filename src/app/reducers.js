const { combineReducers } = require('redux');
const { Map } = require('immutable');
const { UPDATE_RESPONSE, MOVETO_NEXTSTUDENT, MOVETO_PREVSTUDENT, LOGIN, LOGOUT } = require('./actions.js');

function response(state = null, action) {
    switch(action.type) {
        case UPDATE_RESPONSE:
            return [
                ...state.slice(0, action.index),
                Object.assign({}, state[action.index], {
                    response: action.response
                }),
                ...state.slice(action.index + 1)
            ]
        default:
            return state;
    }
}

function student(state = 0, action) {
    switch(action.type) {
        case MOVETO_NEXTSTUDENT:
            return state + 1;
        case MOVETO_PREVSTUDENT:
            return state - 1;
        default:
            return state;
    }
}

function account(state = null, action) {
    switch(action.type) {
        case LOGIN:
            return action.id;
        case LOGOUT:
            return null;
        default:
            return state;
    }
}

const surveyApp = combineReducers({
    response,
    student,
    account
});

export default surveyApp;