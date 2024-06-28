var express = require('express');
const router = express.Router();
const {protectRoute} = require('../middleware/protectedRoute')

const signupController = require('./signupController');

router.post('/v1/userSignup',signupController.regUser)
router.post('/v1/userLogin',signupController.login)
router.get('/v1/getCurrentUser',protectRoute,signupController.getUser)

module.exports = router