import React from "react";
import Moment from 'react-moment';

export default props => {
  return (
    <div>
      <h4 className="mb-2">Experience Credentials</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {
              props.experience.map((item, index) => {
                 return (
                    <tr key={index}>
                        <td>{item.company}</td>
                        <td>{item.title}</td>
                        <td><Moment format="MMM-YYYY">{item.from}</Moment> - {item.to ? <Moment format="MMM-YYYY">{item.to}</Moment> : 'Working'}</td>
                        <td><button className="btn btn-danger" onClick={() => props.onDelete(item)}> Delete</button></td>
                    </tr>           
                 )
              })
          }            
        </tbody>
      </table>
    </div>
  );
};