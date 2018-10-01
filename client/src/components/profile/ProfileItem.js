import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import generateAvatarUrl from '../../utils/generateAvatarUrl';

class ProfileItem extends Component{

    getCurrentJob(experienceList){

    }

    render(){
        const {profile} = this.props;
        const {user} = profile;

        const avatarUrl = generateAvatarUrl(user.email, user.avatar);
        
        return (
            <div className="card card-body bg-light mb-3">
                <div className="row">
                <div className="col-2">
                    <img className="rounded-circle" src={avatarUrl} alt="" />
                </div>
                <div className="col-lg-6 col-md-4 col-8">
                    <h3>{user.name}</h3>
                    <p>{profile.status} {profile.company.length > 0 ? <span> at {profile.company} </span> : ''}</p>
                    <Link to={`/profile/${profile.handle}`} className="btn btn-info"> View Profile </Link>
                </div>
                <div className="col-md-4 d-none d-lg-block">
                    <h4>Skill Set</h4>
                    <ul className="list-group">
                    {
                        profile.skills.map((item,index) => (
                            <li key={profile._id+'_'+index} className="list-group-item">
                                <i className="fa fa-check pr-1"></i>{item}
                            </li>        
                        ))
                    }
                    </ul>
                </div>
                </div>
            </div>
        );
    }
}

export default ProfileItem;