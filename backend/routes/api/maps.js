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

module.exports = app;
