var express = require('express');
var session = require('express-session');
var app = express();

var models = require('../../models');

const status = require('../../config/const')['status'];

app.use(function (req, res, next) {
    const token = req.param('token');
    models.Users.findOne({ where: {
            token: token
        } })
        .then(user => {
            if (user.isAdmin) {
                next();
            } else {
                res.status(status.FORBIDDEN.CODE)
                    .send({message:status.FORBIDDEN.MESSAGE});
            }
        })
        .catch(()=>{
            res.status(status.INTERVAL_SERVER_ERROR.CODE).send({
                message:status.INTERVAL_SERVER_ERROR.MESSAGE
            });
        });
});


app.get('/get/users', function(req, res, next) {
    models.Users.findAll()
        .then(users => {
            res.status(status.OK.CODE).send({users:users});
        })
        .catch(()=>{
            res.status(status.NOT_FOUND.CODE)
                .send({message:status.NOT_FOUND.MESSAGE});
        });
});

app.get('/edit', function(req, res, next) {
    const id = req.param('id');
    const username = req.param('username');
    const birthday = req.param('birthday');

    models.Users.findOne({ where: {
            id: id
        } })
        .then(user => {
            if ((username) && (birthday)) {
                user.update({
                    username: username,
                    birthday: birthday
                }).then(() => {
                    res.status(status.OK.CODE)
                        .send({message:'Обновлено'});
                })

            } else {
                res.status(status.OK.CODE)
                    .send({user:user});
            }
        })
        .catch(()=>{
            res.status(status.NOT_FOUND.CODE)
                .send({message:status.NOT_FOUND.MESSAGE});
        });
});

app.get('/activate', function(req, res, next) {
    const username = req.param('username');

    if (username) {
        models.Users.findOne({ where: {
                username: username
            } })
            .then(user => {
                user.update({
                    isActivate: !user.isActivate
                }).then(() => {
                    res.status(status.OK.CODE).send({message: 'Статус изменен!'});
                });
            })
            .catch(()=>{
                res.status(status.NOT_FOUND.CODE).send({message:status.NOT_FOUND.MESSAGE});
            });
    } else {
        res.status(status.NO_CONTENT.CODE).send({message:'Пользователь не указан'});
    }
});

app.get('/activateAdmin', function(req, res, next) {
    const username = req.param('username');

    if (username) {
        models.Users.findOne({ where: {
                username: username
            } })
            .then(user => {
                user.update({
                    isAdmin: !user.isAdmin
                }).then(() => {
                    res.status(status.OK.CODE).send({message: 'Права изменены!'});
                });
            })
            .catch(()=>{
                res.status(status.NOT_FOUND.CODE).send({message:status.NOT_FOUND.MESSAGE});
            });
    } else {
        res.status(status.NO_CONTENT.CODE).send({message:'Пользователь не указан'});
    }
});




//MAPS
app.get('/sendMarker', function(req, res, next) {
    const name = req.param('name');
    const lat = req.param('lat');
    const lng = req.param('lng');

    const marker = models.Markers.build({
        name: name,
        lat: lat,
        lng: lng
    });

    marker.save().then(() => {
        res.status(status.OK.CODE).send({message: status.OK.MESSAGE});
    });
});

app.get('/sendLocationCircle', function(req, res, next) {
    const name = req.param('name');
    const radius = req.param('radius');
    const lat = req.param('lat');
    const lng = req.param('lng');

    const LocationCircle = models.LocationCircles.build({
        name: name,
        radius: radius,
        lat: lat,
        lng: lng
    });

    LocationCircle.save().then(() => {
        res.status(status.OK.CODE).send({message: status.OK.MESSAGE});
    });
});

app.get('/removeLocationCircle', function(req, res, next) {
    const id = req.param('id');

    models.LocationCircles.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.status(status.OK.CODE).send({message: status.OK.MESSAGE});
    });


});

module.exports = app;
