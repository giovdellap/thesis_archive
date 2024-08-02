const express = require('express')
const {Agents,Chemical_Agent,validate}=require('../models/chemical_agents')
const moment=require('moment')
const router = express.Router()
const{validateDate}=require('../helper/generic_helper')
const auth = require('../middleware/auth')
const operator = require('../middleware/operator')

router.get('/', auth, async (req,res) => {

    const max_date= await Chemical_Agent.findOne()
    .sort("-reg_date")
    .select("reg_date")
    if(!max_date) return res.status(404).send('No data available')

    const result=await Chemical_Agent.find({reg_date:max_date.reg_date})
    .select("sensor uid -_id types value lat long")
    toback=[]
    obj={}
    for (el in result)
    {
     app=await Chemical_Agent.find({uid:result[el].uid,types:result[el].types})
    .sort("-reg_date")
    if(app.length>0)
    {
        let i=0;
        let sum=0;
        let len=app.length
        for(i=0;i<len;i++)
        {
           // console.log(result[i].value)
            sum+=app[i].value
            
        }
        //console.log(sum)
        let avg=(sum/app.length)
        th="SOTTO"
        if(parseInt(result[el.value]) > parseInt(avg))
            th="SOPRA"

         obj={
                        sensor : result[el].sensor,
                        uid : result[el].uid,
                        lat : parseFloat(result[el].lat).toFixed(2),
                        lng : parseFloat(result[el].long).toFixed(2),
                        value: result[el].value,
                        types: result[el].types,
                        avg: avg,
                        th: th
        }
     }
     toback.push(obj)

    }
    res.status(200).send(toback)
  
})


router.get('/filter/date/:date_start/:date_end', [auth, operator], async (req,res) => {

    const date_start = new Date(req.params.date_start)
    const date_stop = new Date(req.params.date_end)
    if(validateDate(date_start) && validateDate(date_stop)){
    date_start.setHours("0")
    date_start.setMinutes("1")
    date_stop.setHours("23")
    date_stop.setMinutes("59")
    const result = await Chemical_Agent.find({reg_date: {'$gte': date_start, '$lt': date_stop}})
    .select("sensor uid -_id value types lat long")
    .sort("uid")
    if(result.length>0) res.status(200).send(result)
   else res.status(404).send("No data with the given criteria")
    }else{
        res.status(400).send("Bad request")
    }
})

router.get('/filter/date/:station_id/:date_start/:date_end', [auth, operator], async (req,res) => {
  
    const date_start = new Date(req.params.date_start)
    const date_stop = new Date(req.params.date_end)
    if(validateDate(date_start) && validateDate(date_stop)){
    date_start.setHours("0")
    date_start.setMinutes("1")
    date_stop.setHours("23")
    date_stop.setMinutes("59")
    // proviamo
    const id_s=req.params.station_id
    const result = await Chemical_Agent.find({uid:id_s,reg_date: {'$gte': date_start, '$lte': date_stop}})
    .select(" reg_date sensor uid -_id value types lat long")
    .sort("uid")
    if(result.length>0)res.status(200).send(result)
   else  res.status(404).send("No data with the given criteria")
    }else
    {
        res.status(400).send("Bad request")
    }
 
})

router.get('/filter/date/:date_start/:date_end/type/:type', [auth, operator], async (req,res) => {
  
    const date_start = new Date(req.params.date_start)
    const date_stop = new Date(req.params.date_end)
    if(validateDate(date_start) && validateDate(date_stop)){
    date_start.setHours("0")
    date_start.setMinutes("1")
    date_stop.setHours("23")
    date_stop.setMinutes("59")
    const result = await Chemical_Agent.find({types:(req.params.type.toUpperCase()),reg_date: {'$gte': date_start, '$lte': date_stop}})
    .select(" reg_date sensor uid -_id value types lat long")
    .sort("uid")

    if(result.length>0)res.status(200).send(result)
   else  res.status(404).send("No data with the given criteria")
    }else
    {
        res.status(400).send("Bad request")
    }
 
})
router.get('/filter/date/:date_start/:date_end/type/:type/:station_id', [auth, operator], async (req,res) => {
  
    const date_start = new Date(req.params.date_start)
    const date_stop = new Date(req.params.date_end)
    if(validateDate(date_start) && validateDate(date_stop)){
    date_start.setHours("0")
    date_start.setMinutes("1")
    date_stop.setHours("23")
    date_stop.setMinutes("59")
    const id_s=req.params.station_id
    const result = await Chemical_Agent.find({uid:id_s,types:(req.params.type.toUpperCase()),reg_date: {'$gte': date_start, '$lte': date_stop}})
    .select(" reg_date sensor uid -_id value types lat long")
    .sort("uid")
    if(result.length>0)res.status(200).send(result)
   else  res.status(404).send("No data with the given criteria")
    }else
    {
        res.status(400).send("Bad request")
    }
 
})



