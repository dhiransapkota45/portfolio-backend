//modules
const express = require("express");
const router = express.Router();
//models
const workModel = require("../Models/workModel");
//middlwares
const jwtverify = require("../middlewares/jwtverify");

//read all the work types
router.get("/getwork", async (req, res) => {
  try {
    //read all work
    const allWork = await workModel.find();

    // response
    return res
      .status(200)
      .json({ success: true, msg: "work read successfully", allWork });
  } catch (error) {
    res.status(400).json({ success: false, msg: "error occured" });
  }
});

//add a new work
router.post("/postwork", jwtverify, async (req, res) => {
  try {
    const { workImage, workTitle, description } = req.body;

    //validation
    if (!workImage || !workTitle || !description) {
      return res.status(400).json({ success: false, msg: "fill completely" });
    }

    //work creation
    const work = await workModel.create({
      workImage,
      workTitle,
      description,
    });

    //response
    return res
      .status(201)
      .json({ success: true, msg: "work created successfully", work });
  } catch (error) {
    res.status(400).json({ success: false, msg: "error occured" });
  }
});

//update work
router.put("/updatework/:id", jwtverify, async (req, res) => {
  try {
    const userId = req.id;

    // check weather user is authenticated or not
    if (!userId) {
      return res.status(401).json({ success: false, msg: "Unauthorized!" });
    }

    //read the work and that should be user's
    const readWork = await workModel.findOne({
      _id: req.params.id,
    });
    if (!readWork) {
      return res
        .status(404)
        .json({ success: false, msg: "work not found with that id" });
    }

    //making a object includng only to those items that needs to be updated
    const { workImage, workTitle, description } = req.body;
    const updatingData = {};
    if (workImage) {
      updatingData.workImage = workImage;
    }
    if (workTitle) {
      updatingData.workTitle = workTitle;
    }
    if (description) {
      updatingData.description = description;
    }

    //updation
    const updateWork = await workModel.findByIdAndUpdate(
      req.params.id,
      { $set: updatingData },
      { new: true }
    );

    //response
    return res.status(200).json({
      success: true,
      msg: "data has been updated successfully",
      updateWork,
    });
  } catch (error) {
    res.status(400).json({ success: false, msg: "error occured" });
  }
});

//delete work using id of work
router.delete("/deleteWork/:id", jwtverify, async (req, res) => {
  try {
    const userId = req.id;
    const workId = req.params.id;

    //check whether user authorized
    if (!userId) {
      return res.status(401).json({ success: false, msg: "Unauthorized!" });
    }

    //check whether work exists or not
    const workDetail = await workModel.findOne({ _id: workId });
    if (!workDetail) {
      return res
        .status(400)
        .json({ success: false, msg: "work does not exists" });
    }

    //deleting the work
    const work = await workModel.deleteOne({ _id: workId });

    //response
    return res
      .status(200)
      .json({ success: true, msg: "work has been deleted", work });
  } catch (error) {
    res.status(400).json({ success: false, msg: "error occured" });
  }
});

module.exports = router;
