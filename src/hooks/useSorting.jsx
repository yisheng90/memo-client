import {useState, useCallback} from 'react'

export const sortOptions = ['Date', 'Title']

const sortByDate = (a, b) => {
    const firstDate = new Date(a.created_date).getTime()
    const secondDate = new Date(b.created_date).getTime()
    return firstDate - secondDate
}

const sortByTitle = (a, b) => {
    const firstTitle = a.title && a.title.toLowerCase()
    const secondTitle = b.title && b.title.toLowerCase()

    if (firstTitle > secondTitle) {
        return 1
    }

    if (firstTitle < secondTitle) {
        return -1
    }

    return 0
}

export const useSorting = (ideas) => {
    const [sortOption, setSortOption] = useState({
        field: sortOptions[0],
        sortable: true,
    })

    const updateSortOption = useCallback(
        values => setSortOption(prev => ({...prev, ...values})),
        []
    )

    let sortedIdeas = ideas

    if (sortOption.sortable) {
        sortedIdeas = sortOption.field === 'Title' ? ideas.sort(sortByTitle) : ideas.sort(sortByDate)
    }

    return {
        sortedIdeas,
        sortField: sortOption.field,
        disableSorting: () => updateSortOption({sortable: false}),
        enableSorting: () => updateSortOption({sortable: true}),
        updateSortingField: value => updateSortOption({field: value}),
    }
}
