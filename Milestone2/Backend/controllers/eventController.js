var mongoose = require('mongoose');
var Event = require('../models/event'); //chama modelo de event
var Location = require('../models/location'); //chama modelo de location
var User = require('../models/user');
var UserType = require('../models/userType');

const eventController = {};

// mostra todos events 
eventController.showAll = async function(req, res){
    try {
        var events = await Event.find().populate('location'); //popular o campo location com informação
        res.jsonp({events: events});
    } catch (error){
        res.jsonp({ message: "Error finding events", error: error });
    }
}

// mostra 1 event por id
eventController.show = async function (req, res){
    let id = req.params.id;
    try{
        var event = await (Event.findOne({_id: id})).populate('location').populate('promoters'); //popular o campo location com informação
        console.log(event);
        res.jsonp({event: event});
    }catch (error) {
        res.jsonp({ message: "Error finding event", error: error })
    }
}

// form para criar 1 event
eventController.formCreate = async function(req,res){
    var typePromoter = await UserType.findOne({type: 'Promoter'});
    var promoters = await User.find({type: typePromoter._id});
    var locations = await Location.find();
    res.jsonp({ locations: locations, promoters: promoters });
}

// cria 1 event como resposta a um post de um form
eventController.create = function (req, res) {
    var body = req.body;
    var event = new Event(body);
    if(!Array.isArray(body.promoters)){
        body.promoters = [body.promoters];
    }
    body.nTicketsPurchased = 0;
    event.save((err) => {
        console.log(err);
        if (err) {
            console.log('Erro a gravar');
            if (err.code === 11000) { // duplicate key error collection
                console.log('entou 1');
            }
            else {
                console.log('entou 2');
                res.redirect('/error')
            }
        } else {
            res.redirect('/events');
        }
    })
};

//Event edit form
eventController.formEdit = async function (req, res) {
    let id = req.params.id;
    try {
        var event = await Event.findOne({ _id: id }).populate('location');
        var typePromoter = await UserType.findOne({type: 'Promoter'});
        var promoters = await User.find({type: typePromoter._id});
        var locations = await Location.find();
        res.jsonp({ event: event, locations: locations, promoters: promoters });
    } catch (error) {
        res.jsonp({ message: "Error finding event", error: error });
    }
};

//Event edit post
eventController.edit = async function (req, res) {
    let body = req.body;
    let id = req.params.id; 
    if(!Array.isArray(body.promoters)){
        body.promoters = [body.promoters];
    }
    try {
        await Event.findOneAndUpdate({ _id: id }, body);
        res.jsonp(id);
    } catch (error) {
        res.jsonp({ message: "Error editing event", error: error });
    }
};


//Delete event
eventController.delete = function(req, res){
    Event.remove({_id:req.params.id}).exec((err)=>{
        if (err){
            console.log('Erro a ler');
            
        } else {
            res.jsonp()
        }
    })
}

module.exports = eventController;