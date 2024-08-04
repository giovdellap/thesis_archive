const express = require('express')
var request = require('request')
const config = require('config')
const router = express.Router()
const {logger} = require('../startup/logging')
const {Meteo, Meteo7days, UVSchema, validate}=require('../models/meteo')
const auth = require('../middleware/auth')
const operator = require('../middleware/operator')


router.get('/uv/now', [auth, operator], async (req,res) =>{

    var options = { method: 'GET',
        url: config.get('apiuv_url') ,
        qs: { lat: config.get('Rome_lat'), lng: config.get('Rome_lon')},
        headers: 
        { 'content-type': 'application/json',
            'x-access-token': process.env.UVRAYS_KEY } };

    request(options, function (error, response, body) {
        if (error){ 
            res.status(500).send('Internal server error.');
            console.error('error:', error);
            logger.error('M5: Impossibile to get UV data from external server')
            console.log('M5')
            reject(error);
            return
        }
        else{
            var info = JSON.parse(body)

            async function creaUVSchema(){           
                var uvschema = new UVSchema({
                    "uv_value" : info.result.uv,
                    'uv_value_time' : info.result.uv_time,
                    'uv_max' : info.result.uv_max,
                    'uv_max_time' : info.result.uv_max_time,
                    'ozone_value' : info.result.ozone,
                    'ozone_time' : info.result.ozone_time ,
                    'data': info.result.uv_time.substr(0,10)
                });


            try{
                const result = await uvschema.save();
            }catch(ex){
                console.log(ex);
                console.error('error:', error);
                logger.error('M6: Impossibile to save UV data to database')
                console.log('M6')
                reject(error);
            }

            res.status(200).send(uvschema);

            };
            
            creaUVSchema();

        }
    });


});

router.get('/uv/real_time', auth, async (req,res) => {
    var lin = 'http://api.openweathermap.org/data/2.5/uvi?appid='+process.env.METEO_KEY+'&lat='+config.get('Rome_lat')+'&lon='+config.get('Rome_lon');
    request.get(lin, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body); 
            res.status(200).send(info)
        }
    });
    
});

router.get('/uv/forecast', auth, async (req,res) => {
    var lin = 'http://api.openweathermap.org/data/2.5/uvi/forecast?appid='+process.env.METEO_KEY+'&lat='+config.get('Rome_lat')+'&lon='+config.get('Rome_lon')+'&cnt=7';
    request.get(lin, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body); 
            res.status(200).send(info)
        }
    });
    
});


router.get('/uv/:date', [auth, operator], async (req,res) =>{

    if(!req.params.date.match('[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]')){ 
        res.status(400).send('Bad request.')
        return
    }

    const result = await (await UVSchema.findOne().sort('-_id').find({data: req.params.date}))
    if(!result || result[0]===undefined) res.status(404).send("Not found.")
    else {
        var tosend = {
            'uv_max': result[0].uv_max,
            'uv_max_time': result[0].uv_max_time,
            'ozone_value': result[0].ozone_value,
            'ozone_time': result[0].ozone_time
        }

        res.status(200).send(tosend)
    }
});
router.get('/report/last', auth, async (req,res) => {
    
    const result = await Meteo.findOne().sort('-_id')
    if(!result){ 
        res.status(500).send("Internal server error.")
        console.error('error:', error);
        logger.error('M3: Impossibile to get meteo report data from database')
        console.log('M3')
        reject(error);
        return
    }
    else{
        var tosend = {
            "data": result.data,
            "datastamp": result.datastamp,
            "descrizione": result.descrizione,
            "t_att": result.t_att,
            "humidity": result.humidity,
            "wind": result.wind  
            } 

        res.status(200).send(tosend)
    }
});

