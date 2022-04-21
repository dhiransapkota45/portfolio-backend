//modules
const express = require("express");
const router = express.Router();
//models
const reviewModel = require("../Models/reviewModel");
//middlwares
const jwtverify = require("../middlewares/jwtverify");

//read all the reviews
router.get("/getreview", async (req, res) => {
  try {
    //read all review
    const allReview = await reviewModel.find();

    // response
    return res
      .status(200)
      .json({ success: true, msg: "review read successfully", allReview });
  } catch (error) {
    res.status(400).json({ success: false, msg: "error occured" });
  }
});

//add a new review
router.post("/postreview", jwtverify, async (req, res) => {
  try {
    const { reviewerImage, reviewerName, reviewerJob, description } = req.body;

    //validation
    if (!reviewerImage || !reviewerName || !reviewerJob || !description) {
      return res.status(400).json({ success: false, msg: "fill completely" });
    }

    //review creation
    const review = await reviewModel.create({
      reviewerImage,
      reviewerName,
      reviewerJob,
      description,
    });

    //response
    return res
      .status(201)
      .json({ success: true, msg: "review created successfully", review });
  } catch (error) {
    res.status(400).json({ success: false, msg: "error occured" });
  }
});

//update review
router.put("/updatereview/:id", jwtverify, async (req, res) => {
  try {
    const userId = req.id;

    // check weather user is authenticated or not
    if (!userId) {
      return res.status(401).json({ success: false, msg: "Unauthorized!" });
    }

    //read the review and that should be user's
    const readReview = await reviewModel.findOne({
      _id: req.params.id,
    });
    if (!readReview) {
      return res
        .status(404)
        .json({ success: false, msg: "review not found with that id" });
    }

    //making a object includng only to those items that needs to be updated
    const { reviewerImage, reviewerName, reviewerJob, description } = req.body;
    const updatingData = {};
    if (reviewerImage) {
      updatingData.reviewerImage = reviewerImage;
    }
    if (reviewerName) {
      updatingData.reviewerName = reviewerName;
    }
    if (reviewerJob) {
      updatingData.reviewerJob = reviewerJob;
    }
    if (description) {
      updatingData.description = description;
    }

    //updation
    const updateReview = await reviewModel.findByIdAndUpdate(
      req.params.id,
      { $set: updatingData },
      { new: true }
    );

    //response
    return res.status(200).json({
      success: true,
      msg: "review has been updated successfully",
      updateReview,
    });
  } catch (error) {
    res.status(400).json({ success: false, msg: "error occured" });
  }
});

//delete review using id of review
router.delete("/deleteReview/:id", jwtverify, async (req, res) => {
  try {
    const userId = req.id;
    const reviewId = req.params.id;

    //check whether user authorized
    if (!userId) {
      return res.status(401).json({ success: false, msg: "Unauthorized!" });
    }

    //check whether review exists or not
    const reviewDetail = await reviewModel.findOne({ _id: reviewId });
    if (!reviewDetail) {
      return res
        .status(400)
        .json({ success: false, msg: "review does not exists" });
    }

    //deleting the review
    const review = await reviewModel.deleteOne({ _id: reviewId });

    //response
    return res
      .status(200)
      .json({ success: true, msg: "review has been deleted", review });
  } catch (error) {
    res.status(400).json({ success: false, msg: "error occured" });
  }
});

module.exports = router;
