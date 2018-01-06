var db = require('../Database/database_model');

var Score = {

    getAllScore: function(callback) {

        return db.query("Select * from user", callback);

    },
    getScoreByPseudo: function(pseudo, callback) {

        return db.query("select * from user where pseudo=?", [pseudo], callback);
    },
    addScore: function(Score, callback) {

        return db.query("Insert into user values(?,?,?)", [Task.Id, Task.Title, Task.Status], callback);
        //return db.query("insert into task(Id,Title,Status) values(?,?,?)",[Task1.Id,Task1.Title,Task1.Status],callback);
    },
    deleteScore: function(pseudo, callback) {
        return db.query("delete from user where Id=?", [id], callback);
    },
    updateScore: function(pseudo, Score, callback) {
        return db.query("update user set Title=?,Status=? where Id=?", [Task.Title, Task.Status, id], callback);
    }

};
module.exports = Score;