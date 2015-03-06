var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    hostname = process.env.HOSTNAME || 'localhost',
    port = parseInt(process.env.PORT, 10) || 4567;

app.get("/", function (req, res) {
  res.redirect("/index.html");
});

var todos = [];

app.get("/addtodo", function (req, res) { 
	var x = req.query.newtodo; 
	todos[todos.length] = x; 
	res.end("added"); 
 });

var deletedItems = [];

app.get("/deletetodo", function (req, res) {
	var y = req.query.index;
	deletedItems.unshift(todos.splice(y, 1));
	res.end("deleted");
});


app.get("/listtodos", function (req, res) {
	res.end(JSON.stringify(todos));
});

app.get("/undodelete", function (req, res) {
	
	todos.unshift(deletedItems.splice(0,1));
	res.end("revived");
});


app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/client'));
app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

console.log("Simple static server listening at http://" + hostname + ":" + port);
app.listen(port, hostname);
