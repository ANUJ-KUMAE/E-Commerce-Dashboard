const mongoose = require('mongoose')

const userProductSchema = mongoose.Schema({
    name:String,
    price:String,
    category:String,
    userId:String,
    company:String,
})

module.exports = mongoose.model('UserProducts',userProductSchema);