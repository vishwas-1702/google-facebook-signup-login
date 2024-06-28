const mongoose = require ('mongoose')

const userSchema = new mongoose.Schema({
    userId: String,
    Name: String,
    Username: String,
    Email: String,
    Password: String,
    isProvider: String
},{versionKey:false});

const User = mongoose.model('User', userSchema);

module.exports = User