import * as mongoose from 'mongoose'

export const UserPodcastSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Podcast must have a title'],
        maxlength: [32, 'Title is too long'],
        match: [
            /^(?![0-9_.-]+$)[ A-Za-zñáéíóúü0-9_.&-]*$/,
            'You may only use _ . - | Letters are required',
        ],
        trim: true,
    },
    description: {
        type: String,
        required: false,
        maxlength: [64, 'Description is too long'],
        trim: true,
    },
    episode: {
        type: Number,
        required: false,
    },
    podcastCoverFile: {
        type: String,
        required: [true, 'Podcast must have a cover'],
    },
    podcastAudioFile: {
        type: String,
        required: [true, 'Podcast must an audio file'],
    },
    podcastId: {
        type: String,
        required: true,
    },
    creatorId: {
        type: String,
        required: true,
    },
})
