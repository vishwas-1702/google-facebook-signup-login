var express = require('express');
const router = express.Router();
const {protectRoute} = require('../middleware/protectedRoute')


const userController = require('./googleController')



router.get('/v1/google/signup',userController.googleSignup)      
router.get('/auth/google/callback', userController.googleAuthCallback);
router.get('/auth/getMe',protectRoute,userController.getUser)

module.exports = router