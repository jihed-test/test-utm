const EventlistModels = require("../models/eventlist.models");
const ValidateEventList = require("../validation/Eventlist");

const AddEventList = async (req, res) => {
  const { errors, isValid } = ValidateEventList(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      EventlistModels.findOne({ title: req.body.title }).then(async (exist) => {
        if (exist) {
          EventlistModels.findOneAndUpdate(
            { _id: exist._id },
            req.body,
            { new: true }
          ).then(result => {
            res.status(200).json(result)
          })
        } else {
          await EventlistModels.create(req.body)
                res.status(200).json({ message: "success" })
        }
      })
    }} catch (error) {
      res.status(404).json(error.message)
    }
  }

    const FindAllEventList = async (req, res) => {
    try {
      const data = await EventlistModels.find()
      res.status(200).json(data)
    } catch (error) {
      res.status(404).json(error.message)
    }
  }
  const DeleteEventList = async (req ,res)=>{
    try {
        const data =  await EventlistModels.findOneAndRemove({_id: req.params.id})
        res.status(200).json({message: "deleted"})
 
     } catch (error) {
         res.status(404).json(error.message)
     }
}

  /////////



  module.exports = {
    AddEventList,
    FindAllEventList,
    DeleteEventList
  };
