import React, { useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import './style.css'

import { Textarea } from '../../atoms/Textarea'
import { Input } from '../../atoms/Input'

export const Card = ({ idea, onDelete, onUpdate, enableSort, disableSort }) => {
  const [isDelectable, setIsDeletable] = useState(false)
  const createdDate = new Date(idea.created_date).toLocaleString()

  const handleTitleChange = useCallback((value) => {
    if (value && value !== idea.title) {
      onUpdate({ ...idea, ...{ title: value } })
    }
    enableSort()
  }, [idea, onUpdate, enableSort])

  const handleBodyChange = useCallback((value) => {
    if (value && value !== idea.body) {
      onUpdate({ ...idea, ...{ body: value } })
    }
    enableSort()
  }, [idea, onUpdate, enableSort])

  return (
    <div className="card__container"
         onMouseEnter={() => setIsDeletable(true)}
         onMouseLeave={() => setIsDeletable(false)}>

      <Input
        defaultValue={idea.title}
        onFocus={disableSort}
        onBlur={handleTitleChange}
        placeholder="Title"/>
      <span className='card__details--date'>{createdDate}</span>

      <Textarea defaultValue={idea.body} onBlur={handleBodyChange} onFocus={disableSort}/>

      {isDelectable &&
      <FontAwesomeIcon
        icon={faTrash}
        size='xs'
        className="card__action--delete"
        onClick={() => onDelete(idea.id)}/>}
    </div>
  )
}