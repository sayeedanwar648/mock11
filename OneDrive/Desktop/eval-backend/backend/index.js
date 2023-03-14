const dotenv = require("dotenv").config()
const express = require("express")
const cors = require("cors")

const { connection } = require("./config/connectedDB")
const { authRouter } = require('./routes/auth.route')
const { authMiddleware } = require("./middlewares/auth.middleware")

const app = express()

app.use(express.json())
app.use(cors({
    origin: "*"
}))

app.use("/", authRouter)
app.use(authMiddleware)


app.get("/", (req, res) => {
    const {userID} = req

    res.send(userID)
})


app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log("db connected")

    }
    catch (err) {
        console.log("Error connecting to DB")
        console.log(err)


    }
})

