const { combineReducers } = require('redux');
const { UPDATE_RESPONSE, MOVETO_NEXTSTUDENT, MOVETO_PREVSTUDENT, LOGIN, LOGOUT } = require('./actions');

function response(state, action) {
    switch(action.type) {
        case UPDATE_RESPONSE:
            return;
    }
}

function movetoStudent(state = 0, action) {
    switch(action.type) {
        case MOVETO_NEXTSTUDENT:
            return state + 1;
        case MOVETO_PREVSTUDENT:
            return state - 1;
        default:
            return state;
    }
}

function access(state = null, action) {
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
    movetoStudent,
    access
});

export default surveyApp;