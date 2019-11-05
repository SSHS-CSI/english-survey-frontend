const { combineReducers } = require("redux");
const { Map } = require("immutable");
const {
    UPDATE_RESPONSE,
    MOVETO_NEXTSTUDENT,
    MOVETO_PREVSTUDENT,
    LOGIN,
    LOGOUT
} = require("./actions.js");

// - Reducers
const response = (state = null, action) => {
    switch (action.type) {
        case UPDATE_RESPONSE:
            return [
                ...state.slice(0, action.index),
                {
                    ...state[action.index],
                    response: action.response
                },
                ...state.slice(action.index + 1)
            ];
        default:
            return state;
    }
};

const student = (state = 0, action) => {
    switch (action.type) {
        case MOVETO_NEXTSTUDENT:
            return state + 1;
        case MOVETO_PREVSTUDENT:
            return state - 1;
        default:
            return state;
    }
};

const account = (state = null, action) => {
    switch (action.type) {
        case LOGIN:
            return action.id;
        case LOGOUT:
            return null;
        default:
            return state;
    }
};

// - Root Reducer
const surveyApp = combineReducers({
    response,
    student,
    account
});

module.exports = surveyApp;
