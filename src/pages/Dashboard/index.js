import React, { useState } from 'react'

import { useIdea } from '../../hooks/useIdea'
import { useSorting, sortOptions } from '../../hooks/useSorting'
import { useNotification } from '../../hooks/useNotification'
import './style.css'

import { Card } from '../../components/molecules/Card'


export const Dashboard = () => {
  const [initialized, setInitialized] = useState(false)
  const { Notification, notify } = useNotification()
  const { ideas, fetchIdeas, addIdea, deleteIdea, updateIdea } = useIdea(notify)
  const { sortedIdeas, sortField, disableSorting, enableSorting, updateSortingField } = useSorting(ideas)

  React.useEffect(() => {
    if (!initialized) {
      fetchIdeas()
      setInitialized(true)
    }
  }, [initialized, fetchIdeas])


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
        <button className="button__primary" onClick={addIdea}>
          + New Idea
        </button>
        <select
          className='select__dropdown'
          value={sortField}
          onChange={(e) => updateSortingField(e.target.value)}>
          {sortOptions.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
      </div>

      <div className='cards__container'>
        {sortedIdeas.length > 0 && ideasElement}
        {sortedIdeas.length === 0 && <h3>We're sorry. Your ideas board is empty.</h3>}
      </div>
    </div>
  )
}


