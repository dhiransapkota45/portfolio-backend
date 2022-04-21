const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema({
    title1: String,
    title2: String,
    title3: String,
    facebookUrl: String,
    twitterUrl: String,
    instagramUrl: String,
    youtubeUrl: String
})

const ProfileModel = new mongoose.model("profile", profileSchema)
module.exports = ProfileModel