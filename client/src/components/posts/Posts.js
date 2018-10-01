import React, { Component } from 'react';
import {connect} from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import API from '../../utils/API';
import {fetchPosts} from '../../actions/postActions';
import Spinner from '../ui/Spinner';

class Posts extends Component {    
    componentDidMount() {
        this.props.fetchPosts();
    }
    render() {
        const {posts, loading} = this.props.post;

        let postsContent;
        if(loading){
            postsContent = (<Spinner />);
        }else{
            postsContent =  posts.map((item) => {
                    return <PostItem key={item._id} post={item} />
                });            
        }

        return (
            <div className="feed">
                <div className="container">                
                    <div className="row">
                        <div className="col-md-12">
                        {this.props.auth.isAuthenticated && <PostForm />}                        
                        <div className="posts">
                            {postsContent}         
                        </div>
                        </div>
                    </div>
                </div>
            </div>           
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        post: state.post,
    };
};
export default connect(mapStateToProps, {fetchPosts})(Posts);