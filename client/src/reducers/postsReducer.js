import {ADD_POST, SET_POSTS, POSTS_LOADING, DELETE_POST} from '../actions/types';

const defaultState = {
	posts: [],
	post: null,
	loading: false,
};

export default (state = defaultState, action) =>  {

	switch(action.type){
		case POSTS_LOADING: 
			return {
				...state,
				loading: true,
			};
		case SET_POSTS: 
			return {
				...state,
				posts: action.payload,
				loading: false
			};
		case ADD_POST: 
			return {
				...state,
				posts: state.posts.concat(action.payload)
			};
		case DELETE_POST: 
			return {
				...state,
				posts: state.posts.filter((item) => item._id!= action.payload)
			};
		default:
			return state;		
	}
}