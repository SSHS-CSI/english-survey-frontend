// - Action Constants
const UPDATE_RESPONSE = "UPDATE_RESPONSE";
const MOVETO_NEXTSTUDENT = "MOVE_NEXTSTUDENT";
const MOVETO_PREVSTUDENT = "MOVE_PREVSTUDENT";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

// - Action Creators
const updateResponse = (response, index) => ({
    type: UPDATE_RESPONSE,
    response,
    index
});
const movetoNextStudent = () => ({ type: MOVETO_NEXTSTUDENT });
const movetoPrevStudent = () => ({ type: MOVETO_PREVSTUDENT });
const login = (id) => ({ type: LOGIN, id: id });
const logout = () => ({ type: LOGOUT });

module.exports = {
    UPDATE_RESPONSE,
    MOVETO_NEXTSTUDENT,
    MOVETO_PREVSTUDENT,
    LOGIN,
    LOGOUT,
    updateResponse,
    movetoNextStudent,
    movetoPrevStudent,
    login,
    logout
}