import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {deletePostAsync} from '../../actions/postActions';

class PostItem extends React.Component {
    onDeletePost(e) {
       const postId = this.props.post._id;
       this.props.deletePostAsync(postId);
    }

    render() {
      const {post, auth} = this.props;

      return (
          <div className="card card-body mb-3">
                <div className="row">
                  <div className="col-md-2">
                    <Link to={`/profile/handle`}>
                      <img className="rounded-circle d-none d-md-block" src={post.avatar} alt="" />
                    </Link>
                    <br />
                    <p className="text-center">{post.name}</p>
                  </div>
                  <div className="col-md-10">
                    <p className="lead"> {post.text} </p>
                    <button type="button" className="btn btn-light mr-1">
                      <i className="text-info fas fa-thumbs-up" />
                      <span className="badge badge-light">4</span>
                    </button>
                    <button type="button" className="btn btn-light mr-1">
                      <i className="text-secondary fas fa-thumbs-down" />
                    </button>
                    <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                      Comments
                    </Link>
                    { post.user._id === auth.user.id && (
                      <button type="button" className="btn btn-danger mr-1" onClick={this.onDeletePost.bind(this)}>
                        <i className="fas fa-times" />
                      </button>
                    )}                  
                  </div>
                </div>
          </div>
      );
    }

}

const mapStateToProps = (state) => ({
   auth: state.auth
});
export default  connect(mapStateToProps, {deletePostAsync})(PostItem);