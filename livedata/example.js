var WSS = require('ws').Server;

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'oops',
  user     : 'oops',
  password : 'oops',
  database : 'oops'
});
connection.connect();

// Start the server
var wss = new WSS({ port: 8081 });
var lastTradeTimestamp = 0;

// When a connection is established
wss.on('connection', function(socket) {
  console.log('Opened connection ');
  
  /* Initial Trade Data */
  var sqlQuery = "SELECT `price`, `amount`, `type`, `trade_timestamp` FROM `Trades` WHERE `initiator` = 'true' ORDER BY `trade_timestamp` DESC LIMIT 20";
  connection.query(sqlQuery, function (error, results, fields) {
		var json = JSON.stringify({
	    trades: results
	  });
	  wss.clients.forEach(function each(client) {
	    client.send(json);
	    console.log('Sent: ' + json);
	  });
	});

  // Send data back to the client
  var json = JSON.stringify({ message: 'Gotcha' });
  socket.send(json);

  // When data is received
  socket.on('message', function(message) {
    console.log('Received: ' + message);
  });

  // The connection was closed
  socket.on('close', function() {
    console.log('Closed Connection ');
  });

});

// Every three seconds broadcast "{ message: 'Hello hello!' }" to all connected clients
var updateTrades = function() {
  var json = JSON.stringify({
    message: 'Hello hello!'
  });
  var sqlQuery = "SELECT `price`, `amount`, `type`, `trade_timestamp` FROM `Trades` WHERE `initiator` = 'true' AND `trade_timestamp` > " + lastTradeTimestamp + " ORDER BY `trade_timestamp` DESC LIMIT 20";
  //console.log(sqlQuery);
	connection.query(sqlQuery, function (error, results, fields) {
		var json = JSON.stringify({
	    trades: results
	  });
	  if(results.length !== 0){
			// wss.clients is an array of all connected clients
		  wss.clients.forEach(function each(client) {
		    client.send(json);
		    console.log('Sent: ' + json);
		  });
		  lastTradeTimestamp = results[0]['trade_timestamp'];
	  }

	  //console.log(lastTradeTimestamp);
	});
};
setInterval(updateTrades, 250);
