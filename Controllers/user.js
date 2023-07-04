const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
const user = require('../Model/user')
const article = require('../Controllers/article')
const jois = require('../inputsValidator')


const route = express.Router();

const createToken = (_id)=>{
  return jwt.sign({_id},process.env.SECRET,{expiresIn:'1d'});
}

route.post('/signup', async(req, res)=>{
    const {fullname, email, password}= req.body

    try {
      const User = user.signup(fullname,email,password);

      // const token = jwt.sign({_id:User._id},process.env.SECRET,{ expiresIn: '1d'});

      const token = createToken(User._id);

      res.status(200).json({fullname,token:token});
    } catch (error) {
      res.status(400).json({error:error});
    }

    res.status(200).send("Author Created");

})

route.post('/login', async(req, res)=>{

  const {email, password} = req.body

  const userExist = await user.findOne({email: email});
  
  if(!userExist){
    return res.status(403).send('User not found with this email');  
  }
  
  const checkPassword = await bcrypt.compare(password, userExist.password);


  if (!email || !password) {
    throw Error('All fields must be filled!');
  }

  if(!checkPassword){
    return res.status(403).send("Password incorrect");
  }

  const token = createToken(userExist._id);

  res.status(200).json({email,token});

  /*

    // res.cookie('access_token', token,{
    //   httpOnly:true,
    //   secure:false
    // }).send('Yay!!! login successful').json({email,token})

    // res.send("Logged in Successfully");

  */

})


//JWT verification Code:
const auth = async (req, res, next)=>{
  
  const token = req.cookies.access_token
  const verification = jwt.verify(token, process.env.SECRET);

  if(!verification){
    return res.ststus(403).send('Forbidden');
  }

  const currentUser = await user.findById(verification.id)
  req.user = currentUser

  next();
}

route.post('/follow/:id', auth, async(req, res)=>{
  const author = await user.findById({_id: req.params.id})
  const action = author.follower({
    author: req.user._id
  })
   
  res.send('You followed');
})


route.get('/user/:id', async(req, res)=>{
const person = await user.findById({_id: req.params.id})
if(!person){
  return res.status(404).send('User not found')
}

  const authIFollow = await user.aggregate([
    {
      $match:{followers:{$elemMatch:{author: person._id}}}
    }
  ])

  person.following = []
  authIFollow.forEach((user)=>{
  person.following.push({author: user._id})
 })
 person.save();
  
  res.send(person)
})

route.get('/users', async(req, res)=>{
  res.send(await user.find())
})

route.delete('/del', async(req, res)=>{
  await user.deleteMany()
  res.send('Done')
})



route.post('/logout', auth, async(req, res)=>{
  return res.clearCookie('access_token').send("You logged out")
})


module.exports = route