// user.routes.js

const express = require('express');
const router = express.Router();
const { createUser } = require('../Controllers/user.controller');
const {referal}=require('../Controllers/referal.controller');

router.post('/', createUser);
router.post('/referal',referal);

module.exports = router;
