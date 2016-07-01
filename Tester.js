var thinkgear = require('node-thinkgear-sockets');

var client = thinkgear.createClient({ 
        enableRawOutput: true
});

client.on('data',function(data) {
    // Just output the data.
	console.log(JSON.stringify(data));
});

// Actually try connecting to the deice. 
client.connect();