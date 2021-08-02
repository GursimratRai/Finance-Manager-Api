const express = require('express');
const router = express.Router();
const userController = require("../../../controller/api/v1/user_controller_api");
const passport = require('passport');

router.post('/login',userController.createSession);
router.post('/signup',userController.signUp);


module.exports = router;

