const mongoose = require('mongoose')

module.exports.dbConnection = async (MONGO_URI) => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("Connected to mongodb")

    } catch (error) {
        console.log(error)
    }
}