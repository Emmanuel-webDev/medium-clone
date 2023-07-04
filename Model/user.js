const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true 
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

userSchema.statics.signup = async function(fullname,email,password){

    const userExist = await this.findOne({email: email});

    if(userExist){
        return res.status(403).send('Email is already in use');
    }

    if (!fullname || !email || !password) {
        throw Error('All fields must be filled!');
    }

    if (!validator.isEmail(email)) {
        throw Error('E-mail is not valid');
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('password is not strong enough');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const userCreated = await this.create({fullname,email,password:hash});

   return userCreated;
}

module.exports = mongoose.model("user", userSchema)

    /*
        const author = new user({
      fullname:req.body.fullname,
      email: req.body.email,
      password: req.body.password
    })
    */