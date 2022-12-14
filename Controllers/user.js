const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
const user = require('../Model/user')
const article = require('../Controllers/article')
const jois = require('../inputsValidator')


const route = express.Router()

route.post('/signup', async(req, res)=>{
    const {fullname, email, password}= req.body

    const hashed = await bcrypt.hash(password, 12)
    req.body.password = hashed

    const check = await user.findOne({email: email})
    if(check){
       return res.status(403).send('Email already assigned to a user')
    }

    const author = new user({
        fullname:req.body.fullname,
        email: req.body.email,
        password: req.body.password
    })

    await author.save();
    res.send("Author Created")

})

route.post('/login', async(req, res)=>{
  const {email, password} = req.body

  const userExist = await user.findOne({email: email})
  if(!userExist){
    return res.status(403).send('User not found') 
  }
  
  const checkPassword = await bcrypt.compare(password, userExist.password)
  if(!checkPassword){
    return res.status(403).send("Password incorrect")
  }

  const token = jwt.sign({id: userExist._id, date: new Date()}, process.env.SECRET, {expiresIn: '2hr'})

  res.cookie('access_token', token, {
    httpOnly:true,
    secure:false
}
).send('Yay!!! login successful')

})

const auth = async (req, res, next)=>{
  const token = req.cookies.access_token
  const verification = jwt.verify(token, process.env.SECRET)

  if(!verification){
      return res.ststus(403).send('Forbidden')
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
   
  res.send('You followed')
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