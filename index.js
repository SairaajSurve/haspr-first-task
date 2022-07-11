require('dotenv').config()
const express = require('express')
const { ExpressApp } = require('./services/ExpressApp')

const PORT = process.env.PORT

const StartServer = async () => {
    const app = express()

    await ExpressApp(app)

    app.listen(PORT, () => {
        console.log(`Listenig at port ${PORT}`)
    })
}

StartServer()