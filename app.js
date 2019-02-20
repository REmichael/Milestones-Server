require('dotenv').config();

var express = require('express');
var app = express();
var milestone = require('./controllers/milestonecontroller');

var user = require('./controllers/usercontroller');
var sequelize = require('./db');
var bodyParser = require('body-parser');

sequelize.sync();
app.use(bodyParser.json());
app.use(require('./middleware/headers'));

//EXPOSED ROUTES//
app.use('/api', user);

//PROTECTED ROUTES//
app.use(require('./middleware/validate-session'));
app.use('/api', milestone);

app.listen(process.env.PORT, function() {
    console.log(`App is listening on ${process.env.PORT}`);
})

