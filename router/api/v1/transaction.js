const express = require('express');

//Use Express Router
const router = express.Router();

//Use Passport
const passport = require('passport');

//Transaction Controller
const transactionController = require('../../../controller/api/v1/transaction_controller_api');

//for creating a new transaction
router.post('/create',passport.authenticate('jwt',{session:false}),transactionController.create);
//for updating the transaction data
router.post('/update',passport.authenticate('jwt',{session:false}),transactionController.update);
//for deleting the transaction
router.post('/delete',passport.authenticate('jwt',{session:false}),transactionController.destroy);
//for fetching all the transactions
router.get('/transactions',passport.authenticate('jwt',{session:false}),transactionController.index);
//Search by date or range
router.get('/searchByRange',passport.authenticate('jwt',{session:false}),transactionController.searchByRange);

module.exports = router;

