// - Action Constants
const FETCH_QUESTIONS_BEGIN = "FETCH_QUESTIONS_BEGIN";
const FETCH_QUESTIONS_SUCCESS = "FETCH_QUESTIONS_SUCCESS";
const FETCH_QUESTIONS_FAILURE = "FETCH_QUESTIONS_FAILURE";
const UPDATE_RESPONSE = "UPDATE_RESPONSE";
const REPLACE_RESPONSE = "REPLACE_RESPONSE";
const MOVETO_NEXTSTUDENT = "MOVETO_NEXTSTUDENT";
const MOVETO_PREVSTUDENT = "MOVETO_PREVSTUDENT";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

// - Action Creators
const fetchQuestionsBegin = () => ({ type: FETCH_QUESTIONS_BEGIN });
const fetchQuestionsFailure = error => ({
    type: FETCH_QUESTIONS_FAILURE,
    error
});
const fetchQuestionsSuccess = questions => ({
    type: FETCH_QUESTIONS_SUCCESS,
    questions
});
const updateResponse = (response, index, location) => ({
    type: UPDATE_RESPONSE,
    response,
    index,
    location
});
const replaceResponse = response => ({
    type: REPLACE_RESPONSE,
    response
});
const movetoNextStudent = () => ({ type: MOVETO_NEXTSTUDENT });
const movetoPrevStudent = () => ({ type: MOVETO_PREVSTUDENT });
const login = id => ({ type: LOGIN, id: id });
const logout = () => ({ type: LOGOUT });

module.exports = {
    FETCH_QUESTIONS_BEGIN,
    FETCH_QUESTIONS_FAILURE,
    FETCH_QUESTIONS_SUCCESS,
    UPDATE_RESPONSE,
    REPLACE_RESPONSE,
    MOVETO_NEXTSTUDENT,
    MOVETO_PREVSTUDENT,
    LOGIN,
    LOGOUT,
    fetchQuestionsBegin,
    fetchQuestionsFailure,
    fetchQuestionsSuccess,
    updateResponse,
    replaceResponse,
    movetoNextStudent,
    movetoPrevStudent,
    login,
    logout
};
