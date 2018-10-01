import React, { Component } from 'react';
import TextFieldGroupInput from '../ui/TextFieldGroupInput';
import Textarea from '../ui/Textarea';
import IconTextFieldGroup from '../ui/IconTextFieldGroup';
import SelectField from '../ui/SelectField';
import {updateProfile, fetchCurrentProfile} from '../../actions/profileActions';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../ui/Spinner';
import classNames from 'classnames';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        let profileData = {
            handle: '',
            status: '',
            company: '',
            website: '',
            location: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {},
            displaySocialInputs: false,
        };

        if(this.props.profile.profile!=null){
            profileData = this.createProfileDataObjectFromResponseJSON(this.props.profile.profile);
        }

        this.state = profileData;
        //this.setStateData(profileData);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    createProfileDataObjectFromResponseJSON(jsonData){
        const profileData = {
            handle: jsonData.handle,
            status: jsonData.status,
            company: jsonData.company,
            website: jsonData.website,
            location: jsonData.location,
            skills: typeof jsonData.skills == 'object' ? jsonData.skills.join(',') : jsonData.skills,
            githubusername: jsonData.githubusername,
            bio: jsonData.bio,
            twitter: jsonData.twitter,
            facebook: jsonData.facebook,
            linkedin: jsonData.linkedin,
            youtube: jsonData.youtube,
            instagram: jsonData.instagram,
            errors: {},
            displaySocialInputs: this.state ? this.state.displaySocialInputs : false,
        }

        return profileData;
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        console.log(this.state);

        const profileData = {
            handle: this.state.handle,
            status: this.state.status,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram,
        };

        this.props.updateProfile(profileData, this.props.history);
    }

    toggleSocialInputs(e) {
        this.setState({
            displaySocialInputs: !this.state.displaySocialInputs
        });
    }

    componentDidMount(){
        if(this.props.profile.profile == null){
            this.props.fetchCurrentProfile();
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.profile.profile != null){
            const profileData = this.createProfileDataObjectFromResponseJSON(nextProps.profile.profile);
            this.setState(profileData);
        }
    }

    render() {
        const {profile, loading} = this.props.profile;
        const {errors} = this.props;

        if(profile == null || loading){
            return (<Spinner />);
        }      

        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light"> Go Back </Link>
                            <h1 className="display-4 text-center">Edit Profile</h1>
                            <p className="lead text-center">Let's get some information to make your profile stand out</p>
                            <small className="d-block pb-3">* means required field</small>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <TextFieldGroupInput
                                        type="text"
                                        className={classNames("form-control form-control-lg" , {'is-invalid': errors.handle})}
                                        placeholder="* Profile handle"
                                        name="handle"
                                        value={this.state.handle}
                                        onChange={this.onChange}
                                        errors={errors}
                                        hint="A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later)"
                                    />
                                </div>
                                <div className="form-group">
                                    <SelectField                                        
                                        className={classNames("form-control form-control-lg" , {'is-invalid': errors.status})}
                                        name='status'
                                        value={this.state.status}
                                        onChange={this.onChange}
                                        errors={errors}
                                        hint="Give us an idea of where you are at in your career"
                                        options={[
                                            {key: 0, value: '* Select Professional Status'},
                                            {key: 'Student or Learning', value: 'Student or Learning'},
                                            {key: 'Instructor', value: 'Instructor or Teacher'},
                                            {key: 'Intern', value: 'Intern'},
                                            {key: 'Junior Developer', value: 'Junior Developer'},
                                            {key: 'Developer', value: 'Developer'},
                                            {key: 'Senior Developer', value: 'Senior Developer'},
                                            {key: 'Project Manager', value: 'Project Manager'},
                                            {key: 'Consultant', value: 'Consultant'},
                                            {key: 'Technical Architect', value: 'Technical Architect'},                                            
                                            {key: 'AVP Engineering', value: 'AVP Engineering'},                                            
                                            {key: 'Other', value: 'Other'},
                                        ]}
                                    />
                                </div>
                                <div className="form-group">
                                    <TextFieldGroupInput
                                        type="text"
                                        className={classNames("form-control form-control-lg" , {'is-invalid': errors.company})}
                                        placeholder="Company"
                                        name="company"
                                        value={this.state.company}
                                        onChange={this.onChange}
                                        errors={errors}
                                        hint="Could be your own company or one you work for"
                                    />
                                </div>
                                <div className="form-group">
                                    <TextFieldGroupInput
                                        type="text"
                                        className={classNames("form-control form-control-lg" , {'is-invalid': errors.website})}
                                        placeholder="Website"
                                        name="website"
                                        value={this.state.website}
                                        onChange={this.onChange}
                                        errors={errors}
                                        hint="Could be your own or a company website"
                                    />
                                </div>
                                <div className="form-group">
                                    <TextFieldGroupInput
                                        type="text"
                                        className={classNames("form-control form-control-lg" , {'is-invalid': errors.location})}
                                        placeholder="Location"
                                        name="location"
                                        value={this.state.location}
                                        onChange={this.onChange}
                                        errors={errors}
                                        hint="City & state suggested (eg. Boston, MA)"
                                    />                                    
                                </div>
                                <div className="form-group">
                                    <TextFieldGroupInput
                                        type="text"
                                        className={classNames("form-control form-control-lg" , {'is-invalid': errors.skills})}
                                        placeholder="skills"
                                        name="skills"
                                        value={this.state.skills}
                                        onChange={this.onChange}
                                        errors={errors}
                                        hint="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                                    />  
                                </div>
                                <div className="form-group">
                                    <TextFieldGroupInput
                                        type="text"
                                        className={classNames("form-control form-control-lg" , {'is-invalid': errors.githubusername})}
                                        placeholder="Github username"
                                        name="githubusername"
                                        value={this.state.githubusername}
                                        onChange={this.onChange}
                                        errors={errors}
                                        hint="If you want your latest repos and a Github link, include your username"
                                    />  
                                </div>
                                <div className="form-group">
                                    <Textarea
                                        className={classNames("form-control form-control-lg" , {'is-invalid': errors.bio})}
                                        placeholder="bio"
                                        name="bio"
                                        value={this.state.bio}
                                        onChange={this.onChange}
                                        errors={errors}
                                        hint="Tell us a little about yourself"
                                    />  
                                </div>

                                <div className="mb-3">
                                    <button type="button" className="btn btn-light" onClick={this.toggleSocialInputs.bind(this)} > {this.state.displaySocialInputs ? 'Hide' : 'Add'} Social Network Links</button>
                                    <span className="text-muted">Optional</span>
                                </div>

                                { this.state.displaySocialInputs && (
                                      <React.Fragment>
                                        <div className="input-group mb-3">
                                            <IconTextFieldGroup
                                                type="text"
                                                iconClass="fa-twitter"
                                                className="form-control form-control-lg"
                                                placeholder="Twitter Profile URL"
                                                name="twitter"
                                                value={this.state.twitter}
                                                onChange={this.onChange}
                                                errors={errors}
                                            />  
                                        </div>

                                        <div className="input-group mb-3">
                                            <IconTextFieldGroup
                                                type="text"
                                                iconClass="fa-facebook"
                                                className="form-control form-control-lg"
                                                placeholder="Facebook Page URL"
                                                name="facebook"
                                                value={this.state.facebook}
                                                onChange={this.onChange}
                                                errors={errors}
                                            />  
                                        </div>

                                        <div className="input-group mb-3">
                                            <IconTextFieldGroup
                                                type="text"
                                                iconClass="fa-linkedin"
                                                className="form-control form-control-lg"
                                                placeholder="LinkedIn Page URL"
                                                name="linkedin"
                                                value={this.state.linkedin}
                                                onChange={this.onChange}
                                                errors={errors}
                                            />  
                                        </div>

                                        <div className="input-group mb-3">
                                            <IconTextFieldGroup
                                                type="text"
                                                iconClass="fa-youtube"
                                                className="form-control form-control-lg"
                                                placeholder="YouTube Channel URL"
                                                name="youtube"
                                                value={this.state.youtube}
                                                onChange={this.onChange}
                                                errors={errors}
                                            />  
                                        </div>

                                        <div className="input-group mb-3">
                                            <IconTextFieldGroup
                                                type="text"
                                                iconClass="fa-instagram"
                                                className="form-control form-control-lg"
                                                placeholder="Instagram Page URL"
                                                name="instagram"
                                                value={this.state.instagram}
                                                onChange={this.onChange}
                                                errors={errors}
                                            />  
                                        </div>
                                    </React.Fragment>  
                                    )
                                }
                                
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    profile: state.profile,    
    errors: state.errors,    
});
export default connect(mapStateToProps, {updateProfile, fetchCurrentProfile})(EditProfile);
