const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    reviewerImage: String,
    reviewerName: String,
    reviewerJob : String,
    description: String
})

const reviewModel = new mongoose.model("review", reviewSchema)
module.exports = reviewModel