var mongoose = require('mongoose');
var Event = require('../models/event');

var eventController = {};

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
eventController.formCreate = function(req,res){
    res.render('events/createForm');
}

// cria 1 event como resposta a um post de um form
eventController.create = function(req,res){
    var event = new Event(req.body);
    event.save((err)=>{
        if (err){
            console.log('Erro a gravar');
            if (err.code === 11000) { // duplicate key error collection
                console.log('entou 1');
                res.render('error', {
                    message: "Já existe um evento com esse nome.", 
                    // });      // verbosed error / debug
                error: err });  // verbosed error / debug
            }
            else{
                console.log('entou 2');
                res.redirect('/error')
            }
        } else {
            res.redirect('/events');
        }
    })
}

// mostra 1 event para edicao
eventController.formEdit = function(req, res){
    Event.findOne({_id:req.params.id}).exec((err, dbevent)=>{
        if (err){
            console.log('Erro a ler');
            res.redirect('/error')
        } else {
            res.render('events/editDetails', {event: dbevent});
        }
    })
}

// edita 1 event como resposta a um post de um form editar
// eventController.edit = function(req,res){
//     Event.findByIdAndUpdate(req.body._id, req.body, (err, editedEvent)=>{
//         if (err){
//             console.log('Erro a gravar');
//             res.redirect('/error')
//         } else {
//             res.redirect('/events/show/'+req.body._id);
//         }
//     } )
// }
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