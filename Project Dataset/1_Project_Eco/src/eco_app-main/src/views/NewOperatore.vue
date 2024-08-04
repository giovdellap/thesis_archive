<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5  border-success">
          <div class="card-body">
            <router-link to="/avanzato"><img src="../assets/back.png" style="float:left;" height="20px;"></router-link>
           <h5 class="card-title text-center"><b>Registrazione nuovo operatore </b></h5>
           
            <hr class="my-4">
            <form class="form-signin" >

            <h6 class="card-subtitle mb-2 text-muted text-left">Credenziali:</h6>

              <div class="form-label-group">
                <div class="row">
                    <div class="col">
                        <input type="text" v-model=name  id="inputName" :class="nameClass" placeholder="Nome" autofocus required>
                        <label v-if="nameVer==false" for="inputName" class="badge badge-danger">No numero</label>
                    </div>
                    <div class="col ">
                        <input type="text" v-model=surname id="inputSurname" :class="surnameClass" placeholder="Cognome" required>
                        <label v-if="surnameVer==false" for="inputSurname" class="badge badge-danger">No numero</label>
                    </div>
                </div>
              </div>

              <div class="form-label-group">
                <div class="row">
                    <div class="col">
                        <input type="email" v-model=email id="inputEmail" :class="emailClass" placeholder="E-mail" required>
                        <label v-if="emailVer==false" for="inputEmail" class="badge badge-danger">Email non valida</label>
                    </div>
                    <div class="col">
                        <input type="text" v-model=phone id="inputPhone" :class="phoneClass" placeholder="Telefono">
                        <label v-if="phoneVer==false" for="inputSurname" class="badge badge-danger">Numero non valido</label>
                    </div>
                </div>
              </div>

              <div class="form-label-group">
                  <input type="password" v-model=password :class="passwordClass" placeholder="Password" required>
                  <label v-if="passwordVer==false" class="badge badge-danger">Deve contenere almeno 8 caratteri,una <br>lettera maiuscola, una minuscola ed un numero</label>
              </div>

              <div class="form-label-group">
                  <input type="password" v-model=password2 :class="password2Class" placeholder="Ripeti Password" required>
                  <label v-if="password2Ver==false" class="badge badge-danger">Le due password non coincidono</label>
              </div>

              <div class="form-label-group"><br>
                <h6 class="card-subtitle mb-2 text-muted text-left">Data e luogo di nascita:</h6>
                <div class="form-inline">
                <select :class="dayClass" name="giorno" id="inputGiorno" v-model=day required > 
                    <option disabled value="" >GG</option>
                    <option v-for="i in 31" :key="i">{{i}}</option>
                </select>
                <pre> </pre>
                <select :class="monthClass" name="mese" id="inputMese" v-model=month required>
                    <option disabled value="">MM</option>  
                    <option v-for="i in 12" :key="i">{{i}}</option>                  
                </select>
                <pre> </pre>
                <select :class="yearClass" name="anno" id="inputAnno" v-model="year" required>
                    <option disabled value="">AAAA</option>
                    <option v-for="i in 115" :key="i">{{i+1905}}</option>
                </select>
                </div>
            </div>
                <div class="form-label-group">
                <input  size="12" type="text" v-model="birthplace" id="inputLuogo" :class="birthplaceClass" placeholder="Comune di nascita" required>
                 <label v-if="birthplaceVer==false" for="inputBirthplace" class="badge badge-danger">Non trovato</label>
            </div>

              

              <div class="form-label-group">
                  <div class="form-inline">
                    <h6 class="card-subtitle mb-2 text-muted text-left">Genere:</h6> <pre>  </pre>
                    <select :class="sexClass" name="giorno" id="inputGiorno" v-model=sex required > 
                    <option disabled value="" >---</option>
                    <option value="M">Uomo</option>
                    <option value="F">Donna</option>
                </select>
              </div>
                
              </div>

              <div v-if="allerta" class="alert alert-danger mt-1" role="alert">
                Non hai inserito tutto!
              </div>
              <hr class="my-4">

              <button  @click="checkForm();regPost();" class="btn btn-lg btn-success btn-block text-uppercase"  type="button">Inserisci Operatore</button>
              <label v-if="corretto==true" class="alert alert-success mt-1">Inserimento operatore avvenuto con successo!</label>
              
              

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
import axios from 'axios'

