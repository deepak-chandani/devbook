import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import flashReducer from "./flashReducer";
import postsReducer from "./postsReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer,
    flash: flashReducer,
    posts: postsReducer,
})

export default rootReducer;