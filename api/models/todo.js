const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    status:{
        type:String,
        enum:[ 'pending', 'completed'],
        default:'pending'
    },
    category:{
        type:String,
        require:true,
    },
    dueDate:{
        type:String,
        require:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
});

const Todo = mongoose.model( "Todo", todoSchema );
module.exports=Todo; 