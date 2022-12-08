const express = require('express');
const cookie = require('cookie-parser');
const mongoose  = require('mongoose');
const rateLimiter = require('express-rate-limit')
const user = require('./Controllers/user')
const article = require('./Controllers/article') 
require('dotenv').config()

const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/medium', {UseNewUrlParser: true}).then(()=>{

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookie())
app.use(rateLimiter({
    windowMs: 0.25 * 60 * 1000,
    max: 5,
    message: "To many request from this IP address, try again under 15secs" ,
    standardHeaders: true,
    legacyHeaders: false
}))
app.use(user)
app.use(article)
app.use((err, req, res, next)=>{
    console.log(err)
    return res.status(500).send('Server down...')
})

app.listen(process.env.PORT, ()=>{
    console.log("You've got this!!")
})

})
