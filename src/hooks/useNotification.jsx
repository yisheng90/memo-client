import React, {useState, useEffect} from 'react'
import {NotificationCard} from '../components/atoms/NotificationCard'

export const useNotification = () => {
    const [notifications, setNotification] = useState([])

    const expireNotification = () =>
        setNotification(prevValues => {
            prevValues.pop()
            return [...prevValues]
        })

    const removeNotification = targetIndex =>
        setNotification(prevValues => {
            prevValues = prevValues.filter((notification, index) => index !== targetIndex)
            return [...prevValues]
        })

    const addNotification = message => setNotification(prevValues => {
        const notificationExist = prevValues.find(notification => notification === message)
        if (notificationExist) {
            return prevValues
        } else {
            return [message, ...prevValues]
        }

    })

    const Notification = () => (
        <div className="notification__container">
            {notifications.map((notification, index) => (
                <NotificationCard
                    message={notification}
                    onCancel={() => removeNotification(index)}
                />
            ))}
        </div>
    )

    useEffect(() => {
        if (notifications.length > 0) {
            const interval = setInterval(expireNotification, 3000)
            return () => clearInterval(interval)
        }
    }, [notifications])

    return {
        notify: addNotification,
        Notification,
    }
}
