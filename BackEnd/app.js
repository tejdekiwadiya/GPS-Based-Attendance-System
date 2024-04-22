const express = require('express');

const registerRoutes = require('./routes/register');
const macRoutes = require('./routes/mac_fatching')
const loginRoutes = require('./routes/login');
const updateRoutes = require('./routes/update');
const attendanceRoutes = require('./routes/dashboard');
const dashboardRoutes = require('./routes/dashboard');
const historyRoutes = require('./routes/history');
const findRoutes = require('./routes/finddata')

const app = express();

app.use(express.json());

app.use('/user', registerRoutes, macRoutes, loginRoutes, updateRoutes, attendanceRoutes, dashboardRoutes, historyRoutes, findRoutes);
module.exports = app;