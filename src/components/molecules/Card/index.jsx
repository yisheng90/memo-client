import React, {useState, useCallback} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import './style.css'

import {Textarea} from "../../atoms/Textarea";
import {Input} from '../../atoms/Input'

export const Card = ({idea, onDelete, onUpdate}) => {
    const [isDelectable, setIsDeletable] = useState(false)
    const createdDate = new Date(idea.created_date).toLocaleString()
    const handleHover = useCallback(() => setIsDeletable(prev => !prev), [])

    const handleTitleChange = useCallback((value) => {
        onUpdate({...idea, ...{title: value}})
    }, [idea, onUpdate])

    const handleBodyChange = useCallback((value) => {
        console.log("handleBodyChange", value)
        onUpdate({...idea, ...{body: value}})
    }, [idea, onUpdate])

    return (
        <div className="card__container"
             onMouseEnter={handleHover}
             onMouseLeave={handleHover}>

            <Input
                defaultValue={idea.title}
                onBlur={handleTitleChange}
                placeholder="Title"/>
            <span className='card__details--date'>{createdDate}</span>

            <Textarea defaultValue={idea.body} onBlur={handleBodyChange}/>

            {isDelectable &&
            <FontAwesomeIcon
                icon={faTrash}
                size='xs'
                className="card__action--delete"
                onClick={() => onDelete(idea.id)}/>}

        </div>
    )
}