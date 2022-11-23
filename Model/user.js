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
    followers:[{
        author:{
             type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
           
     }],
    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user" 
         }
]
})

userSchema.methods.follower = function(d){
    this.followers.push(d)
    return this.save()
}

userSchema.methods.follow = (user_id)=>{
    if(this.following.indexOf(user_id) === -1){
        this.following.push(user_id)
        return this.save();
    }
}

module.exports = mongoose.model("user", userSchema)