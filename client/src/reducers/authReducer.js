import { SET_AUTHED_USER, LOGOUT_USER } from "../actions/types";


const initialState = {
    isAuthenticated: false,
    user: null
};

const authReducer = (state=initialState, action) => {
    switch(action.type){
        case SET_AUTHED_USER:
            return {
                isAuthenticated: action.payload.id ? true : false,
                user: action.payload
            };
        case LOGOUT_USER:
            localStorage.removeItem('jwtToken');
            return {
                isAuthenticated: false,
                user: null
            };
        default:
            return state;
    }

}
export default authReducer;