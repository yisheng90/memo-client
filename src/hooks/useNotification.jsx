import React, { useState, useEffect } from 'react'
import { NotificationCard } from '../components/atoms/NotificationCard'

export const useNotification = () => {
  const [notifications, setNotification] = useState([])

  const expireNotification = () => setNotification(prevValues => {
    prevValues.pop()
    return [...prevValues]
  })

  const removeNotification = (targetIndex) => setNotification(prevValues => {
    prevValues = prevValues.filter((notification, index) => index !== targetIndex)
    return [...prevValues]
  })

  const Notification = () => (
    <div className='notification__container'>
      {notifications.map((notification, index) => <NotificationCard message={notification} onCancel={()=> removeNotification(index)}/>)}
    </div>
  )

  useEffect(() => {
    if (notifications.length > 0) {
      const interval = setInterval(expireNotification, 3000)
      return () => clearInterval(interval)
    }
  }, [notifications])

  return {
    notify: (message) => setNotification(prev => [message, ...prev]),
    Notification,
  }
}