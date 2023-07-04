const express = require('express');
const { sendEmail } = require('../controller/emailController.js');

const router = express.Router();

router.post('/send', sendEmail);

module.exports = router;
