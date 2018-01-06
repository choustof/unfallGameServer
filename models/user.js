var db = require('../Database/database_model');

var User = {

    getAllUsers: function(callback) {

        return db.query("Select * from user order by score desc", callback);
    },

    getClassementTop10: function(callback) {

        return db.query("Select * from user order by score desc limit 10", callback);
    },
    getUserByPseudo: function(pseudo, callback) {

        return db.query("select * from user where pseudo=?", [pseudo], callback);
    },
    getUserScoreByPseudo: function(pseudo, callback) {

        return db.query("select score from user where pseudo=?", [pseudo], callback);
    },
    addUser: function(user, callback) {

        return db.query("Insert into user values(?,?,?)", [null, user.pseudo, user.score], callback);
    },
    updateUser: function(pseudo,user, callback) {

        return db.query("update user set pseudo=?, score=? where pseudo=?", [user.pseudo, user.score, pseudo], callback);
    },
    deleteUser: function(pseudo, callback) {

        return db.query("delete from user where pseudo=?", [pseudo], callback);
    }
    

};
module.exports = User;