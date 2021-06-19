import * as mongoose from 'mongoose'

export const UserProfileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: false,
    },
    avatar: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: false,
    },
    userId: {
        type: String,
        required: true,
    },
})
