const mongoose = require('mongoose')
const { db } = require("../config/index.config")

const connectMongo = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${db.user}:${db.pass}@${db.host}/${db.name}?retryWrites=true&w=majority`)
        console.log("db is connected")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectMongo