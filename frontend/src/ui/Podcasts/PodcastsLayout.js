const PodcastLayout = ({ children }) => {
    return (
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
            {children}
        </div>
    )
}

export default PodcastLayout
