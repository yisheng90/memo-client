import React, { useState, useEffect } from 'react'
import { NotificationCard } from '../components/atoms/NotificationCard'

export const useNotification = () => {
  const [notifications, setNotification] = useState([])

  const expireNotification = () => setNotification(prevValues => {
    prevValues.pop()
    return [...prevValues]
  })

  const removeNotification = (message) => setNotification(prevValues => {
    prevValues = prevValues.filter(notification => notification !== message)
    return [...prevValues]
  })

  useEffect(() => {
    if (notifications.length > 0) {
      const interval = setInterval(expireNotification, 3000)
      return () => clearInterval(interval)
    }
  }, [notifications])

  const Notification = () => (
    <div className='notification__container'>
      {notifications.map(notification => <NotificationCard message={notification} onCancel={removeNotification}/>)}
    </div>
  )

  return {
    notify: (message) => setNotification(prev => [message, ...prev]),
    Notification,
  }
}