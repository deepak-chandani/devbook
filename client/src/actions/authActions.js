import API from '../utils/API';
import { SET_AUTHED_USER, LOGOUT_USER, USER_REGISTERED_SUCCESSFULLY } from './types';
import { setErrors } from './errorActions';
import jwt_decode from 'jwt-decode';
import {toastr} from 'react-redux-toastr';


export const loginUser = (userData) => {
    return (dispatch) => {
        API.post('/api/users/login', userData)
        .then((res) => {            
            dispatch(setErrors({}));
            const {token} = res.data;
            localStorage.setItem("jwtToken", token);
            //setAuthToken();
            const decodedUserData = jwt_decode(token);

            // dispatch action to set_authed_user            
            dispatch(setAuthedUser(decodedUserData));

        }).catch((err) => {
            console.log(err.response.data);
            // dispatch action to set_errors
            dispatch(setErrors(err.response.data));
        });
    }
};

export const setAuthedUser = (user) => {
    return {
        type: SET_AUTHED_USER,
        payload: user,
    }
}

export const registerUser = (userData, history) => {
    return (dispatch) => {
        API.post('api/users/register', userData)
        .then((res) => {
            // reset error state
            dispatch(setErrors({}));
            console.log(res.data);
            dispatch(userRegisteredSuccessfully(res.data));
            toastr.success('Congrats', 'You are registered successfully! Go ahead, login, create your profile & connect with developers');
            // redirect user to login page
            history.push('/login');
        }).catch((err) => {
            // dispatch set_errors action
            dispatch(setErrors(err.response.data));
        });
    }
};

export const userRegisteredSuccessfully = (user) => {
    return {
        type: USER_REGISTERED_SUCCESSFULLY,
        payload: user,
    }
}


export const logoutUser = () => {
    return {
        type: LOGOUT_USER
    }
};