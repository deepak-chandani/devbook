import {ADD_POST, SET_POSTS, POSTS_LOADING, DELETE_POST, SET_POST_DETAIL} from './types';
import { setFlashMessage } from './flashActions';
import { setErrors } from './errorActions';
import API from '../utils/API';
import {toastr} from 'react-redux-toastr';


const setPosts = (posts) => ({
    type: SET_POSTS,
    payload: posts
});

export const fetchPosts = () => (dispatch) => {
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

export const fetchPostDetail = (postId) => (dispatch) => {
    dispatch(setPostsLoading());

    API.get('/api/posts/'+postId)
    .then((res) => {
        dispatch(setPostDetail(res.data));
    })
    .catch((err) => {
        console.log(err.response.data);
        dispatch(setPostDetail(null));
    });
}

const setPostDetail = (post) => ({
    type: SET_POST_DETAIL,
    payload: post
});

const addPost = (post) => ({
    type: ADD_POST,
    payload: post
});

export const submitPost = (post) => (dispatch) => {
    return API.post('/api/posts', post)
    .then((res) => {
        console.log(res.data);
        toastr.success('Success', 'Post successfully saved');
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


export const submitComment = (comment) => (dispatch) => {
    return API.post('/api/posts/comment/'+comment.postId, comment)
    .then((res) => {
        dispatch(setPostDetail(res.data));
        dispatch(setErrors({}));
        toastr.success('Success', 'Thanks for sharing your views.');
    })
    .catch((err) => {
        console.log(err);
        dispatch(setErrors(err.response.data));
    });
}

export const likePost = (postId) => (dispatch) => {
    API.post('/api/posts/like/'+postId)
    .then((res) => {
        dispatch(setPostDetail(res.data));
    }).catch((err) => {
        const data = err.response.data;
        if(data.alreadyliked){
            toastr.info('Already Like', data.alreadyliked);
        }
    });
}

export const unLikePost = (postId) => (dispatch) => {
    API.post('/api/posts/unlike/'+postId)
    .then((res) => {
        dispatch(setPostDetail(res.data));
    }).catch((err) => {
        const data = err.response.data;
        if(data.notliked){
            //toastr.info('', data.notliked);
        }
    });
}