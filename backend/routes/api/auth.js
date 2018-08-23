var express = require('express');
var router = express.Router();


const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');


router.get('/api/user', function(req, res, next) {
  res.send({ user: 'tobi2' });
});

module.exports = router;
