import React, { useState } from 'react'

import { useIdea } from '../../hooks/useIdea'
import { useSorting, sortOptions } from '../../hooks/useSorting'
import './style.css'

import { Card } from '../../components/molecules/Card'


export const Dashboard = () => {
  const [initialized, setInitialized] = useState(false)
  const { ideas, fetchIdeas, addIdea, deleteIdea, updateIdea } = useIdea()
  const {sortedIdeas, sortField, disableSorting, enableSorting, updateSortingField} = useSorting(ideas)


  React.useEffect(() => {
    if (!initialized) {
      fetchIdeas()
      setInitialized(true)
    }
  }, [initialized, fetchIdeas])


  const ideasElement = sortedIdeas.map(idea => <Card idea={idea}
                                                     key={idea.id}
                                                     onEdit={disableSorting}
                                                     postEdit={enableSorting}
                                                     onDelete={deleteIdea}
                                                     onUpdate={updateIdea}/>)

  return (
    <div className="App">
      <header className="header_container">
        <h1>Ideas Board</h1>
      </header>
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
        {ideasElement}
      </div>
    </div>
  )
}


