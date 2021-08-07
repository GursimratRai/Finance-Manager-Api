//Acquiring mongoose
const mongoose = require('mongoose');

//Creating a Schema
const userSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    transactions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'transaction'
    }]
},{
    timestamps:true
})

const User = mongoose.model('user',userSchema);

module.exports = User;