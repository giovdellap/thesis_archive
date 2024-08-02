<template>
 
 <div>
  </div>
</template>

<script>
export default {
    beforeCreate(){
      this.$store.commit('setLogged', false)
      this.$store.commit('setToken', '')
      this.$store.commit('setType', '')
      
      localStorage.removeItem('email')
      localStorage.removeItem('phone')
      localStorage.removeItem('password')
      localStorage.removeItem('type')
        this.$store.commit('setStatoMenu',"")
    this.$store.commit('setMenu',false)
    

      this.$router.push('/')

    }

}
</script>
