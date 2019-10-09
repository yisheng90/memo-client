import React from 'react'
import * as PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import './style.css'

export const NotificationCard = ({message, onCancel}) => (
    <div className="notification__card" data-testid="notification__card">
        {message}
        <span
            className="notification__card--close"
            onClick={onCancel}
            data-testid="notification__card--close">
      <FontAwesomeIcon icon={faTimes} size="xs"/>
    </span>
    </div>
)

NotificationCard.propTypes = {
    message: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired
}