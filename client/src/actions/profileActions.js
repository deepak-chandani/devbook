import {SET_CURRENT_PROFILE, PROFILE_LOADING, SET_PROFILES} from './types';
import API from '../utils/API';
import {setErrors} from '../actions/errorActions';
import {logoutUser} from '../actions/authActions';
import {toastr} from 'react-redux-toastr';


export const fetchCurrentProfile = () => (dispatch) => {

    dispatch(setProfileLoading(true));
    API.get('/api/profile/')
    .then( (res) => {
        dispatch(setCurrentProfile(res.data));
    })
    .catch((err) => {
        if(err.response.data == 'Unauthorized'){
            dispatch(setCurrentProfile(null));
            dispatch(logoutUser());
            toastr.info('Token expired', "Please login again");
        }else{
            dispatch(setCurrentProfile({}));
            dispatch(setErrors(err.response.data));
        }
    });
}

const setCurrentProfile = (profileData) => {
    return {
        type: SET_CURRENT_PROFILE,
        payload: profileData,
    }
}

const setProfileLoading = (loading) => {
    return {
        type: PROFILE_LOADING,
        payload: loading,
    }
}

const addEducation = (data) => {
    return {
        type: 'ADD_EDUCATION',
        payload: data,
    }
}

export const updateProfile = (data, history) => (dispatch) => {
    API.post('/api/profile/', data)
    .then( (res) => {
        toastr.success('Great', 'Your profile is successfully updated');
        dispatch(fetchCurrentProfile());

        // redirect to /dashboard
        history.push('/dashboard');
    })
    .catch((err) => {
        dispatch(setErrors(err.response.data));
    });
}

export const updateEducation = (data) => (dispatch) => {
	API.post('/api/profile/education', data)
	.then((res) => {
        toastr.success('Great', 'Education details successfully updated'); 

        dispatch(setCurrentProfile(res.data));

	}).catch((err) => {
        dispatch(setErrors(err.response.data));
	});
}

export const addExperience = (data) => (dispatch) => {
    API.post('/api/profile/experience', data)
    .then((res) => {
        console.log(res.data);
        dispatch(setCurrentProfile(res.data));
        toastr.success('Great', 'Experience added successfully.'); 
    }).catch((err) => {
        console.log(err.response.data);
        dispatch(setErrors(err.response.data));
    });
}

export const deleteEducation = (edu_id) => (dispatch) => {
    API.delete('/api/profile/education/'+edu_id)
    .then((res) => {
        dispatch(setCurrentProfile(res.data));
    }).catch((err) => {

    });
}

export const deleteExperience = (exp_id) => (dispatch) => {
    API.delete('/api/profile/experience/'+exp_id)
    .then((res) => {
        dispatch(setCurrentProfile(res.data));
    }).catch((err) => {

    });
}

const setProfiles = (profiles) => {
    return {
        type: SET_PROFILES,
        payload: profiles
    }
}

export const getAllProfiles = () => (dispatch) => {
    
    dispatch(setProfileLoading(true));
    API.get('/api/profile/all')
    .then((res) => {
        console.log(res.data);
        dispatch(setProfiles(res.data));
    }).catch((err) => {

    });
}

export const deleteProfile = () => (dispatch) => {
    API.delete('/api/profile')
    .then((res) => {
        dispatch(setCurrentProfile(null));
        dispatch(logoutUser());
    }).catch((err) => {

    });
}

