const express = require('express');
const db = require('./config/mongoose');
const port = 8000;
const app = express();
const router = express.Router();
const cors = require('cors');

const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy');

app.use(cors()); 

app.use(express.urlencoded());

app.use(express.json())

app.use('/',require('./router'));

app.listen(port,function(err){
    if(err){
        console.log('Error',err);
        return;
    }
    console.log(`Express Server is up and Running on Port : ${port}`);
})