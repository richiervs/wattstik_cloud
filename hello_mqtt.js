var mqtt = require ('mqtt');

var PORT = 19556;
var HOST = "m10.cloudmqtt.com";
var USER = "eyvxyvsf";
var PASS = "XD89pD6CLAa8";

//var options =[{host:'wss://m10.cloudmqtt.com', port:39556, username:'eyvxyvsf', password:'XD89pD6CLAa8'}];
var client  = mqtt.connect('mqtts://m10.cloudmqtt.com:39556/mqtt?clientId=hello15523&userName=eyvxyvsf&password=XD89pD6CLAa8&keepAliveInterval=60&timeout=3&useSSL=true&cleanSession=true');

console.log("mqtt started");

client.on('connect', function () {
  console.log("conn successful");
  client.subscribe('presence');
  client.publish('presence', 'Hello mqtt');
});

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString());
  client.end();
});
console.log("prog end");
