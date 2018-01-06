var express = require('express');
var router = express.Router();
var Pseudo = require('../models/pseudo');


console.log('in route pseudo')

router.get('/:id?', function(req, res, next) {
    console.log('in get pseudo')
    console.log(req.params)

    if (req.params.id) {
        console.log(req.params.id)

        Pseudo.getUserByPseudo(req.params.id, function(err, rows) {


            if (err) {
                console.log(err)
                res.json(err);
            } else if(rows.length>0) {
                //   pseudo does exist , user can enter game
                console.log("ce pseudo existe, good")
                res.json(rows[0]);
            }else{
                //   pseudo doesnt exist
                console.log("ce pseudo n'existe pas fail")
                res.json(false);
                
            }
        });
    } else {

        Pseudo.getAllUser(function(err, rows) {

            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }

        });
    }
});


router.post('/', function(req, res, next) {
     console.log('in post pseudo')
     console.log(req.body)
     req.body.score = '0';


//   test if the pseudo already exist
     Pseudo.getUserByPseudo(req.body.pseudo, function(err, rows) {

            if (err) {
                console.log(err)
                res.json(err);
            } else if(rows.length>0) {
                //   pseudo already exist
                console.log("ce pseudo est deja pris fail")
                res.json(false);
            }else{
                //   pseudo is available, we can register the user
                console.log("ce pseudo est disponible good")
                Pseudo.addPseudo(req.body, function(err, count) {
                    if (err) {
                        console.log('in fail error');
                        console.log(err)
                        res.json(err);
                    } else {
                        console.log('send res for post pseudo')
                        res.json(req.body); //or return count for 1 & 0
                    }
                });
            }
        });

});




router.put('/', function(req, res, next) {
    console.log('in put pseudo')

    Pseudo.updatePseudo(req.params.id, req.body, function(err, rows) {

        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});
module.exports = router;