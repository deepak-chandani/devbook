import React from 'react';
import {Link} from 'react-router-dom';

export default Comment = (props) => {
    const {comment} = props;
    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-2">
                <Link to={"/profile"}>
                    <img className="rounded-circle d-none d-md-block" src={comment.avatar} alt="" />
                </Link>
                <br />
                <p className="text-center">{comment.name}</p>
                </div>
                <div className="col-md-10">
                <p className="lead">{comment.text}</p>
                </div>
            </div>
        </div>
    );
}