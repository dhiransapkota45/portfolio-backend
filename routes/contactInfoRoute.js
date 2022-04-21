//modules
const express = require("express");
const router = express.Router();

//mongoose model
const contactInfoModel = require("../Models/contactInfoModel");

//middlwares
const jwtverify = require("../middlewares/jwtverify");

router.get("/getcontactinfo", async (req, res) => {
  try {
    //read about
    const contactInfo = await contactInfoModel.find();

    // response
    return res.status(200).json({
      success: true,
      msg: "contactInfo read successfully",
      contactInfo,
    });
  } catch (error) {
    res.status(400).json({ success: false, msg: "error occured" });
  }
});

router.put("/updatecontactinfo", jwtverify, async (req, res) => {
  try {
    //making a object includng only to those items that needs to be updated
    const { address, phone, email, website } = req.body;
    const updatingData = {};
    if (address) {
      updatingData.address = address;
    }
    if (phone) {
      updatingData.phone = phone;
    }
    if (email) {
      updatingData.email = email;
    }
    if (website) {
      updatingData.website = website;
    }
    //update
    const updateContactInfo = await contactInfoModel.updateOne(
      {},
      { $set: updatingData },
      { new: true }
    );

    //response to the user
    return res
      .status(200)
      .json({ success: true, msg: "contactInfo details updated successfully" });
  } catch (error) {
    res.status(400).json({ success: false, msg: "error occured" });
  }
});

module.exports = router;
