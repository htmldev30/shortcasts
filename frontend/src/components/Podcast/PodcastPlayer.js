import React, { useState } from 'react'
import Link from 'next/link'

const PodcastPlayer = ({ title, description, podcast_cover, episode, id }) => {
    const [playPodcast, setPlayPodcast] = useState(false)

    function togglePlayPodcast() {
        setPlayPodcast(!playPodcast)
    }

    return (
        <>
            <div className="bg-gray-900 shadow-lg rounded p-3">
                <div className="group relative">
                    <img
                        className="w-full md:w-72 block rounded"
                        src={podcast_cover}
                        alt=""
                    />

                    <div className="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">
                        <button className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="bi bi-heart"
                                viewBox="0 0 16 16"
                            >
                                <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                            </svg>
                        </button>
                        <button
                            onClick={togglePlayPodcast}
                            className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
                        >
                            {playPodcast ? (
                                <svg
                                    className="w-16 h-16"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="w-16 h-16"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </button>
                        <Link href={`user/podcasts/${id}`} key={id}>
                            <button className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    className="bi bi-three-dots"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="p-5">
                    <h3 className="text-white text-lg">{title}</h3>
                    <p className="text-gray-300">
                        <strong>#{episode}</strong> - {description}
                    </p>
                </div>
            </div>
        </>
    )
}

export default PodcastPlayer
