const joi = require('joi')

const validator = joi.object({
    fullname: joi.string().min(5).max(30).required(),
   email: joi.string().email({minDomainSegments: 2, tlds:{allow:['com', 'net']}}).required(),
   password: joi.string().required(),
 
})

 const validation = async (req, res, next)=>{

   const value = await validator.validateAsync(req.body)
   console.log(value.details)
  
  next()
}

module.exports= validation