import { useState } from 'react'
import Modal from 'react-modal'
import UploadPodcastForm from './UploadPodcastForm'
import { UploadIconOutlined } from '../../components/icons/index'
import Button from '../../components/UIComponents/Button'
const buttonColor = {
    white: '#ffffff',
}
const UploadPodcast = () => {
    const [showModal, setShowModal] = useState(false)

    const openModal = () => {
        setShowModal(true)
    }
    const closeShowModal = () => {
        setShowModal(false)
    }
    return (
        <>
            <Modal
                isOpen={showModal}
                onRequestClose={closeShowModal}
                className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
                overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                contentLabel="Podcast User Title"
            >
                <div>
                    <UploadPodcastForm closeShowModal={closeShowModal} />
                </div>
            </Modal>
            <div className="flex justify-end">
                <div>
                    <Button
                        onClick={openModal}
                        className="mb-8"
                        transition={false}
                    >
                        <UploadIconOutlined
                            style={{ stroke: buttonColor.white }}
                        />
                        Upload
                    </Button>
                </div>
            </div>
        </>
    )
}

export default UploadPodcast
