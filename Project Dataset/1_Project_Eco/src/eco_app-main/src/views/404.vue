<template>
 
<div class="container-fluid " >
    <div class="card-body">
    <div class="row mt-5">
        <div class="col">
            <h1>404 NOT FOUND !</h1>
        </div>
    </div>
    <div class="row" id="ultimariga" >
         <div class="col mt-1">
             <div id="sfondoimg">
            <img src="../assets/isola.png" height="300px" id="isola" >   
            </div> 
          </div>
    </div>
     <div class="row mt-3">
        <div class="col">
             <h1>PER ECO!</h1>
        </div>
    </div>
    </div>
</div>
</template>

<script>

export default {
  name: 'Page404',

  mounted()
  {
    setTimeout(this.cambiaPagina,5000)
    document.body.setAttribute("style","background: linear-gradient( to right, #72e0e0,  #9086af);")
   
  },
  methods:
  {
      cambiaPagina: function()
      {
        document.body.setAttribute("style","background: linear-grad background: linear-gradient(to right, #f0f0f0, #ffffff);")
        this.$router.push('/login')
      }

  }

}
</script>


<style scoped>

@keyframes lievitazione {
  5% {top:-0.3%;}
  10%   {top:-0.5%;}
  20%  {top:-0.6%;}
  30%  {top:-0.7%;}
  40% { top:-0.8%;}
  50% { top:-0.9%;}
  55% { top:-0.9%;}
  60% { top:-0.8%;}
  70% {top:-0.7%;}
  80% { top:-0.6%;}
  90% {top:-0.5%;}
  95% {top:-0.3%;}
  100% {top:-0.1%;}
}



#isola{
  position:relative;

 animation-name: lievitazione;
  animation-duration: 1.5s;
    animation-iteration-count: infinite;
}




</style>

