// Code adapted from Kitwind.io Free UI (base) Components
// https://kitwind.io/products/kometa/components
import React, { useState } from 'react'
import Link from 'next/link'
import {
    PauseIconOutlined,
    PlayIconOutlined,
    HeartIconOutlined,
    TriDotHIconOutlined,
} from '../../icons/index'

const iconColors = {
    white: '#ffffff',
    primary: '#E63B19',
}
interface PodcastPlayerProps {
    title: string
    description: string
    cover: string
    episode: Number
    userId: number
    podcastId: number
    children: React.ReactNode
}
export default function PodcastCard({
    title,
    description,
    cover,
    episode,
    podcastId,
    userId,
    children,
}: PodcastPlayerProps) {
    const [playPodcast, setPlayPodcast] = useState(false)

    const togglePlayPodcast = () => {
        setPlayPodcast(!playPodcast)
    }

    return (
        <>
            <div className="bg-gray-900 shadow-lg rounded p-3 h-full">
                <div className="group relative">
                    <img
                        className="w-full md:w-72 block rounded h-72"
                        src={cover}
                        alt=""
                    />

                    <div className="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">
                        <button className="hover:scale-110 opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
                            <HeartIconOutlined
                                style={{
                                    stroke: `${iconColors.white}`,
                                    width: '24px',
                                    height: '24px',
                                }}
                            />
                        </button>

                        <button
                            onClick={togglePlayPodcast}
                            className="hover:scale-110  opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
                        >
                            {playPodcast ? (
                                <PauseIconOutlined
                                    style={{
                                        stroke: `${iconColors.white}`,
                                    }}
                                />
                            ) : (
                                <PlayIconOutlined
                                    style={{
                                        stroke: `${iconColors.white}`,
                                    }}
                                />
                            )}
                        </button>

                        <Link
                            href={`user/${userId}/podcasts/${podcastId}`}
                            key={userId}
                        >
                            <button className="hover:scale-110  opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
                                <TriDotHIconOutlined
                                    style={{
                                        stroke: `${iconColors.white}`,
                                        width: '24px',
                                        height: '24px',
                                    }}
                                />
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="p-5">
                    {children}
                    <h3 className="text-white text-lg">{title}</h3>
                    <p className="text-gray-400 text-sm">
                        #{episode} - {description}
                    </p>
                </div>
            </div>
        </>
    )
}
