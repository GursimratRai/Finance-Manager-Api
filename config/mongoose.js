const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/finance-manager-development');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error in Connecting to MongoDB"));

db.once('open',function(){
    console.log("Successfully Connected to mongoDB");
})

module.exports = db;