const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({

    type:{
        type:String,
        required:true,
        enum : ['Income','Expense']
    },
    amount:{
        type:Number,
        required:true
    },
    source:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required: true
    },
    description:{
        type:String
    },
    category:{
        type:String,
        required:true
    },
    tags:[{
        type:String
    }],
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
},{
    timestamps:true
});

const transaction = mongoose.model('transaction',transactionSchema);

module.exports = transaction;