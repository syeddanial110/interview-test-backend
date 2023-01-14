const express = require('express')
const router = express.Router()
const { signUp } = require('../controller/userController')

router.post('/signup', signUp)

module.exports = router