router.get('/filter/avg/:station_id/:type', async (req,res) => {
    
    let par1=req.params.station_id
    let par2=req.params.type.toUpperCase()
  
    let ind=Object.values(Agents).indexOf(par2)
    if(ind>-1)
    {
        const result=await Chemical_Agent.find({uid:par1,types:par2})
        .sort("-reg_date")
        if(result.length>0)
        {
            let i=0;
            let sum=0;
            let len=result.length
            for(i=0;i<len;i++)
            {
               // console.log(result[i].value)
                sum+=result[i].value
                
            }
            //console.log(sum)
            let avg=(sum/result.length)
            
            let obj={value:avg}
            res.status(200).send(obj)
        } 
        else{
            res.status(404).send("NOT FOUND")
        }
            
        
    }else
    
    res.status(400).send("Bad Request")
    
   
})

router.get('/filter/avg/:station_id', auth, async (req,res) => {
    let par1=req.params.station_id
    const result=await Chemical_Agent.find({uid:par1})
    .sort("-reg_date")
    if(result.length>0)
    {
        let i=0;
        let sum=[0.0,0.0,0.0,0.0,0.0,0.0]
        let cont=[0,0,0,0,0,0]
        let len=result.length
        for(i=0;i<len;i++)
        {
           // console.log(result[i].types+ "->"+result[i].value)
            if(result[i].types==Agents.CO){
                sum[0]+=result[i].value
                cont[0]+=1
            }
            if(result[i].types==Agents.SO2)
            {
                sum[1]+=result[i].value
                cont[1]+=1
            }

            if(result[i].types==Agents.PM10)
            {
                sum[2]+=result[i].value
                cont[2]+=1
            }

            if(result[i].types==Agents.PM25)
            {
                sum[3]+=result[i].value
                cont[3]+=1
            }
            if(result[i].types==Agents.O3)
            {
                sum[4]+=result[i].value
                cont[4]+=1
            }
        }

        let obj=[
       {
        types:"CO",
        avg:(sum[0]/cont[0])
       },
       {
        types:"SO2",
        avg: (sum[1]/cont[1])
       },
       {
        types:"PM10",
        avg:(sum[2]/cont[2])
       },
       {
        types:"PM25",
        avg:(sum[3]/cont[3])
       },
       {
        types:"O3",
        avg:(sum[4]/cont[4])
       }
       
        ]
            
        //console.log(obj)
        
       
        res.status(200).send(obj)
    }   
    else{
        res.status(404).send("NOT FOUND")
        }  
   
})
//should return history of all data 
router.get('/history', [auth, operator], async (req,res) => {
 const result=await Chemical_Agent.find()
 .sort("-reg_date")
 .select("reg_date sensor uid types value -_id lat long")
if(result.length>0) 
    res.status(200).send(result)  
else
    res.status(400).send("Data not available")
})



router.get('/history/:type', [auth, operator], async (req,res) => {
    let par=req.params.type.toUpperCase()
    let ind=Object.values(Agents).indexOf(par)
    if(ind>-1)
    {
    const result=await Chemical_Agent.find({types:par})
    .sort("-reg_date")
    .select("reg_date sensor uid types value -_id lat long")

    if(result.length>0)
         res.status(200).send(result)
    else
        res.status(404).send('No data available')
     
    }else{

        res.status(400).send("Bad request")
    }
   })

   router.get('/history/station/:station_id', [auth, operator], async (req,res) => {
    let par=req.params.station_id

    
    const result=await Chemical_Agent.find({uid:par})
    .sort("-reg_date")
    .select("reg_date sensor uid types value -_id lat long")  
    if(result.length>0)
        res.status(200).send(result)
    else
        res.status(404).send("Data not available")
   })

   router.get('/history/station/:station_id/:type', [auth, operator], async (req,res) => {
    let par1=req.params.station_id
    let par2=req.params.type.toUpperCase()
  
    let ind=Object.values(Agents).indexOf(par2)
    if(ind>-1)
    {
        const result=await Chemical_Agent.find({uid:par1,types:par2})
        .sort("-reg_date")
        .select("reg_date sensor uid types value -_id lat long")  
        if(result.length>0)
            res.status(200).send(result) 
        else
            res.status(404).send("NOT FOUND")
        
    }else
    
    res.status(400).send("Bad Request")
    
   
   })

    





module.exports = router