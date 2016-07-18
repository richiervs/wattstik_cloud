console.log("hello, world");
//var mqtt = require('mqtt');
var fs = require("fs");
var mysql = require ('mysql');
var connection = mysql.createConnection({
	host : 'us-cdbr-iron-east-03.cleardb.net',
	user : 'b66276f8f3ed9f',
	password : 'e3d4f6b4',
	database : 'heroku_2f2b3584c2e81bb'
});
var data = fs.readFileSync('input.txt');

data = data.toString();
try{
	data = JSON.parse(data);
}
catch(e){
	throw new Error("Json data is corrupted");
}

connection.connect(function(err){
	if(err){
		console.error('error connecting: ' + err.stack);
		return;
	}
});

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) console.error('error query exec: ');

console.log('The solution is: ', rows[0].solution);
});

connection.end();
data.forEach(function (datum){
	console.log(datum);
	});
console.log("Program Ended");
