<template>
    <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">

        <!--  CARD  -->
        <div class="card card-signin my-5 border-success mb-3">
          <div class="card-body">
            <h5 class="card-title text-center"><b>Accedi</b></h5>
            <hr class="my-4">

            <!--  FORM  -->
            <form class="form-signin" @keyup.enter="accedi()">
              <div class="form-label-group">
                <input type="text" id="inputEmailOrPhone" class="form-control" v-model="emailOrPhone" placeholder="Inserici l'indirizzo email o il telefono" required >
              </div>

              <div class="form-label-group">
                <input type="password" id="inputPassword" class="form-control" v-model="password" placeholder="Inserisci la password" required>
              </div>

              <router-link to="/pw_forgotten">Hai dimenticato la password?</router-link>

              <button v-if="readyEmail || readyPhone" @click="accedi()" type="button" class="btn btn-lg btn-success btn-block text-uppercase mt-3">Accedi</button>
              <hr class="my-4">

              <div v-if="errorAuth != null" :class="colore" role="alert">
                  {{text}}
              </div>
              
              <router-link to="/registration">Registrati</router-link>
              
            </form>
            <!--  FINE FORM  -->

          </div>
        </div>
        <!--  FINE CARD  -->

      </div>
    </div>
  </div>
</template>


<script>

import axios from 'axios'
import {mapMutations} from 'vuex'

export default {
    name: 'Login',
    data (){
      return {
        password : "",
        emailOrPhone : "",
        readyEmail : false,
        readyPhone : false,
        emailOk : false,
        passwordOk : false,
        phoneOk : false,
        errorAuth : null,
        text : "",
        colore : ""
      }
    },

    beforeCreate(){
      // Se ho già effettuato l'accesso, vado direttamente alla dashboard
      if((localStorage.getItem('email') != undefined || localStorage.getItem('phone') != undefined) &&
        localStorage.getItem('password') != undefined && localStorage.getItem('token') != undefined &&
        localStorage.getItem('type') != undefined){
        
        this.$store.commit('setLogged', true)
        this.$router.push('/dashboard')
      }
    },

    watch : {
      password : function(){
        const len = this.password.length 
        if(len < 8 || len > 1024) {
          this.passwordOk = false
        }
        else
        this.passwordOk = true
      },

      emailOk : function(){
        if(this.emailOk && this.passwordOk && !this.phoneOk){
          this.readyEmail = true
        }
        else{
          this.readyEmail = false
        }
      },

      phoneOk : function(){
        if(!this.emailOk && this.passwordOk && this.phoneOk){
          this.readyPhone = true
        }
        else{
          this.readyPhone = false
        }
      },

      passwordOk : function(){
        if(!this.emailOk && this.passwordOk && this.phoneOk){
          this.readyPhone = true
        }
        else if(this.emailOk && this.passwordOk && !this.phoneOk){
          this.readyEmail = true
        }
        else{
          this.readyEmail = false
          this.readyPhone = false
        }
      },

      emailOrPhone : function(){
        const tmp = this.emailOrPhone
        const regex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
        const res = regex.test(tmp)

        //Se il test va a buon fine vuol dire che ho un'email valida
        if(res){
          this.emailOk = true
          this.phoneOk = false
        }
        
        //Altrimenti, controllo se ho un telefono valido
        else if(!res){

          //Se il campo testo è lungo 10 ed è un numero vuol dire che ho un telefono valido
          if(this.emailOrPhone.length == 10 && !isNaN(parseInt(this.emailOrPhone))){
            this.emailOk = false
            this.phoneOk = true
          }

          //Altrimenti non ho nè un telefono valido nè un'email valida
          else{
            this.emailOk = false
            this.phoneOk = false
          }
        }
        
      }
    },

    methods : {
      
      ...mapMutations([
        'setLogged',
        'setToken',
        'setType'
      ]),

      memorizzaCredenziali(response){
        localStorage.email = this.emailOrPhone,
        localStorage.password = this.password,
        localStorage.token = response.data.token,
        localStorage.type = response.data.type
      },
    
      async accedi() {
        
        // Accesso con email e password
        if(this.readyEmail){

          axios({
            method: 'post',
            url: 'http://localhost:8081/auth/email',
            data: {
              email: this.emailOrPhone,
              password: this.password
            }
          }).then((response) => {
            
            this.memorizzaCredenziali(response)

            this.errorAuth = 'NO ERROR'
            this.text = "Accesso a Eco effettato con successo!"
            this.colore = "alert alert-success"
            this.$store.commit('setToken', response.data.token)
            this.$store.commit('setType', response.data.type)
            this.$store.commit('setLogged', true)
            
            this.$router.push('/dashboard')
          })
            .catch((error) => {
              console.log(error)
              this.errorAuth = true
              this.colore = "alert alert-danger"
              this.text = "Email o password errati!"
            })
        }

        // Accesso con telefono e password
        else if(this.readyPhone){
          axios({
            method: 'post',
            url: 'http://localhost:8081/auth/phone',
            data: {
              phone: this.emailOrPhone,
              password: this.password
            }
          }).then((response) => {
              
            this.memorizzaCredenziali(response)
            
            this.errorAuth = 'NO ERROR'
            this.text = "Accesso a Eco effettato con successo!"
            this.colore = "alert alert-success"
            this.$store.commit('setToken', response.data.token)
            this.$store.commit('setType', response.data.type)
            this.$store.commit('setLogged', true)

            this.$router.push('/dashboard')
          })
            .catch((error) => {
              console.log(error)
              this.colore = "alert alert-danger"
              this.errorAuth = true
              this.text = "Telefono o password errati!"
            })
        }

      }
    },
}
</script>


