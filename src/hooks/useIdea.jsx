import {useState, useEffect} from 'react'

const API_URL = process.env.REACT_APP_API_URL

const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
}

export const useIdea = notify => {
    const [loading, setLoading] = useState(true)
    const [ideas, setIdeas] = useState([])

    const fetchIdeas = async () => {
        setLoading(true)
        const response = await fetch(`${API_URL}/ideas`)
        const data = await response.json()
        setIdeas(data)
        setLoading(false)
    }

    const addIdea = async () => {
        const response = await fetch(`${API_URL}/ideas`, {
            method: 'POST',
            headers,
        })
        const data = await response.json()

        if (data) {
            setIdeas(prev => [data, ...prev])
            window.location.href = `${window.location.href}#${data.id}`
        }
    }

    const deleteIdea = async id => {
        const response = await fetch(`${API_URL}/idea/${id}`, {
            method: 'DELETE',
        })
        const data = await response.json()
        if (data.success) {
            fetchIdeas()
        }
    }

    const updateIdea = async params => {
        const response = await fetch(`${API_URL}/idea/${params.id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify({
                title: params.title,
                body: params.body,
            }),
        })

        const data = await response.json()
        let oldIdea = {}
        if (data.success) {
            setIdeas(prevValues => {
                const index = ideas.findIndex(idea => idea.id === params.id)
                oldIdea = Object.assign(prevValues[index])
                prevValues[index] = params
                return [...prevValues]
            })
            notifySuccessUpdate(oldIdea, params)
        }
    }


    const notifySuccessUpdate = (oldValues, newValues) => {
        if (!newValues.title && !newValues.body) {
            return notify(`An empty idea has been created!`)
        }

        if (oldValues.title !== newValues.title && oldValues.body !== newValues.body) {
            return notify(`Idea ${oldValues.title || 'untitled'} has been updated!`)
        }

        if (oldValues.title !== newValues.title) {
            return notify(`The title of ${oldValues.title || 'untitled'} has been updated to ${newValues.title || 'untitled'}!`)
        }

        if (oldValues.body !== newValues.body) {
            return notify(`The body of ${oldValues.title || 'untitled'} has been updated!`)
        }
    }

    useEffect(() => {
        if (!loading) return
        fetchIdeas()
    }, [loading])

    return {
        ideas,
        addIdea,
        deleteIdea,
        updateIdea,
    }
}
