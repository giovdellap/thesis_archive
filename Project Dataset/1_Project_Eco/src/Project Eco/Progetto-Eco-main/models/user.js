const Joi = require('joi')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');

require('dotenv').config()

const userSchema = new mongoose.Schema({
    CF: { 
        type: String,
        required: true,
        minlength: 16, 
        maxlength: 16
    },
    type: {
        type: String,
        enum: ['cittadino', 'operatore','admin'],
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    surname: {  
        type: String,
        required: true
    },
    sex: { 
        type: String,
        minlength: 1, 
        maxlength: 1,
        required: true
    },
    birthdate: {    
        type: Date,
        required: true
    },
    birthplace: {   
        type: String,
        required: true
    },
    email: {    
        type: String,
        minlength: 5,
        maxlength: 255,
        unique: true,
        required: true
    },
    phone: {
        type: String, 
        minlength: 5,
        maxlength: 15,
        unique: true,
    },
    password: { 
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: true
    },
    password_changing: {
        type: Boolean,
        default: false
    }
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({type: this.type, CF: this.CF}, process.env.ECO_TOKEN_KEY);    
    return token;
}

const User = mongoose.model('User', userSchema)


function validateUser(user) {
    const pattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    
    const schema = {    
        type: Joi.string().valid('cittadino','operatore'),  
        name: Joi.string().required(),  
        surname: Joi.string().required(),   
        sex: Joi.string().min(1).max(1).required(), 
        birthdate: Joi.date().required(),   
        birthplace: Joi.string().required(),   
        email:  Joi.string().min(5).max(255).email().required(),
        phone: Joi.string().regex(pattern), 
        password: Joi.string().min(5).max(1024).required()
    
    }

    return Joi.validate(user,schema)
}


exports.User = User
exports.validateUser = validateUser