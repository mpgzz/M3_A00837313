const express = require('express');
const { authenticateJWT, getUserData } = require('../Controllers/othersCrud');  

const router = express.Router(); 

router.get('/data', authenticateJWT, getUserData);

module.exports = router;
