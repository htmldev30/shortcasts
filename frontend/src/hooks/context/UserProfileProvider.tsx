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

    const [userUpdated, setUserUpdated] = useState(false)

    useEffect(() => {
        if (isAuthenticated || userUpdated) {
            //  ? check if UserProfile is null

            getUserProfile()
        }
    }, [isAuthenticated, userUpdated])

    const getUserProfile = async () => {
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
                url: `http://127.0.0.1:3001/user/${userId}`,
            })
                .then(function (response) {
                    return response
                })
                .then(function (response) {
                    const userProfile = response.data.userProfile
                    setUserProfile(userProfile)
                    setUserUpdated(false)
                })

            return () => (mounted = false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <UserProfileContext.Provider
            value={{ userProfile, isAuthenticated, setUserUpdated }}
        >
            {props.children}
        </UserProfileContext.Provider>
    )
}

export default UserProfileProvider
