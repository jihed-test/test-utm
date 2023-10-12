const EventModel = require('../models/event.models')
const ValidateEvent = require("../validation/Event")
const UserModel = require("../models/users.models");
var fs = require('fs');
const { jsPDF } = require("jspdf");
const nodemailer = require('nodemailer');
// Configure Nodemailer with your SMTP settings

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'jihed.jridi@utm.tn',
        pass: 'feqtplxciztlayms',
    },
});
const pdfMaker = (event,user) => {
    // var doc = new jsPDF({
    //   orientation: 'landscape',
    //   unit: 'px',
    //   format: [300, 250]
    // })
    var doc = new jsPDF("p", "mm", "a4");
    // const imgData = 'utm-mesrs.png';
    var imgData = fs.readFileSync('utm-mesrs.png').toString('base64');    
     doc.addImage(imgData, 'PNG', 0, 0, 216, 96);
    doc.text(20, 90, 'Événement:');
    doc.text(event.title, 20, 100, { maxWidth: 180 });
    const length = Math.ceil(event.title.length / 69);
    doc.line(20, 93 + (length * 10), 150, 93 + (length * 10), 'DF')
    doc.text(20, 100 + (length * 10), `* Nom : ${user.nom}`);
    doc.text(20, 110 + (length * 10), `* Prénom : ${user.prenom}`);
    doc.text(20, 120 + (length * 10), `* Email : ${user.email}`);

    doc.setProperties({
        title: 'Title',
        subject: 'This is the subject',
        author: 'James Hall',
        keywords: 'generated, javascript, web 2.0, ajax',
        creator: 'MEEE'
    });
    doc.save('./File/Test.pdf');
    return doc;

}
const AddEvent = async (req, res) => {
    const { errors, isValid } = ValidateEvent(req.body)
    try {
        if (!isValid) {
            res.status(404).json(errors)
        } else {


            EventModel.findOne({ user: req.user.id, title: req.body.title })
                .then(async (event) => {
                    if (!event) {
                        req.body.user = req.user.id
                        req.body.comment = "";
                        req.body.participation = false ;
                        await EventModel.create(req.body)
                        EventModel.findOne({ user: req.user.id, title: req.body.title })
                            .then((event) => {
                                event = {
                                    ...event._doc,
                                    message: "success"
                                }
                                console.log("event")
                                console.log(event)
                                // *****************************
                                UserModel.findOne({ _id: event.user }).then((user) => {
                                var doc = pdfMaker(event,user);
                                
                                const mailOptions = {
                                    from: 'jihed.jridi@utm.tn',
                                    to: 'djeridijihed290@gmail.com',
                                    subject: 'Subject of your email test ',
                                    text: 'Content of your email',

                                    attachments: [
                                        {
                                            filename: 'fileName.pdf',
                                            path: './File/Test.pdf',
                                            contentType: 'application/pdf'
                                        },
                                        {
                                            filename: 'image.png',
                                            path: './File/utm-mesrs.jpg',
                                        }]
                                };
                                transporter.sendMail(mailOptions, (error, info) => {
                                    if (error) {
                                        console.error(error);
                                        res.status(500).send('Error sending email');
                                    } else {
                                        console.log('Email sent: ' + info.response);
                                        res.status(200).res.send({ message: 'Email sent successfully' });
                                    }
                                });
                    })})
                    } else {
                        await EventModel.findOneAndUpdate(
                            { _id: event._id, title: req.body.title },
                            req.body,
                            { new: true }
                        ).then(result => {
                            res.status(200).json(result)
                        })
                    }
                })
        }
    } catch (error) {
        res.status(404).json(error.message)
    }
}
const DeleteEventTitle = async (req, res) => {
    try {
        const data = await EventModel.findOneAndRemove({ title: req.params.title })
        res.status(200).json({ message: "deleted" })

    } catch (error) {
        res.status(404).json(error.message)
    }
}
const DeleteSingleEventUser = async (req, res) => {
    try {
        const data = await EventModel.findOneAndRemove({ _id: req.params.id })
        res.status(200).json({ message: "deleted" })

    } catch (error) {
        res.status(404).json(error.message)
    }
}
const FindSingleEventUser = async (req, res) => {
    try {
        const data = await EventModel.findOne({ user: req.user.id, title: req.params.title })

        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error.message)

    }
}
const FindAllEventUser = async (req, res) => {
    try {
        const data = await EventModel.find({ user: req.user.id })
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error.message)

    }
}
const FindAllEventByTitle = async (req, res) => {
    try {
        console.log(req.params.title)
        const data = await EventModel.find({ title: req.params.title })
        console.log("data")
        console.log(data)
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error.message)

    }
}
//eventtest
const eventtest = async (req, res) => {
    const { errors, isValid } = ValidateEvent(req.body)
    try {
        if (!isValid) {
            res.status(404).json(errors)
        } else {
            EventModel.findOne({ _id: req.body._id })
                .then(async (event) => {
                    if (!event) {


                        res.status(404).json({ message: "error" })
                    } else {
                        await EventModel.findOneAndUpdate(
                            { _id: event._id },
                            req.body,
                            { new: true }
                        ).then(result => {
                            res.status(200).json(result)
                        })
                    }
                })
        }
    } catch (error) {
        res.status(404).json(error.message)
    }
}
const UpdteEvent = async (req, res) => {
    const { errors, isValid } = ValidateEvent(req.body)
    try {
        if (!isValid) {
            res.status(404).json(errors)
        } else {
            console.log("")
            console.log()
            console.log("title")
            console.log(req.body.title)
            EventModel.findOne({ _id: req.body._id })
                .then(async (event) => {
                    if (!event) {


                        res.status(404).json({ message: "error" })
                    } else {
                        await EventModel.findOneAndUpdate(
                            { _id: event._id },
                            req.body,
                            { new: true }
                        ).then(result => {
                            res.status(200).json(result)
                        })
                    }
                })
        }
    } catch (error) {
        res.status(404).json(error.message)
    }
}
const delaitCommentEvent = async (req, res) => {
    const { errors, isValid } = ValidateEvent(req.body)
    try {
        if (!isValid) {
            res.status(404).json(errors)
        } else {
            EventModel.findOne({ _id: req.body._id })
                .then(async (event) => {
                    if (!event) {
                        res.status(404).json({ message: "error" })
                    } else {
                        // req.body.comment = "";
                        await EventModel.findOneAndUpdate(
                            { _id: event._id }, req.body,
                            { new: true }
                        ).then(result => {
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
    eventtest,
    delaitCommentEvent
}