const express = require("express");
const router = express.Router();
const ProfileModel = require("../Models/Profile");

//middlwares
const jwtverify = require("../middlewares/jwtverify");

router.get("/getprofildetail", async (req, res) => {
  try {
    //read profile
    const profileDetail = await ProfileModel.find();

    // response
    return res
      .status(200)
      .json({ success: true, msg: "profile read successfully", profileDetail });
  } catch (error) {
    res.status(400).json({ success: false, msg: "error occured" });
  }
});

router.put("/updateProfileDetail", jwtverify, async (req, res) => {
  try {
    //making a object includng only to those items that needs to be updated
    const {
      title1,
      title2,
      title3,
      facebookUrl,
      twitterUrl,
      instagramUrl,
      youtubeUrl,
    } = req.body;
    const updatingData = {};
    if (title1) {
      updatingData.title1 = title1;
    }
    if (title2) {
      updatingData.title2 = title2;
    }
    if (title3) {
      updatingData.title3 = title3;
    }

    if (twitterUrl) {
      updatingData.twitterUrl = twitterUrl;
    }

    if (facebookUrl) {
      updatingData.facebookUrl = facebookUrl;
    }

    if (instagramUrl) {
      updatingData.instagramUrl = instagramUrl;
    }

    if (youtubeUrl) {
      updatingData.youtubeUrl = youtubeUrl;
    }

    //update
    const updateProfile = await ProfileModel.updateOne(
      {},
      { $set: updatingData },
      { new: true }
    );

    //response to the user
    return res
      .status(200)
      .json({ success: true, msg: "profile details updated successfully" });
  } catch (error) {
    res.status(400).json({ success: false, msg: "error occured" });
  }
});

module.exports = router;
