import { createContext, useState, useEffect, useRef } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'

export const UserProfileContext = createContext()
const UserProfileProvider = (props) => {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0()
    let [isBusy, setIsBusy] = useState(true)
    let [userProfile, setUserProfile] = useState(null)

    useEffect(() => {
        if (isAuthenticated) {
            // ? check if UserProfile is null
            getData()
        }

        setIsBusy(false)
    }, [isAuthenticated])

    const getData = async () => {
        try {
            let mounted = true
            const token = await getAccessTokenSilently()
            const response = await axios.get(
                'http://localhost:3001/api/user/profile',
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            )
            const userProfile = response.data.response

            setUserProfile({ userProfile })

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
