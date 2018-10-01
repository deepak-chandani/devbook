import React, { Component } from 'react';
import { connect } from 'react-redux';
import API from '../../utils/API';
import Spinner from '../ui/Spinner';
import CommentForm from './CommentForm';
import Comment from './Comment';
import {fetchPostDetail} from '../../actions/postActions';

class PostDetail extends Component {   
    componentDidMount(){
        const postId = this.props.match.params.id;

        this.props.fetchPostDetail(postId);       
    }

    render() {
        const {auth} = this.props;
        const {post, loading} = this.props.post;

        if(post == null || loading){
            return <Spinner/>;
        }

        return (
            <div className="post">
                <div className="container">
                <div className="row">
                    <div className="col-md-12">
                    <div className="card card-body mb-3">
                        <div className="row">
                        <div className="col-md-2">
                            <a href="profile.html">
                            <img className="rounded-circle d-none d-md-block" src={post.avatar}
                                alt="" />
                            </a>
                            <br />
                            <p className="text-center">{post.name}</p>
                        </div>
                        <div className="col-md-10">
                            <p className="lead">{post.text}</p>
                        </div>
                        </div>
                    </div>

                        {auth.isAuthenticated && <CommentForm post={post} auth={auth} />}
                        <div className="comments">
                            {
                                post.comments.map((item) => <Comment key={item._id} comment={item} />)
                            }                          
                        </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    post: state.post
});
export default connect(mapStateToProps, {fetchPostDetail})(PostDetail);