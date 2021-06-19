import Head from 'next/head'
import Podcast from '../../components/Podcast/Podcast'
import PodcastsProvider from '../../hooks/context/PodcastsProvider'
import PodcastLayout from '../../ui/Podcasts/PodcastsLayout'
import ShrinkLayout from '../../ui/ShrinkLayout'
import CreatePodcast from './CreatePodcastModal'

interface DashboardPageProps {}
const UserPodcastPage = ({}: DashboardPageProps) => {
    return (
        <>
            <Head>
                <title>My Podcast | ShortCasts</title>
                <meta name="keywords" content="Record and edit your podcasts" />
            </Head>

            <PodcastsProvider>
                <ShrinkLayout>
                    <CreatePodcast />
                    <PodcastLayout>
                        <Podcast />
                    </PodcastLayout>
                </ShrinkLayout>
            </PodcastsProvider>
        </>
    )
}

export default UserPodcastPage
