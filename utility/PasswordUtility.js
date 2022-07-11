const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.GenerateSalt = async ()=>{
    return await bcrypt.genSalt()
}

module.exports.GeneratePassword = async (password, salt)=>{
    return await bcrypt.hash(password,salt)
}

module.exports.ValidatePassword = async (enteredPassword, savedPassword, salt) => {
    return await bcrypt.hash(enteredPassword,salt) === savedPassword
}

module.exports.GenerateSignature = async (payload) => {    
    return jwt.sign(payload,`${process.env.JWT_SECRET}`,{
        expiresIn: '1d'
    })
}


module.exports.ValidateSignature = async (req)=>{

    const signature = req.get('Authorization')  
    
    if(signature){
        const payload = await jwt.verify(signature.split(' ')[1],`${process.env.JWT_SECRET}`)

        req.user = payload;

        return true
    }

    return false
}