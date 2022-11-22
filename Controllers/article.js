const express = require('express')
const jwt = require('jsonwebtoken')
const article = require('../Model/article')
const userSchema = require('../Model/user')
const user = require('../Controllers/user')

const router = express.Router()

const authorization = async (req, res, next)=>{
    const token = req.cookies.access_token
    const verification = jwt.verify(token, process.env.SECRET)

    if(!verification){
        return res.ststus(403).send('Forbidden')
    }

    const user = await userSchema.findById(verification.id)
    req.user = user

    next();
}

//write a story
router.post("/publish", authorization, async(req, res)=>{
     
    const {read_time, text} = req.body
     const amountOfWords = text.split(" ").length
     const timeTaken = Math.round(amountOfWords / 200)
     req.body.read_time = timeTaken

    const story = new article({
        title: req.body.title,
        description: req.body.description,
        text: req.body.text,
        read_time:req.body.read_time,
        author: req.user.fullname
    })

    await story.save();
    res.send(story)
})

//claps
router.post('/clap/:id', async(req, res)=>{
   const story = await article.findById({_id: req.params.id})
   const clap = story.clap()
   res.send('You clapped')
})

//write a comment
router.post('/comment/:id', authorization, async (req, res)=>{
    const {comments}  = req.body
  const story = await article.findById({_id: req.params.id})
  const addComment = story.comment({
    author: req.user._id,
    text: req.body.comments
  })
  res.send('ok')
})

//get all stories
router.get('/allStories', async(req, res)=>{
    const stories = await article.find()
    res.send(stories)
})

//get story
router.get('/story/:id', async(req, res)=>{
    const story = await article.findById({_id: req.params.id})
     const counts = story.count()
    res.send(story)
})

module.exports = router