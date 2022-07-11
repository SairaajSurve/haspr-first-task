const { User } = require('../models/UserModel')

module.exports.UserSignUp = async (req, res, next) => {
    
    const {name, password, email, data} = req.body
    
    const result = await User.create({
        name: name,
        password: password,
        email: email,
        data: data
    })

    return res.status(200).json(result)
}

module.exports.UserLogin = async (req, res, next) => {

}

module.exports.GetUserData = async (req, res, next) => {
    
    const { _id } = req.body;

    if(_id) {
        const user = await User.findById(_id)

        if(user) {
            const { data } = user

            return res.status(200).json(data)
        }
    }
}

module.exports.EditUserData = async (req, res, next) => {

    const { _id, data } = req.body;

    if(_id) {
        const user = await User.findById(_id)

        if(user) {

            user.data = data

            await user.save()

            return res.status(200).json(user)
        }
    }
}

module.exports.DeleteUserData = async (req, res, next) => {

    const { _id } = req.body;

    if(_id) {
        const user = await User.findById(_id)

        if(user) {

            user.data = {}

            await user.save()

            return res.status(200).json(user)
        }
    }
}