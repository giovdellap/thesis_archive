
<template>
  <div class="container">
    <div class="row ">
        
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
      
        <div class="card card-signin my-5  border-success">
          <div class="card-body">
            <router-link to="/dashboard"><img src="../assets/back.png" style="float:left;" height="20px;"></router-link>
           <h5 class="card-title text-center">Cambio Password </h5>
           <p class="text-left">
           La password deve essere lunga almeno 8 caratteri, e deve contenere almeno una lettera maiuscola, una minuscola ed un numero
           <p>
            <hr class="my-4">
            <form class="form-signin" >
                 <div class="form-label-group">
                  <input type="password" v-model="password3"   :class="password3Class" placeholder="Password attuale" required>
                  
                  
              </div>

              <div class="form-label-group">
                  <input type="password" v-model="password" :class="passwordClass" placeholder="Nuova password" required>
                
        
              
              </div>

              <div class="form-label-group">
               <input type="password" v-model="password2" :class="password2Class" placeholder="Conferma password" required>
   
              </div>
            </form>
            <hr class="my-4">            
              <button v-if="this.p&&this.p2" @click="cambia" class="btn btn-lg btn-success btn-block text-uppercase" >Cambia</button>
                <label v-if="passwordVer==false" class="badge badge-danger">Deve contenere almeno 8 caratteri,una <br>lettera maiuscola, una minuscola ed un numero</label>
                 <label v-if="password3Ver==false" class="badge badge-danger">Deve contenere almeno 8 caratteri,una <br>lettera maiuscola, una minuscola ed un numero</label>
               <label v-if="password2Ver==false" class="badge badge-danger">Le due password non coincidono</label>
               
          </div>
          <label v-if="finito==false" class="alert alert-danger">Errore nella richiesta</label>
               <label v-if="finito==true" class="alert alert-success">Cambio della password avvenuto con successo</label>
        </div>
          
      </div>
    
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
    name:'Registration',
    data() {
        return {
            oldpw:'',
            password:'',
            password2:'',
            password3:'',
            password3Ver:true,
            passwordVer:true,
            password2Ver:true,
            p:false,
            p2:false,
            p3:false,
            finito:null,
            passwordClass: 'form-control-check',
            password2Class: 'form-control-check',
            password3Class: 'form-control-check',
        }
    },
watch:{
        password: function(){
          if(this.password=='')this.ok=false
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
                { this.passwordVer = true; this.passwordClass = "form-control-check-ver";this.p=true}
          else{ this.passwordVer = false; this.passwordClass = "form-control-check-errore";this.p=false}
        },
        password2: function(){
             if(this.password2=='')this.ok=false
          if(this.password2 == this.password) { this.password2Ver = true; this.password2Class = "form-control-check-ver";this.p2=true}
          else{ this.password2Ver = false; this.password2Class = "form-control-check-errore";this.p2=false}
        }
      
        


    }
    ,
    methods : {
        cambia:function()
        {
            if(localStorage.getItem('type')=='cittadino'){
               
            axios({
            method: 'post',
            url: 'http://localhost:8081/registration/citizen/change_pw',
             headers: {
              "x-eco-auth-token": localStorage.token
            },
            data: {
            new_pw:this.password,
            old_pw:this.password3
            }
            }).then(() => {
                this.finito=true
                
                
            }, () => {
                this.finito=false
            });  

        }else{
         
            axios({
            method: 'post',
            url: 'http://localhost:8081/registration/operator/change_pw',
             headers: {
              "x-eco-auth-token": localStorage.token
            },
            data: {
            new_pw:this.password,
            old_pw:this.password3
            }
            }).then(() => {
                    this.finito=true
                
            }, () => {
                this.finito=false
            });  

        }
     
   
          
        }
    }
}

</script>

<style scoped>

.form-control-check {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control-check:focus {
  color: #495057;
  background-color: #fff;
  border-color: green;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.form-control-check-ver {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #cef5d8;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control-check-ver:focus {
  color: #495057;
  background-color: #cef5d8;
  border-color: green;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}


.form-control-check-errore{
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #721c24;
  background-color: #f8d7da;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control-check-errore:focus {
  color: #495057;
  background-color: #f8d7da;
  border-color: green;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.select-control-check{
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid green;
  border-radius: 0.25rem;
}

.select-control-check-ver{
  color: #495057;
  background-color: #cef5d8;
  background-clip: padding-box;
  border: 1px solid green;
  border-radius: 0.25rem;
}

.select-control-check-errore{
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  background-clip: padding-box;
  border: 1px solid ;
  border-radius: 0.25rem;
}

.card-signin {
  
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.card-signin .card-title {
  font-weight: 300;
  font-size: 1.5rem;
}

.card-signin .card-body {
  padding: 2rem;
}

.form-signin {
  width: 100%;
}

.form-signin .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: .1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}


.form-label-group input {
  height: auto;
  border-radius: 2rem;
}


</style>

