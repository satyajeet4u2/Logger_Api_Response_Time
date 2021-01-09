const express = require('express');

const bodyParser = require('body-parser');
const http = require("http");
const morgan = require('morgan');
const fs = require('fs');
const path = require('path')
const app = express();
const port = 8090;



var logAll = function (tokens, req, res) {
    return [

        tokens['response-time'](req, res), 'ms'
    ]
}

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'info.log'), { flags: 'a' })



// EXAMPLE: only log error responses
app.use(morgan('combined', {
    skip: function (req, res) { return res.statusCode < 400 }
}));

app.use(morgan(logAll, { stream: accessLogStream }));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));




app.get('/register', function (req, res) {
    res.status(200).send("log data");
})


app.set("port", port);
const server = http.createServer(app);
console.log("Server is up at port", port);
server.listen(port);

module.exports = app;