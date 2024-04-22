const express = require('express');
const router = express.Router();
const AttendanceData = require('../models/attendance');
const fs = require('fs');
const moment = require("moment");

router.post('/dashboardAttendance', async function (req, res) {

    const filepath = 'C:/Users/tejde/Desktop/GPS Based Attendance System/FrontEnd/my-app/src/components/assets/data.json';

    // Read the JSON file
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Error reading file');
        }
        try {
            const jsonContent = JSON.parse(data);
            const enrollment = jsonContent.enrollment;
            const name = jsonContent.name;
            const email = jsonContent.email;
            const phone = jsonContent.phone;
            const classs = jsonContent.classs;
            const department = jsonContent.department;
            const date_time = moment().format("MM/DD/YYYY HH:mm:ss");
            
            AttendanceData.create({
                enrollment,
                attendance: "Present",
                name,
                email,
                phone,
                classs,
                department,
                date_time,
            })

            res.json({
                status: "SUCCESS",
                message: "Attendance Marked"
            })
            // res.json({ enrollment,name,email,phone,classs,department });
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).send('Error parsing JSON');
        }
    });

});

module.exports = router;