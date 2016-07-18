var mqtt = require('mqtt'), url = require('url');
// Parse 
var mqtt_url = url.parse('mqtt://m10.cloudmqtt.com:19556');
//var auth = (mqtt_url.auth || ':').split(':');
var url = "mqtt://" + mqtt_url.host;

//console.log(mqtt_url);

var options = {
  port: mqtt_url.port,
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  username: 'eyvxyvsf',
  password: 'XD89pD6CLAa8',
};

// Create a client connection
var client = mqtt.connect(url, options);

client.on('connect', function() { // When connected

  // subscribe to a topic
  client.subscribe('hello/world', function() {
    // when a message arrives, do something with it
    client.on('message', function(topic, message, packet) {
      console.log("Received '" + message + "' on '" + topic + "'");
    });
  });

  // publish a message to a topic
  client.publish('hello/world', 'my message', function() {
    console.log("Message is published");
    client.end(); // Close the connection when published
  });
});
