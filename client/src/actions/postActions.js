import {ADD_POST, SET_POSTS, POSTS_LOADING, DELETE_POST} from './types';
import { setFlashMessage } from './flashActions';
import { setErrors } from './errorActions';
import API from '../utils/API';


const setPosts = (posts) => ({
    type: SET_POSTS,
    payload: posts
});

export const fetchPost = () => (dispatch) => {
    dispatch(setPostsLoading());

    API.get('/api/posts')
    .then((res) => {
        dispatch(setPosts(res.data));
    })
    .catch((err) => {
        console.log(err.response.data);
        dispatch(setPosts([]));
    });
}

const setPostsLoading = () => {
    return {
        type: POSTS_LOADING
    }
}

const addPost = (post) => ({
    type: ADD_POST,
    payload: post
});

export const submitPost = (post) => (dispatch) => {
    return API.post('/api/posts', post)
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

export const deletePostAsync = (postId) => (dispatch) => {
    API.delete('/api/posts/'+postId)
    .then((res) => {
        dispatch(deletePost(postId));
    }).catch((err) => {
        console.log(err.response.data);
    });    
}

const deletePost = (postId) => {
    return {
        type: DELETE_POST,
        payload: postId,
    }
}
