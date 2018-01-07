var express = require('express');
var router = express.Router();
var User = require('../models/user');


/*GET User (user/{pseudo})
Si ucun argument est renseigné, on retourne tous les users, sinon on retourne l'user demandé*/
router.get('/:pseudo?', function(req, res, next) {
    console.log('GET user')

    if (req.params.pseudo) {

        User.getUserByPseudo(req.params.pseudo, function(err, rows) {

            if (err) {
                res.json(err);
            } else if(rows.length<1){
                res.status(404).json({ "erreur" : "Cet utilisateur n existe pas" });
            }
            else{
                res.json(rows);
            }
        });
    } else {

        User.getAllUsers(function(err, rows) {

            if (err) {
                res.json(err);
            } else if(rows.length<1){
                res.status(200).json({ "warning" : "Aucun utilisateur connecté" });
            }
            else{
                res.json(rows);
            }

        });
    }
});

/*GET User (user/classement/top10)
Retourne le top 10 des scores*/
router.get('/classement/top10', function(req, res, next) {
    console.log('Get classement top 10')

        User.getClassementTop10( function(err, rows) {

            if (err) {
                res.json(err);
            } else if(rows.length<1){
                res.status(200).json({ "warning" : "Aucun utilisateur connecté" });
            }
            else{
                res.json(rows);
            }
        });
});

/*GET User (user/{pseudo}/score)*/
router.get('/:pseudo/score', function(req, res, next) {
    console.log('Get user score')

    User.getUserScoreByPseudo(req.params.pseudo, function(err, rows) {

        if (err) {
            res.json(err);
        } else if(rows.length<1){
                res.status(404).json({ "erreur" : "Cet utilisateur n existe pas" });
            }
            else{
                res.json(rows);
            }
    });
});

/*POST User (user)*/
router.post('/', function(req, res, next) {

    console.log('Ajout user')

    req.body.score = '0';

// On test si le pseudo est déjà utilisé
     User.getUserByPseudo(req.body.pseudo, function(err, rows) {

            if (err) {
                console.log(err)
                res.json(err);
            } else if(rows.length>0) {
                //   Le pseudo est déjà utilisé
                console.log("ce pseudo est deja utilisé")
                res.status(409).json(false);
            }else{
                //   Le pseudo est libre, on peut créerle mini compte
                console.log("ce pseudo est disponible good")
                User.addUser(req.body, function(err, count) {
                    if (err) {
                        console.log('Erreur ajout user');
                        console.log(err)
                        res.json(err);
                    } else {
                        console.log('User bien ajouté')
                        res.json(req.body); //or return count for 1 & 0
                    }
                });
            }
        });

});

/*PUT User (user/{pseudo})*/
router.put('/:pseudo', function(req, res, next) {
    console.log('Modification user')

    User.getUserByPseudo(req.params.pseudo, function(err, rows) {

        if (err) {
            res.json(err);
        } else if(rows.length<1){
            res.status(404).json({ "erreur" : "Cet utilisateur n existe pas" });
        }
        else{
            User.updateUser(req.params.pseudo, req.body, function(err, rows) {

                if (err) {
                    res.json(err);
                } else {
                    res.json(rows);
                    console.log("PAS DERREUR");
                }
            });

        }
    });
}); 

/*PUT User (user/{pseudo}/score)*/
router.put('/:pseudo/score', function(req, res, next) {
    console.log('Modification user score')

    req.body.pseudo = req.params.pseudo;

    User.getUserByPseudo(req.params.pseudo, function(err, rows) {

        if (err) {
            res.json(err);
        } else if(rows.length<1){
            res.status(404).json({ "erreur" : "Cet utilisateur n existe pas" });
        }
        else{
            User.updateUser(req.params.pseudo, req.body, function(err, rows) {

                if (err) {
                    res.json(err);
                } else {
                    res.json(rows);
                    console.log(req.body.score);
                }
            });

        }
    });
});

/*DELETE User (user/{pseudo})*/
router.delete('/:pseudo',function(req,res,next){
    console.log("Suppression user")
 
    User.deleteUser(req.params.pseudo,function(err,count){
 
        if(err) {
          res.json(err);
        } else {
          res.json(count);
         } 
    });
 });

module.exports = router;