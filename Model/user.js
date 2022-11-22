const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true 
    },
    password:{
        type:String,
        required:true
    },
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    ],
    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user" 
         }
]
})

module.exports = mongoose.model("user", userSchema)