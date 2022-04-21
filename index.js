const express = require("express")
const app = express()
const mongoose = require("mongoose")
const profileRouter = require("./routes/profileRoute")
const aboutRouter = require("./routes/aboutRoute")
const workRouter = require("./routes/workRoute")
const loginRouter = require("./routes/login")
const reviewRouter = require("./routes/reviewRoute")
const contactInfoRouter = require("./routes/contactInfoRoute")
const contactForm = require("./routes/contactForm")
require("dotenv").config()
const cors = require("cors")

//connection to database
const connection = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/portfolio")
        console.log("connection successful");
    } catch (error) {
        console.log("Internal Error occured");
    }
}
connection()

app.use(cors())

app.use(express.json())

app.use("/", profileRouter)
app.use("/", aboutRouter)
app.use("/", workRouter)
app.use("/", loginRouter)
app.use("/", reviewRouter)
app.use("/", contactInfoRouter)
app.use("/", contactForm)

app.listen(process.env.PORT, () => console.log(`listening at ${process.env.PORT}`))