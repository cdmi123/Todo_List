const mongoose = require('mongoose');
var bodyParser = require('body-parser')

mongoose.connect('mongodb+srv://Product:cdmi123@cluster0.rsmma9e.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('Connected!'));
const express = require('express');
var app = express();

app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))


  /* schema and model */

  const Comment = new mongoose.Schema({
    Task: { type: String},
    date:{type: Date,default: Date.now },
    c_date:{type: Date,default: Date.now },
    status:{type:Number,default:'0' }
     
  });

  const task_model = mongoose.model('task_tbl', Comment);

app.get('/',async function(req,res){

  var select_Task = await task_model.find();

    var datestring = new Date().toISOString();

        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var d = new Date(datestring);
        var dayName = days[d.getDay()];

        var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
newdate = day + " " + month + " " + year;

    res.render('index',{dayName,newdate,select_Task});
  })

  app.get('/task',function(req,res){

    var datestring = new Date().toISOString();

    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var d = new Date(datestring);
    var dayName = days[d.getDay()];

    var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
newdate = day + " " + month + " " + year;

    res.render('task',{dayName,newdate});
  })


  app.post('/task',function(req,res){
console.log(req.body);

    task_model.create(req.body);

    res.redirect('/task');

  })


  app.listen(8000);
