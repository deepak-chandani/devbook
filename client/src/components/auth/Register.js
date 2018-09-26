import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {registerUser} from '../../actions/authActions';
import {setFlashMessage} from '../../actions/flashActions';
import TextFieldGroupInput from '../ui/TextFieldGroupInput';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }  

    onChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }

        this.props.registerUser(newUser, this.props.history);
    }

    redirectifLoggedIn(props){
        if(props.auth.isAuthenticated){
          //props.history.push('/dashboard');
        }
      }
    componentWillMount(){
        this.redirectifLoggedIn(this.props);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
            const propsData = {
                type: 'success',
                message: 'Logged in successfully',
            };
            this.props.setFlashMessage(propsData);
        }
        this.redirectifLoggedIn(nextProps);
    }
  
    render() {
        const {errors} = this.props;
        
        return (
            <div className="register">
                <div className="container">
                <div className="row">
                    <div className="col-md-6 m-auto">
                    <h1 className="display-4 text-center">Sign Up</h1>
                    <p className="lead text-center">Create your DevBook account</p>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group md-form form-sm">
                        <TextFieldGroupInput 
                            type="text"
                            name="name"
                            className={classNames('form-control form-control-sm', {'is-invalid': errors.name})}
                            value={this.state.name}
                            placeholder="Name"
                            onChange={this.onChange}
                            errors={errors}
                         />                        
                        </div>
                        <div className="form-group md-form">
                        <TextFieldGroupInput 
                            type="email"
                            name="email"
                            className={classNames('form-control form-control-sm', {'is-invalid': errors.email})}
                            value={this.state.email}
                            placeholder="Email"
                            onChange={this.onChange}
                            errors={errors}
                         />                           
                        <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                        </div>
                        <div className="form-group md-form">
                        <TextFieldGroupInput 
                            type="password"
                            name="password"
                            className={classNames('form-control form-control-sm', {'is-invalid': errors.password})}
                            value={this.state.password}
                            placeholder="Password"
                            onChange={this.onChange}
                            errors={errors}
                         />                           
                        </div>
                        <div className="form-group md-form">
                        <TextFieldGroupInput 
                            type="password"
                            name="password2"
                            className={classNames('form-control form-control-sm', {'is-invalid': errors.password2})}
                            value={this.state.password2}
                            placeholder="Confirm Password"
                            onChange={this.onChange}
                            errors={errors}
                         />                                          
                        </div>
                        <input type="submit" className="btn btn-info btn-block mt-4" />
                    </form>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors,
    }
}
export default connect(mapStateToProps, {registerUser, setFlashMessage})(Register);