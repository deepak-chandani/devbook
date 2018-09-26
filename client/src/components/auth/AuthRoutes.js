import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Redirect from 'react-router-dom/Redirect';
import PropTypes from 'prop-types';
import Dashboard from '../dashboard/Dashboard';
import EditProfile from '../dashboard/EditProfile';
import CreateProfile from '../dashboard/CreateProfile';
import PrivateRoute from '../ui/PrivateRoute';

class AuthRoutes extends React.Component {
    constructor(props) {
        super(props);

        this.routes = [
            {path : '/dashboard', component: Dashboard},
            {path : '/edit-profile', component: EditProfile},
            {path : '/create-profile', component: CreateProfile},
        ];
    }
 
    render() {
        console.log("inside Auth ::",this.props.auth);
        if(!this.props.auth.isAuthenticated) {
            //return(<Redirect to="/login" />);
        }

        console.log("registering AuthRoutes ::",this.props.auth);
        /* return this.routes.map((route) => (
            <Route key={route.path} exact path={route.path} component={route.component} />  
        ));  */
        return (
            <React.Fragment>
                <Route exact path='/dashboard' component={Dashboard}  />  
                <Route exact path='/edit-profile' component={EditProfile} />  
                <Route exact path='/create-profile' component={CreateProfile} />  
            </React.Fragment>
        ) 
        /* return this.routes.map((route) => (
                <PrivateRoute key={route.path} exact path={route.path} auth={this.props.auth} component={route.component} />  
            )); */
    }
}

AuthRoutes.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(AuthRoutes);