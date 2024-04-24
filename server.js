const express = require('express');
const mongoose = require('mongoose');

//Connecting to mongodb
require('dotenv').config();
require('./config/database')

const app = express();

//Put api use here

//defining port and listen
const port = 3001;

app.listen(port, function() {
    console.log(`Express app is running on port ${port}`);
})
