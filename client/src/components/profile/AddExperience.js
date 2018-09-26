import React, { Component } from "react";
import TextFieldGroupInput from "../ui/TextFieldGroupInput";
import {addExperience} from '../../actions/profileActions';
import Textarea from "../ui/Textarea";
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import classNames from "classnames";

class AddExperience extends Component {
  constructor(props) {
      super(props);
    this.state = {
      title: "",
      company: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    // trigger action
    const data = {
       title: this.state.title,
       company: this.state.company,
       location: this.state.location,
       from: this.state.from,
       to: this.state.to,
       current: this.state.current,
       description: this.state.description,
    };

    this.props.addExperience(data);
  }

  onChange(e) {
    const fieldName = e.target.name;
    let newState;
    if(fieldName == 'current'){
       newState = {
         current: !this.state.current
       }
    }else{
      newState = {[e.target.name]: e.target.value};
    }

    this.setState(newState);
  }

  render() {
    const {errors} = this.props;
    
    return (
      <div className="section add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard"  className="btn btn-light"> Go Back </Link>              
              <h1 className="display-4 text-center">Add Your Experience</h1>
              <p className="lead text-center">
                Add any developer/programming positions that you have had in the past
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <TextFieldGroupInput
                    type="text"
                    className={classNames("form-control form-control-lg" , {'is-invalid': errors.title})}
                    placeholder="* Job Title"
                    name="title"
                    value={this.state.title}
                    onChange={this.onChange}
                    errors={errors}
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroupInput
                    type="text"
                    className={classNames("form-control form-control-lg" , {'is-invalid': errors.company})}
                    placeholder="* Company"
                    name="company"
                    value={this.state.company}
                    onChange={this.onChange}
                    errors={errors}
                    required
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
                  />
                </div>
                <h6>From Date</h6>
                <div className="form-group">
                  <TextFieldGroupInput
                    type="date"
                    className={classNames("form-control form-control-lg" , {'is-invalid': errors.from})}
                    name="from"
                    value={this.state.from}
                    onChange={this.onChange}
                    errors={errors}
                  />
                </div>
                <h6>To Date</h6>
                <div className="form-group">
                  <TextFieldGroupInput
                    type="date"
                    className="form-control form-control-lg"
                    name="to"
                    value={this.state.to}
                    onChange={this.onChange}
                    errors={errors}
                  />
                </div>
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="current"
                    value={this.state.current}
                    id="current"
                    onChange={this.onChange}
                    errors={errors}
                  />
                  <label className="form-check-label" htmlFor="current">
                    Current Job
                  </label>
                </div>
                <div className="form-group">
                <Textarea
                    className="form-control form-control-lg"
                    placeholder="Job Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                    errors={errors}
                    hint="Some of your responsibilities, etc"
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

const mapStateToProps = (state) => ({
   errors: state.errors,
});

export default connect(mapStateToProps, {addExperience})(AddExperience);
