const axios = require('axios')
require('dotenv').config()
const UserProfile = require('../models/UserProfile')
const { getUserInfo } = require('../middlewares/user/getUserInfo')

const createUserProfile = async (req, res, next) => {
    try {
        const response = await getUserInfo(req)
        const userInfo = response.data

        const getUserByUserId =
            userInfo['http://localhost:3001/api/user/profile'].userId
        // If user doesn't exist, create one
        UserProfile.findOne(
            { userId: getUserByUserId },
            function (err, result) {
                if (err) {
                    console.log(err)
                }
                if (!result) {
                    const userProfile = new UserProfile({
                        username: userInfo.nickname,
                        avatar: userInfo.picture,
                        userId: userInfo[
                            'http://localhost:3001/api/user/profile'
                        ].userId,
                    })
                    userProfile
                        .save()
                        .then((response) => {
                            console.log(`User Added SuccessFully | ${response}`)
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }
            }
        )
        next()
    } catch (error) {
        console.log(error)
        res.send(error.message)
    }
}

module.exports = createUserProfile
