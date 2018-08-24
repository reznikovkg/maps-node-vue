var express = require('express');
var session = require('express-session');
var app = express();

var models = require('../../models');


app.get('/login', function(req, res, next) {
    const username = req.param('username');
    const password = req.param('password');

    models.Users.findOne({ where: {
            username: username,
            password: password
        } })
        .then(user => {
            if (user) {
                res.send({'token' : user.token});
            } else {

                res.status(500).send({'error':'Не верный пароль'});
            }
        });
});


app.get('/connect', function(req, res, next) {
    const token = req.param('token');

    models.Users.findOne({ where: {
            token: token
        } })
        .then(user => {
            if (user) {
                res.send({
                    'isActivate' : user.isActivate,
                    'isAdmin' : user.isAdmin,
                    'username' : user.username,
                    'birthday' : user.birthday
                });
            } else {
                res.status(500).send({'error':'Недействительный токен'});
            }
        });
});


module.exports = app;
