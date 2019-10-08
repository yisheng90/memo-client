import React, {useEffect} from 'react'

const API_URL = process.env.REACT_APP_API_URL

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

export const useIdea = (notify) => {
    const [ideas, setIdeas] = React.useState([])

    const haveEmptyIdea = ideas.find(idea => !idea.title)

    const fetchIdeas = async () => {
        const response = await fetch(`${API_URL}/ideas`)
        const data = await response.json()
        setIdeas(data)
    }

    const addIdea = async () => {
        if (haveEmptyIdea) return
        const response = await fetch(`${API_URL}/ideas`, {
            method: 'POST',
            headers,
        })
        const data = await response.json()

        if (data) {
            setIdeas(prev => [data, ...prev])
        }
    }

    const deleteIdea = async (id) => {
        const response = await fetch(`${API_URL}/idea/${id}`, {
            method: 'DELETE',
        })
        const data = await response.json()
        if (data.success) {
            setIdeas(prevValues => prevValues.filter(idea => idea.id !== id))
        }
    }

    const updateIdea = async (params) => {

        const response = await fetch(`${API_URL}/idea/${params.id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify({
                title: params.title,
                body: params.body,
            }),
        })

        const data = await response.json()
        if (data.success) {
            setIdeas(prevValues => {
                const index = prevValues.findIndex(idea => idea.id === params.id)
                prevValues[index] = params
                return [...prevValues]
            })
            notify(`${params.title} has been updated!`)
        }
    }

    useEffect(() => {
        fetchIdeas()
    }, [])


    return {
        ideas,
        haveEmptyIdea,
        fetchIdeas,
        addIdea,
        deleteIdea,
        updateIdea,
    }
}