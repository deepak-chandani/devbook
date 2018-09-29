import React from 'react';
import { connect } from 'react-redux';
import {submitPost} from '../../actions/postActions';

class PostForm extends React.Component {
    state = {
        content: ''
    }
    onSubmit(e) {
        e.preventDefault();
        console.log(this.state.content);
        
        const {user} = this.props.auth;

        const post = {
            text: this.state.content,
            name: user.name,
            avatar: user.avatar
        }
        this.props.submitPost(post).then((res) => {
          this.setState({content: ''});
        });
    }

    render(){
        return (
         <div className="post-form mb-3">
            <div className="card card-info">
              <div className="card-header bg-info text-white">
                Say Something...
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this)}>
                  <div className="form-group">
                    <textarea className="form-control form-control-lg" placeholder="Create a post" name="content" value={this.state.content} onChange={(e) => this.setState({content: e.target.value})} />
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
   auth: state.auth
});

export default connect(mapStateToProps, {submitPost})(PostForm);