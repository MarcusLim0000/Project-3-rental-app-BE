const express = require('express');

//Connecting to mongodb
require('dotenv').config();
require('./config/database')

const app = express();
app.use(express.json());

//Put api use here
app.get('/api/users', require('./routes/user.routes'));
app.use('/api/listing', require('./routes/listing.routes'));


//defining port and listen
const port = 3005;

app.listen(port, function() {
    console.log(`Express app is running on port ${port}`);
})