router.get('/report/7daysforecast', auth, async (req,res) => {
    var lin = config.get('weather_report_url') + process.env.METEO_KEY;
    request.get(lin, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body); 
            var datastamp = [];
            var descrizione = [];
            var temp_min = [];
            var temp_max = [];
            var umidita = [];
            var wind = [];
            var data = [];
            for (i = 0; i < 7; i++) {
                datastamp[i] = info.daily[i+1].dt;
                descrizione[i] = info.daily[i+1].weather[0].main + ", " + info.daily[i].weather[0].description;
                temp_min[i] = Math.trunc(info.daily[i+1].temp.min-273.15);
                temp_max[i] = Math.trunc(info.daily[i+1].temp.max-273.15);
                umidita[i] = info.daily[i+1].humidity;
                wind[i] = info.daily[i+1].wind_speed;
                
                
                var d = new Date(datastamp[i]*1000);
                data[i] = d.toISOString();
                /*
                var day = d.getDate().toString(); 
                if(day.length==1) day = '0'+day
                var month = (d.getMonth()+1).toString();
                if(month.length==1) month = '0'+month
                data[i] = day + '/' + month + '/' + d.getFullYear(); */
            }   
            
            //const Meteo = mongoose.model('Meteo', meteoSchema);
        
            async function creaMeteo(){           
                var meteo7days = new Meteo7days({
                    array: [{
                        data: data[0],
                        datastamp: datastamp[0],
                        descrizione: descrizione[0],
                        t_min: temp_min[0],
                        t_max: temp_max[0],
                        humidity: umidita[0],
                        wind: wind[0]  
                    },{
                        data: data[1],
                        datastamp: datastamp[1],
                        descrizione: descrizione[1],
                        t_min: temp_min[1],
                        t_max: temp_max[1],
                        humidity: umidita[1],
                        wind: wind[1]  
                    },{
                        data: data[2],
                        datastamp: datastamp[2],
                        descrizione: descrizione[2],
                        t_min: temp_min[2],
                        t_max: temp_max[2],
                        humidity: umidita[2],
                        wind: wind[2]  
                    },{
                        data: data[3],
                        datastamp: datastamp[3],
                        descrizione: descrizione[3],
                        t_min: temp_min[3],
                        t_max: temp_max[3],
                        humidity: umidita[3],
                        wind: wind[3]  
                    },{
                        data: data[4],
                        datastamp: datastamp[4],
                        descrizione: descrizione[4],
                        t_min: temp_min[4],
                        t_max: temp_max[4],
                        humidity: umidita[4],
                        wind: wind[4]  
                    },{
                        data: data[5],
                        datastamp: datastamp[5],
                        descrizione: descrizione[5],
                        t_min: temp_min[5],
                        t_max: temp_max[5],
                        humidity: umidita[5],
                        wind: wind[5]  
                    },{
                        data: data[6],
                        datastamp: datastamp[6],
                        descrizione: descrizione[6],
                        t_min: temp_min[6],
                        t_max: temp_max[6],
                        humidity: umidita[6],
                        wind: wind[6]  
                    }]
                });


            //REMINDER: devo decidere se è necessario salvare sul database
            res.status(200).send(meteo7days)/*
            try{
                const result = await meteo7days.save();
            }catch(ex){
                console.log(ex);
            }*/
            };

        creaMeteo();
        
        }else{
            res.status(500).send("Internal server error.")
            console.error('error:', error);
            logger.error('M4: Impossibile to get meteo report forecast from external server')
            console.log('M4')
            reject(error);
        }
    });
});


router.get('/report/history/:date', auth, async (req,res) => {
    if(!req.params.date.match('[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]')){ 
        res.status(400).send('Bad request.')
        return
    }
    var par = req.params.date // yyyy-mm-dd
    var miadata = new Date();
    miadata.setDate(parseInt(par.substr(8,2)));
    miadata.setMonth(parseInt(par.substr(5,2))-1);
    miadata.setYear(parseInt(par.substr(0,4)));
    var tomorrow = new Date(miadata)
    tomorrow.setDate(tomorrow.getDate()+1)
    var par1 = miadata.toISOString().substr(0,10) 
    var par2 = tomorrow.toISOString().substr(0,10) 
    
    var lin = 'http://api.weatherbit.io/v2.0/history/daily?&city=Rome,it&start_date='+par1+'&end_date='+par2+'&tz=local&key='+ process.env.METEO_HISTORY_KEY;
    request.get(lin, (error, response, body) => {
        if (error || response.statusCode != 200) {
            res.status(404).send('Not found.')
        }else{
            var info = JSON.parse(body)
            var tosend = {
                    'date': miadata,
                    't_min' : info.data[0].min_temp,
                    't_max' : info.data[0].max_temp,
                    'wind': info.data[0].wind_spd,
                    'humidity': info.data[0].rh
                }
            res.status(200).send(tosend)
        }
    });
});

module.exports = router