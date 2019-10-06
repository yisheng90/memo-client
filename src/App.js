import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import {useIdea} from './hooks/useIdea'

import './App.css'

import {Card} from './components/molecules/Card'


const App = () => {
    const {ideas, targetedIdea, fetchIdeas, addIdea, deleteIdea, updateIdea} = useIdea()

    React.useEffect(() => {
        fetchIdeas()
    }, [])


    const ideasElement = ideas.map(idea => <Card idea={idea}
                                                 key={idea.id}
                                                 onDelete={deleteIdea}
                                                 onUpdate={updateIdea}
                                                 isEditable={targetedIdea === idea.id ? true : false}/>)

    return (
        <div className="App">
            <header className="header_container">
                <h1>Ideas Board</h1>
                <div className='header__action-add'>
                    <FontAwesomeIcon icon={faPlusCircle} size="2x" onClick={() => addIdea()}/>
                </div>
            </header>


            <div className='cards__container'>
                {ideasElement}
            </div>
        </div>
    )
}

export default App
