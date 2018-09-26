import React from 'react';
import spinner from './spinner.gif';

const Spinner  = (props) => {
    return (
        <img src={spinner} style={{width: '15%', margin: 'auto', display: 'block'}} alt="loading.." />
    );    
}

export default Spinner;