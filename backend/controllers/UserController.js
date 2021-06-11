require('dotenv').config()
const UserProfile = require('../models/UserProfile')
const { getUserInfo } = require('../middlewares/user/getUserInfo')
const index = async (req, res, next) => {
    try {
        // calling getUserInfo because: getting username of current user, to search DB
        const response = await getUserInfo(req)
        const userInfo = response.data
        const getUserByUserId =
            userInfo['http://localhost:3001/api/user/profile'].userId
        UserProfile.findOne(
            { userId: getUserByUserId },
            'username avatar displayName'
        )
            .then((response) => {
                res.json({
                    response,
                })
            })
            .catch((error) => {
                res.json({
                    message: `An Error occurred | ${error}`,
                })
            })
    } catch (error) {
        console.log('error')
        res.send(error.message)
    }
}

module.exports = { index }
