var express = require('express');
var session = require('express-session');
var app = express();

var models = require('../../models');

const status = require('../../config/const')['status'];

app.get('/login', function (req, res, next) {
    const username = req.param('username');
    const password = req.param('password');

    if ((username.length > 0) && (/^[a-zA-Z0-9]+$/.test(username)) && (password.length > 0) && (/^[a-zA-Z0-9*#!+]+$/.test(password))) {
        models.Users.findOne({
            where: {
                username: username
            }
        })
            .then(user => {
                if (user) {
                    if (user.password == password) {

                        var token = '';
                        var words = '-0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
                        var max_position = words.length - 1;
                        for (i = 0; i < 120; ++i) {
                            position = Math.floor(Math.random() * max_position);
                            token = token + words.substring(position, position + 1);
                        }

                        user.update({
                            token: token,
                        }).then((user) => {
                            res.status(status.OK.CODE).send({token: user.token});
                        })
                    } else {
                        res.status(status.NOT_FOUND.CODE).send({error: 'Неверный пароль'});
                    }
                } else {
                    res.status(status.NOT_FOUND.CODE).send({error: 'Пользователь с именем ' + username + ' не найден'});
                }
            }).catch((error) => {

        });
    } else {
        res.status(status.INTERVAL_SERVER_ERROR.CODE).send({error: 'Ошибка валидации'});
    }

});

app.get('/register', function (req, res, next) {
    const username = req.param('username');
    const email = req.param('email');
    const password = req.param('password');

    if ((username.length > 0) &&
        (/^[a-zA-Z0-9]+$/.test(username)) &&
        (password.length > 0) &&
        (/^[a-zA-Z0-9*#!+]+$/.test(password)) &&
        (/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email))) {
        const user = models.Users.build({
            username: username,
            email: email,
            password: password
        });

        user.save().then(() => {
            res.status(status.OK.CODE).send({message: status.OK.MESSAGE});
        });
    } else {
        res.status(status.INTERVAL_SERVER_ERROR.CODE).send({error: 'Ошибка валидации'});
    }

});

app.get('/connect', function (req, res, next) {
    const token = req.param('token');

    models.Users.findOne({
        where: {
            token: token
        }
    })
        .then(user => {
            if (user) {
                res.send({
                    'id': user.id,
                    'isActivate': user.isActivate,
                    'isAdmin': user.isAdmin,
                    'username': user.username,
                    'birthday': user.birthday
                });
            } else {
                res.status(status.INTERVAL_SERVER_ERROR.CODE).send({error: 'Недействительный токен'});
            }
        });
});

app.get('/uniqueUsername', function (req, res, next) {
    const username = req.param('username');

    models.Users.findOne({
        where: {
            username: username
        }
    })
        .then(user => {
            if (user) {
                res.status(status.INTERVAL_SERVER_ERROR.CODE).send({error: 'Имя занято'});
            } else {
                res.status(status.OK.CODE).send({message: status.OK.MESSAGE});
            }
        }).catch(() => {
        res.status(status.OK.CODE).send({message: status.OK.MESSAGE});
    });
});

module.exports = app;
