<template>
  <div class="container-fluid" id="cosafacciamo">
    <div class="row mt-2 pb-3 d-none d-sm-block" id="rigaesterna" height="200px">
      <div class="col-12">
        <div class="row">
          <div class="col-8">
            <!-- messaggio iniziale-->
            <div class="jumbotron text-black" id="hero">
              <h1 class="display-4"><b>Benvenuto su Eco!</b></h1>
              <p class="lead"><b>L'obiettivo è fornire ai cittadini ed alle province uno strumento utile alla lotta contro l'inquinamento.</b></p>
              <p><b>Uniti possiamo fare la differenza, lotta insieme a noi!</b></p>
            
              <h5 >  <router-link to="/registration"> Partecipa anche tu!</router-link></h5>
              <p> <router-link to="/login">Se sei già registrato accedi </router-link></p>
            
            </div>
          </div>
          <!-- isola che fluttua-->
          <div class="col mt-1">
            <img src="../assets/isola.png" height="300px" id="isola" >      
          </div>

        </div>
      </div>
    </div>

<!-- view hero tel -->
  <div class="row mt-2 pb-3 d-block d-sm-none" id="rigaesterna" height="200px">
    <div class="row">
      <!-- isola che fluttua-->
      <div class="col-12">
        <img src="../assets/isola.png" height="300px" id="isola" >
      </div>
    </div>
    <div class="row">
      <div class="jumbotron text-black" id="hero">
        <h1 class="display-4"><b>Benvenuto su Eco!</b></h1>
        <p class="lead"><b>L'obiettivo è fornire ai cittadini ed alle province uno strumento utile alla lotta contro l'inquinamento.</b></p>
        <p><b>Uniti possiamo fare la differenza, lotta insieme a noi!</b></p>     
        <h5 >  <router-link to="/registration"> Partecipa anche tu!</router-link></h5>
        <p> <router-link to="/login">Se sei già registrato accedi </router-link></p>        
      </div>    
    </div>
  </div>
    
<!-- sezione cosa facciamo-->
  <div class="container pb-5 mt-5" >
    <div class="row mt-5  d-none d-sm-block">
      <div class="col-12">
        <h3><b>COSA FACCIAMO?</b></h3>
      </div>
    <div class="row mt-3 ">
      <div class="col ">
        <div class="card"  >
          <img class="card-img-top" src="../assets/menu1.png" alt="Card image cap" height="250px" width="200px" >
          <div class="card-body border-top">
            <p class="card-text">Analisi in tempo reale dei dati chimici provenienti dalle stazioni situate sul territorio provinciale</p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card" >
          <img class="card-img-top  " src="../assets/menu2.png" alt="Card image cap"  height="250px" width="200px">
          <div class="card-body border-top">
            <p class="card-text">Gestione delle segnalazioni dei cittadini che si sono uniti alla lotta per salvaguardare l'ambiente </p>
          </div>
        </div>
      </div>
      <div class="col">
       <div class="card" >
        <img class="card-img-top" src="../assets/menu3.png" alt="Card image cap" height="250px" width="200px">
        <div class="card-body border-top">
          <p class="card-text">Forniamo strumenti di supporto alla decisione per facilitare l'analisi di eventi complessi </p>
        </div>
        </div>
      </div>
    </div>
  </div>

<!-- view tel-->
<div class="row d-block d-sm-none">
  <div class="bd-example">
    <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../assets/menu1.png" class="d-block " align=left alt="...">
          <span class="carousel-caption ml-5 " style="position:relative;left:2%;">
            <p>Analisi in tempo reale dei dati chimici provenienti dalle stazioni situate sul territorio provinciale</p>
          </span>
        </div>
        <div class="carousel-item">
          <img src="../assets/menu2.png" class="d-block" align=left alt="...">
          <span class="carousel-caption ml-5 " style="position:relative;left:2%;">
            <p>Gestione delle segnalazioni dei cittadini che si sono uniti alla lotta per salvaguardare l'ambiente</p>
          </span>
        </div>
        <div class="carousel-item">
          <img src="../assets/menu3.png" class="d-block " align=left alt="...">
          <span class="carousel-caption ml-5 " style="position:relative;left:2%;">
            <p>Forniamo strumenti di supporto <br>alla decisione per facilitare<br> l'analisi di eventi complessi </p>
          </span>
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>

</div>
</div>

<!-- SEZIONE TEAM PC-->
<div class="container pb-5 mt-5" >
  <div class="row mt-5 d-none d-sm-block">
    
      <h3><b>IL TEAM</b></h3>
    
  <div class="row mt-3">
    <div class="col">
      <div class="card"  >
        <img class="card-img-top" src="../assets/ivan.jpg" alt="Card image cap"  >
        <h5 class="card-title">Ivan Giacomoni</h5>
        <div class="card-body pt-1">
          <p class="card-text"><b>Frontend & Backend Developer</b></p>
          <p class="card-text">E' il Roger Federer della programmazione, ha uno spirito di squadra che non è minimamente paragonabile a quello della sua Inter</p>
        </div>
      </div>
    </div>
    
    <div class="col">
      <div class="card" >  
        <img class="card-img-top" src="../assets/daniele.jpg" alt="Card image cap" >
        <h5 class="card-title">Daniele Bufalieri</h5>
        <div class="card-body pt-1">
          <p class="card-text"><b>Frontend & Backend Developer </b></p>
          <p class="card-text">Non so cosa scrivere, ma basti sapere che adesso non ho più tutti quei capelli,la foto risale al 2014 e adesso ho la boccia che mi accompagna ovunque vado </p>
        </div>
      </div>
    </div>

  </div>

</div>

<!-- view telefono-->
<div class="row d-block d-sm-none">
  <h3><b>IL TEAM</b></h3>
  <div class="bd-example">
    <div id="carouselExampleCaptions2" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../assets/ivan.jpg" class="d-block w-100" align=left alt="...">
          <span class="carousel-caption ml-5 " >
            <p>E' il Roger Federer della programmazione, ha uno spirito di squadra che non è minimamente paragonabile a quello della sua Inter</p>
          </span>
        </div>
      <div class="carousel-item">
        <img src="../assets/daniele.jpg" class="d-block w-100" align=left alt="..." > 
        <span class="carousel-caption ml-5 " >
          <p>Non so cosa scrivere, ma basti sapere che adesso non ho più tutti quei capelli,la foto risale al 2014 e adesso ho la boccia che mi accompagna ovunque vado </p>
        </span>
      </div>

      </div>
    <a class="carousel-control-prev" href="#carouselExampleCaptions2" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleCaptions2" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</div>
</div>

<hr>
</div>
</div>
    


 
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  data(){
    return {
      rc:false

    }
  },
beforeMount()
{
  
  
}
  
}


</script>


<style scoped>
#back{

  height: 700px;
  width:100%;
}
#rigaesterna{

    background-image:url('../assets/sfondo.png');
     background-size: cover;
     border:0;
     background-color: transparent;
}
#hero{

  background-color: transparent;
}
.card {
-webkit-box-shadow: 0px 1px 8px 3px rgba(0,0,0,0.44);
-moz-box-shadow: 0px 1px 8px 3px rgba(0,0,0,0.44);
box-shadow: 0px 1px 8px 3px rgba(0,0,0,0.44);
}



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
  animation-duration: 2s;
    animation-iteration-count: infinite;
}

#cosafacciamo{


  background: linear-gradient( to right, #72e0e0,  #9086af);


}


</style>