<template>
<div>
<!-- PC -->
<div class="container d-none d-xl-block">
  <div class="row" style="text-align:left;">
    <div class="col-12 col-sm-8 col-md-6 col-lg-4" style="text-align:center;padding:0;">
      <div class="card" onload="getReport();" >
        <!-- TABBED PANE BAR-->
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item active"><a class="nav-link active" id="tab1-tab" data-toggle="tab" href="#tab1" role="tab" aria-controls="tab1" aria-selected="false" >Tempo Reale</a></li>
          <li class="nav-item"><a class="nav-link" id="tab2-tab" data-toggle="tab" href="#tab2" role="tab" aria-controls="tab2" aria-selected="true">7 giorni</a></li>
         
        </ul>
        <!-- TABBED PANE CONTENT-->
        <div class="tab-content" id="myTabContent" >
          <div  id="tab1" class="tab-pane active" role="tabpanel" aria-labelledby="tab1-tab">
            
            <div class="container" >

              <div class="row row-eq-height" >
                <div class="col-sm-6 col-6 " style="padding-left:20px">
                  <div id="uno" >
                    <!-- GIORNO -->
                    <img v-if="stato=='Clear' && notte==false" style="height:100%; width:100%;" src="../../images/sun.png" alt="">
                    <img v-if="stato=='Clouds' && notte==false" style="height:100%; width:100%;" src="../../images/cloud.png" alt="">
                    <img v-if="stato=='Rain' && notte==false" style="height:100%; width:100%;" src="../../images/rain.png" alt="">
                    <!-- NOTTE -->
                    <img v-if="stato=='Clear' && notte==true" style="height:100%; width:100%;" src="../../images/moon.png" alt="">
                    <img v-if="stato=='Clouds' && notte==true" style="height:100%; width:100%;" src="../../images/mooncloud.png" alt="">
                    <img v-if="stato=='Rain' && notte==true" style="height:100%; width:100%;" src="../../images/moonrain.png" alt="">
                  </div>
                </div>
                <div class="col-sm-6 col-6" style="padding-left:0;">
                  <div id="due">
                    {{t_att}}°C
                  </div>
                  <div id="tre">
                    {{descrizione}}
                  </div>
                  <div id="tre">
                    Vento: {{wind}} km/h
                  </div>
                  <div id="tre">
                    Umidità: {{humidity}}%
                  </div>
                 </div>
            </div>
          </div>
            
          </div>

          <!-- Secondo Tabbed-->
          <div class="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
              
            <div class ="col" style="padding-top:5px;">
              <table>
                  <!-- Prima riga giorno -->
                  <tr>
                    <td class="colonna-check-prima">
                      {{this.giorni[this.oggi+1]}}
                    </td>
                    <td class="colonna-check">
                      {{this.giorni[this.oggi+2]}}
                    </td>
                    <td class="colonna-check">
                      {{this.giorni[this.oggi+3]}}
                    </td>
                    <td class="colonna-check">
                      {{this.giorni[this.oggi+4]}}
                    </td>
                    <td class="colonna-check">
                      {{this.giorni[this.oggi+5]}}
                    </td>
                    <td class="colonna-check">
                      {{this.giorni[this.oggi+6]}}
                    </td>
                    <td class="colonna-check">
                      {{this.giorni[this.oggi+7]}}
                    </td>
                  </tr>
                  <!-- Seconda riga meteo -->
                  <tr>
                    <td class="colonna-check-prima">
                      <img v-if="FCarray[0].descrizione.substr(0,3)=='Cle'" src="../../images/sumicon.jpg" alt="">
                      <img v-if="FCarray[0].descrizione.substr(0,3)=='Clo'" src="../../images/cloudicon.jpg" alt="">
                      <img v-if="FCarray[0].descrizione.substr(0,3)=='Rai'" src="../../images/rainicon.jpg" alt="">
                    </td>
                    <td class="colonna-check">
                      <img v-if="FCarray[1].descrizione.substr(0,3)=='Cle'" src="../../images/sumicon.jpg" alt="">
                      <img v-if="FCarray[1].descrizione.substr(0,3)=='Clo'" src="../../images/cloudicon.jpg" alt="">
                      <img v-if="FCarray[1].descrizione.substr(0,3)=='Rai'" src="../../images/rainicon.jpg" alt="">
                    </td>
                    <td class="colonna-check">
                      <img v-if="FCarray[2].descrizione.substr(0,3)=='Cle'" src="../../images/sumicon.jpg" alt="">
                      <img v-if="FCarray[2].descrizione.substr(0,3)=='Clo'" src="../../images/cloudicon.jpg" alt="">
                      <img v-if="FCarray[2].descrizione.substr(0,3)=='Rai'" src="../../images/rainicon.jpg" alt="">
                    </td>
                    <td class="colonna-check">
                      <img v-if="FCarray[3].descrizione.substr(0,3)=='Cle'" src="../../images/sumicon.jpg" alt="">
                      <img v-if="FCarray[3].descrizione.substr(0,3)=='Clo'" src="../../images/cloudicon.jpg" alt="">
                      <img v-if="FCarray[3].descrizione.substr(0,3)=='Rai'" src="../../images/rainicon.jpg" alt="">
                    </td>
                    <td class="colonna-check">
                      <img v-if="FCarray[4].descrizione.substr(0,3)=='Cle'" src="../../images/sumicon.jpg" alt="">
                      <img v-if="FCarray[4].descrizione.substr(0,3)=='Clo'" src="../../images/cloudicon.jpg" alt="">
                      <img v-if="FCarray[4].descrizione.substr(0,3)=='Rai'" src="../../images/rainicon.jpg" alt="">
                    </td>
                    <td class="colonna-check">
                      <img v-if="FCarray[5].descrizione.substr(0,3)=='Cle'" src="../../images/sumicon.jpg" alt="">
                      <img v-if="FCarray[5].descrizione.substr(0,3)=='Clo'" src="../../images/cloudicon.jpg" alt="">
                      <img v-if="FCarray[5].descrizione.substr(0,3)=='Rai'" src="../../images/rainicon.jpg" alt="">
                    </td>
                    <td class="colonna-check">
                      <img v-if="FCarray[6].descrizione.substr(0,3)=='Cle'" src="../../images/sumicon.jpg" alt="">
                      <img v-if="FCarray[6].descrizione.substr(0,3)=='Clo'" src="../../images/cloudicon.jpg" alt="">
                      <img v-if="FCarray[6].descrizione.substr(0,3)=='Rai'" src="../../images/rainicon.jpg" alt="">
                    </td>
                  </tr>
                  <!-- Terza riga Max --><tr>
                    <td class="colonna-check-prima" style="color:red;">
                      {{ FCarray[0].t_max}}°C
                    </td>
                    <td class="colonna-check" style="color:red;">
                      {{ FCarray[1].t_max}}°C
                    </td>
                    <td class="colonna-check" style="color:red;">
                      {{ FCarray[2].t_max}}°C
                    </td>
                    <td class="colonna-check" style="color:red;">
                      {{ FCarray[3].t_max}}°C
                    </td>
                    <td class="colonna-check" style="color:red;">
                      {{ FCarray[4].t_max}}°C
                    </td>
                    <td class="colonna-check" style="color:red;">
                      {{ FCarray[5].t_max}}°C
                    </td>
                    <td class="colonna-check" style="color:red;">
                      {{ FCarray[6].t_max}}°C
                    </td>
                  </tr>
                  <!-- Quarta riga min --><tr>
                    
                    <td class="colonna-check-prima" style="color:blue;">
                      {{ FCarray[0].t_min}}°C
                    </td>
                    <td class="colonna-check" style="color:blue;">
                      {{ FCarray[1].t_min}}°C
                    </td>
                    <td class="colonna-check" style="color:blue;">
                      {{ FCarray[2].t_min}}°C
                    </td>
                    <td class="colonna-check" style="color:blue;">
                      {{ FCarray[3].t_min}}°C
                    </td>
                    <td class="colonna-check" style="color:blue;">
                      {{ FCarray[4].t_min}}°C
                    </td>
                    <td class="colonna-check" style="color:blue;">
                      {{ FCarray[5].t_min}}°C
                    </td>
                    <td class="colonna-check" style="color:blue;">
                      {{ FCarray[6].t_min}}°C
                    </td>
                  </tr>

                  <tr>
                    <td class="colonna-check-prima">
                      {{ FCarray[0].wind}}
                    </td>
                    <td class="colonna-check">
                      {{ FCarray[1].wind}}
                    </td>
                    <td class="colonna-check">
                      {{ FCarray[2].wind}}
                    </td>
                    <td class="colonna-check">
                      {{ FCarray[3].wind}}
                    </td>
                    <td class="colonna-check">
                      {{ FCarray[4].wind}}
                    </td>
                    <td class="colonna-check">
                      {{ FCarray[5].wind}}
                    </td>
                    <td class="colonna-check">
                      {{ FCarray[6].wind}}
                    </td>

                  </tr>

              </table>
            </div>


          </div>
          
        </div>


      </div>
    </div>
  </div>
