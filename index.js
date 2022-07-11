require('dotenv').config()
const express = require('express')
const { ExpressApp } = require('./services/ExpressApp')
const { dbConnection } = require('./services/Database')

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

const StartServer = async () => {
    const app = express()

    await dbConnection(MONGO_URI)

    await ExpressApp(app)

    app.listen(PORT, () => {
        console.log(`Listenig at port ${PORT}`)
    })
}

StartServer()