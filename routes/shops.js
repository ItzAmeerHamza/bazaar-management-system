const express = require('express');
const router = express.Router();

// Load User Controller
const shopController = require('../controllers/shop.controller')

router.get('/index', shopController.index);

module.exports = router;
