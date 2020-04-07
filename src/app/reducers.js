const { combineReducers } = require("redux");
const {
    FETCH_BEGIN,
    FETCH_STUDENT_COUNT_SUCCESS,
    FETCH_RESPONSES_SUCCESS,
    FETCH_QUESTIONS_SUCCESS,
    FETCH_FAILURE,
    UPDATE_RESPONSE,
    MOVETO_NEXTSTUDENT,
    MOVETO_PREVSTUDENT,
    SAVE_RESPONSE,
    EDIT_RESPONSE,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS
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
                responses: payload.data
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
            return payload.data;
        default:
            return state;
    }
};

const student = (state = 0, { type, payload }) => {
    switch (type) {
        case FETCH_RESPONSES_SUCCESS:
            return payload.pageNum;
        case MOVETO_NEXTSTUDENT:
            return state + 1;
        case MOVETO_PREVSTUDENT:
            return state - 1;
        default:
            return state;
    }
};

const shouldSaveResponse = (state = false, { type }) => {
    switch (type) {
        case SAVE_RESPONSE:
            return false;
        case EDIT_RESPONSE:
            return true;
        case FETCH_RESPONSES_SUCCESS:
            return false;
        default:
            return state;
    }
};

const isAuthorized = (state = false, { type }) => {
    switch (type) {
    case FETCH_RESPONSES_SUCCESS:
        return true;
    case LOGIN_SUCCESS:
        return true;
    case LOGOUT_SUCCESS:
        return false;
    default:
        return state;
    }
};

// - Root Reducer
const rootReducer = combineReducers({
    fetch,
    responses,
    student,
    shouldSaveResponse,
    isAuthorized
});

module.exports = rootReducer;
