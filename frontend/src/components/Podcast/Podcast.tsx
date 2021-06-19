import { useContext } from 'react'
import {
    PodcastsContext,
    PodcastInterface,
} from '../../hooks/context/PodcastsProvider'
// Components
import PodcastPlayer from './PodcastPlayer'

const Podcast: React.FC = () => {
    // hook for data
    const { podcasts } = useContext<PodcastInterface[]>(PodcastsContext)

    // if no data, render loading
    if (!podcasts) return <>Loading...</>

    // render podcasts

    // just getting podcasts for the components and giving podcasts
    return (
        <>
            {podcasts.map((data) => (
                <PodcastPlayer
                    title={data.title}
                    episode={data.episode}
                    description={data.description}
                    cover={data.cover}
                    id={data.id}
                    key={data.key}
                />
            ))}
        </>
    )
}

export default Podcast
