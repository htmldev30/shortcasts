import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Modal from 'react-modal'
import axios from 'axios'
import ExplorePodcastInfo from '../../../../modules/explore/ExplorePodcastInfo'
import { UserProfileContext } from '../../../../hooks/context/UserProfileProvider'
import EditPodcastForm from '../../../../modules/user-podcasts/EditPodcastForm'
import { GetStaticProps, GetStaticPaths } from 'next'

// todo | API that has podcast data; when requested brings data; by user id;
// todo ? | So all userId's and modal is the one of the actual user podcast|

const ExploreUserPodcastPage = ({ podcastData }) => {
    const { userProfile, isAuthenticated } = useContext(UserProfileContext)

    const router = useRouter()

    const [showModal, setShowModal] = useState(true)

    const closeShowModal = () => {
        setShowModal(false)
        router.back()
    }

    if (isAuthenticated && userProfile === null) {
        return <h1>Loading</h1>
    }

    return (
        <>
            <Head>
                <title>{podcastData.title} | ShortCasts</title>
                <meta name="keywords" content="Manage your account" />
            </Head>
            <Modal
                isOpen={showModal}
                onRequestClose={closeShowModal}
                className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
                overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                contentLabel="Podcast User Title"
            >
                <div>
                    {isAuthenticated ? (
                        <EditPodcastForm
                            closeShowModal={closeShowModal}
                            podcastData={podcastData}
                        />
                    ) : (
                        <ExplorePodcastInfo
                            closeShowModal={closeShowModal}
                            data={podcastData}
                        />
                    )}
                </div>
            </Modal>
        </>
    )
}

// Todo Add AccessToken or something
// Getting the query of the url ?? WORKING THO!
ExploreUserPodcastPage.getInitialProps = async ({
    query: { podcastId, userId },
}) => {
    const response = await axios({
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        method: 'GET',
        url: `http://127.0.0.1:3001/user-podcast/${userId}/${podcastId}`,
    })
        .then(function (response) {
            return response
        })
        .then(function (response) {
            return response
        })
    const podcastData = response.data.oneUserPodcast
    return { podcastData: podcastData }
}

export default ExploreUserPodcastPage
