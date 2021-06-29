import React, { createContext, useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'

export interface PodcastInterface {
    title: string
    description: string
    cover: string
    audio: string
    episode: number
    key: number
    id: number
}
export const PodcastsContext = createContext<PodcastInterface[] | []>([])

const PodcastsProvider = (props) => {
    const { isAuthenticated, user, getAccessTokenSilently } = useAuth0()

    let [allUserPodcasts, setAllUserPodcasts] = useState<
        PodcastInterface[] | []
    >([])
    const [userPodcastsUpdated, setUserPodcastsUpdated] = useState(false)
    useEffect(() => {
        if (isAuthenticated || userPodcastsUpdated) {
            getAllUserPodcasts()
        }
    }, [isAuthenticated, userPodcastsUpdated])
    const getAllUserPodcasts = async () => {
        try {
            let mounted = true
            const token = await getAccessTokenSilently()
            const userId = user['http://127.0.0.1:3001/user'].userId
            const response = await axios({
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    authorization: `Bearer ${token}`,
                },
                method: 'get',
                url: `http://127.0.0.1:3001/user-podcast/${userId}`,
            })
                .then(function (response) {
                    return response
                })
                .then(function (response) {
                    const allUserPodcasts = response.data.allUserPodcasts
                    setAllUserPodcasts(allUserPodcasts)
                    setUserPodcastsUpdated(false)
                })
            return () => (mounted = false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <PodcastsContext.Provider
            value={{ allUserPodcasts, isAuthenticated, setUserPodcastsUpdated }}
        >
            {props.children}
        </PodcastsContext.Provider>
    )
}

export default PodcastsProvider
