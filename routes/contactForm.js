const express = require("express");
const jwtverify = require("../middlewares/jwtverify");
const router = express.Router();

const contactFormModel = require("../Models/contactFormModel");

router.get("/getcontactform", jwtverify, async (req, res) => {
  try {
    //read about
    const contactFormDetail = await contactFormModel.find();

    // response
    return res.status(200).json({
      success: true,
      msg: "about read successfully",
      contactFormDetail,
    });
  } catch (error) {
    res.status(400).json({ success: false, msg: "error occured" });
  }
});

router.get("/getunreadmessage", jwtverify, async (req, res) => {
  try {
    const contactFormDetail = await contactFormModel.find({ mark: false });

    // response
    return res.status(200).json({
      success: true,
      msg: "about read successfully",
      contactFormDetail,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/contactform", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    console.log(name);
    if (!name || !email || !subject || !phone || !message) {
      return res
        .status(400)
        .json({ success: false, msg: "fill the form completely" });
    }

    //save message in database
    const postDetails = await contactFormModel.create({
      name,
      email,
      subject,
      phone,
      message,
    });

    //response
    return res
      .status(200)
      .json({ success: true, msg: "message sent successfully", postDetails });
  } catch (error) {
    res.status(400).json({ success: false, msg: "error occured" });
  }
});

router.put("/contactformunreadmessage/:id", jwtverify, async (req, res) => {
  try {
    const { mark } = req.body;

    if (!mark) {
      return res
        .status(400)
        .json({ success: false, msg: "fill the form completely" });
    }
    const updateMark = {};
    if (mark) {
      updateMark.mark = mark;
    }
    const updateDetails = await contactFormModel.updateOne(
      { _id: req.params.id },
      { $set: updateMark }
    );

    //response to the user
    return res
      .status(200)
      .json({ success: true, msg: "mark updated successfully", updateDetails });
  } catch (error) {
    res.status(400).json({ success: false, msg: "error occured" });
  }
});

module.exports = router;
