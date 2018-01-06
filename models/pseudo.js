var db = require('../Database/database_model');

var Pseudo = {

	getAllUser: function(callback) {

        return db.query("select * from user ", callback);
    },

    getUserByPseudo: function(pseudo, callback) {

        return db.query("select * from user where pseudo=?", [pseudo], callback);
    },

    addPseudo: function(user, callback) {

        return db.query("Insert into user values(?,?,?)", [null, user.pseudo, user.score], callback);
    },

    updatePseudo: function(pseudo, newPseudo, callback) {
        return db.query("update user set pseudo=?, where pseudo=?", [newPseudo, pseudo], callback);
    },

    deleteUserByPseudo: function(pseudo, callback) {
        return db.query("delete from user where pseudo=?", [pseudo], callback);
    }

};
module.exports = Pseudo;