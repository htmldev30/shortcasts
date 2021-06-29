import '../../styles/globals.css'

import { Auth0Provider } from '@auth0/auth0-react'
import UserProfileProvider from '../hooks/context/UserProfileProvider'
import { AppProps } from 'next/app'
import Modal from 'react-modal'
// UI
import Layout from '../ui/Layout'

Modal.setAppElement('#__next')

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Auth0Provider
            domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
            clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
            redirectUri={process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI}
            audience={process.env.NEXT_PUBLIC_AUTH0_AUDIENCE}
            scope={process.env.NEXT_PUBLIC_SCOPE}
        >
            <UserProfileProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </UserProfileProvider>
        </Auth0Provider>
    )
}

export default MyApp
