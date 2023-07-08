const express = require('express');
const rateLimiter = require('express-rate-limit');
const cors = require('cors');
const user = require('./Controllers/user');
const article = require('./Controllers/article');
const DB = require('./dbConnection/db');
const { application } = require('express');
require('dotenv').config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.urlencoded({limit: "100mb", extended: true, parameterLimit:"500000"}));
app.use(express.json({limit: "100mb", extended: true}));
app.use((req, res, next)=>{
    res.setHeader('Content-Type', 'application/json')
    next();
})
app.use(rateLimiter({
    windowMs: 0.25 * 60 * 1000,
    max: 5,
    message: "To many request from this IP address, try again under 15secs" ,
    standardHeaders: true,
    legacyHeaders: false
}))

//db
DB(process.env.MONGO_URL);

app.use('/api/user',user);
app.use('/api',article);
    
//Response not found
app.use((req, res, next)=>{
    res.status(404).json('Resources not found')
    next()
})

//Server crashes 
app.use((err,req, res, next)=>{
    return res.status(500).send(err.message)
})

app.listen(process.env.PORT, ()=>{
    console.log("You've got this!!")
})

