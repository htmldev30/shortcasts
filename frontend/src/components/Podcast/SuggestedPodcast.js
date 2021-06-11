const SuggestedPodcast = ({ podcastCreator }) => {
    // !fetch data with another function like in Podcast.js, add the author as :user/ then get data about that user's latest podcast
    return (
        <div className="shadow rounded-lg bg-highlight-500">
            <div className="flex items-center space-x-4 p-4">
                <div className="flex items-center p-4 bg-secondary-600 text-white rounded-lg">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-current w-7 h-7"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <path d="M17.997 18h-11.995l-.002-.623c0-1.259.1-1.986 1.588-2.33 1.684-.389 3.344-.736 2.545-2.209-2.366-4.363-.674-6.838 1.866-6.838 2.491 0 4.226 2.383 1.866 6.839-.775 1.464.826 1.812 2.545 2.209 1.49.344 1.589 1.072 1.589 2.333l-.002.619zm4.811-2.214c-1.29-.298-2.49-.559-1.909-1.657 1.769-3.342.469-5.129-1.4-5.129-1.265 0-2.248.817-2.248 2.324 0 3.903 2.268 1.77 2.246 6.676h4.501l.002-.463c0-.946-.074-1.493-1.192-1.751zm-22.806 2.214h4.501c-.021-4.906 2.246-2.772 2.246-6.676 0-1.507-.983-2.324-2.248-2.324-1.869 0-3.169 1.787-1.399 5.129.581 1.099-.619 1.359-1.909 1.657-1.119.258-1.193.805-1.193 1.751l.002.463z" />
                    </svg>
                </div>
                <div className="flex-1 justify-center">
                    <p className="text-text-500 font-semibold">
                        # | {podcastCreator}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SuggestedPodcast
