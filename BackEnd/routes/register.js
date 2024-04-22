const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const UserData = require('../models/users');
const cors = require('cors');

router.use(cors());
router.use(express.json());

router.post('/signup', async function (req, res) {

  const { enrollment, name, password, email, phone, classs, department, mac, usertype } = req.body;

  if (enrollment == '' || name == '' || password == '' || email == '' || phone == '' || classs == '' || department == '' || mac == '' || usertype == '') {
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
    // await UserData.find({ mac }).then(result => {
    const hashPassword = await bcrypt.hash(password, 10);
    let macverify = await UserData.find({ mac });
    
    await UserData.find({ enrollment }).then(result => {
      if (result.length) {
        res.json({
          status: "404",
          message: "User Already Exists"
        });
      }
      else if(macverify.length){
        res.json({
          status: "404",
          message: "Mac Address Already Used"
        });
      }
      else {
        try {
          // const CreateUser = UserData.create({
          UserData.create({
            enrollment,
            name,
            password: hashPassword,
            email,
            phone,
            classs,
            department,
            mac,
            usertype
          })

          res.json({
            status: "SUCCESS",
            message: "User Successfuly Registered"
          })

          // console.warn(CreateUser)
        } catch (e) {
          console.error(e);
          res.json({
            status: "ERROR",
            message: `Internal Server Error: ${e}`
          })
        }
      }
    }).catch(err => console.log(err));
  }
});

module.exports = router;