import React, { createContext, useState, useEffect } from 'react'

export interface PodcastInterface {
    title: string
    description: string
    cover: string
    episode: number
    key: number
    id: number
}
export const PodcastsContext = createContext<PodcastInterface[] | []>([])

const PodcastsProvider = (props) => {
    let [podcasts, setPodcasts] = useState<PodcastInterface[] | []>([
        {
            title: 'The Galaxy Podcast',
            description: 'A fun podcast about the galaxy',
            cover: 'https://i.pinimg.com/originals/fc/d6/f1/fcd6f16039cc4c5ec88b483f6d4eeb74.jpg',
            episode: 1,
            key: 1,
            id: 1,
        },
    ])

    setPodcasts
    return (
        <PodcastsContext.Provider value={{ podcasts }}>
            {props.children}
        </PodcastsContext.Provider>
    )
}

export default PodcastsProvider
