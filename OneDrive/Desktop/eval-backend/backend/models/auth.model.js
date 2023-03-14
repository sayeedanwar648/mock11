const mongoose = require('mongoose')

const authModel = mongoose.model('User', mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}))

module.exports = { authModel }