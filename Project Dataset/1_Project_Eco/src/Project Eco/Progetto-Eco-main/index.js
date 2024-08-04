const express = require('express')
const {logger}=require('./startup/logging')
const config=require('config')
const {updateChemicalAgents}=require('./startup/updater')
const {updateMeteo}=require('./startup/updater_meteo')
const {SuperUser_startup}=require('./startup/superuser_startup')

const app = express()
var cors = require('cors')



app.use(cors());
app.options('*', cors()) 
const port = process.env.PORT || 8081

require('./startup/db')()
require('./startup/routes')(app)



const server = app.listen(8081, () =>  { console.log("Server listening on port : " , port)})




if(process.env.NODE_ENV!="test"){
SuperUser_startup()
.then((result)=>{
    if(result=='Super user set')
    console.log('Admin setted') 
    else 
    console.log('Admin already exist')
})
.catch((error)=>{console.log(error)})
}


if(process.env.NODE_ENV!="test"){
setInterval(updateChemicalAgents,config.get('aqi_time_int')) //10 minutes
updateMeteo()
setInterval(updateMeteo, config.get('timer_meteo')) //10 minutes
}

module.exports = server

