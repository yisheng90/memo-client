import React from 'react'

const API_URL = 'http://localhost:9000'

export const useIdea = () => {
    const [ideas, setIdeas] = React.useState([])

    const fetchIdeas = async () => {
        const response = await fetch(`${API_URL}/ideas`)
        const data = await response.json()
        setIdeas(data)
    }

    const addIdea = async () => {
        const response = await fetch(`${API_URL}/ideas`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        if (data) {
            fetchIdeas()
        }
    }

    const deleteIdea = async (id) => {
        const response = await fetch(`${API_URL}/idea/${id}`, {
            method: 'DELETE',
        })
        const data = await response.json()
        if (data.success) {
            fetchIdeas()
        }
    }

    const updateIdea = async ({id, title, body}) => {

        const response = await fetch(`${API_URL}/idea/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                body
            })
        })

        const data = await response.json()
        console.log("data", data)
        if (data.success) {
            fetchIdeas()
        }
    }


    return {
        ideas,
        fetchIdeas,
        addIdea,
        deleteIdea,
        updateIdea,
    }
}