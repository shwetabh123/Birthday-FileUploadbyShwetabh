//import modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var path = require('path');
var cors = require('cors');
var app = express();
//var port = 4112 ;
var addressRouter = require('./routes/address');
var uploadfileRouter = require('./routes/upload-file');
//adding middleware- cors
//app.use(cors());
app.use(cors({origin: 'http://localhost:4200'}));

app.use(bodyparser.json()); 
app.use(express.static(path.join(__dirname, 'public')));


// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');



app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
   });


//routes
app.use('/api', addressRouter);
app.use('/api', uploadfileRouter);


//testing server
// app.get('/', (req, res) => {
//      res.send('welcome');
// });

//var con = require('./connection');


if (process.env.NODE_ENV==='production'){


     app.use(express.static(__dirname+'/dist/'));


     app.get('*',(req,res)=>{

    res.sendFile(path.join(__dirname,'/dist/index.html'));


     });

   //  con='mongodb+srv://test:test@address-kvpmm.mongodb.net/test/address';
  
   //   con='mongodb://localhost:27017/address';
  
  }


//ON HEROKU
const port = process.env.PORT || config.httpPort;
app.listen(port, function () {
     console.log('server running on port:' + port);
});