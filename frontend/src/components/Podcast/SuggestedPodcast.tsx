import { MenuIconOutlined, UserIconOutlined } from '../icons/index'
interface SuggestedPodcast {
    creator: string
}

const SuggestedPodcast = ({ creator }: SuggestedPodcast) => {
    // !fetch data with another function like in Podcast.js, add the author as :user/ then get data about that user's latest podcast
    // todo | or Just get data as prop from [id].js
    return (
        <div className="shadow rounded-lg bg-highlight-500">
            <div className="flex items-center space-x-4 p-4">
                <div className="flex items-center p-4 bg-secondary-600 text-white rounded-lg">
                    <UserIconOutlined />
                </div>
                <div className="flex-1 justify-center">
                    <p className="text-text-500 font-semibold"># | {creator}</p>
                </div>
            </div>
        </div>
    )
}

export default SuggestedPodcast
