import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import { UserProfileContext } from '../hooks/context/UserProfileProvider'
const SetupProfile = () => {
    const router = useRouter()
    const { setUserUpdated } = useContext(UserProfileContext)
    const { isAuthenticated, user, getAccessTokenSilently } = useAuth0()
    useEffect(() => {
        if (isAuthenticated) {
            //  ? check if UserProfile is null

            postUserProfileData()
        }
    }, [isAuthenticated])
    const postUserProfileData = async () => {
        try {
            let mounted = true
            const token = await getAccessTokenSilently()

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
                    isVerified: user.email_verified,
                    userId: user['http://127.0.0.1:3001/user'].userId,
                },
            })
            setUserUpdated(true)
            router.push('/account')

            return () => (mounted = false)
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <Head>
            <title>Loading | ShortCasts</title>
            <meta name="keywords" content="Record and edit your podcasts" />
        </Head>
    )
}

export default SetupProfile
