<template>
<div>
  <!-- pc -->
  <div class="container mt-3 ">
    <div class="row mt-3">
       
        <div class="col">
            <router-link to="/announcements">
         <button   id="im3"></button> 
          </router-link>
        </div>

    <div v-if="tipoUtente=='admin'" class="row mt-3">
 
        <div v-if="tipoUtente!='operatore'" class="col ">
          <router-link to="/newoperatore">
         <button   id="im4"></button> 
          </router-link>
        </div>
    </div>
    </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src

import { mapGetters} from 'vuex'


export default {
  name: 'Avanzato',
  data(){
    return {
      tipoUtente:null
    }
  },
  created()
  {
    this.tipoUtente=localStorage.type

      this.$store.commit('setStazione','')
      this.$store.commit('setAgente','')
  },
  computed:{
...mapGetters({
        'getTipo':'getType'
    })
}
}
</script>

<style scoped>


#im3{

    height:250px;  
    width:300px;
    background-image:url('../assets/menu_annunci.png');
     background-size: cover;
     border:0;
     background-color: transparent;

}

#im3:hover{
  background-image:url('../assets/menu_annunci2.png');
   
    
}

#im4{

    height:250px;  
    width:300px;
    background-image:url('../assets/menu_ins.png');
     background-size: cover;
     border:0;
     background-color: transparent;

}

#im4:hover{
  background-image:url('../assets/menu_ins2.png');
   
    
}

</style>
