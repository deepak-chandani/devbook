import React, { Component } from "react";
import TextFieldGroupInput from "../ui/TextFieldGroupInput";
import {updateEducation} from '../../actions/profileActions';
import Textarea from "../ui/Textarea";
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import classNames from "classnames";

class AddEducation extends Component {
  constructor(props) {
      super(props);
    this.state = {
      school: "",
      degree: "",
      fieldofstudy: "",
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
       school: this.state.school,
       degree: this.state.degree,
       fieldofstudy: this.state.fieldofstudy,
       from: this.state.from,
       to: this.state.to,
       current: this.state.current,
       description: this.state.description,
    };

    this.props.updateEducation(data);
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
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard"  className="btn btn-light"> Go Back </Link>              
              <h1 className="display-4 text-center">Add Your Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp, etc that you have attended
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <TextFieldGroupInput
                    type="text"
                    className={classNames("form-control form-control-lg" , {'is-invalid': errors.school})}
                    placeholder="* School Or Bootcamp"
                    name="school"
                    value={this.state.school}
                    onChange={this.onChange}
                    errors={errors}
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroupInput
                    type="text"
                    className={classNames("form-control form-control-lg" , {'is-invalid': errors.degree})}
                    placeholder="* Degree Or Certificate"
                    name="degree"
                    value={this.state.degree}
                    onChange={this.onChange}
                    errors={errors}
                    required
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroupInput
                    type="text"
                    className={classNames("form-control form-control-lg" , {'is-invalid': errors.fieldofstudy})}
                    placeholder="Field Of Study"
                    name="fieldofstudy"
                    value={this.state.fieldofstudy}
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
                    Currently pursuing
                  </label>
                </div>
                <div className="form-group">
                <Textarea
                    className="form-control form-control-lg"
                    placeholder="Program Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                    errors={errors}
                    hint="Tell us about your experience and what you learned"
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

export default connect(mapStateToProps, {updateEducation})(AddEducation);
