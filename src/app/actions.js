/* 
***** 액션 타입
*/

export const UPDATE_RESPONSE = 'UPDATE_RESPONSE';
export const MOVETO_NEXTSTUDENT = 'MOVE_NEXTSTUDENT';
export const MOVETO_PREVSTUDENT = 'MOVE_PREVSTUDENT';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

/* 
***** 액션 생산자
*/

export function updateResponse(response, index) {
    return {
        type: UPDATE_RESPONSE,
        response: response,
        index: index
    }
}

export function movetoNextStudent() {
    return { type: MOVETO_NEXTSTUDENT }
}

export function movetoPrevStudent() {
    return { type: MOVETO_PREVSTUDENT }
}

export function login(id) {
    return { type: LOGIN, id: id }
}

export function logout() {
    return { type: LOGOUT }
}