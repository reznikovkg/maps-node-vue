var express = require('express');
var session = require('express-session');
var app = express();

var models = require('../../models');

app.get('/allMarkers', function(req, res, next) {

    models.Markers.findAll()
        .then(markers => {
            res.status(200).send({'markers':markers});
        })
        .catch(()=>{
            res.status(404).send({'message':'Нет прав'});
        });
});

app.get('/allLocationCircle', function(req, res, next) {

    models.LocationCircles.findAll()
        .then(LocationCircle => {
            res.status(200).send({'locationCircle':LocationCircle});
        })
        .catch((error)=>{
            res.status(404).send({'message':error});
        });
});

app.get('/setLocationPoint', function(req, res, next) {
    const token = req.param('token');
    const user = req.param('id');

    const lat = req.param('lat');
    const lng = req.param('lng');



    models.LocationUsers.findOne({ where: {
            user: user
        } })
        .then(LocationUser => {
            if (LocationUser) {
                LocationUser.update({
                    lat: lat,
                    lng: lng
                }).then(() => {
                    res.status(status.OK.CODE).send({'message': status.OK.MESSAGE});
                }).catch((error)=>{
                    res.status(404).send({'message':error});
                })
            } else {
                const LocationUser = models.LocationUsers.build({
                    user: user,
                    lat: lat,
                    lng: lng
                });

                LocationUser.save().then(() => {
                    res.status(200).send({'message': 'Успех'});
                });
            }


        })
        .catch((error)=>{
            res.status(404).send({'message':error});
        });
});


module.exports = app;
