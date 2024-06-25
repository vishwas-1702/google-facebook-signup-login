var express = require('express');
const router = express.Router();

const userController = require('./googleController')



router.get('/v1/google/signup',userController.googleSignup)      
router.get('/auth/google/callback', userController.googleAuthCallback);

module.exports = router