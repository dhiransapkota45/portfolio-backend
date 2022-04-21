const mongoose = require("mongoose")

const contactInfoSchema = new mongoose.Schema({
    address: String,
    phone: String,
    email: String,
    website:String
})

const contactInfoModel = new mongoose.model("contactInfo", contactInfoSchema)
module.exports = contactInfoModel