export default {
    name : "NewOperatore",
    data() {
        return {
            //i campiOk riguardano l'inserimento
            //i campiVer riguardano la correttezza dell'inserimento
            flaginseriti: false,

            name: '',
            nameOk: false,
            nameClass: 'form-control-check',
            nameVer: true,

            surname:'',
            surnameOk:false,
            surnameClass: 'form-control-check',
            surnameVer: true,

            sex:'',
            sexOk:false,
            sexClass: 'select-control-check',

            day:'',
            dayOk:false,
            dayClass: 'select-control-check',

            month:'',
            monthOk:false,
            monthClass: 'select-control-check',

            year:'',
            yearOk:false,
            yearClass: 'select-control-check',

            birthplace:'',
            birthplaceOk:false,
            birthplaceClass: 'form-control-check',
            birthplaceVer: true,

            email:'',
            emailOk:false,
            emailClass: 'form-control-check',
            emailVer: true,

            password:'',
            passwordOk:false,
            passwordClass: 'form-control-check',
            passwordVer: true,

            password2:'',
            password2Ok:false,
            password2Class: 'form-control-check',
            password2Ver: true,

            phone: '',
            phoneOk:false,
            phoneClass: 'form-control-check',
            phoneVer: true,

            allerta: false,
            corretto: false
        }
    },
    watch: {
        name: function(){
          if(this.name=='') this.nameOk = false
          else this.nameOk = true 
          if(isNaN(this.name) || this.name=='')  { this.nameVer = true; this.nameClass = "form-control-check-ver";}
          else { this.nameVer = false; this.nameClass = "form-control-check-errore";}
        },
        surname: function(){
          if(this.surname=='') this.surnameOk = false
          else this.surnameOk = true
          if(isNaN(this.surname) || this.surname=='')  { this.surnameVer = true; this.surnameClass = "form-control-check-ver";}
          else{ this.surnameVer = false; this.surnameClass = "form-control-check-errore";}
        },
        sex: function(){
          if(this.sex=='') this.sexOk = false
          else this.sexOk = true
        },
        day: function(){
          if(this.day=='') this.dayOk = false
          else this.dayOk = true
        },
        month: function(){
          if(this.month=='') this.monthOk = false
          else this.monthOk = true
        },
        year: function(){
          if(this.year=='') this.yearOk = false
          else this.yearOk = true
        },
        birthplace: function(){
          if(this.birthplace=='') this.birthplaceOk = false
          else this.birthplaceOk = true

          if(this.birthplace.charAt(0) == this.birthplace.charAt(0).toLowerCase()){ 
            var newBirth = ""
            newBirth=this.birthplace.charAt(0).toUpperCase() + this.birthplace.slice(1);
            this.birthplace = newBirth
          }  

          var trovato = false
          var json = require('../../comuni.json');
          var i=0
          for(i=0; i<json.length; i++){
            if(json[i].nome.toLowerCase()==this.birthplace.toLowerCase()){
              trovato=true
              this.birthplace = json[i].nome
            }
          }
          if(trovato==true && this.birthplaceOk==true) { this.birthplaceVer = true; this.birthplaceClass = "form-control-check-ver";}
          else { this.birthplaceVer = false; this.birthplaceClass = "form-control-check-errore";}
        },
        email: function(){
          if(this.email=='') this.emailOk = false
          else this.emailOk = true
          var corretta = false
          
          var reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
          if (reg.test(this.email)) corretta = true
          

          if(corretta==true)  { this.emailVer = true; this.emailClass = "form-control-check-ver";}
          else{ this.emailVer = false; this.emailClass = "form-control-check-errore";}
        },
        password: function(){
          if(this.password=='') this.passwordOk = false
          else this.passwordOk = true
          var numero = false;
          var lMaiusc = false;
          var lMinusc = false;
          var i = 0
          for(i=0;i<this.password.length;i++){
            var character = this.password.charAt(i);
            if (!isNaN(character * 1)){
                numero=true
            }else{
              if (character == character.toUpperCase()) {
                lMaiusc = true
              }
              if (character == character.toLowerCase()){
                lMinusc = true
              }
            }
          }
          if(this.password.length>=8 && numero==true && lMaiusc==true && lMinusc==true)  
                { this.passwordVer = true; this.passwordClass = "form-control-check-ver";}
          else{ this.passwordVer = false; this.passwordClass = "form-control-check-errore";}
        },
        password2: function(){
          if(this.password2=='') this.password2Ok = false
          else this.password2Ok = true
          if(this.password2 == this.password) { this.password2Ver = true; this.password2Class = "form-control-check-ver";}
          else{ this.password2Ver = false; this.password2Class = "form-control-check-errore";}
        },
        phone: function(){
          if(this.phone=='') this.phoneOk = false
          else this.phoneOk = true
          if(!isNaN(this.phone) && this.phone.length == 10) { this.phoneVer = true; this.phoneClass = "form-control-check-ver";}
          else{ this.phoneVer = false; this.phoneClass = "form-control-check-errore";}
        },
        nameOk: function(){
          if(this.nameOk==true) this.nameClass = 'form-control-check'
          else this.nameClass = "form-control-check-errore"
        },
        surnameOk: function(){
          if(this.surnameOk==true) this.surnameClass = 'form-control-check'
          else this.surnameClass = "form-control-check-errore"
        },
        birthplaceOk: function(){
          if(this.birthplaceOk==true) this.birthplaceClass = 'form-control-check'
          else this.birthplaceClass = "form-control-check-errore"
        },
        emailOk: function(){
          if(this.emailOk==true) this.emailClass = 'form-control-check'
          else this.emailClass = "form-control-check-errore"
        },
        passwordOk: function(){
          if(this.passwordOk==true) this.passwordClass = 'form-control-check'
          else this.passwordClass = "form-control-check-errore"
        },
        dayOk: function(){
          if(this.dayOk==true) this.dayClass = 'select-control-check-ver'
          else this.dayClass = "select-control-check-errore"
        },
        monthOk: function(){
          if(this.monthOk==true) this.monthClass = 'select-control-check-ver'
          else this.monthClass = "select-control-check-errore"
        },
        yearOk: function(){
          if(this.yearOk==true) this.yearClass = 'select-control-check-ver'
          else this.yearClass = "select-control-check-errore"
        },
        sexOk: function(){
          if(this.sexOk==true) this.sexClass = 'select-control-check-ver'
          else this.sexClass = "select-control-check-errore"
        },
        phoneOk: function(){
          if(this.phoneOk==true) this.phoneClass = 'select-control-check-ver'
          else this.phoneClass = "select-control-check-errore"
        }


    }
    ,
    methods : {
        checkForm(){
          if(this.nameVer==true && this.surnameVer==true && this.phoneVer && this.emailVer==true && 
          this.birthplaceVer==true && this.passwordVer==true && this.dayOk==true && this.monthOk==true && 
          this.yearOk==true && this.sexOk==true && this.password2Ver==true) return true;
            else return false
        }
        ,
        regPost() { 
          var tuttoInserito = true;
          if(!this.nameOk || this.nameVer==false){
              tuttoInserito = false
              this.allerta = true
              this.nameClass = 'form-control-check-errore'
          }
          if(!this.surnameOk || this.surnameVer==false){
              tuttoInserito = false
              this.allerta = true
              this.surnameClass = 'form-control-check-errore'
          }
          if(!this.birthplaceOk || this.birthplaceVer==false){
              tuttoInserito = false
              this.allerta = true
              this.birthplaceClass = 'form-control-check-errore'
          }
          if(!this.emailOk || this.emailVer==false){
              tuttoInserito = false
              this.allerta = true
              this.emailClass = 'form-control-check-errore'
          }
          if(!this.phoneOk || this.phoneVer==false){
              tuttoInserito = false
              this.allerta = true
              this.phoneClass = 'form-control-check-errore'
          }
          if(!this.passwordOk || this.passwordVer==false){
              tuttoInserito = false
              this.allerta = true
              this.passwordClass = 'form-control-check-errore'
          }
          if(!this.password2Ok || this.password2Ver==false){
              tuttoInserito = false
              this.allerta = true
              this.password2Class = 'form-control-check-errore'
          }
          if(!this.dayOk){
              tuttoInserito = false
              this.allerta = true
              this.dayClass = 'select-control-check-errore'
          }
          if(!this.monthOk){
              tuttoInserito = false
              this.allerta = true
              this.monthClass = 'select-control-check-errore'
          }
          if(!this.yearOk){
              tuttoInserito = false
              this.allerta = true
              this.yearClass = 'select-control-check-errore'
          }
          if(!this.sexOk){
              tuttoInserito = false
              this.allerta = true
              this.sexClass = 'select-control-check-errore'
          }
          //CON TELEFONO
          if(tuttoInserito == true){ 
            this.allerta = false
            axios({
            method: 'post',
            url: 'http://localhost:8081/registration/operator',
            headers: {
              "x-eco-auth-token": localStorage.token
            },
            data: {
                name: this.name,
                surname: this.surname,
                sex: this.sex,
                birthdate: this.year+'-'+this.month+'-'+this.day,
                birthplace: this.birthplace,
                email: this.email,
                password: this.password,
                phone: this.phone
            }
            }).then(() => {
                this.corretto = true
                
            }, (error) => {
                alert("Errore richiesta:\n"+error)
            });  
          }
          
          
        }
    }
}
</script>

<style scoped>



.card-signin {
  
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}







.form-label-group input {
  height: auto;
  border-radius: 2rem;
}


</style>