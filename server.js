'use strict';

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express

// we set the port to use
var port = process.env.PORT || 3000;

// we allow cross origin
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// we set the static public folder
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// The principal end point
app.get('/api/whoami', function(req, res, next) {
    
    // first we collect the ip address
    let ip = req.headers['x-forwarded-for'] || 
             req.connection.remoteAddress || 
             req.socket.remoteAddress ||
             req.connection.socket.remoteAddress;

    // secondly we collect the others informations like languages and software
    let info = {
        "ipaddress": ip,
        "language": req.headers["accept-language"],
        "software": req.headers["user-agent"]
    };
    res.json(info);
    next();
});

app.listen(port, function() {
    console.log('the Node.js app is listening on port ' + port);
});
