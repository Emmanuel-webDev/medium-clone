const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:[true,"Your name is required"]
    },
    email:{
        type:String,
        required:[true, "Your email address is required"],
        unique:true 
    },
    password:{
        type:String,
        required:[true, "Your password is required"],
    },
    followers:[{
        author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
           
     }],
    following:[{
        author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user" 
        }
    }]
})

userSchema.methods.follower = function(d){
    this.followers.push(d)
    return this.save()
}

userSchema.statics.signup = async function(fullname, email, password) {
    
    if (!fullname || !email || !password) {
        throw new Error('All fields must be filled!');
    }
    
    if (!validator.isEmail(email)) {
        throw new Error('E-mail is not valid');
        return;
    }
    
    if (!validator.isStrongPassword(password)) {
        throw new Error('Password is not strong enough');
        return;
    }
    
    const userExist = await this.findOne({ email });

    if (userExist) {
      throw new Error('Email is already in use');
    }  
  
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
  
    const newUser = await this({fullname, email, password: hash});

    const userCreated = await newUser.save();
  
    return userCreated;
  };
  

module.exports = mongoose.model("user", userSchema)
