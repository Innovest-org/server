const express = require('express');
const UserAuthController = require('../controllers/user_auth.controller');
const router = express.Router();

var multer = require('multer')
var multParse = multer()

router.post('/' , multParse.any(),  UserAuthController.register);
router.post('/login', UserAuthController.login);

module.exports = router;