var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/task-manager', {useNewUrlParser: true}, (err, client)=>{
    if(err){
        console.log("Error in db connection");
        throw err;
    }
    console.log("Db Connections is success");
});



var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use("/", express.static('public/task-manager'));

app.use('/tasks', require('./routes/tasks'));

module.exports = app;
