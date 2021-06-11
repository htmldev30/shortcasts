const express = require('express')

const router = express.Router()

const UserController = require('../controllers/UserController')
const createUserProfile = require('../middlewares/createUserProfile')

router.get('/profile', createUserProfile, UserController.index)

module.exports = router
