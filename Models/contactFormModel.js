const mongoose = require("mongoose")

const contactFormSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    phone:Number,
    message:String,
    mark:{
        type:Boolean,
        default:false
    }
})

const constactFormModel = new mongoose.model("conatactForm", contactFormSchema)
module.exports = constactFormModel