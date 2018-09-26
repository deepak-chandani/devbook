import React, { Component } from 'react';
import {connect} from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import API from '../../utils/API';
import {fetchPost} from '../../actions/postActions';

class Posts extends Component {    
    componentDidMount() {
        this.props.fetchPost();
    }
    render() {
        return (
            <React.Fragment>
                <PostForm />
                <div className="posts">
                    {
                        this.props.posts.map((item) => {
                            return <PostItem key={item._id} post={item} />
                        })
                    }
                </div>
            </React.Fragment>           
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts
    };
};
export default connect(mapStateToProps, {fetchPost})(Posts);