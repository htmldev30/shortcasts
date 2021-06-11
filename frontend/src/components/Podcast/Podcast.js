import { useContext } from 'react'
import { PodcastsContext } from '../../hooks/context/PodcastsProvider'
// Components
import PodcastPlayer from './PodcastPlayer'

const Podcast = () => {
    // hook for data
    const { podcasts } = useContext(PodcastsContext)

    // if no data, render loading
    if (!podcasts) return <>Loading...</>

    // render podcasts

    // just getting podcasts for the components and giving podcasts
    return (
        <>
            {podcasts.map((data) => (
                <PodcastPlayer
                    id={data.id}
                    key={data.id}
                    title={data.name}
                    episode={data.age}
                    description={data.company.catchPhrase}
                    podcast_cover="https://upload.wikimedia.org/wikipedia/en/f/f1/Tycho_-_Epoch.jpg"
                />
            ))}
        </>
    )
}

export default Podcast
