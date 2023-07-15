const express = require('express')
const jwt = require('jsonwebtoken')
const article = require('../Model/article')
const userSchema = require('../Model/user')
const { authorization } = require("../auth/auth")
const router = express.Router()


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
        tags:req.body.tags,
        read_time:req.body.read_time,
        author: req.user.fullname
    })

    await story.save();
    res.status(201).send("Blog Sucessfully published")
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
    text: req.body.text,
    author: req.user._id
  })
  console.log(story.comments)
  res.send('Commented Successfully')
})

//get all stories
router.get('/allStories', async(req, res)=>{
    const stories = await article.find()
    res.status(200).json(stories)
})

//get story
router.get('/story/:id', async(req, res)=>{
    const story = await article.findById({_id: req.params.id})
     const counts = story.count()
    res.send(story).json(story)
})

//get personal stories
router.get('/personalBlogs', authorization, async(req, res)=>{
    const stories = await article.aggregate([
        {
            $match:{author: req.user.fullname}
        }
    ])
    if(stories.length === 0 || !stories){
        return res.send("You've got no story")
    }

    res.send(stories).json(stories);
})

//filter Post By Tags
router.get('/blog', authorization, async(req, res)=>{
    const filter = await article.find({tags: { $in: [req.query.tags] }})
    if(filter.length === 0){
        return res.status(404).send("Couldn't find any post")
    }
    return res.status(200).send(filter)
})

router.patch('/updateBlogs/:id', authorization, async(req, res)=>{
const getBlog = await article.findById(req.params.id)

if(getBlog.author !== req.user.fullname){
    return res.status(403).send('You cant update other authors blog')
}
    const edit = await article.findByIdAndUpdate({_id: req.params.id}, {
        title: req.body.title,
        text: req.body.text,
        description: req.body.description,
        tags: req.body.tags
    })
    res.status(201).send('updated');
})

router.delete('/delblogs/:id', authorization, async(req, res)=>{
    const getBlog = await article.findById(req.params.id)
      if(getBlog.author !== req.user.fullname){
         return res.status(403).send('You cant delete other authors blog')
       }
    await article.findByIdAndDelete({_id: req.params.id})
    res.send('Blog deleted successfully')
  })

module.exports =  router