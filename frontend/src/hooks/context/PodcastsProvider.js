import React, { createContext, useState, useEffect } from 'react'

export const PodcastsContext = createContext()

const PodcastsProvider = (props) => {
    let [podcasts, setPodcasts] = useState()

    useEffect(() => {
        let mounted = true
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((res) => res.json())
            .then((res) => {
                if (mounted) setPodcasts(res)
            })
        return () => (mounted = false)
    }, [])

    return (
        <PodcastsContext.Provider value={{ podcasts }}>
            {props.children}
        </PodcastsContext.Provider>
    )
}

export default PodcastsProvider
