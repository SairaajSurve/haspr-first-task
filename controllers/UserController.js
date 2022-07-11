require('express-async-errors')
const { User } = require('../models/UserModel')

module.exports.CreateUser = async (req, res, next) => {
    
    const {name, password, email, data} = req.body
    
    const result = await User.create({
        name: name,
        password: password,
        email: email,
        data: data
    })

    return res.status(200).json(result)
}

module.exports.GetData = async (req, res, next) => {

}

module.exports.EditData = async (req, res, next) => {

}

module.exports.DeleteData = async (req, res, next) => {

}