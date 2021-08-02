const express = require('express');
const router = express.Router();

router.use('/users',require('./users'));
router.use('/transaction',require('./transaction'));
module.exports = router;

