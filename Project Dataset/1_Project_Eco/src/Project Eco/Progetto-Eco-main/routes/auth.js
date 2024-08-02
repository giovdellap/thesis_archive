const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {validateReqEmail, validateReqPhone} = require('../helper/auth_helper')

router.post('/email', async (req, res) => {
    const { error } = validateReqEmail(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password');

    if(user.password_changing)
        await User.findOneAndUpdate({email: req.body.email}, {password_changing: false})
    
    const token = user.generateAuthToken();
    res.status(200).send({
        token : token,
        type : user.type
    });
});

router.post('/phone', async (req, res) => {
    const { error } = validateReqPhone(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({phone: req.body.phone})
    if(!user) return res.status(400).send('Invalid phone or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid phone or password');

    if(user.password_changing)
        await User.findOneAndUpdate({phone: req.body.phone}, {password_changing: false})
  
    const token = user.generateAuthToken();
    res.status(200).send({
        token : token,
        type : user.type
    });
});

module.exports = router;