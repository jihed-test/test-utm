const EventModel = require('../models/event.models')
const ValidateEvent = require("../validation/Event")
const AddEvent = async (req ,res)=>{
    const {errors, isValid} = ValidateEvent(req.body)
    try {
        if(!isValid){
          res.status(404).json(errors)
        }else{
            console.log("")
                console.log()
                console.log("title")
                console.log(req.body.title)
          EventModel.findOne({user: req.user.id,title:req.body.title})
        .then(async (event)=>{
            if(!event){
                
                req.body.user = req.user.id    
                console.log()
                console.log("event1")
                console.log(event)
                console.log(req.body)
                await EventModel.create(req.body)
                res.status(200).json({message: "success"})
            }else{
                console.log("event2")
                console.log(event)
               await  EventModel.findOneAndUpdate(
                    {_id: event._id,title:req.body.title},
                    req.body,
                    {new: true}
                ).then(result=>{
                    res.status(200).json(result)
                })
            }
        })
        }
    } catch (error) {
         res.status(404).json(error.message)
    }
}
const DeleteEventTitle = async (req ,res)=>{
    try {
        const data =  await EventModel.findOneAndRemove({title:req.params.title})
        res.status(200).json({message: "deleted"})
 
     } catch (error) {
         res.status(404).json(error.message)
     }
}
const DeleteSingleEventUser = async (req ,res)=>{
    try {
        const data =  await EventModel.findOneAndRemove({_id: req.params.id})
        res.status(200).json({message: "deleted"})
 
     } catch (error) {
         res.status(404).json(error.message)
     }
}
const FindSingleEventUser = async (req ,res)=>{
    try {
        const data =  await EventModel.findOne({user: req.user.id,title:req.params.title})
        
        res.status(200).json(data)
     } catch (error) {
         res.status(404).json(error.message)

     }
}
const FindAllEventUser = async (req ,res)=>{
    try {
        const data =  await EventModel.find({user: req.user.id})
        res.status(200).json(data)
     } catch (error) {
         res.status(404).json(error.message)

     }
}
const FindAllEventByTitle = async (req ,res)=>{
    try {console.log(req.params.title)
        const data =  await EventModel.find({title:req.params.title})
        console.log(data)
        res.status(200).json(data)
     } catch (error) {
         res.status(404).json(error.message)

     }
}
const UpdteEvent = async (req ,res)=>{
    const {errors, isValid} = ValidateEvent(req.body)
    try {
        if(!isValid){
          res.status(404).json(errors)
        }else{
            console.log("")
                console.log()
                console.log("title")
                console.log(req.body.title)
          EventModel.findOne({_id:req.body._id})
        .then(async (event)=>{
            if(!event){
                
              
                res.status(404).json({message: "error"})
            }else{
               await  EventModel.findOneAndUpdate(
                    {_id: event._id},
                    req.body,
                    {new: true}
                ).then(result=>{
                    res.status(200).json(result)
                })
            }
        })
        }
    } catch (error) {
         res.status(404).json(error.message)
    }
}
const delaitCommentEvent = async (req ,res)=>{
    const {errors, isValid} = ValidateEvent(req.body)
    try {
        if(!isValid){
          res.status(404).json(errors)
        }else{
          EventModel.findOne({_id:req.body._id})
        .then(async (event)=>{
            if(!event){
                res.status(404).json({message: "error"})
            }else{req.body.comment="";
               await  EventModel.findOneAndUpdate(
                    {_id: event._id},req.body,
                    {new: true}
                ).then(result=>{
                    res.status(200).json(result)
                })
            }
        })
        }
    } catch (error) {
         res.status(404).json(error.message)
    }
}
module.exports = {
    AddEvent,
    FindSingleEventUser,
    FindAllEventUser,
    DeleteEventTitle,
    DeleteSingleEventUser,
    FindAllEventByTitle,
    UpdteEvent,
    delaitCommentEvent
}