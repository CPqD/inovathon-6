var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

var cors = require('cors');
app.use(cors());

var mongoose = require('mongoose'),
    User = require('./api/models/UserModel'),
    Product = require('./api/models/ProductModel'),
    Invite = require('./api/models/InviteModel'),
    Update = require('./api/models/UpdateModel'),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/inovadb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/InovaRoutes');
routes(app);

app.listen(port);

console.log('Inova RESTFUL API is live on port: ' + port);
