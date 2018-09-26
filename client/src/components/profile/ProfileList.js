import React, { Component } from 'react';
import ProfileItem from './ProfileItem';
import {connect} from 'react-redux';
import {getAllProfiles} from '../../actions/profileActions';
import Spinner from '../ui/Spinner';

class ProfileList extends Component {    
    componentDidMount(){
        const {profiles} = this.props.profile;
        //if(profiles.length == 0){
            this.props.getAllProfiles();            
        //}
    }
    render() {
        const {profiles, loading} = this.props.profile;

        if(profiles.length == 0 || loading){
            return (<Spinner />);
        }

        return (
            <div className="profiles">
                <div className="container">
                <div className="row">
                    <div className="col-md-12">
                    <h1 className="display-4 text-center">
                        Developer Profiles
                    </h1>
                    <p className="lead text-center">
                        Browse and connect with developers
                    </p>
                     {this.props.profile.profiles.map((item) => <ProfileItem key={item._id} profile={item} />)}
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profile
})

export default connect(mapStateToProps, {getAllProfiles})(ProfileList);