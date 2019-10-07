import React, {useState} from 'react'
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import {faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import {useIdea} from './hooks/useIdea'

import './App.css'

import {Card} from './components/molecules/Card'

const sortConfig = {
    date: {
        name: 'Date',
        sortFn: (a, b) => {
            const firstDate = new Date(a.created_date)
            const secondDate = new Date(b.created_date)


            if (firstDate > secondDate) {
                return 1
            } else if (secondDate > firstDate) {
                return -1
            }

            return 0
        }
    },
    title: {
        name: 'Title',
        sortFn: (a, b) => {
            if (a.title > b.title) {
                return 1
            } else if (b.title > a.title) {
                return -1
            }

            return 0
        }
    }
}


// const sortOptions = [{
//     name: 'Date',
//     value: 'created_date',
//     sortFn: ''.
// }, {
//     name: 'Title',
//     value: 'title',
//     sortFn: ''
// }]

const sortOptions = Object.keys(sortConfig)


const App = () => {
    const {ideas, fetchIdeas, addIdea, deleteIdea, updateIdea} = useIdea()
    const [sortOption, setSortOption] = useState(sortOptions[1])
    const sortFn = sortConfig[sortOption].sortFn

    React.useEffect(() => {
        fetchIdeas()
    }, [])


    const ideasElement = ideas.sort(sortFn).map(idea => <Card idea={idea}
                                                              key={idea.id}
                                                              onDelete={deleteIdea}
                                                              onUpdate={updateIdea}
    />)

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
                    onChange={(e) => setSortOption(e.target.value)}>
                    {sortOptions.map(option => <option value={option}>{option}</option>)}
                </select>
            </div>

            <div className='cards__container'>
                {ideasElement}
            </div>
        </div>
    )
}

export default App
