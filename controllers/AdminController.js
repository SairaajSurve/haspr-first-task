const { User } = require('../models/UserModel')
const {GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword} = require('../utility/PasswordUtility')

module.exports.AdminSignUp = async (req, res, next) => {
    
    const {name, password, email, admin_secret} = req.body

    const salt = await GenerateSalt()
    const userPassword = await GeneratePassword(password, salt)

    if(admin_secret === process.env.ADMIN_SECRET) {
        const result = await User.create({
            name: name,
            password: userPassword,
            salt: salt,
            email: email,
            admin: true,
            data: {}
        })
        if (result) {
    
            const signature  = await GenerateSignature({
                _id: result._id,
            })
            return res.status(200).json(signature)
        }
    }
    return res.status(400).json({message: "Error With SignUp"})
}

module.exports.AdminLogin = async (req, res, next) => {

    const {password, email, admin_secret} = req.body

    if(admin_secret === process.env.ADMIN_SECRET) {

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
    }
    return res.status(400).json({message: "Error With Login"})
}

module.exports.GetUserData = async (req, res, next) => {

    const { _id } = req.user;

    const admin = await User.findById(_id)
    if(admin) {
        if( admin.admin === true) {
            const users = await User.find({})
            const nonAdmins = users.filter((user) => {
                if(user.admin === false) {
                    return true
                }
                return false
            })
            return res.status(400).json(nonAdmins)
        }
    }
    return res.status(403).json({message: "Unauthorized access"})
}

module.exports.DeleteUserData = async (req, res, next) => {
    
    const { _id } = req.user;

    const admin = await User.findById(_id)
    if(admin) {
        if( admin.admin === true) {
            const user = await User.findById(req.body._id)
            if(user) {
                user.data = {}
                await user.save()
                return res.status(200).json(user)
            }
        }
    }
    return res.status(403).json({message: "Unauthorized access"})
}