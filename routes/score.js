var express = require('express');
var router = express.Router();
var Score = require('../models/score');




router.get('/', function(req, res, next) {
    console.log('in get score')

    if (req.params.id) {

        Score.getScoreByPseudo(req.params.id, function(err, rows) {

            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else {

        Score.getAllScore(function(err, rows) {

            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }

        });
    }
});

router.post('/', function(req, res, next) {

    console.log('in post score')

    /*Score.addScore(req.body,function(err,count){

        //console.log(req.body);
        if(err)
        {
            res.json(err);
        }
        else{
                res.json(req.body);//or return count for 1 & 0
        }
    });*/
});

router.put('/', function(req, res, next) {
    console.log('in put score')

    Score.updateScore(req.params.id, req.body, function(err, rows) {

        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;