import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import './style.css'

export const NotificationCard = ({message, onCancel}) => (
    <div className="notification__card">
        {message}
        <span className="notification__card--close" onClick={onCancel}>
        <FontAwesomeIcon icon={faTimes} size='xs'/>
        </span>
    </div>)