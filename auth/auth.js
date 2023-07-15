//JWT verification Code:
 exports.authorization = async (req, res, next) => {

    const { authorization } = req.headers;
  
    if(!authorization){
      return res.status(401).json({error:'Authorization token required'});
    }
  
    const token = authorization.split(" ")[1]
    req.token = token;
  
    try {
      const {_id} = jwt.verify(token, process.env.SECRET);
      
      req.user = await user.findOne({_id}).select('_id');
      next();
      
    } catch (error) {
      res.status(401).send("Not authorized, invalid token");
    }
  };

  
