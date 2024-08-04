const express = require('express')    
const announcements = require('../routes/announcements')
const chemicalagent=require('../routes/chemicalagents')
const meteo = require('../routes/meteos')
const auth = require('../routes/auth')
const registration = require('../routes/registration')
const token = require('../routes/token')
const test= require('../routes/test')

module.exports = function(app) {
    app.use(express.json())
    app.use('/announcements', announcements)
    app.use('/chemical_agents',chemicalagent)
    app.use('/weather', meteo)
    app.use('/auth', auth)
    app.use('/registration',registration)
    app.use('/token', token)
    app.use('/', test)
}