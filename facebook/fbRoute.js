var express = require('express');
const router = express.Router();

const facebookController = require('./fbController')

router.get('/auth/facebook', facebookController.facebookSignup);
router.get('/auth/facebook/callback',facebookController.facebookCallback );
module.exports = router