const mongoose = require("mongoose")

const workSchema = new mongoose.Schema({
    workImage: String,
    workTitle: String,
    description: String
})

const workModel = new mongoose.model("work", workSchema)
module.exports = workModel