const joi = require('joi')

const validator = joi.object({
  fullname: joi.string().min(5).max(30).required(),
  email: joi.string().email({minDomainSegments: 2, tlds:{allow:['com', 'net']}}).lowercase().required(),
  password: joi.string().required().min(8),
 
})

 const validation = async (req, res, next)=>{
try{
   const value = await validator.validateAsync(req.body)
}catch(err){
  return res.status(406).send(err.details[0].message)
}
  
  next()
}

module.exports= validation