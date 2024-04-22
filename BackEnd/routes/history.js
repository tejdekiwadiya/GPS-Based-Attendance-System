const express = require('express');
const router = express.Router();
const AttendanceData = require('../models/attendance');
const fs = require('fs');

router.get('/history', async function (req, res) {

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

            AttendanceData.find({ enrollment }).sort({_id: -1}).then((data) => {
                if (data.length < 1) {
                    res.json({
                        status: '404',
                        message: "Data Not Found"
                    })
                }
                else {
                    res.json({
                        data: data
                    })
                }
            })
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).send('Error parsing JSON');
        }
    });
});


router.get('/historyAll', async function (req, res) {
        try {
            AttendanceData.find({}).sort({_id: -1}).then((data) => {
                if (data.length < 1) {
                    res.json({
                        status: '404',
                        message: "Data Not Found"
                    })
                }
                else {
                    res.json({
                        data: data
                    })
                }
            })
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).send('Error parsing JSON');
        }
});


module.exports = router;