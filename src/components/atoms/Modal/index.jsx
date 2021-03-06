import React from 'react'
import * as PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import './style.css'

export const Modal = ({isVisible, onCancel, children}) => {
    if (isVisible) {
        return (
            <div className="modal__mask" onClick={onCancel}>
                <div className="modal__container" data-testid="modal__container">
                    <div className="modal__container--inner">
                        {children}
                        <span
                            className="modal__action--close"
                            onClick={onCancel}
                            data-testid="modal__action--close">
                        <FontAwesomeIcon icon={faTimes} size="xs"/>
                    </span>
                    </div>
                </div>
            </div>
        )
    }
    return null
}


Modal.propTypes = {
    isVisible: PropTypes.bool,
    onCancel: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element, PropTypes.string]).isRequired
}