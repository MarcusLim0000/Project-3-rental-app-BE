const express = require('express');
const cors = require('cors')
//importing multer uploading below  * FROM MARCUS 5/5
const multer = require('multer')

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

//Protected routes here
const ensureLoggedIn = require('./config/ensureLoggedIn');
app.use('/api/listing', ensureLoggedIn, require('./routes/listing.routes'));

//testing uploading function below * FROM MARCUS 5/5
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), function(req, res){
    res.json({upload: 'success'})
});

//test ends here

//defining port and listen
const port = 3005;

app.listen(port, function() {
    console.log(`Express app is running on port ${port}`);
})
