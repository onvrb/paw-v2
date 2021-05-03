var mongoose = require('mongoose');
var Event = require('../models/event'); //chama modelo de event
var Location = require('../models/location'); //chama modelo de location

const eventController = {};

// mostra todos events 
eventController.showAll = async function(req, res){
    try {
        var events = await Event.find().populate('location'); //popular o campo location com informação
        res.render('events/listAll', {events: events});
    } catch (error){
        res.render("error", { message: "Error finding events", error: error });
    }
}

// mostra 1 event por id
eventController.show = async function (req, res){
    let id = req.params.id;
    try{
        var event = await (Event.findOne({_id: id})).populate('location'); //popular o campo location com informação
        res.render('events/viewDetails', {event: event});
    }catch (error) {
        res.render("error", { message: "Error finding event", error: error })
    }
}

// form para criar 1 event
eventController.formCreate = async function(req,res){
    var locations = await Location.find();
    res.render('events/createForm', {locations: locations});
}

// cria 1 event como resposta a um post de um form
eventController.create = function (req, res) {
    var body = req.body;
    var event = new Event(body);
    body.nTicketsPurchased = 0;
    event.save((err) => {
        console.log(err);
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

//Event edit form
eventController.formEdit = async function (req, res) {
    let id = req.params.id;
    try {
        var event = await Event.findOne({ _id: id }).populate('location');
        var locations = await Location.find();
        res.render("events/editDetails", { event: event, locations: locations });
    } catch (error) {
        res.render("./error", { message: "Error finding event", error: error });
    }
};

//Event edit post
eventController.edit = async function (req, res) {
    let body = req.body;
    let id = req.params.id;  
    try {
        await Event.findOneAndUpdate({ _id: id }, body);
        res.redirect("/events/show/" + id);
    } catch (error) {
        res.render("./error", { message: "Error editing event", error: error });
    }
};


//Delete event
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