</div>
<!-- TELEFONO -->
<div class="container mt-3 d-xl-none">
  <div class="col-12 col-sm-4 col-md-6 col-lg-4" style="text-align:center;">
  <div class="row" style="text-align:left;">
    
      <div class="card" style="height:450px;" onload="getReport();" >
         
            <div class="container" style="text-align:center;">

                  
                    <!-- GIORNO -->
                    <img v-if="stato=='Clear' && notte==false" style="align:center; padding-top:15px;" src="../../images/sun.png" alt="">
                    <img v-if="stato=='Clouds' && notte==false" style="align:center; padding-top:15px;" src="../../images/cloud.png" alt="">
                    <img v-if="stato=='Rain' && notte==false" style="align:center; padding-top:15px;" src="../../images/rain.png" alt="">
                    <!-- NOTTE -->
                    <img v-if="stato=='Clear' && notte==true" style="align:center; padding-top:15px;" src="../../images/moon.png" alt="">
                    <img v-if="stato=='Clouds' && notte==true" style="align:center; padding-top:15px;" src="../../images/mooncloud.png" alt="">
                    <img v-if="stato=='Rain' && notte==true" style="align:center; padding-top:15px;" src="../../images/moonrain.png" alt="">
                  
                
                  <div id="due">
                    {{t_att}}°C
                  </div>
                  <div id="tre">
                    {{descrizione}}
                  </div>
                  <div id="tre">
                    Vento: {{wind}} km/h
                  </div>
                  <div id="tre">
                    Umidità: {{humidity}}%
                  </div>
          </div>
            <div class ="col" style="padding-top:5px;padding-left:25px;">
              <table>
                  <!-- Prima riga giorno -->
                  <tr>
                    <td class="colonna-check-prima">
                      {{this.giorni[this.oggi+1]}}
                    </td>
                    <td class="colonna-check">
                      {{this.giorni[this.oggi+2]}}
                    </td>
                    <td class="colonna-check">
                      {{this.giorni[this.oggi+3]}}
                    </td>
                    <td class="colonna-check">
                      {{this.giorni[this.oggi+4]}}
                    </td>
                    <td class="colonna-check">
                      {{this.giorni[this.oggi+5]}}
                    </td>
                  </tr>
                  <!-- Seconda riga meteo -->
                  <tr>
                    <td class="colonna-check-prima">
                      <img v-if="FCarray[0].descrizione.substr(0,3)=='Cle'" src="../../images/sumicon.jpg" alt="">
                      <img v-if="FCarray[0].descrizione.substr(0,3)=='Clo'" src="../../images/cloudicon.jpg" alt="">
                      <img v-if="FCarray[0].descrizione.substr(0,3)=='Rai'" src="../../images/rainicon.jpg" alt="">
                    </td>
                    <td class="colonna-check">
                      <img v-if="FCarray[1].descrizione.substr(0,3)=='Cle'" src="../../images/sumicon.jpg" alt="">
                      <img v-if="FCarray[1].descrizione.substr(0,3)=='Clo'" src="../../images/cloudicon.jpg" alt="">
                      <img v-if="FCarray[1].descrizione.substr(0,3)=='Rai'" src="../../images/rainicon.jpg" alt="">
                    </td>
                    <td class="colonna-check">
                      <img v-if="FCarray[2].descrizione.substr(0,3)=='Cle'" src="../../images/sumicon.jpg" alt="">
                      <img v-if="FCarray[2].descrizione.substr(0,3)=='Clo'" src="../../images/cloudicon.jpg" alt="">
                      <img v-if="FCarray[2].descrizione.substr(0,3)=='Rai'" src="../../images/rainicon.jpg" alt="">
                    </td>
                    <td class="colonna-check">
                      <img v-if="FCarray[3].descrizione.substr(0,3)=='Cle'" src="../../images/sumicon.jpg" alt="">
                      <img v-if="FCarray[3].descrizione.substr(0,3)=='Clo'" src="../../images/cloudicon.jpg" alt="">
                      <img v-if="FCarray[3].descrizione.substr(0,3)=='Rai'" src="../../images/rainicon.jpg" alt="">
                    </td>
                    <td class="colonna-check">
                      <img v-if="FCarray[4].descrizione.substr(0,3)=='Cle'" src="../../images/sumicon.jpg" alt="">
                      <img v-if="FCarray[4].descrizione.substr(0,3)=='Clo'" src="../../images/cloudicon.jpg" alt="">
                      <img v-if="FCarray[4].descrizione.substr(0,3)=='Rai'" src="../../images/rainicon.jpg" alt="">
                    </td>
                  </tr>
                  <!-- Terza riga Max --><tr>
                    <td class="colonna-check-prima" style="color:red;">
                      {{ FCarray[0].t_max}}°C
                    </td>
                    <td class="colonna-check" style="color:red;">
                      {{ FCarray[1].t_max}}°C
                    </td>
                    <td class="colonna-check" style="color:red;">
                      {{ FCarray[2].t_max}}°C
                    </td>
                    <td class="colonna-check" style="color:red;">
                      {{ FCarray[3].t_max}}°C
                    </td>
                    <td class="colonna-check" style="color:red;">
                      {{ FCarray[4].t_max}}°C
                    </td>
                  </tr>
                  <!-- Quarta riga min --><tr>
                    
                    <td class="colonna-check-prima" style="color:blue;">
                      {{ FCarray[0].t_min}}°C
                    </td>
                    <td class="colonna-check" style="color:blue;">
                      {{ FCarray[1].t_min}}°C
                    </td>
                    <td class="colonna-check" style="color:blue;">
                      {{ FCarray[2].t_min}}°C
                    </td>
                    <td class="colonna-check" style="color:blue;">
                      {{ FCarray[3].t_min}}°C
                    </td>
                    <td class="colonna-check" style="color:blue;">
                      {{ FCarray[4].t_min}}°C
                    </td>
                  </tr>

                  <tr>
                    <td class="colonna-check-prima">
                      {{ FCarray[0].wind}}
                    </td>
                    <td class="colonna-check">
                      {{ FCarray[1].wind}}
                    </td>
                    <td class="colonna-check">
                      {{ FCarray[2].wind}}
                    </td>
                    <td class="colonna-check">
                      {{ FCarray[3].wind}}
                    </td>
                    <td class="colonna-check">
                      {{ FCarray[4].wind}}
                    </td>

                  </tr>

              </table>
            </div>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>

