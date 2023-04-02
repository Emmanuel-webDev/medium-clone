const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
       title: String,
       description: String,
       text: String,
       tags:[{type:String}],
       author: {
        type: String,
        ref:"user"
       },
       claps:{
        type:Number,
        default: 0
       },
       read_count:{
        type: Number,
        default: 0
       },
       read_time:{
        type:Number,
        default: 0
       },
       comments:[
        {
            author:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"user"
            },
            text: String
        }
       ]
});

articleSchema.methods.clap = function(){
    this.claps++
    return this.save();
}

articleSchema.methods.count = function(){
    this.read_count++
    return this.save();
}

articleSchema.methods.comment = function(c){
   this.comments.push(c)
   return this.save();
}

module.exports = mongoose.model('article', articleSchema);