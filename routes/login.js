const express = require("express")
const router = express.Router()


const jwt = require("jsonwebtoken")

//login
router.post("/login", async (req, res) => {
    const {username, password} = req.body

    
    if (porcess.env.USERNAME !== username || process.env.PASSWORD !== password) {
        return res.status(400).json({ success: false, msg: "Invalid credentails" });
    }

    //Signing JsonWebToken
    const payLoad = {
        id: process.env.PAYLOAD,
    };
    const authToken = jwt.sign(payLoad, process.env.JWT_SECRET);


    //response
    return res
        .status(200)
        .json({ success: true, msg: "user logged in successfully", authToken });
});

module.exports = router
