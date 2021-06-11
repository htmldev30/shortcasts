import SuggestedPodcast from '../../components/Podcast/SuggestedPodcast'
import Button from '../../components/UIComponents/Button'
const ExplorePodcastInfo = ({
    podcastName,
    podcastCreator,
    closeShowModal,
}) => {
    return (
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg font-medium text-text-500">
                            {podcastName}
                        </h3>

                        <div className="mt-2">
                            <p className="text-text-500 text-sm font-bold">
                                Latest Cast
                            </p>

                            <div className="mt-2">
                                <SuggestedPodcast
                                    podcastCreator={podcastCreator}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <Button onClick={closeShowModal} color="gray">
                    Return
                </Button>
            </div>
        </div>
    )
}

export default ExplorePodcastInfo
