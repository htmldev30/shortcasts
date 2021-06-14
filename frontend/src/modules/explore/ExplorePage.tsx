import Head from 'next/head'
import Podcast from '../../components/Podcast/Podcast'
import PodcastsProvider from '../../hooks/context/PodcastsProvider'
import PodcastLayout from '../../ui/Podcasts/PodcastsLayout'
import ShrinkLayout from '../../ui/ShrinkLayout'

interface ExplorePageProps {}
const ExplorePage = ({}: ExplorePageProps) => {
    return (
        <>
            <Head>
                <title>My Podcast | ShortCasts</title>
                <meta
                    name="keywords"
                    content="Explore and listen to new podcasts"
                />
            </Head>

            <PodcastsProvider>
                <ShrinkLayout>
                    <PodcastLayout>
                        <Podcast />
                    </PodcastLayout>
                </ShrinkLayout>
            </PodcastsProvider>
        </>
    )
}

export default ExplorePage
