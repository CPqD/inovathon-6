var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/app'));
app.use('/node_modules',  express.static(__dirname + '/node_modules'));

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index.html');
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
	