import React from 'react'
interface PodcastLayoutProps {
    children: React.ReactNode
}
const PodcastLayout = ({ children }: PodcastLayoutProps) => {
    return (
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4 place-items-center p-5">
            {children}
        </div>
    )
}

export default PodcastLayout
