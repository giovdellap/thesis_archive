const validateObjectId = require('../middleware/validateObjectId')
const {Announcement,validate} = require('../models/announcement')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const operator = require('../middleware/operator')
const {UpdateCitizen}=require('../helper/email_helper')
const jwt = require('jsonwebtoken')

router.post('/' , [auth, operator], async (req,res) => {
    const {error} = validate(req.body)
    if (error)  return res.status(400).send(error.details[0].message)

    let announcement = new Announcement({
        CF: req.body.CF,
        start: req.body.start,
        end: req.body.end,
        zone: req.body.zone,
        description: req.body.description
    })
    announcement = await announcement.save()

    UpdateCitizen(req.body.start,req.body.end,req.body.zone,req.body.description)
    res.send(announcement)
})

router.get('/', auth, async (req,res) => {
    const announcements = await Announcement.find().sort('-start')
    res.send(announcements)
})

router.get('/:CF', [auth, operator], async (req,res) => {
    const announcements = await Announcement.find({CF: req.params.CF})
    if (!announcements.length) return res.status(404).send('No announcements match the given criteria')
    res.send(announcements)
})

router.get('/:date_start/:date_end', auth, async (req,res) => {
    const date_start = new Date(req.params.date_start)
    const date_stop = new Date(req.params.date_end)
    const announcements = await Announcement.find({start: {'$gte': date_start, '$lt': date_stop}})
    if (!announcements.length) return res.status(404).send('No announcements match the given criteria')
    res.send(announcements)
})

router.get('/since/starting_from/:date_start', auth, async (req,res) => {
    const date_start = new Date(req.params.date_start)
    const announcements = await Announcement.find({start: {'$gte': date_start}})
    if (!announcements.length) return res.status(404).send('No announcements match the given criteria')
    res.send(announcements)
})


router.get('/before/terminated_before/:date_end', auth, async (req,res) => {
    const date_stop = new Date(req.params.date_end)
    const announcements = await Announcement.find({start: {'$lt': date_stop}})
    if (!announcements.length) return res.status(404).send('No announcements match the given criteria')
    res.send(announcements)
})



router.put('/:id' , [validateObjectId, auth, operator], async(req,res) => {
    const {error} = validate(req.body)
    if (error)  return res.status(400).send(error.details[0].message)

    const result = await Announcement.findById(req.params.id)
    if (!result)   return res.status(404).send('Announcement not found')
 
    const token = req.header('x-eco-auth-token')
    var decoded = jwt.decode(token);
    // get the decoded payload and header
    var decoded = jwt.decode(token, {complete: true});
    const cf = decoded.payload.CF
    if(cf != result.token) return res.status(400).send("Session expired")

    const annoucement = await Announcement.findByIdAndUpdate(req.params.id, {
        CF: req.body.CF,
        start: req.body.start,
        end: req.body.end,
        zone: req.body.zone,
        description: req.body.description
    }, {new: true} )
    
    res.send(annoucement)
})

router.delete('/:id', [validateObjectId, auth, operator], async(req,res) => {

    const result = await Announcement.findById(req.params.id)
    if (!result) return res.status(404).send('Announcement not found')

    const token = req.header('x-eco-auth-token')
    var decoded = jwt.decode(token);
    // get the decoded payload and header
    var decoded = jwt.decode(token, {complete: true});
    const cf = decoded.payload.CF

    if(cf != result.token) return res.status(400).send("Session expired")

    const annoucement = await Announcement.findByIdAndDelete(req.params.id)
    res.send(annoucement)
})


module.exports = router