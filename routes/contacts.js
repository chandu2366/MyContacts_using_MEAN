/**
 * Created by Chandu on 3/14/16.
 */


var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mycontactList' , function(err){
    if(err)
        console.log('there is an issue with mongodb ' + err);
    else
        console.log('mongodb connected');
})

var contactsModel = mongoose.model('mycontacts',{
    firstname:String,
    lastname:String,
    birthday:Date,
    company:String,
    emailaddress:String,
    mobilenumber:String
});


router.get('/', function(req, res){
    contactsModel.find({}, function(err, results){
        if(err)
            console.log('error trying to fetch data');
        else
            res.status(200).json(results);
    })
});

router.post('/',function(req, res){
    console.log(req.body);
    var contact = new contactsModel(req.body);

    contact.save(function(err, result){
        if(err){
            res.status(500).json(err);
            console.log('error trying to access data');
        }
        else{
            res.status(200).json(result);
        }
    })
});

router.delete('/:id', function(req, res){
    console.log(req.params.id);
    contactsModel.findByIdAndRemove(req.params.id, function(err, result){

        if(err){
            res.status(500).json(err);
            console.log('error trying to delete data');
        }
        else{
            res.status(200).json(result);
        }
    })
})


router.put('/', function(req, res){
    var contact = req.body;
    contactsModel.findById(contact._id, function(err, foundUser){
        if(err){
            res.status(500).json(err);
        }

        else{
            foundUser.update(req.body, function(err, result){
                if(err){
                    res.status(500).json(err);
                }
                else{
                    res.status(200).json(result)
                }

            })
        }
    })
})

module.exports = router;
