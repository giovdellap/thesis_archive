const Joi = require('joi')
const mongoose = require('mongoose')

const announcementSchema = new mongoose.Schema({
    CF: {
        type: String,
        required: true,
        minlength: 16,  // physical people have excatly a 16 character CF 
        maxlength: 16
    },
    start: {
        type: Date,
        required: true  
    },
    end: {
        type: Date,
        required: true 
    },
    zone: { 
        type: [String],
        default: ['Everywhere'],
    },
    description: {
        type: String,
        maxlength: 300
    },
    token : {
        type: String,
        default : ""
    }
})

const Announcement = mongoose.model('Announcement', announcementSchema)

function validateAnnouncement(announcement) {
    const schema = {
        CF: Joi.string().min(16).max(16).required(),
        start: Joi.date(),
        end:   Joi.date(),
        zone:  Joi.array().items(Joi.string()),
        description: Joi.string().max(300)
    }
    return Joi.validate(announcement,schema)
}

exports.Announcement = Announcement
exports.validate = validateAnnouncement