const express = require('express');
const router = express.Router();
const AttendanceData = require('../models/attendance');

router.get('/find/:enrollment', async function (req, res) {
    try {
        const enrollment = req.params.enrollment;
        if (!enrollment || enrollment.length < 11 || enrollment.length > 11) {
            res.json({
                status: '404',
                message: "Please enter valid enrollment"
            })
        }
        else {
            AttendanceData.find({ enrollment }).sort({_id: -1}).then((data) => {
                if (data.length < 1) {
                    res.json({
                        status: '404',
                        message: "User Data Not Found"
                    })
                }
                else {
                    res.json({
                        data: data
                    })
                }
            }).catch((err) => {
                res.json({
                    status: '404',
                    message: err
                })
            });
        }
    } catch (parseError) {
        res.json({
            status: '404',
            message: parseError
        })
    }
})

module.exports = router;