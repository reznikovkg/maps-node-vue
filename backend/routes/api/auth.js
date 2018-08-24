var express = require('express');
var session = require('express-session');
var app = express();

var models = require('../../models');


app.get('/login', function(req, res, next) {

    console.log(req.session);

    if (!req.session.token) {

        const username = req.param('username');
        const password = req.param('password');

        models.Users.findOne({ where: {
                username: username,
                password: password
            } })
            .then(user => {
                if (user) {
                    req.session.token= user.token;
                    res.send({'token' : user.token});
                } else {

                    res.send({'error':'Не верный пароль'});
                }
            });

    } else {
        res.send({'error':500});
    }
});



module.exports = app;
