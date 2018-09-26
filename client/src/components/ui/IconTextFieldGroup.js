import React from 'react';
import TextFieldGroupInput from './TextFieldGroupInput';

const IconTextFieldGroup = (props) => {
    
    const iconClasses = ['fab'];
    if(props.iconClass != ''){
        iconClasses.push(props.iconClass);
    }

    return (
        <React.Fragment>
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={iconClasses.join(' ')}></i>
                </span>
            </div>
            <TextFieldGroupInput
                {...props}
            />  
        </React.Fragment>    
    );
}

export default IconTextFieldGroup;