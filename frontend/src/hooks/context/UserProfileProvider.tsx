import { createContext, useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'

export interface UserProfileInterface {
    username: string
    displayName?: string
    avatar: string
    bio?: string
    userId: string
}
export const UserProfileContext = createContext<UserProfileInterface[] | []>([])

const UserProfileProvider = (props) => {
    const { isAuthenticated, user, getAccessTokenSilently } = useAuth0()

    let [userProfile, setUserProfile] = useState<UserProfileInterface[] | []>(
        []
    )

    useEffect(() => {
        if (isAuthenticated) {
            //  ? check if UserProfile is null
            getData()
        }
    }, [isAuthenticated])

    const getData = async () => {
        try {
            let mounted = true
            const token = await getAccessTokenSilently()
            const userId = process.env.DEV_API_USER_URL
            const response = await axios({
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    authorization: `Bearer ${token}`,
                },
                method: 'post',
                url: 'http://127.0.0.1:3001/user',
                data: {
                    username: user.nickname,
                    displayName: user.nickname,
                    avatar: user.picture,
                    userId: user['http://127.0.0.1:3001/user'].userId,
                },
            })
                .then(function (response) {
                    return response
                })
                .then(function (response) {
                    const userProfile = response.data.userProfile
                    setUserProfile(userProfile)
                })

            return () => (mounted = false)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <UserProfileContext.Provider value={{ userProfile, isAuthenticated }}>
            {props.children}
        </UserProfileContext.Provider>
    )
}

export default UserProfileProvider
