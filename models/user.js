const mongoose = require('mongoose');

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
    }],
    incomes:[{
        type : mongoose.Schema.Types.ObjectId,
        ref:'income'
    }],
    expenses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'expense'
    }]
},{
    timestamps:true
})

const User = mongoose.model('user',userSchema);

module.exports = User;