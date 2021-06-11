const express = require('express')
const cors = require('cors')
const verifyJwt = require('./middlewares/isAuthenticated')
const mongoose = require('mongoose')
const UserRouter = require('./routes/user')

const app = express()

// Connect with db
mongoose.connect(process.env.MONGODB_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection
    .once('open', function () {
        console.log('Connection has been made to DATABASE')
    })
    .on('error', function (error) {
        console.log(error)
    })

app.use(cors())
app.use(express.json())

app.use(verifyJwt)

app.listen(3001, () => {
    console.log('Listening on port 3001')
})

app.use('/api/user', UserRouter)
