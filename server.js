const express = require('express');
const cors = require('cors')
require('dotenv').config();
require('./config/database')
const uploadRoute = require('./controllers/uploadController')

const app = express();
app.use(cors());
app.use(express.json());

// middleware that adds the user object from a JWT to req.user
app.use(require('./config/checkToken'));

//Put api use here
app.use('/api/users', require('./routes/user.routes'));

//Protected routes here
const ensureLoggedIn = require('./config/ensureLoggedIn');
const listingRoutes = require('./routes/listing.routes')
app.use('/api/listing',  listingRoutes);
app.use('/api/listing/create', ensureLoggedIn, listingRoutes);
app.use('/api/upload', uploadRoute)

//defining port and listen
const PORT = process.env.PORT;

app.listen(PORT, function() {
    console.log(`Express app is running on port ${PORT}`);
})
