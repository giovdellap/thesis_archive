const mongoose = require('mongoose')
const config = require('config')

mongoose.set('useFindAndModify', false)

module.exports = function () {
    let db = ""

    if(config.get("docker_deploy") == "yes"){
        db = config.get("db_docker")
    }

    else{
        db = config.get("db")
    }

    // console.log("DB: "+db)

    mongoose.connect(db, { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true})
            .then(() => console.log('Successfully connected to MongoDB!'))
            .catch(err => console.log("Error encounterd while connecting to MongoDB : " , err.message))
}