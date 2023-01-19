const mongoose = require('mongoose');

const BugModel = mongoose.model('bug',{
    type:String,
    Id:Number
})

module.exports = { BugModel };