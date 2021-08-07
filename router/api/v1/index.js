const express = require('express');
const router = express.Router();

//router for users
router.use('/users',require('./users'));
//router for transaction
router.use('/transaction',require('./transaction'));
module.exports = router;

