import React from 'react';
import { connect } from 'react-redux';
import {submitComment} from '../../actions/postActions';
import Textarea from '../ui/Textarea';
import classNames from 'classnames';

class CommentForm extends React.Component {
    state = {
        text: ''
    }
    onSubmit(e) {
        e.preventDefault();
        
        const {user} = this.props.auth;

        const comment = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar,
            postId: this.props.post._id
        }
        this.props.submitComment(comment).then((res) => {
          this.setState({text: ''});
        });
    }

    render(){
        const {errors} = this.props;
        return (
         <div className="post-form mb-3">
            <div className="card card-info">
              <div className="card-header bg-info text-white">
                Say Something...
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this)}>
                  <div className="form-group">
                    <Textarea
                        className={classNames("form-control form-control-lg" , {'is-invalid': errors && errors.text})}
                        placeholder="Write comment"
                        name="text"
                        value={this.state.text}
                        onChange={(e) => this.setState({text: e.target.value})}
                        errors={errors}
                        hint="share your views"
                    />  
                  </div>
                  <button type="submit" className="btn btn-dark">
                    Submit
                  </button>
                </form>
              </div>
            </div>
        </div>
        );
    }
}

const mapStateToProps = (state) => ({
   auth: state.auth,
   errors: state.errors
});

export default connect(mapStateToProps, {submitComment})(CommentForm);