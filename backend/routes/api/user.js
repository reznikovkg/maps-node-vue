var express = require('express');
var session = require('express-session');
var app = express();

var models = require('../../models');

app.get('/edit', function(req, res, next) {
    const token = req.param('token');
    const username = req.param('username');
    const birthday = req.param('birthday');

    models.Users.findOne({ where: {
            token: token
        } })
        .then(user => {

            user.update({
                username: username,
                birthday: birthday
            }).then(() => {
                res.status(200).send({'message':'Обновлено'});
            })
            .catch(()=>{
                res.status(404).send({'message':'Нет прав'});
            });
        })
        .catch(()=>{
            res.status(404).send({'message':'Нет прав'});
        });
});

module.exports = app;



