var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var bodyparser = require('body-parser');
const multer = require('multer');

const { MongoClient, ObjectID } = require('mongodb');
var ObjectId = require('mongodb').ObjectID;



//var Add = mongoose.model('add', address, 'address');

var Contact = require('../models/contacts');




//retreiving address
 //working in postman use this 
    //localhost:3010/api/getAddress

//  router.get('/getAddress', function (req, res) {
//      Contact.find(function (err, docs) {
//           if (err) {
//               console.log(err);
//           }
//          res.json(docs);
        
//      })
//  });





 router.get('/getAddress', (req, res) => {
     Contact.find((err, docs) => {

         if (!err) { res.send(docs); }
         else { console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2)); }
     });
 });


router.get('/getOne/:id', function (req, res) {
    var id = req.params.id;
    console.log(req.params.id);
    Contact.findOne({ '_id': mongoose.Types.ObjectId(id) }, function (err, docs) {
        if (err)
            return console.error(err);
        res.json(docs);
    });
});



//update address

    //working in postman use this 
    //localhost:3010/api/updateAddress/5e97e4cc8976df5fcc70e6f5----use this in postman
    

//  router.put('/updateAddress/:id', function (req, res) {
//      var id = req.params.id;
//      console.log(req.params.id);
//      var conditions = { '_id': mongoose.Types.ObjectId(id) };
//      var update = { '$set': req.body };
//      var options = { 'new': true };
//      Contact.findOneAndUpdate(conditions, update, options, function (err, docs) {
//          if (err)
//              return console.error(err);
//         res.json(docs);
//    });
//  });



 router.put('/updateAddress/:id', (req, res) => {
     if (!ObjectId.isValid(req.params.id))
         return res.status(400).send(`No record with given id : ${req.params.id}`);

     var emp = {
         FirstName:req.body.FirstName,
         LastName:req.body.LastName,
        DOB:req.body.DOB,
        AnniversaryDate:req.body.AnniversaryDate,
        Address:req.body.Address,
        Phone:req.body.Phone,
        Email:req.body.Email
     };

   


     Contact.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
         if (!err) { res.send(doc); }
         else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
     });
 });







//delete address

router.delete('/getAddress/:id', function (req, res,next) {
    var id = req.params.id;
    console.log(req.params.id);

    //working in postman use this 
    //localhost:3010/api/getAddress/5e97e4cc8976df5fcc70e6f5----use this in postman
    
    Contact.remove({ '_id': mongoose.Types.ObjectId(id) }, function (err, docs) {
   // addressModel.remove({ _id: req.params.id }, function (err, docs) {
  

        if (err) {
            console.log(err);
            res.json(err);
        }

        else{
        res.json(docs);
    
        }
    
    })
});





//add address

router.post('/getAddress', function (req, res) {
    console.log(req.body);
    var addAddress = new Contact(
        //req.body

       {

        FirstName:req.body.FirstName,
        LastName:req.body.LastName,
       DOB:req.body.DOB,
       AnniversaryDate:req.body.AnniversaryDate,
       Address:req.body.Address,
       Phone:req.body.Phone,
       Email:req.body.Email
   } );


    addAddress.save(function (err,Contact) {
        if (err) {
            console.log(err);
             res.json({  msg:'failed to add address '               });
        }

        else{
     //   res.json(addAddress);
        res.json({  msg:'address added successfully  '               });
   //   res.json(addAddress);
   console.log("address address succesfully");
        }
    
    });
});






module.exports = router;