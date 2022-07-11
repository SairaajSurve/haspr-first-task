const express = require('express')
const { UserRouter } = require('../routes/UserRouter')
const { AdminRouter } = require('../routes/AdminRouter')

module.exports.ExpressApp = async (app) => {

    app.use(express.json())
    app.use(express.urlencoded({extended: true}))

    app.use('/user', UserRouter)
    app.use('/admin', AdminRouter)

    app.get('/', async (req, res, next) => {
        return res.status(200).json({message: "Root"})
    })
}
