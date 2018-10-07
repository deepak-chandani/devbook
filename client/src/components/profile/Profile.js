import React, { Component } from 'react';
import {connect} from 'react-redux';
import Link from 'react-router-dom/Link';
import Moment from 'react-moment';
import API from '../../utils/API';
import Spinner from '../ui/Spinner';
import GitRepos from './GitRepos';
import generateAvatarUrl from '../../utils/generateAvatarUrl';

class Profile extends Component {
    state = {
        profile:null
    }
    componentDidMount(){
        const handle = this.props.match.params.handle;

        API.get('/api/profile/handle/'+handle)
        .then((res) => {
            console.log(res.data);
            this.setState({profile:res.data});
        }).catch((err) => {

        });
    }
    render() {
        const {profile} = this.state;
        if(!profile){
            return (<Spinner />);
        }

        const {user} = profile;
        const {errors} = this.props;
        const avatarUrl = user.avatar;
        //const avatarUrl = `https://outlook.office.com/owa/service.svc/s/GetPersonaPhoto?email=${user.email}&UA=0&size=HR240x240`;
        //const avatarUrl = `unknown`;
        
        return (
            <div className="profile">
                <div className="container">
                <div className="row">
                    <div className="col-md-12">
                    <div className="row">
                        <div className="col-6">
                            <Link to="/profiles" className="btn btn-light mb-3 float-left">Back To Profiles</Link>
                        </div>
                        <div className="col-6">
            
                        </div>
                    </div>
            
                    <div className="row">
                        <div className="col-md-12">
                        <div className="card card-body bg-info text-white mb-3">
                            <div className="row">
                            <div className="col-4 col-md-3 m-auto">
                                <img className="rounded-circle" src={avatarUrl} alt="" />
                            </div>
                            </div>
                            <div className="text-center">
                            <h1 className="display-4 text-center">{user.name}</h1>
                            <p className="lead text-center">{profile.status} at {profile.company}</p>
                            <p>{profile.location}</p>
                            <p>
                                <a className="text-white p-2" href="#">
                                <i className="fas fa-globe fa-2x"></i>
                                </a>
                                <a className="text-white p-2" href="#">
                                <i className="fab fa-twitter fa-2x"></i>
                                </a>
                                <a className="text-white p-2" href="#">
                                <i className="fab fa-facebook fa-2x"></i>
                                </a>
                                <a className="text-white p-2" href="#">
                                <i className="fab fa-linkedin fa-2x"></i>
                                </a>
                                <a className="text-white p-2" href="#">
                                <i className="fab fa-instagram fa-2x"></i>
                                </a>
                            </p>
                            </div>
                        </div>
                        </div>
                    </div>
            
                    <div className="row">
                        <div className="col-md-12">
                        <div className="card card-body bg-light mb-3">
                            <h3 className="text-center text-info">{user.name.split(' ')[0]}'s Bio</h3>
                            <p className="lead"> {profile.bio} </p>
                            <hr />
                            <h3 className="text-center text-info">Skill Set</h3>
                            <div className="row">
                            <div className="d-flex flex-wrap justify-content-center align-items-center">
                                {
                                    profile.skills.map((item, index) => (
                                        <div key={index} className="p-3">
                                        <i className="fa fa-check"></i> {item}</div>        
                                    ))
                                }                               
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
            
                    <div className="row">
                        <div className="col-md-6">
                        <h3 className="text-center text-info">Experience</h3>
                        <ul className="list-group">
                            {
                                profile.experience.map((item) => (
                                    <li className="list-group-item" key={item._id}>
                                        <h4>{item.company}</h4>
                                        <p> <Moment format="MMM-YYYY">{item.from}</Moment> - {item.current || item.to == null ? 'Present': <Moment format="MMM-YYYY">{item.to}</Moment> }</p>
                                        <p> <strong>Position:</strong> {item.title} </p>
                                        <p>
                                            <strong>Description:</strong> {item.description}
                                        </p>
                                    </li>
                                ))
                            }                         
                        </ul>
                        </div>
                        <div className="col-md-6">
                        <h3 className="text-center text-info">Education</h3>
                        <ul className="list-group">
                            {
                                profile.education.map((item) => (
                                    <li className="list-group-item" key={item._id}>
                                        <h4>{item.school}</h4>
                                        <p><Moment format="MMM-YYYY">{item.from}</Moment> - {item.current || item.to == null ? '': <Moment format="MMM-YYYY">{item.to}</Moment>}</p>
                                        <p><strong>Degree: </strong>{item.degree}</p>
                                        <p><strong>Field Of Study: </strong>{item.fieldofstudy}</p>                            
                                        <p> <strong>Description:</strong> {item.description}</p>
                                    </li>
                                ))
                            }                            
                        </ul>
                        </div>
                    </div>
                    
                    {profile.githubusername.length ? <GitRepos username={profile.githubusername} /> : null }                        
                    
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})
export default connect(mapStateToProps)(Profile);