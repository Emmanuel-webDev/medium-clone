const express = require('express');
const cookie = require('cookie-parser');
const mongoose  = require('mongoose');
const rateLimiter = require('express-rate-limit');

const cors = require('cors');

const user = require('./Controllers/user');
const article = require('./Controllers/article');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser()); 

app.use('/auth/',user);
app.use('/api',article);

mongoose.connect('mongodb://127.0.0.1:27017/medium', {UseNewUrlParser: true}).then(()=>{
    
app.use(rateLimiter({
    windowMs: 0.25 * 60 * 1000,
    max: 5,
    message: "To many request from this IP address, try again under 15secs" ,
    standardHeaders: true,
    legacyHeaders: false
}))

app.use((err, req, res, next)=>{
    console.log(err.message)
    return res.status(500).send('Server down...')
    next();
})

app.listen(process.env.PORT, ()=>{
    console.log("You've got this!!")
})

}).catch((err)=>{
    console.log("mongoDB connection failed",err);
})
