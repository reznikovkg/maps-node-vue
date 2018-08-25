var express = require('express');
var session = require('express-session');
var app = express();

var models = require('../../models');


app.get('/login', function(req, res, next) {
    const username = req.param('username');
    const password = req.param('password');

        if ((username.length > 0) && ( /^[a-zA-Z0-9]+$/.test(username)) && (password.length > 0)  && ( /^[a-zA-Z0-9*#!+]+$/.test(password))) {
            models.Users.findOne({ where: {
                    username: username
                } })
                .then(user => {
                    if (user) {
                        if (user.password == password) {
                            res.send({'token' : user.token});
                        } else {
                            res.status(404).send({'error':'Неверный пароль'});
                        }
                    } else {
                        res.status(404).send({'error':'Пользователь с именем '+ username +' не найден'});
                    }
                });
        } else {
            res.status(500).send({'error': 'Ошибка валидации'});
        }

});

app.get('/register', function(req, res, next) {
    const username = req.param('username');
    const email = req.param('email');
    const password = req.param('password');

    if ((username.length > 0) && ( /^[a-zA-Z0-9]+$/.test(username)) && (password.length > 0)  && ( /^[a-zA-Z0-9*#!+]+$/.test(password)) && ( /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email))) {

        const user = models.Users.build({
            username: username,
            email: email,
            password: password
        });

        user.save().then(() => {
            res.status(200).send({'message': 'Успех'});
        });
    } else {
        res.status(500).send({'error': 'Ошибка валидации'});
    }

});


app.get('/activate', function(req, res, next) {
    const token = req.param('token');
    const username = req.param('username');

    if (username) {
        models.Users.findOne({ where: {
                username: username
            } })
            .then(user => {
                user.update({
                    isActivate: true
                }).then(() => {
                    res.status(200).send({'message':'Активировано'});
                })

            });
    }

    if (token) {
        models.Users.findOne({ where: {
                token: token
            } })
            .then(user => {
                user.update({
                    isActivate: true
                }).then(() => {
                    res.status(200).send({'message':'Активировано'});
                })

            });
    }
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
