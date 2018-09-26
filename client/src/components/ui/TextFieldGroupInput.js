import React from 'react';

export default (props) => {

    const {errors} = props;

    return (        
        <React.Fragment>
        <input type={props.type} className={props.className} value={props.value} placeholder={props.placeholder} name={props.name} onChange={props.onChange} />
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
