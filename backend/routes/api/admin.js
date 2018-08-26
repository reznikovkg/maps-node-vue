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
                })
                .catch(()=>{
                    res.status(404).send({'message':'Не найдено'});
                });
        })
        .catch(()=>{
            res.status(404).send({'message':'Нет прав'});
        });

});






app.get('/activate', function(req, res, next) {
    const token = req.param('token');
    const username = req.param('username');

    models.Users.findOne({ where: {
            token: token
        } })
        .then(userAdmin => {
            if (userAdmin.isAdmin) {
                if (username) {
                    models.Users.findOne({ where: {
                            username: username
                        } })
                        .then(user => {
                            if (user.isActivate) {
                                user.update({
                                    isActivate: false
                                }).then(() => {
                                    res.status(200).send({'message':'Деактивировано'});
                                })
                            } else {
                                user.update({
                                    isActivate: true
                                }).then(() => {
                                    res.status(200).send({'message':'Активировано'});
                                })
                            }
                        })
                        .catch(()=>{
                            res.status(200).send({'message':'Пользователь не найден'});
                        });
                } else {
                    res.status(404).send({'message':'Пользователь не указан'});
                }
            } else {
                res.status(404).send({'message':'Нет прав'});
            }
        });
});


app.get('/activateAdmin', function(req, res, next) {
    const token = req.param('token');
    const username = req.param('username');

    models.Users.findOne({ where: {
            token: token
        } })
        .then(userAdmin => {
            if (userAdmin.isAdmin) {
                if (username) {
                    models.Users.findOne({ where: {
                            username: username
                        } })
                        .then(user => {
                            if (user.isAdmin) {
                                user.update({
                                    isAdmin: false
                                }).then(() => {
                                    res.status(200).send({'message':'Деактивировано'});
                                })
                            } else {
                                user.update({
                                    isAdmin: true
                                }).then(() => {
                                    res.status(200).send({'message':'Активировано'});
                                })
                            }
                        })
                        .catch(()=>{
                            res.status(200).send({'message':'Пользователь не найден'});
                        });
                } else {
                    res.status(404).send({'message':'Пользователь не указан'});
                }
            } else {
                res.status(404).send({'message':'Нет прав'});
            }
        });
});








module.exports = app;



