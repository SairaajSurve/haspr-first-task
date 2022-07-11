const { ValidateSignature } = require('../utility/PasswordUtility')

module.exports.Authenticate = async(req, res, next) =>{
    const validate = await ValidateSignature(req);
    if(validate){
        next()
    }
    else{
        return res.json({msg:"Authorization failed"})
    }
}