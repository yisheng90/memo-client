import React, {useState, useRef, useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeartBroken} from '@fortawesome/free-solid-svg-icons'
import {useIdea} from '../../hooks/useIdea'
import {useSorting, sortOptions} from '../../hooks/useSorting'
import {useNotification} from '../../hooks/useNotification'
import './style.css'

import {Card} from '../../components/molecules/Card'

export const Dashboard = () => {
    const {Notification, notify} = useNotification()
    const {ideas, haveEmptyIdea, addIdea, deleteIdea, updateIdea} = useIdea(notify)
    const {sortedIdeas, sortField, disableSorting, enableSorting, updateSortingField} = useSorting(ideas)
    const [boardWidth, setBoardWidth] = useState('100%')
    const targetRef = useRef(null)

    const setBoardSize = () => {
        const value = Math.floor(targetRef.current.offsetWidth / 170)
        setBoardWidth(`${170 * value}px`)
    }

    useEffect(() => {
        setBoardSize()
        window.addEventListener('resize', () => setBoardSize())
        return () => window.removeEventListener('resize', () => setBoardSize())
    }, [])

    const ideasElement = sortedIdeas.map(idea => <Card idea={idea}
                                                       key={idea.id}
                                                       disableSort={disableSorting}
                                                       enableSort={enableSorting}
                                                       onDelete={deleteIdea}
                                                       onUpdate={updateIdea}/>)

    return (
        <div className="dashboard">
            <header className="header_container">
                <h1>Ideas Board</h1>
            </header>
            <Notification/>
            <div className="cards_action__container">
                <button className="button__primary" disabled={haveEmptyIdea} onClick={addIdea}>+ New idea</button>
                <select
                    className='select__dropdown'
                    value={sortField}
                    onChange={(e) => updateSortingField(e.target.value)}>
                    {sortOptions.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
            </div>

            <div className='cards__container' ref={targetRef}>
                <div className='cards__container--inner' style={{width: `${boardWidth}`}}>
                    {sortedIdeas.length > 0 && ideasElement}
                    {sortedIdeas.length === 0 && (
                        <div className='cards__container--placeholder'>
                            <FontAwesomeIcon icon={faHeartBroken} size='2x'/>
                            <h3>We're sorry. Your ideas board is empty.</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}