import axios from 'axios'

export default {
    name:'Meteo',
    data() {
        return {
          notte: '',
          stato: '',
          descrizione: '',
          data: '',
          t_att: '',
          humidity: '',
          wind: '',

          FCarray: [
            {
              descrizione:'',t_max:'',t_min:'',wind:''
            },{
              descrizione:'',t_max:'',t_min:'',wind:''
            },{
              descrizione:'',t_max:'',t_min:'',wind:''
            },{
              descrizione:'',t_max:'',t_min:'',wind:''
            },{
              descrizione:'',t_max:'',t_min:'',wind:''
            },{
              descrizione:'',t_max:'',t_min:'',wind:''
            },{
              descrizione:'',t_max:'',t_min:'',wind:''
            }
          ],
          oggi:'',
          giorni:['Dom','Lun','Mar','Mer','Gio','Ven','Sab','Dom','Lun','Mar','Mer','Gio','Ven','Sab','Dom']
        }
    },
    
    mounted: 
      async function getReport(){ 
          axios({
            method: 'get',
            url: 'http://localhost:8081/weather/report/last',
            headers: {
              "x-eco-auth-token": localStorage.token
            }
          }).then((response) => { 
            this.descrizione = response.data.descrizione
            this.data = response.data.data
            this.t_att = response.data.t_att
            this.humidity = response.data.humidity
            this.wind = response.data.wind

            var idx = response.data.descrizione.indexOf(',')
            this.stato = this.descrizione.substr(0,idx)
          

            var now = new Date()
            var hour = now.getHours()
            if(hour>=20 || hour <=6) this.notte=true
            else this.notte = false
            
            var desc = response.data.descrizione.substr(idx+2) 
            this.descrizione = desc.charAt(0).toUpperCase() + desc.slice(1)

          })
            .catch((error) => {
            alert("check error "+error)
          })
      

         
          axios({
            method: 'get',
            url: 'http://localhost:8081/weather/report/7daysforecast',
            headers: {
              "x-eco-auth-token": localStorage.token
            }
          }).then((response) => { 
            this.FCarray = response.data.array
            var oggi = new Date()
            this.oggi = oggi.getDay()

          })
            .catch((error) => {
            alert("check error "+error)
          })
      }
    

}
</script>



