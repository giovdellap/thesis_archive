<template>
<div >

      <!-- xl -->

      <div class="container-fluid mt-3 d-none d-xl-block">
    <div class="row  ">
      <div class="col-4 ml-5">
        <MeteoReport></MeteoReport>
        </div>
         <div class="col ">
          <Data></Data>
        </div>
      </div>
      </div>

   
    
  
 
  </div>
</template>

<script>
// @ is an alias to /src
import MeteoReport from '../components/MeteoReport.vue'
import Data from '../components/Data.vue'

export default {
  name: 'Dashboard',
  components: {
    MeteoReport,
    Data,
  }
}
</script>
