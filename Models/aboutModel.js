const mongoose = require("mongoose")

const aboutSchema = new mongoose.Schema({
    aboutRole: String,
    description: String,
    aboutImage: String
})

const aboutModel = new mongoose.model("about", aboutSchema)
module.exports = aboutModel