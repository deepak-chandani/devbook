import React, { Component } from 'react';
import {connect} from 'react-redux';
import {setFlashMessage} from '../../actions/flashActions';
import classNames from 'classnames';

class FlashAlert extends Component {

    render() {

        if(this.props.flash.type == null){
            return null;
        }

        const {type, message} = this.props.flash;
        const classes = classNames(["alert ","alert-"+type].join(' '));
    
        return (
            <div className={classes} role="alert">
                {message}
            </div>
        );
    }

};

const mapStateToProps = (state) => ({
    flash: state.flash
});

export default connect(mapStateToProps, {setFlashMessage})(FlashAlert);
