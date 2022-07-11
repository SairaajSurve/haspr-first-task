const express = require('express')

module.exports.ExpressApp = async (app) => {



    app.get('/', async (req, res, next) => {
        return res.status(200).json({message: "Root"})
    })
}
