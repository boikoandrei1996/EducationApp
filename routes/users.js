'use strict';

const express = require('express');
const router = express.Router();

const { userController } = require('../controllers');

// Get all users
router.get('/', userController.getAllUsers);

// Create user
router.post('/', userController.createUser);

module.exports = router;
