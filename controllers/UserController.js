const { User } = require('../models/UserModel')
const {GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword} = require('../utility/PasswordUtility')

module.exports.UserSignUp = async (req, res, next) => {
    
    const {name, password, email, data} = req.body

    const salt = await GenerateSalt()
    const userPassword = await GeneratePassword(password, salt)
    
    const result = await User.create({
        name: name,
        password: userPassword,
        salt: salt,
        email: email,
        admin: false,
        data: data
    })

    if (result) {

        const signature  = await GenerateSignature({
            _id: result._id,
        })
        return res.status(200).json(signature)
    }

    return res.status(400).json({message: "Error With SignUp"})
}

module.exports.UserLogin = async (req, res, next) => {

    const {password, email} = req.body

    const user = await User.findOne({email: email})

    if (user) {

        const validation = await ValidatePassword(password, user.password, user.salt)

        if (validation) {
            const signature  = await GenerateSignature({
                _id: user._id,
            })
            return res.status(200).json(signature)
        }
    }

    return res.status(400).json({message: "Error With Login"})
}

module.exports.GetUserData = async (req, res, next) => {

    const { _id } = req.user;

    if(_id) {
        const user = await User.findById(_id)
        
        if(user) {
            const { data } = user
            
            return res.status(200).json(data)
        }
    }
    return res.status(400).json({message: "Error With GetData"})
}

module.exports.EditUserData = async (req, res, next) => {
    
    const { _id} = req.user;
    const { data } = req.body;

    if(_id) {
        const user = await User.findById(_id)
        
        if(user) {
            
            user.data = data
            
            await user.save()
            
            return res.status(200).json(user)
        }
    }
    return res.status(400).json({message: "Error With EditData"})
}

module.exports.DeleteUserData = async (req, res, next) => {
    
    const { _id } = req.user;
    
    if(_id) {
        const user = await User.findById(_id)
        
        if(user) {
            
            user.data = {}
            
            await user.save()
            
            return res.status(200).json(user)
        }
    }
    return res.status(400).json({message: "Error With DeleteData"})
}