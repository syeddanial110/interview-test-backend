const express = require('express')
const router = express.Router()
const { signIn, getAllUsers } = require('../controller/userController')

router.post('/signin', signIn)
router.get('/creators', getAllUsers)

module.exports = router
