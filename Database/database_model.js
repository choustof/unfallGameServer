
var mysql=require('mysql');
var connection=mysql.createPool({

<<<<<<< HEAD

host:'us-cdbr-iron-east-05.cleardb.net',
user:'bfff06ee812fa3',
password:'9e17ad3a',
database:'heroku_ab5fb20c85f8647'
=======
	host:'us-cdbr-iron-east-05.cleardb.net',
	user:'bfff06ee812fa3',
	password:'9e17ad3a',
	database:'heroku_ab5fb20c85f8647'
>>>>>>> 964fa79064669d412f53e10ffd6ba84847c8a548


});

module.exports=connection;

/*
host:'127.0.0.1',
user:'root',
password:'',
database:'unfalldb'*/

/*host:'us-cdbr-iron-east-05.cleardb.net',
user:'bfff06ee812fa3',
password:'9e17ad3a',
database:'heroku_ab5fb20c85f8647'*/