
var mysql=require('mysql');
var connection=mysql.createPool({

host:'us-cdbr-iron-east-05.cleardb.net',
user:'bfff06ee812fa3',
password:'9e17ad3a',
database:'heroku_ab5fb20c85f8647'


});

module.exports=connection;
