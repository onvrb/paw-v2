var mongoose = require('mongoose');
var Event = require('../models/event');
var Location = require('../models/location');

const eventController = {};

// mostra todos events 
eventController.showAll = function(req, res){
    Event.find({}).exec((err, dbevents)=>{
        if (err){
            console.log('Erro a ler');
            res.redirect('/error')
        } else {
            console.log(dbevents);
            res.render('events/listAll', {events: dbevents});
        }
    })
}

// mostra 1 event por id
eventController.show = function(req, res){
    Event.findOne({_id:req.params.id}).exec((err, dbevent)=>{
        if (err){
            console.log('Erro a ler');
            res.redirect('/error')
        } else {
            res.render('events/viewDetails', {event: dbevent});
        }
    })
}

// form para criar 1 event
eventController.formCreate = async function(req,res){
    var locations = await Location.find();
    res.render('events/createForm', {locations: locations});
}

// cria 1 event como resposta a um post de um form
eventController.create = function (req, res) {
    var body = req.body;
    var location = body.location;
    body.location = { name: location};
    console.log(body);
    var event = new Event(body);
    event.save((err) => {
        if (err) {
            console.log('Erro a gravar');
            if (err.code === 11000) { // duplicate key error collection
                console.log('entou 1');
                res.render('error', {
                    message: "Já existe um evento com esse nome.",
                    // });      // verbosed error / debug
                    error: err
                });  // verbosed error / debug
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

eventController.formEdit = async function (req, res) {
    let id = req.params.id;
    try {
        var event = await Event.findOne({ _id: id });
        var locations = await Location.find();
        res.render("events/editDetails", { event: event, locations: locations });
    } catch (error) {
        res.render("./error", { message: "Error finding event", error: error });
    }
};

eventController.edit = async function (req, res) {
    let body = req.body;
    let location = body.location;
    let id = req.params.id;
    body.location = { name: location};    
    try {
        await Event.findOneAndUpdate({ _id: id }, body);
        res.redirect("/events/show/" + id);
    } catch (error) {
        res.render("./error", { message: "Error editing event", error: error });
    }
};


// elimina 1 event
eventController.delete = function(req, res){
    Event.remove({_id:req.params.id}).exec((err)=>{
        if (err){
            console.log('Erro a ler');
            
        } else {
            res.redirect('/events')
        }
    })
}

module.exports = eventController;