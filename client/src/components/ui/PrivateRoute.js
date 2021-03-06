import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Redirect from 'react-router-dom/Redirect';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';

//import {setFlashMessage} from '../../actions/flashActions';


const PrivateRoute = ({component: Component, auth, ...rest}) => {
    //console.log("inside private route", auth);
    return (
        <Route {...rest} render={ (props) => {
                return  auth.isAuthenticated === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{
                        pathname: '/login',
                        state: {redirectMessage: `Please login to access ${rest.path} route.`},
                    }} />
                )
            }
        }
        />
    );
};

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(PrivateRoute);