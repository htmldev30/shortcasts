const axios = require('axios')
require('dotenv').config()

getUserInfo = async (req) => {
    const accessToken = req.headers.authorization.split(' ')[1]
    return await axios
        .get(process.env.AUTH0_GET_USER_INFO, {
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        })
        .then((response) => {
            return response
        })
}

module.exports = { getUserInfo }