<style scoped>

#uno{
  /*background-color: green;*/
  height: 140px;
  width: 140px;
}

#due{
  /*background-color: greenyellow;*/
  font-family: "Times New Roman", Times, serif;
  font-size: 34px;
}

#tre{
  /*background-color: red;*/
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
}

#secondo{
  width: 360px;
  height: 200px;
}

#tab1{
  padding-top:8px;
  
}

.colonna-check{
  border-left: 1px solid grey ;
  font-size: 17px;
  padding-left: 7px;
  padding-right: 7px;
  font-family: "Times New Roman", Times, serif;
}
.colonna-check-prima{
  font-size: 17px;
  padding-left: 0px;
  padding-right: 7px;
  font-family: "Times New Roman", Times, serif;
}

.container {
  width: 100%;
}

.card {
  border: 1;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
  width: 360px;
  height: 200px;
  border-color: green;
 /* background-image: url('../../images/immmeteo.jpg');*/
}
.cardt {
  border: 1;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
  width: 360px;
  height: 200px;
  border-color: green;
 /* background-image: url('../../images/immmeteo.jpg');*/
}

.iconaMeteo {
  width: 200px;
  height: 100px;
  padding-top: 0;
  /*background-color: red;*/
}

.temperatura{
  text-align: right;
}

.form-label-group input {
  height: auto;
  border-radius: 2rem;
}




</style>