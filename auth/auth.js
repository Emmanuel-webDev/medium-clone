const users = require('../Model/user')
const jwt = require('jsonwebtoken')
require('dotenv').config();
//JWT verification Code:
 exports.authorizations = async(req, res, next) => {

    const { authorization } = req.headers;
  
    if(!authorization){
      return res.status(401).json({error:'Authorization token required'});
    }
  
    const token = authorization.split(" ")[1]
    req.token = token;
 
    if(token){
      const {_id} = jwt.verify(token, process.env.SECRET);
      //token expiration
      if(err.name === "TokenExpiredError"){
        return res.status(401).send("Token has expired login again")
      }
      req.user = await users.findOne({_id}).select('_id');
      next();
  }else{
    res.status(401).send("Not authenticated, invalid token");
  }
     
  
  };
  
