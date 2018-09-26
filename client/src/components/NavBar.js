import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {setAuthedUser, logoutUser} from '../actions/authActions';

class NavBar extends Component {

	constructor(props){
		super(props);
		this.onLogout = this.onLogout.bind(this);
	}

	onLogout(e) {
		e.preventDefault();
		localStorage.clear();
		//this.props.setAuthedUser({});
		this.props.logoutUser();

		//this.props.history.push('/login');
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.isAuthenticated != this.props.isAuthenticated){
			this.props.history.push('/login');
		}
	}

	render(){
		const {isAuthenticated, user} = this.props.auth;

		if(!isAuthenticated){
			//return (<Redirect to="/login" />);
	  }

		const guestLinks = (
				<ul className="navbar-nav ml-auto">
					<li className="nav-item">
						<Link to="/register" className="nav-link"> Sign Up </Link>			            
					</li>
					<li className="nav-item">
						<Link to="/login" className="nav-link"> Login</Link>
					</li>
				</ul>
		);

		const authedLinks = (
				<ul className="navbar-nav ml-auto">
					<li className="nav-item">
						<Link to="/dashboard" className="nav-link"> Dashboard </Link>			            
					</li>
					<li className="nav-item">
						<Link to="/posts" className="nav-link"> Post Feed </Link>			            
					</li>
					<li className="nav-item">
						<a href="" onClick={this.onLogout} className="nav-link">
						<img className="rounded-circle" style={{width:'25px', marginRight:'5px'}} src={user && user.avatar}
                alt={user && user.name} title="You must have a Gravatar connected to your email to display an image" /> 
						 Logout
						</a>
					</li>
				</ul>
		);

		return (
			<nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
			    <div className="container">
						<Link className="navbar-brand" to="/"> DevBook </Link>
			      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
			        <span className="navbar-toggler-icon"></span>
			      </button>

			      <div className="collapse navbar-collapse" id="mobile-nav">
			        <ul className="navbar-nav mr-auto">
			          <li className="nav-item">
			            <Link className="nav-link" to="/profiles"> Developers </Link>
			          </li>
			        </ul>
							{!this.props.auth.isAuthenticated && guestLinks}
							{this.props.auth.isAuthenticated && authedLinks}			        
			      </div>
			    </div>
			</nav>				
		);
	}
}

const mapStateToProps = (state) => {
	 return {
		  auth: state.auth
	 }
}

export default connect(mapStateToProps, {setAuthedUser, logoutUser})(withRouter(NavBar));