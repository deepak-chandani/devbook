import { SET_ERRORS } from "./types";
import {toastr} from 'react-redux-toastr';

export const setErrors = (errors) => {
    return {
        type: SET_ERRORS,
        payload: errors
    }
};