import { SET_FLASH_MESSAGE } from "../actions/types";

const initialState = {
    type: null,
    message: null,
};

const flashReducer = (state=initialState, action) => {
    switch(action.type){
        case SET_FLASH_MESSAGE:
            return action.payload;
        default:
            return state;
    }

}
export default flashReducer;