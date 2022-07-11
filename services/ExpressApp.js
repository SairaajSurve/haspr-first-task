const express = require('express')
const { UserRouter } = require('../routes/UserRouter')
const { AdminRouter } = require('../routes/AdminRouter')
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


module.exports.ExpressApp = async (app) => {

    app.use(express.json())
    app.use(express.urlencoded({extended: true}))

    app.use('/admin', AdminRouter)

    app.use(limiter)
    app.use('/user', UserRouter)

    app.get('/', async (req, res, next) => {
        return res.status(200).json({message: "Root"})
    })
}
