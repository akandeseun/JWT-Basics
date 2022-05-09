const express = require('express');
const router = express.Router();
const authenticationMiddleware = require('../middlewares/auth')

const {login, dashboard} = require('../controllers/main')

router.post('/login', login)

router.get('/dashboard', authenticationMiddleware, dashboard)

module.exports = router;
