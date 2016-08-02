var mqtt = require('mqtt'), url = require('url');
// Parse 
var mqtt_url = url.parse('mqtt://m10.cloudmqtt.com:19556');
//var auth = (mqtt_url.auth || ':').split(':');
var url = "mqtt://" + mqtt_url.host;

var mysql = require ('mysql');
var mysql_connection = mysql.createConnection({
        host : 'us-cdbr-iron-east-03.cleardb.net',
        user : 'b66276f8f3ed9f',
        password : 'e3d4f6b4',
        database : 'heroku_2f2b3584c2e81bb'
});


mysql_connection.connect(function(err){
        if(err){
                console.error('error connecting: ' + err.stack);
                return;
        }
});

//var mysql_query = "INSERT INTO ??(??,??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?,?)";


//console.log(mqtt_url);

var options = {
  port: mqtt_url.port,
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  username: 'eyvxyvsf',
  password: 'XD89pD6CLAa8',
  //encoding: 'iso-8859-1'
};

// Create a client connection
var client = mqtt.connect(url, options);

client.on('connect', function() { // When connected

  // subscribe to a topic
  client.subscribe('/cc3200/PublishMetContent1', function() {
    // when a message arrives, do something with it
    client.on('message', function(topic, message, packet) {
    console.log("Received '" + message + "' on '" + topic + "'");
    my_message = message.toString();
    my_message = my_message.replace(/&/g,",");
    my_message = my_message.replace(/=/g,":");
    my_message = my_message.replace(/power/g,"\"power\"");
    my_message = my_message.replace(/voltage/g,"\"voltage\"");
    my_message = my_message.replace(/current/g,"\"current\"");
    my_message = my_message.replace(/freq/g,"\"freq\"");
    my_message = my_message.replace(/var/g,"\"var\"");
    my_message = my_message.replace(/pf/g,"\"pf\"");
    my_message = my_message.replace(/va:/g,"\"va\":");
    my_message = my_message.replace(/kwh/g,"\"kwh\"");
    my_message = my_message.replace(/pow_avg/g,"\"pow_avg\"");

    console.log("converted to : "+my_message);
    
	try{
        	var my_obj = JSON.parse(my_message);
		//console.log(my_obj[0].power.toFixed(4));
       
	}
	catch(e){
        	console.error("Json data is corrupted");
	}

/***************code to insert into mysql_db***************************/
var mysql_query = "INSERT INTO ??(??,??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?,?)";



var mysql_table = ["device_meteorology_data","device_id","true_power","rms_voltage","rms_current","ac_frequency","reactive_power","power_factor","apparent_power","true_energy","power_average",
"device1",my_obj[0].power.toFixed(4),my_obj[0].voltage.toFixed(4),my_obj[0].current.toFixed(4),my_obj[0].freq.toFixed(4),my_obj[0].var.toFixed(4),my_obj[0].pf.toFixed(4),my_obj[0].va.toFixed(4),my_obj[0].kwh.toFixed(4),my_obj[0].pow_avg.toFixed(4)];
mysql_query = mysql.format(mysql_query,mysql_table);

mysql_connection.query(mysql_query,function(err,rows){
				if(err) {
					
					console.log(err.code);
				} else {
					console.log("Successfully Inserted a Row"+rows);
          //mysql_connection.release();
				}
			});





	});
  });

  // publish a message to a topic
  //client.publish('/cc3200/PublishMetContent1', '1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890', function() {
    //console.log("Message is published");
    //client.end(); // Close the connection when published
  //});
});
