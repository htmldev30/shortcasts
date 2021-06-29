import Head from 'next/head'
import Podcast from '../../components/Podcast/Podcast'
import PodcastsProvider from '../../hooks/context/PodcastsProvider'
import PodcastLayout from '../../ui/Podcasts/PodcastsLayout'
import ShrinkLayout from '../../ui/ShrinkLayout'
import CreatePodcast from './CreatePodcastModal'
import { UserProfileContext } from '../../hooks/context/UserProfileProvider'
import React, { useContext } from 'react'
interface DashboardPageProps {}
const UserPodcastPage = ({}: DashboardPageProps) => {
    const { isAuthenticated } = useContext(UserProfileContext)
    return (
        <>
            <Head>
                <title>My Podcast | ShortCasts</title>
                <meta name="keywords" content="Record and edit your podcasts" />
            </Head>

            <PodcastsProvider>
                <ShrinkLayout>
                    {isAuthenticated ? <CreatePodcast /> : null}

                    <PodcastLayout>
                        <Podcast />
                    </PodcastLayout>
                </ShrinkLayout>
            </PodcastsProvider>
        </>
    )
}

export default UserPodcastPage
