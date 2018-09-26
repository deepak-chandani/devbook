import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Redirect from 'react-router-dom/Redirect';
import PropTypes from 'prop-types';

class Auth extends React.Component {
   /*  constructor(props) {
        super(props);
    }
 */
    render() {
        console.log("inside Auth ::",this.props.auth);
        if(!this.props.auth.isAuthenticated) {
            return(<Redirect to="/login" />);
        }
        return this.props.children;
    }
}

Auth.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(Auth);