const express = require('express');

const router = express.Router()

const authController = require('../controllers/auth')


router.get('/register', (req,res)=>{
    res.json('register')
})

router.post('/register',authController.register)
router.post('/login',authController.login)

module.exports = router;