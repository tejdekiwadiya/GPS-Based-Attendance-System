const express = require('express');
const cors = require('cors');
const router = express.Router();
const UserData = require('../models/users');
const fs = require('fs').promises;

router.use(cors());
router.use(express.json());

router.post('/update', async function (req, res) {

    const { enrollment, name, email, phone, classs, department, mac } = req.body;
    const filepath = 'C:/Users/tejde/Desktop/GPS Based Attendance System/FrontEnd/my-app/src/components/assets/data.json';

    if (enrollment == '' || name == '' || email == '' || phone == '' || classs == '' || department == '' || mac == '') {
        res.json({
            status: "404",
            message: "Empty Input Fields"
        })
    }
    else if (!/^\d{11}$/.test(enrollment)) {
        res.json({
            status: "404",
            message: "Invalid Enrollment input"
        });
    }
    else if (!/^[a-zA-Z ]*$/.test(name)) {
        res.json({
            status: "404",
            message: "Invalid name input"
        });
    }
    else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        res.json({
            status: "404",
            message: "Invalid email input"
        });
    }
    else if (!/^\d{10}$/.test(phone)) {
        res.json({
            status: "404",
            message: "Invalid phone input"
        });
    }
    else {
        try {
            const Update = await UserData.updateOne({ enrollment }, {
                $set: {
                    enrollment,
                    name,
                    email,
                    phone,
                    classs,
                    department
                }
            });

            if (Update) {
                res.json({
                    status: '200',
                    message: 'User Updated Successfully',
                });
            } 
        } catch (e) {
            console.error(e);
            res.json({
                status: "ERROR",
                message: `Internal Server Error: ${e}`
            })
        }
    }
});

module.exports = router;