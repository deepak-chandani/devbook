import jwt_decode from 'jwt-decode';
import { setAuthedUser, logoutUser } from '../actions/authActions';

class UserHelper {
    static setCurrentUserFromLocalStorage(store) {
        const token = localStorage.getItem('jwtToken');
        if(!token){
            return;
        }        
        const decoded = jwt_decode(token);
        store.dispatch(setAuthedUser(decoded));

        // check for expired token
        const currentTime = Date.now() / 1000;
        if(decoded.exp < currentTime){
            localStorage.setItem('jwtToken', null);
            // dispatch logout user action
            store.dispatch(logoutUser());
            // Redirect to login
           window.location.href = '/login';
        }
    }
}

export default UserHelper;