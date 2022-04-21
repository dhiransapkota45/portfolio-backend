//modules
const express = require("express");
const router = express.Router();

//mongoose model
const aboutModel = require("../Models/aboutModel");

//middlwares
const jwtverify = require("../middlewares/jwtverify");

router.get("/getabout", async (req, res) => {
  try {
    //read about
    const aboutDetail = await aboutModel.find();

    // response
    return res
      .status(200)
      .json({ success: true, msg: "about read successfully", aboutDetail });
  } catch (error) {
    res.status(400).json({ success: false, msg: "error occured" });
  }
});

router.put("/updateAbout", jwtverify, async (req, res) => {
  try {
    //making a object includng only to those items that needs to be updated
    const { aboutRole, description, aboutImage } = req.body;
    const updatingData = {};
    if (aboutRole) {
      updatingData.aboutRole = aboutRole;
    }
    if (description) {
      updatingData.description = description;
    }
    if (aboutImage) {
      updatingData.aboutImage = aboutImage;
    }

    //update
    const updateAbout = await aboutModel.updateOne(
      {},
      { $set: updatingData },
      { new: true }
    );

    //response to the user
    return res
      .status(200)
      .json({
        success: true,
        msg: "about section details updated successfully",
      });
  } catch (error) {
    res.status(400).json({ success: false, msg: "error occured" });
  }
});

module.exports = router;
