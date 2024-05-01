const express = require('express');
const cors = require('cors')

//Connecting to mongodb
require('dotenv').config();
require('./config/database')

const app = express();
app.use(cors());
app.use(express.json());

// middleware that adds the user object from a JWT to req.user
app.use(require('./config/checkToken'));

//Put api use here
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/listing', require('./routes/listing.routes'));


//defining port and listen
const port = 3005;

app.listen(port, function() {
    console.log(`Express app is running on port ${port}`);
})
