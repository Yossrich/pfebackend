const express = require('express')

// controller functions
const { loginAdmin, signupAdmin } = require('../Controllers/adminloginControllers.js')

const router = express.Router()

// login route
router.post('/login', loginAdmin)

// signup route
router.post('/signup', signupAdmin)

module.exports = router