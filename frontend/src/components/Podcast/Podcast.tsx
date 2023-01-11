import { useContext } from 'react'
import {
    PodcastsContext,
    PodcastInterface,
} from '../../hooks/context/PodcastsProvider'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

// Components
import PodcastCard from '../UIComponents/Podcast/PodcastCard'
import PodcastPlayer from './PodcastPlayer'

const Podcast: React.FC = () => {
    // hook for data
    const { allUserPodcasts, isAuthenticated } = useContext(PodcastsContext)
    if (isAuthenticated) {
        if (allUserPodcasts === null) {
            return <h1>Loading</h1>
        }
    }

    // just getting podcasts for the components and giving podcasts
    return (
        <>
            {allUserPodcasts.map((data) => (
                <PodcastCard
                    title={data.title}
                    episode={data.episode}
                    description={data.description}
                    cover={`http://${data.podcastCoverFile}`}
                    podcastId={data.podcastId}
                    userId={data.creatorId}
                    key={data.podcastId}
                >
                    <AudioPlayer
                        autoPlay={false}
                        showSkipControls={true}
                        showJumpControls={false}
                        customAdditionalControls={[]}
                        src={`http://${data.podcastAudioFile}`}
                        onPlay={(e) => console.log('onPlay')}
              
                    />
                </PodcastCard>
            ))}
        </>
    )
}

export default Podcast
