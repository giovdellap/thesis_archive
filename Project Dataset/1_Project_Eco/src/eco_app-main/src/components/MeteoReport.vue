<template>
 <div>
    <div class="row">
     <div class="col ">
        <Meteo></Meteo>
      </div>
    </div>
    <div class="row mt-4 ">
      <div class="col ">
        <UV>  </UV>
      </div>
    </div>
</div>
</template>

<script>

import Meteo from './Meteo.vue'


import UV from './UV.vue'

export default {
  name: 'MeteoReport',
  components: {
    Meteo,
    UV

  }
}
</script>
