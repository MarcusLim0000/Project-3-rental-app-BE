const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controllers')

// POST /api/users
router.post('/', userCtrl.create);
// POST /api/users/signin
router.post('/sign-in', userCtrl.signIn);

module.exports = router;
