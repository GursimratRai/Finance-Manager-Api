const express = require('express');
const router = express.Router();
const passport = require('passport');
const transactionController = require('../../../controller/api/v1/transaction_controller_api');

router.post('/create',passport.authenticate('jwt',{session:false}),transactionController.create);
router.post('/update',passport.authenticate('jwt',{session:false}),transactionController.update);
router.post('/delete',passport.authenticate('jwt',{session:false}),transactionController.destroy);
router.get('/transactions',passport.authenticate('jwt',{session:false}),transactionController.index);
router.get('/searchByRange',passport.authenticate('jwt',{session:false}),transactionController.searchByRange);

module.exports = router;

