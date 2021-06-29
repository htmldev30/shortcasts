function BadPodcastFilesError(message = []) {
    this.name = 'BadPodcastFilesError'
    this.message = message
}
BadPodcastFilesError.prototype = Error.prototype

export default BadPodcastFilesError
