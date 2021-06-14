import AccountInfoEdit from './AccountInfoEdit'
import Head from 'next/head'
import React, { useContext, useState } from 'react'
import { UserProfileContext } from '../../hooks/context/UserProfileProvider'
import AccountLogin from './AccountLogin'
const AccountPage = () => {
    const { userProfile, isAuthenticated } = useContext(UserProfileContext)

    if (isAuthenticated && Object.entries(userProfile).length === 0) {
        // if user is authenticated BUT userProfile === null do, wait till context changes it
        return <h1>Loading</h1>
    }

    return (
        <>
            <Head>
                <title>Account | ShortCasts</title>
                <meta name="keywords" content="Manage your account" />
            </Head>

            {isAuthenticated ? (
                <AccountInfoEdit userProfile={userProfile} />
            ) : (
                <AccountLogin />
            )}
        </>
    )
}

export default AccountPage
