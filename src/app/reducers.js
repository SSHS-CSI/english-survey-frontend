const { combineReducers } = require("redux");
const { Map } = require("immutable");
const {
    FETCH_QUESTIONS_BEGIN,
    FETCH_QUESTIONS_SUCCESS,
    FETCH_QUESTIONS_FAILURE,
    UPDATE_RESPONSE,
    REPLACE_RESPONSE,
    MOVETO_NEXTSTUDENT,
    MOVETO_PREVSTUDENT,
    LOGIN,
    LOGOUT
} = require("./actions.js");

// - Reducers
const fetch = (
    state = {
        questions: [],
        loading: false,
        error: null
    },
    action
) => {
    switch (action.type) {
        case FETCH_QUESTIONS_BEGIN:
            return {
                ...state,
                loading: true
            };
        case FETCH_QUESTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                questions: action.questions.map(question => ({
                    ...question,
                    response: question.type === "objective" ? 1 : ""
                }))
            };
        case FETCH_QUESTIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};

const response = (state = [], action) => {
    switch (action.type) {
        case UPDATE_RESPONSE:
            return [
                ...state.slice(0, action.index),
                {
                    ...state[action.index],
                    [action.location]: action.response
                },
                ...state.slice(action.index + 1)
            ];
        case REPLACE_RESPONSE:
            return action.response;
        case FETCH_QUESTIONS_SUCCESS:
            return action.questions
                .map(question => (question.type === "objective" ? 1 : ""))
                .map(defaultValue => ({
                    left: defaultValue,
                    right: defaultValue
                }));
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
    fetch,
    response,
    student,
    account
});

module.exports = surveyApp;
