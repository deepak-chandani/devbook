import {ADD_POST, SET_POSTS, POSTS_LOADING, DELETE_POST, SET_POST_DETAIL} from '../actions/types';

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
		case SET_POST_DETAIL: 

			const posts = state.posts.map((item) => {
				if(item._id != action.payload._id){
					return item;
				}else{
					return action.payload;
				}
			});

			return {
				...state,
				posts: posts,
				post: action.payload,
				loading: false
			};
		default:
			return state;		
	}
}