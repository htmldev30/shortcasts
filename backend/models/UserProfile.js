const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userProfileSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
        },
        displayName: {
            type: String,
            default: '',
        },
        userId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

const UserProfile = mongoose.model('UserProfile', userProfileSchema)
module.exports = UserProfile
