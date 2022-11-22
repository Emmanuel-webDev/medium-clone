const express = require('express');
const cookie = require('cookie-parser');
const mongoose  = require('mongoose');
const user = require('./Controllers/user')
const article = require('./Controllers/article') 
require('dotenv').config()

const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/medium', {UseNewUrlParser: true}).then(()=>{

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookie())
app.use(user)
app.use(article)

app.listen(process.env.PORT, ()=>{
    console.log("You've got this!!")
})

})
