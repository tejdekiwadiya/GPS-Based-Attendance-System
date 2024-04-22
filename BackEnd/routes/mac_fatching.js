const express = require('express');
const router = express.Router();
const os = require('os');
const networkInterfaces = os.networkInterfaces();

router.get('/setmac', async function (req, res) {
    let macAddress;
    for (const interfaceName in networkInterfaces) {
        const currentInterface = networkInterfaces[interfaceName][0];
        if (currentInterface && currentInterface.mac) {
            macAddress = currentInterface.mac;
            break;
        }
    }
    
    if(macAddress == ''){
        res.json({
            message: "MAC NOT FOUND"
        }) 
    }
    else{
        console.log(macAddress);
        res.json({
            message: macAddress
        })
    }
});


module.exports = router;