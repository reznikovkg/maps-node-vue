var express = require('express');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('krim', 'root', '1111', {
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    // SQLite only
    storage: 'path/to/database.sqlite'
});



var router = express.Router();

/* GET home page. */
router.get('/api/get', function(req, res, next) {

    sequelize
        .authenticate()
        .then(() => {

            sequelize.query("SELECT * FROM transport_class").then(myTableRows => {
                console.log("ljhjd")
            });


            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send({ user: 'tobi' });

        })
        .catch(err => {
            // res.send('index', { title: 'нет' });
        });


});

module.exports = router;
