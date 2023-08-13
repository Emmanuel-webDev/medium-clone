const mongoose = require('mongoose')


const mongoOpt = {
    useNewUrlParser : true,
    useUnifiedTopology: true
}

async function connectDB(MONGO_URL){

    try{
       const connection = mongoose.connect(MONGO_URL, mongoOpt);
         if(connection){
            console.log('DB is connected')
         }
    }catch(err){
       console.log("Couldn't connect to db", err.message);
    }
}

module.exports = connectDB