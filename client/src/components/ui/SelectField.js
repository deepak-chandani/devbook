import React from 'react';

export default (props) => {
    const {errors} = props;

    return (        
        <React.Fragment>
                <select className={props.className} name={props.name} onChange={props.onChange} value={props.value}>
                    {
                        props.options.map( (item) => (
                            <option key={item.key} value={item.key}>{item.value}</option>
                        ))
                    }                    
                 </select>
                 
                {props.hint && (
                    <small className="form-text text-muted">{props.hint}</small>
                )}

            {errors[props.name] && (
                <div className="invalid-feedback">
                    {errors[props.name]}
                </div>
            )}
        </React.Fragment>
    );
}

