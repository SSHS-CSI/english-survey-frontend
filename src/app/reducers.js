const { combineReducers } = require("redux");
const { Map } = require("immutable");
const {
    FETCH_QUESTIONS_BEGIN,
    FETCH_QUESTIONS_SUCCESS,
    FETCH_QUESTIONS_FAILURE,
    UPDATE_RESPONSE,
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
        case UPDATE_RESPONSE:
            const questions = state.questions;
            return {
                ...state,
                questions: [
                    ...questions.slice(0, action.index),
                    {
                        ...questions[action.index],
                        response: action.response
                    },
                    ...questions.slice(action.index + 1)
                ]
            };
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
    student,
    account
});

module.exports = surveyApp;
