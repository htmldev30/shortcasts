// Code adapted from NEXT JS Documentation Example "getStaticPaths" and "getStaticProps"
// https://nextjs.org/docs/basic-features/data-fetching/get-static-paths
// https://nextjs.org/docs/basic-features/data-fetching/get-static-props
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Modal from 'react-modal'

import ExplorePodcastInfo from '../../../modules/explore/ExplorePodcastInfo'
import { UserProfileContext } from '../../../hooks/context/UserProfileProvider'
import CreatePodcastForm from '../../../modules/user-podcasts/CreatePodcastForm'
import { GetStaticProps, GetStaticPaths } from 'next'


export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await res.json()

    const paths = data.map((user) => {
        return {
            params: { userId: user.id.toString() },
        }
    })
    return {
        paths,
        fallback: false,
    }
}
export const getStaticProps: GetStaticProps = async (context) => {
    const userId = context.params.userId
    const res = await fetch(
        'https://jsonplaceholder.typicode.com/users/' + userId
    )
    const data = await res.json()

    return {
        props: { data: data },
    }
}
const ExploreUserPodcastPage = ({ data }) => {
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
                <title>{data.name} | ShortCasts</title>
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
                        <CreatePodcastForm
                            closeShowModal={closeShowModal}
                            data={data}
                        />
                    ) : (
                        <ExplorePodcastInfo
                            closeShowModal={closeShowModal}
                            data={data}
                        />
                    )}
                </div>
            </Modal>
        </>
    )
}

export default ExploreUserPodcastPage
