// - Action Constants
const FETCH_BEGIN = "FETCH_BEGIN";
const FETCH_STUDENT_COUNT_SUCCESS = "FETCH_STUDENT_COUNT_SUCCESS";
const FETCH_QUESTIONS_SUCCESS = "FETCH_QUESTIONS_SUCCESS";
const FETCH_RESPONSES_SUCCESS = "FETCH_RESPONSES_SUCCESS";
const FETCH_FAILURE = "FETCH_FAILURE";
const UPDATE_RESPONSE = "UPDATE_RESPONSE";
const MOVETO_NEXTSTUDENT = "MOVETO_NEXTSTUDENT";
const MOVETO_PREVSTUDENT = "MOVETO_PREVSTUDENT";
const SAVE_RESPONSE = "SAVE_RESPONSE";
const EDIT_RESPONSE = "EDIT_RESPONSE";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";

// - Action Creators
const fetchBegin = () => ({ type: FETCH_BEGIN });
const fetchStudentCountSuccess = count => ({
    type: FETCH_STUDENT_COUNT_SUCCESS,
    payload: count
});
const fetchQuestionsSuccess = questions => ({
    type: FETCH_QUESTIONS_SUCCESS,
    payload: questions
});
const fetchResponsesSuccess = responses => ({
    type: FETCH_RESPONSES_SUCCESS,
    payload: responses
});
const fetchFailure = error => ({
    type: FETCH_FAILURE,
    payload: error
});
const updateResponse = (response, student) => ({
    type: UPDATE_RESPONSE,
    payload: { response, student }
});
const movetoNextStudent = () => ({ type: MOVETO_NEXTSTUDENT });
const movetoPrevStudent = () => ({ type: MOVETO_PREVSTUDENT });
const saveResponse = () => ({ type: SAVE_RESPONSE });
const editResponse = () => ({ type: EDIT_RESPONSE });
const loginSuccess = () => ({ type: LOGIN_SUCCESS });

module.exports = {
    FETCH_BEGIN,
    FETCH_STUDENT_COUNT_SUCCESS,
    FETCH_QUESTIONS_SUCCESS,
    FETCH_RESPONSES_SUCCESS,
    FETCH_FAILURE,
    UPDATE_RESPONSE,
    MOVETO_NEXTSTUDENT,
    MOVETO_PREVSTUDENT,
    SAVE_RESPONSE,
    EDIT_RESPONSE,
    LOGIN_SUCCESS,
    fetchBegin,
    fetchStudentCountSuccess,
    fetchQuestionsSuccess,
    fetchResponsesSuccess,
    fetchFailure,
    updateResponse,
    movetoNextStudent,
    movetoPrevStudent,
    saveResponse,
    editResponse,
    loginSuccess
};
