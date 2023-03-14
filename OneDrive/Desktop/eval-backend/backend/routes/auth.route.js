const express = require("express")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const { authModel } = require("../models/auth.model")

const authRouter = express.Router()


authRouter.post("/signup", async (req, res) => {

    const { email, password } = req.body

    try {
        const isUserExist = await authModel.findOne({ email })

        if (isUserExist) return res.status(403).send({ message: 'User is already exist' })

        bcrypt.hash(password, +process.env.SALT_ROUND, (async (err, hash) => {
            //Error handeling
            if (err) return res.status(404).send({ message: 'Something went wrong please try again' })

           
            try {

                await authModel.create({ email, password: hash })

                res.send({ message: 'User Account Create Successfully' })

            } catch (error) {
                console.log(err)
                return res.status(404).send({ message: 'Something went wrong please try again' })
            }


        }))


    } catch (error) {
        console.log(error)
        return res.status(404).send({ message: 'Something went wrong please try again' })

    }
})
authRouter.post("/login", async (req, res) => {

    const { email, password } = req.body

    try {

        const isUserExist = await authModel.findOne({ email })

        isUserExist ?
            bcrypt.compare(password, isUserExist.password, ((err, result) => {

                var token = jwt.sign({ userID: isUserExist._id }, process.env.SECRET_KEY, {expiresIn : '1h'});

                if(result) {
                    res.send({
                        message : 'User Login Successfully',
                        token
                    })
                } else {
                    res.status(401).send({
                        message : 'User Password is wrong , Please check again'
                    })
                }

            })) :
            res.status(401).send({ message: "User is not been exist , Please create an account" })

    } catch (error) {
        console.log(error)
        res.status(404).send({ message: 'Something went wrong , please try again' })
    }
})

module.exports = { authRouter }