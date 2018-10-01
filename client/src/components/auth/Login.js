import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authActions';
import {setFlashMessage} from '../../actions/flashActions';
import classNames from 'classnames';
import TextFieldGroupInput from '../ui/TextFieldGroupInput';
import FlashAlert from '../ui/FlashAlert';
import Redirect from 'react-router/Redirect';
import { toastr } from 'react-redux-toastr';

class Login extends Component {
    constructor(props){
      super(props);
      this.state = {
          email: '',
          password: '',
          errors: {}
      };

      this.onSubmit = this.onSubmit.bind(this);
      this.onChange = this.onChange.bind(this);

      if(props.location.state){
         if(props.location.state.redirectMessage){
            toastr.error("Private route", props.location.state.redirectMessage);
         }
      }
    }

    onChange(e) {
      this.setState({
        [e.target.name] : e.target.value
      })
    }

    onSubmit(e) {
      e.preventDefault();

      const userData = {
        email : this.state.email,
        password : this.state.password,
      }
       this.props.loginUser(userData);
    }

    redirectifLoggedIn(){
      if(this.props.auth.isAuthenticated){
        setTimeout(() => {
          // this.setState({isAuthenticated: true});
          // this.props.history.push('/dashboard');
        }, 150);
      }
    }
    componentWillMount(){
      this.redirectifLoggedIn();
    }

    componentDidMount(){
    
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.auth.isAuthenticated){
        setTimeout(() => {
           this.props.history.push('/dashboard');
        }, 1200);
      }
    }

    render() {
        const {errors} = this.props;

        if(this.props.auth.isAuthenticated){
           //return (<Redirect to="/create-profile" />);
        }

        return (
            <div className="login">
            <div className="container">
              <div className="row">
                <div className="col-md-6 m-auto">
                  <h1 className="display-4 text-center">Log In</h1>
                  <p className="lead text-center">Sign in to your DevBook account</p>
                  <FlashAlert />                  
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <TextFieldGroupInput 
                            type="email"
                            name="email"
                            className={classNames('form-control form-control-sm', {'is-invalid': errors.email})}
                            value={this.state.name}
                            placeholder="Email Address"
                            onChange={this.onChange}
                            errors={errors}
                         />    
                    </div>
                    <div className="form-group input-group-sm">
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
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      errors: state.errors,
      auth: state.auth
    }
};

export default connect(mapStateToProps, {loginUser, setFlashMessage})(Login);