const express = require('express');
const router = express.Router();

router.get('/',function(req,res){
    return res.json(200,{message : 'Welcome to Finance Manager Backend Server'});
});
router.get('/ping',function(req,res){
    return res.send(200,'pong');
});

router.use('/api',require('./api'));

module.exports = router;
