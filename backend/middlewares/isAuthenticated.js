const jwt = require('express-jwt')
const jwks = require('jwks-rsa')
require('dotenv').config()

var verifyJwt = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.AUTH0_JWKS_URI,
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: process.env.AUTH0_ISSUER,
    algorithms: [process.env.AUTH0_ALGORITHM],
}).unless({ path: ['/', 'explore/'] })

module.exports = verifyJwt
