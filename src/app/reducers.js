const { combineReducers } = require("redux");
const {
    FETCH_BEGIN,
    FETCH_STUDENT_COUNT_SUCCESS,
    FETCH_RESPONSES_SUCCESS,
    FETCH_QUESTIONS_SUCCESS,
    FETCH_FAILURE,
    UPDATE_RESPONSE,
    MOVETO_NEXTSTUDENT,
    MOVETO_PREVSTUDENT
} = require("./actions.js");
const { default: produce } = require("immer");

// - Reducers
const fetch = (
    state = {
        questions: [],
        loadingStudentCount: false,
        loadingQuestions: false,
        loadingResponses: false,
        error: null,
        count: null,
        responses: null
    },
    { type, payload }
) => {
    switch (type) {
        case FETCH_BEGIN:
            return {
                ...state,
                loadingStudentCount: true,
                loadingQuestions: true,
                loadingResponses: true
            };
        case FETCH_STUDENT_COUNT_SUCCESS:
            return {
                ...state,
                loadingStudentCount: false,
                count: payload
            };
        case FETCH_QUESTIONS_SUCCESS:
            return {
                ...state,
                loadingQuestions: false,
                questions: payload
            };
        case FETCH_RESPONSES_SUCCESS:
            return {
                ...state,
                loadingResponses: false,
                responses: payload
            };
        case FETCH_FAILURE:
            return {
                ...state,
                loadingQuestions: false,
                loadingStudentCount: false,
                loadingResponses: false,
                error: payload
            };
        default:
            return state;
    }
};

const responses = (state = [], { type, payload }) => {
    switch (type) {
        case UPDATE_RESPONSE:
            return produce(state, state => {
                state[payload.student] = payload.response;
            });
        case FETCH_RESPONSES_SUCCESS:
            return payload;
        default:
            return state;
    }
};

const student = (state = 0, { type }) => {
    switch (type) {
        case MOVETO_NEXTSTUDENT:
            return state + 1;
        case MOVETO_PREVSTUDENT:
            return state - 1;
        default:
            return state;
    }
};

// - Root Reducer
const rootReducer = combineReducers({
    fetch,
    responses,
    student
});

module.exports = rootReducer;
