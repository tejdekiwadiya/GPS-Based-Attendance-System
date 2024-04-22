const mongoose = require('mongoose');

const UserDataSchema = mongoose.Schema({
    enrollment: String,
    name: String,
    password: String,
    email: String,
    phone: String,  
    classs: String,
    department: String,
    mac: String,
    usertype: String
})

const UserData = mongoose.model('UserData', UserDataSchema);
module.exports = UserData;