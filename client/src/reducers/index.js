import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import flashReducer from "./flashReducer";
import postsReducer from "./postsReducer";
import {reducer as toastrReducer} from 'react-redux-toastr'

const rootReducer = combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer,
    flash: flashReducer,
    post: postsReducer,
    toastr: toastrReducer
})

export default rootReducer;