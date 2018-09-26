import jwt_decode from 'jwt-decode';
import { setAuthedUser, logoutUser } from '../actions/authActions';

class UserHelper {
    static setCurrentUserFromLocalStorage(store) {
        const token = localStorage.getItem('jwtToken');
        if(!token){
            return;
        }
        console.log("UserHelper token found", token);
        const decoded = jwt_decode(token);
        store.dispatch(setAuthedUser(decoded));

        // check for expired token
        const currentTime = Date.now() / 1000;
        if(token.exp < currentTime){
            // dispatch logout user action
            store.dispatch(logoutUser());
        }
    }
}

export default UserHelper;