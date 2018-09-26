import {ADD_POST, SET_POSTS} from '../actions/types';

export default (state = [], action) =>  {

	switch(action.type){
		case SET_POSTS: 
			return action.payload;
		case ADD_POST: 
			return state.concat(action.payload);
		default:
			return state;		
	}
}