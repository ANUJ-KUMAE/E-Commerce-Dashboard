const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
})

module.exports = mongoose.model('UsersLogin',productSchema);