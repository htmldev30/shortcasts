import { Document } from 'mongoose'

export interface IUserPodcast extends Document {
    readonly title: string
    readonly description: string
    readonly episode: number
    readonly podcastCoverFile: string
    readonly podcastAudioFile: string
    readonly podcastId: string
    readonly creatorId: string
}
