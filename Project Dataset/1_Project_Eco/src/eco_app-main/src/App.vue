<template>
  <div id="app">
    <!--menu-->

  <!--Navbar-->
  <nav class="navbar navbar-light navbar-1 black bg-success">

  <!-- Navbar brand -->
  <a class="navbar-brand ml-5" href="#"  > </a>

  <!-- Collapse button -->
  <button v-if="isLogged == true" class="navbar-toggler border border-dark mr-5 " type="button" data-toggle="collapse" data-target="#navbarSupportedContent15"
    aria-controls="navbarSupportedContent15" aria-expanded="false" aria-label="Toggle navigation" id="hamburger" @click="setClicked" :style="stateMenu" ><span class="navbar-toggler-icon"></span></button>

  <!-- Collapsible content -->
  <div v-if="isLogged == true" class="collapse navbar-collapse " id="navbarSupportedContent15">

    <!-- Links -->
    
    <ul class="navbar-nav mr-auto bg-success border border-dark pl-3 pr-3" style="position:relative; z-index: 3;float:right;">
      
      <li class="nav-item " >
        <router-link  to="/" class="nav-link " href="#">Dashboard </router-link>
      </li>
      <li v-if="getTipo=='cittadino'" class="nav-item">
        <router-link  to="/announcements" class="nav-link" href="#">Annunci</router-link>
      </li>
       <li v-if="getTipo!='cittadino'" class="nav-item">
        <router-link  to="/avanzato" class="nav-link" href="#">Avanzato</router-link>
      </li>
        <li class="nav-item">
        <router-link  to="/cambio_pw" class="nav-link" href="#">Cambia password </router-link>
      </li>
       <li class="nav-item">
        <router-link  to="/logout" class="nav-link" href="#">Logout </router-link>
      </li>

    </ul>
  
    <!-- Links -->

  </div>


  <div class="mt-3 " v-else >

      <router-link to="/login" class="link"> Accedi </router-link> | <router-link to="/registration" class="link"> Registrati </router-link>
    </div>

  <!-- Collapsible content -->

</nav>


    <!-- SINGLE PAGE-->
    <div class="container-fluid  ">
       <transition
        name="fade"
        mode="out-in"
      >
         
    <router-view/>
    </transition>
    </div>

    <!-- --->

    <!-- footer-->
  </div>
</template>


<script>
import { mapGetters} from 'vuex'


export default {
  name : 'app',

       
  
  components : {
  },

  created(){
    this.checkAccess()
  },
mounted(){
    this.$store.commit('setStatoMenu',"")
    this.$store.commit('setMenu',false)
},
  data () {
    return {
      logged : false,
    }
  },
  computed : {
    ...mapGetters({
        'isLogged' : 'getLogged',
        'isClicked': 'getMenu',
        'stateMenu': 'getStatoMenu',
        'getTipo':'getType'
    })
    
   
  },

  methods : {
    checkAccess(){
      if((localStorage.getItem('email') != undefined || localStorage.getItem('phone') != undefined) &&
        localStorage.getItem('password') != undefined && localStorage.getItem('token') != undefined &&
        localStorage.getItem('type') != undefined){
        
        this.$store.commit('setLogged', true)
      }
      else this.$store.commit('setLogged', false)
    },
    setClicked(){
      if(this.isClicked==false){
        this.$store.commit('setMenu',true)
        this.$store.commit('setStatoMenu',"background-color: #238521;")
      }
      else  {
        this.$store.commit('setMenu',false)
        this.$store.commit('setStatoMenu',"")
      }

    }
  }
}


</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.navbar{
  height: 70px;
}
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.1s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

#hamburger:hover{
background-color: #238521;

}

.link{

   color: black;
}
</style>

<!-- -->