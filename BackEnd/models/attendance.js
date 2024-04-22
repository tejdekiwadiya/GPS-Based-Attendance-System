const mongoose = require('mongoose');

const AttendanceDataSchema = mongoose.Schema({
    enrollment: String,
    attendance: String,
    name: String,
    email: String,
    phone: String,  
    classs: String,
    department: String,
    date_time: String
})

const UserData = mongoose.model('Attendance', AttendanceDataSchema);
module.exports = UserData;