const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const UserData = require('../models/users');
const fs = require('fs');

router.post('/signin', async function (req, res) {
    
    const { enrollment, password, mac, usertype } = req.body;
    const filepath = 'C:/Users/tejde/Desktop/GPS Based Attendance System/FrontEnd/my-app/src/components/assets/data.json';

    if (enrollment == '' || password == '' || usertype == '') {
        res.json({
            status: '404',
            message: "Empty Input Fields"
        });
    }
    else if (!/^\d{11}$/.test(enrollment)) {
        res.json({
            status: "404",
            message: "Invalid Enrollment input"
        });
    }
    else {
        try {
            const data = await UserData.findOne({ enrollment })

            if (data) {
                const passwordMatch = await bcrypt.compare(password, data.password)
                if (passwordMatch) {
                    // console.log(mac)
                    if (mac == data.mac) {
                        if (usertype == data.usertype) {
                            res.json({
                                status: '302',
                                message: "User Found",
                                // data: data
                            });

                            const jsonData = JSON.stringify(data);
                            fs.writeFile(filepath, jsonData, 'utf8', (err) => {
                                if (err) {
                                    console.error('Error writing to JSON file:', err);
                                } else {
                                    console.log('Data written to JSON file successfully');
                                }
                            });

                        }
                        else {
                            res.json({
                                status: '404',
                                message: "User Type Not Matched",
                            });
                        }
                    }
                    else {
                        res.json({
                            status: '404',
                            message: "MAC Address Not Matched",
                        });
                    }
                }
                else {
                    res.json({
                        status: '404',
                        message: "Password Not Matched",
                    });
                }
            }
            else {
                res.json({
                    status: '404',
                    message: "User Not Found"
                });
            }
        }
        catch (e) {
            console.error(e);
        }
    }
}
)

module.exports = router;