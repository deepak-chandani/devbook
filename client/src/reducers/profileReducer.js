import { SET_CURRENT_PROFILE, PROFILE_LOADING, LOGOUT_USER, SET_PROFILES } from "../actions/types";

const initialState = {
    profile: null,
    profiles: [],
    loading: false
};

const profileReducer = (state=initialState, action) => {
    switch(action.type){
        case SET_CURRENT_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false,
            }; 
        case SET_PROFILES:
            return {
                ...state,
                profiles: action.payload,
                loading: false,
            }; 
        case PROFILE_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case LOGOUT_USER:
            return {
                ...state,
                profile: null,
            }
        default:
            return state;
    }

}
export default profileReducer;