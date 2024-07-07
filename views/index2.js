const express = require('express');
const router = express.Router();
const {referal}=require('../Controllers/referal.controller');

router.post('/',referal);

module.exports=router;