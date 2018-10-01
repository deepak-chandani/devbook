import React from 'react';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';

export default (props) => {
    return (
        <div>
            <h4 className="mb-2">Education Credentials</h4>
            <table className="table">
            <thead>
                <tr>
                <th>School</th>
                <th>Degree</th>
                <th>Years</th>
                <th />
                </tr>
            </thead>
            <tbody>
                {
                    props.education.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.school}</td>
                                <td>{item.degree}</td>
                                <td>
                                    <Moment format="MMM-YYYY">{item.from}</Moment> - {item.to ? <Moment format="MMM-YYYY">{item.to}</Moment>: null}
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => props.onDelete(item)}>
                                    Delete
                                    </button>
                                </td>
                            </tr>  
                        )
                    })
                }
                
                {
                    props.education.length == 0 && (
                        <tr>
                            <td colSpan="4" align="center">
                                <Link to="/add-education" className="btn btn-light"> <i className="fas fa-graduation-cap text-info mr-1"></i> Add Education </Link>
                            </td>
                        </tr>
                    )
                }
            </tbody>
            </table>
        </div>
    );
}