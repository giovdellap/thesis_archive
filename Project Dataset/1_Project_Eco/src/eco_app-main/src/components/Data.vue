<template>
  <div class="card">

    <span v-if="userType!='cittadino'"> </span>
    <div class="card-body">

      
        

        
          
                <h5 class="card-title"><b>AGENTI CHIMICI</b></h5>
                <!--  TABELLA  -->
                <div class="table-responsive table-borderless" style="height:500px">
                    <table class="table">
                        
                        <!--  INTESTAZIONE TABELLA  -->
                        <thead class="thead-light">
                            <tr>
                                 <th  scope="col">STAZIONE</th>
                                 <th scope="col">TIPO</th>
                                 <th scope="col">VALORE</th>
                                 <th  scope="col">MEDIA</th>
                                 <th  scope="col">SOGLIA</th>
                                 <th  scope="col">LAT</th>
                                 <th  scope="col">LNG</th>
                            </tr>
                        </thead>

                        <!--  CORPO TABELLA  -->
                        <tbody>
                            <tr v-for="sensor in sensors" :key="sensor.sensor">
                                <td>{{sensor.sensor}}</td>
                                <td>{{sensor.types}}</td>
                                <td>{{sensor.value}}</td>
                                <td>{{sensor.avg}}</td>
                                <td>{{sensor.th}}</td>
                                <td>{{sensor.lat}}</td>
                                <td>{{sensor.lng}}</td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>

        
       
        

     
    </div>

  </div>

</template>


<script>
import axios from 'axios'

export default {

  data () {
    return {
      userType : '',
      info : [],
      sensors : [],
      clickedSensor : {},
      avgs : [],
 
    }
  },
  created(){
    this.userType = localStorage.type

  },
  mounted:
    function getDataFromSensors(){
      // PRENDO I DATI DEGLI AGENTI CHIMICI DA TUTTI I SENSORI E MI SALVO I SENSORI IN UN ARRAY A PARTE
      axios({
        method: 'get',
        url: 'http://localhost:8081/chemical_agents',
        headers: {
          "x-eco-auth-token": localStorage.token
        }
      })
      .then((response) => {
        let i=0
        const dim = response.data.length
        for(i=0;i<dim;i++){ 
          const toPush = {
            value : response.data[i].value,
            type : response.data[i].types
          }
          if(!this.info.includes(toPush)) this.info.push(toPush)
          if(!this.sensors.includes(response.data[i])){

            this.sensors.push({
              sensor : response.data[i].sensor,
              uid : response.data[i].uid,
              lat : response.data[i].lat,
              lng : response.data[i].lng,
              value: response.data[i].value,
              types: response.data[i].types,
              avg : (parseFloat(response.data[i].avg)).toFixed(2),
              th: response.data[i].th
            })

          }
        }
      })
      .catch((error) => {
        alert("[/chemical_agents] Dati non disponibili")
        console.log(error)
      })
          
    },
    
    methods : {
 
}
}
</script>



<style scoped>
.bodyChemicalAgentInfo{
  font-size: 13px;
  text-align: center;
}
.headerChemicalAgentInfo{
  font-size: 15px;
  text-align: center;
}
.headerSensorInfo{
  font-size: 15px;
  text-align: center;
}
.bodySensorInfo{
  font-size: 13px;
  text-align: center;
}
#mytable{
  overflow-y: scroll;
  overflow-x: hidden;
  width: 410px;
  height: 160px;
}
.card{
  border-color: green;
}


</style>