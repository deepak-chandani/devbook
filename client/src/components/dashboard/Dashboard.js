import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchCurrentProfile, deleteEducation, deleteExperience} from '../../actions/profileActions';
import {setFlashMessage} from '../../actions/flashActions';
import {Redirect, Link} from 'react-router-dom';
import Spinner from '../ui/Spinner';
import { setTimeout } from 'timers';
import Experience from './Experience';
import Education from './Education';
import ProfileActions from './ProfileActions';
import {bindActionCreators} from 'redux';
import {actions as toastrActions} from 'react-redux-toastr';
import {toastr} from 'react-redux-toastr';

class Dashboard extends Component {

    constructor(props){
        super(props);
        //this.toastr = bindActionCreators(toastrActions, this.props.dispatch)

        this.onDeleteEducation = this.onDeleteEducation.bind(this);
        this.onDeleteExperience = this.onDeleteExperience.bind(this);
    }
     checkAuthenticated(){
        if(!this.props.isAuthenticated){
            const data = {
                type: 'info',
                message: 'Please login to access this page',
            };
            this.props.setFlashMessage(data);
            //this.props.history.push('/login');
        }
    }

    componentWillMount() {
        this.checkAuthenticated();
    }

    componentDidMount(){
        if(this.props.profile.profile == null || Object.keys(this.props.profile.profile).length == 0){
            this.props.fetchCurrentProfile();
        }
    }

    onDeleteClick(e) {
        console.log("onDelete clicked");
    }

    onDeleteEducation(item) {
        console.log("onDeleteEducation", item);
        this.props.deleteEducation(item._id);
    }

    onDeleteExperience(item) {
        this.props.deleteExperience(item._id);
    }

    render() {
        const {profile, loading} = this.props.profile;

        if(!this.props.user || !this.props.isAuthenticated){
            return (<Redirect to="/login" />);
        }

        const {user} = this.props;

        if(profile == null || loading){
            return (<Spinner />);
        }
        
        let content = '';
        if(Object.keys(profile).length == 0){
            content = (
                <div>
                    <p className="lead text-muted">Welcome {user.name} </p>
                    <p> You have not setup your profile, please add some information</p>
                    <Link to="/create-profile" className="btn btn-primary btn-info">Create profile</Link>
                </div>
            );
        }else{
            content = (
                <React.Fragment>
                    <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`} className="btn btn-primary btn-info"> {user.name} </Link> </p>
                    <ProfileActions />
                    <Experience experience={profile.experience} onDelete={this.onDeleteExperience} />
                    <Education education={profile.education} onDelete={this.onDeleteEducation} />
                    <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">
                        Delete My Account
                    </button>
                </React.Fragment>
            );
        }

       

        return (
            <div className="dashboard">
                <div className="container">
                <div className="row">
                    <div className="col-md-12">
                    <h1 className="display-4">Dashboard</h1>                    
                    {content}
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
        profile: state.profile,
    }
}

export default connect(mapStateToProps, {fetchCurrentProfile, setFlashMessage, deleteEducation, deleteExperience})(Dashboard);