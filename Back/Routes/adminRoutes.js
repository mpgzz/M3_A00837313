const express = require('express');
const router = express.Router();
const admin = require('../Controllers/adminCrud'); 

router.post('/', admin.createUser);
router.get('/', admin.getUsers);
router.put('/:usuId', admin.updateUser);
router.delete('/:usuId', admin.deleteUser);

module.exports = router;
