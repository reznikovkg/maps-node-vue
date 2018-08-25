var express = require('express');
var session = require('express-session');
var app = express();

var models = require('../../models');



app.get('/get/users', function(req, res, next) {
    const token = req.param('token');

    models.Users.findOne({ where: {
            token: token,
            isAdmin: true
        } })
        .then(user => {
            models.Users.findAll()
                .then(users => {
                    res.status(200).send({'users':users});
                });
        });

});












module.exports = app;



