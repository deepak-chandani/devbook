import {ADD_POST, SET_POSTS} from './types';
import { setFlashMessage } from './flashActions';
import { setErrors } from './errorActions';
import API from '../utils/API';


const setPosts = (posts) => ({
    type: SET_POSTS,
    payload: posts
});

export const fetchPost = () => (dispatch) => {
    API.get('/api/posts')
    .then((res) => {
        dispatch(setPosts(res.data));
    })
    .catch((err) => {
        console.log(err.response.data);
    });
}

const addPost = (post) => ({
    type: ADD_POST,
    payload: post
});

export const submitPost = (post) => (dispatch) => {
    API.post('/api/posts', post)
    .then((res) => {
        console.log(res.data);
        dispatch(setFlashMessage({
            type: 'success',
            message: 'Post successfully saved',
        }));

        dispatch(addPost(res.data));
    })
    .catch((err) => {
        console.log(err.response.data);
        dispatch(setErrors(err.response.data));
    })
}
