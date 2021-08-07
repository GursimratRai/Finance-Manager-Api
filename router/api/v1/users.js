const express = require('express');

//Use Express Router
const router = express.Router();

//Use Controller
const userController = require("../../../controller/api/v1/user_controller_api");

//Use Passport
const passport = require('passport');

//router for logging in the user
router.post('/login',userController.createSession);
//router for creating a new user
router.post('/signup',userController.signUp);

module.exports = router;

