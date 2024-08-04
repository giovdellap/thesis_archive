<template>
    <div>
        <!--  SCHERMATA DI VISUALIZZAZIONE INIZIALE  -->

        <div v-if="!adding && !visualizzandoDettagli && !updating && !cliccatoSuFiltra && !filtering">

        <div class="card border-success mt-3">
            <div class="card-body">
                <h5 class="card-title"><b>ANNUNCI</b></h5>
                
                <!--  TABELLA  -->
                
                <div class="table-responsive table-borderless" style="height:350px">
                    <table class="table">
                        
                        <!--  INTESTAZIONE TABELLA  -->
                        <thead class="thead-light">
                            <tr>
                                <th scope="col"><router-link to="/avanzato"><img data-title = "Torna alle avanzate" src="../assets/back.png" class="back" style="width:20px; margin-left:16px;"></router-link></th>
                                <th scope="col">CF</th>
                                <th scope="col">Data inizio</th>
                                <th scope="col">Data fine</th>
                                <th scope="col">Dettagli</th>
                                <th v-if="tipoUtente != 'cittadino'" scope="col">Edit</th>
                                <th v-if="tipoUtente != 'cittadino'" scope="col">Delete</th>
                                <th scope="col"><img @click="cliccatoSuFiltra=true" src="../assets/filter.png" data-title = "Vai ai filtri" class="filter" style="width:25px"></th>
                            </tr>
                        </thead>

                        <!--  CORPO TABELLA  -->
                        <tbody>
                            <tr :class="cambiaClasse(annuncio)" v-for="annuncio in annunci" :key="annuncio._id">
                                <td><!--  Padding per img back  --></td>
                                <td>{{annuncio.CF}}</td>
                                <td>{{annuncio.start}}</td>
                                <td>{{annuncio.end}}</td>
                                <td><p data-placement = "top" data-toggle = "tooltip" title = "Detail"><button :id="annuncio._id" @click="visualizzaDettagli" class = "btn btn-success btn-xs" data-title = "Detail" data-toggle = "modal" data-target = "#detail" style = "height:10px;width:20px;"><span class="glyphicon glyphicon-trash"></span></button></p></td>
                                <td><p data-placement = "top" data-toggle = "tooltip" title = "Edit"><button v-if="tipoUtente != 'cittadino'" :id="annuncio._id" @click="settaCampiPerAggiornamentoAnnuncio" class = "btn btn-primary btn-xs" data-title = "Edit" data-toggle = "modal" data-target = "#edit" ><span class="glyphicon glyphicon-trash"></span></button></p></td>
                                <td><p data-placement = "top" data-toggle = "tooltip" title = "Delete"><button v-if="tipoUtente != 'cittadino'" :id="annuncio._id" @click="cancellaAnnuncio" class = "btn btn-danger btn-xs" data-title = "Delete" data-toggle = "modal" data-target = "#delete"><span class="glyphicon glyphicon-pencil" ></span></button></p></td>
                                <td><!--  Padding per img filter  --></td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>

                <!-- BOTTONE DI AGGIUNTA  -->
                
                <button v-if="tipoUtente != 'cittadino'" @click="adding=true" type="button" data-title = "Aggiungi" class="btn btn-success mt-1">Inserisci nuovo annuncio</button>

            </div>
        </div>
        </div>

         <!-- SCHERMATA DI INSERIMENTO NUOVO ANNUNCIO  -->

        <div v-if="adding">
            <!--  Img Back  -->
            <div class="row mt-1 ml-1">
                <img @click="tornaAllaSchermataPrecedenteDaFiltri" src="../assets/back.png" class="back mt-1" style="width:20px; margin-left:16px;">
            </div>

            <center>
                
                <!--  DA PC E TUTTI GLI ALTRI DISPOSITIVI AD ECCEZIONE DEL TELEFONO  -->
                <div class="card card-signin border-success mt-2 d-none d-sm-block" style="width:520px;">
                    <div class="card-body">
                    
                    <h5 class="card-title text-center"><b>INSERISCI NUOVO ANNUNCIO</b></h5>
                    
                    <form @keyup.enter="pubblicaAnnuncio()">
                        
                        <!--  CF  -->
                        <div class="row">
                            <div class="col mt-1">
                                <h6><b>CF</b></h6>
                            </div>
                            
                            <div class="col">
                                <input class="form-control border-success" v-model="CF" type="text" style="width:200px">
                            </div>

                            <div class="col">
                                <!--  Padding per bottoni + e -  -->
                            </div>
                        </div>
                        
                        <!--  Data inizio  -->
                        <div class="row">
                            <div class = "col mt-1">
                                <h6><b>Data inizio</b></h6>
                            </div>

                            <div class = "col">
                                <input class="form-control border-success mt-1" v-model="data_inizio" type="date" style="width:200px">
                            </div>

                            <div class="col">
                                <!--  Padding per bottoni + e -  -->
                            </div>
                        </div>

                        <!--  Data fine  -->
                        <div class="row">
                            <div class = "col mt-1">
                                <h6><b>Data fine</b></h6>
                            </div>

                            <div class = "col">
                                <input class="form-control border-success mt-1" v-model="data_fine" type="date" style="width:200px">
                            </div>

                            <div class="col">
                                <!--  Padding per bottoni + e -  -->
                            </div>
                        </div>
                        
                        <!--  Zone  -->
                        <div class="row">
                            <div class = "col mt-1">
                                <h6><b>Zone</b></h6>
                            </div>

                            <div class = "col">
                                <input class="form-control border-success mt-1" v-model="newZona" placeholder="Aggiungi(+) / Rimuovi(-)" type="text" style="width:200px;">
                            </div>
                            
                            <!--  Bottoni inserimento(+) e rimozione(-) zone  -->
                            <div class="col">
                                <button @click="aggiungiZona()" class="btn border-success" type="button" style="width:35px; height:35px"><b>+</b></button>
                                <button @click="mostraZoneInserite=!mostraZoneInserite" class="btn border-danger ml-1" type="button" style="width:35px; height:35px"><b>-</b></button>
                            </div>

                        </div>
                        
                        <!--  Zone inserite  -->
                        <div v-if="mostraZoneInserite">
                            <div v-for="(zona, index) in zone" :key="index">
                                <div class="row mt-2">
                                    
                                    <div class="col">
                                        {{zona}}
                                    </div>
                                    
                                    <div class="col">
                                        <button @click="rimuoviZona" :id="index" class="btn border-warning ml-1" type="button" style="width:35px; height:35px"><b>-</b></button>
                                    </div>
                                
                                </div>
                               
                            </div>
                        </div>
                        
                        <!--  Descrizione  -->
                        <div class="row mt-2">
                            <div class = "col mt-1">
                                <h6><b>Descrizione</b></h6>
                            </div>

                            <div class = "col">
                                <textarea class="form-control border-success mt-1" v-model="descrizione" type="textarea" maxlength="200" style="width:200px; height:200px"></textarea>
                            </div>

                            <div class="col">
                                <!--  Padding per bottoni + e -  -->
                            </div>
                        </div>

                        <div v-if="cliccatoSuPubblica && (error == 'CF' || error == 'Data inizio' || error == 'Data fine' || error == 'Logica delle date' || error == 'Descrizione')" class="alert alert-danger mt-1" role="alert">
                            {{messaggioErrore}}
                        </div>

                        <div v-else-if="cliccatoSuPubblica && error==''" class="alert alert-success mt-1" role="alert">
                            {{messaggioConferma}}
                        </div>
                        
                        <!--  Bottone di pubblicazione annuncio  -->
                        <button @click="pubblicaAnnuncio()" type="button" class="btn btn-success mt-1">Pubblica annuncio</button>

                    </form>
            
                    </div>
              
            
                </div>

                
                <!--  DA TELEFONO  -->
                <div class="card card-signin border-success mt-2 d-block d-sm-none" style="width:100%;">
                    <div class="card-body">
                    
                    <h5 class="card-title text-center"><b>INSERISCI NUOVO ANNUNCIO</b></h5>
                    
                    <form @keyup.enter="pubblicaAnnuncio()">
                        
                        <!--  CF  -->
                        <div class="row">
                            <div class="col mt-1">
                                <h6><b>CF</b></h6>
                            </div>
                            
                            <div class="col">
                                <input class="form-control border-success" v-model="CF" type="text" style="width:200px">
                            </div>
                        </div>
                        
                        <!--  Data inizio  -->
                        <div class="row">
                            <div class = "col mt-1">
                                <h6><b>Data inizio</b></h6>
                            </div>

                            <div class = "col">
                                <input class="form-control border-success mt-1" v-model="data_inizio" type="date" style="width:200px">
                            </div>
                        </div>
                        
                        <!--  Data fine  -->
                        <div class="row">
                            <div class = "col mt-1">
                                <h6><b>Data fine</b></h6>
                            </div>

                            <div class = "col">
                                <input class="form-control border-success mt-1" v-model="data_fine" type="date" style="width:200px">
                            </div>
                        </div>

                        <!--  Zone  -->
                        <div class="row">
                            <div class = "col mt-1">
                                <h6><b>Zone</b></h6>
                            </div>

                            <div class = "col">
                                <input class="form-control border-success mt-1" v-model="newZona" placeholder="Aggiungi(+) / Rimuovi(-)" type="text" style="width:200px;">
                            </div>
                        </div>

                        <!--  Bottoni inserimento(+) e rimozione(-) zone  -->
                        <div class="row mt-1">
                            <div class="col">
                                <!--  Padding  -->
                            </div>

                            <div class="col">
                                <button @click="aggiungiZona()" class="btn border-success" type="button" style="width:35px; height:35px"><b>+</b></button>
                                <button @click="mostraZoneInserite=!mostraZoneInserite" class="btn border-danger ml-1" type="button" style="width:35px; height:35px"><b>-</b></button>
                            </div>
                        </div>
                        
                        <!--  Zone inserite  -->
                        <div v-if="mostraZoneInserite">
                            <div v-for="(zona, index) in zone" :key="index">
                                <div class="row mt-2">
                                    
                                    <div class="col">
                                        {{zona}}
                                    </div>
                                    
                                    <div class="col">
                                        <button @click="rimuoviZona" :id="index" class="btn border-warning ml-1" type="button" style="width:35px; height:35px"><b>-</b></button>
                                    </div>
                                
                                </div>
                               
                            </div>
                        </div>

                        <!--  Descrizione  -->
                        <div class="row mt-1">
                            <div class = "col mt-1">
                                <h6><b>Descrizione</b></h6>
                            </div>

                            <div class = "col">
                                <textarea class="form-control border-success mt-1" v-model="descrizione" type="textarea" maxlength="200" style="width:200px; height:200px"></textarea>
                            </div>
                        </div>

                        <div v-if="cliccatoSuPubblica && (error == 'CF' || error == 'Data inizio' || error == 'Data fine' || error == 'Logica delle date' || error == 'Descrizione')" class="alert alert-danger mt-1" role="alert">
                            {{messaggioErrore}}
                        </div>

                        <div v-else-if="cliccatoSuPubblica && error==''" class="alert alert-success mt-1" role="alert">
                            {{messaggioConferma}}
                        </div>

                        <!--  Bottone di pubblicazione annuncio  -->
                        <button @click="pubblicaAnnuncio()" type="button" class="btn btn-success mt-1">Pubblica annuncio</button>

                    </form>
            
                    </div>
              
            
                </div>
           
           </center>
        
        </div>

        <!--  SCHERMATA DI VISUALIZZAZIONE DETTAGLI DELL'ANNUNCIO  -->

        <div v-if="visualizzandoDettagli">
            
            <!--  Img Back  -->
            <div class="row mt-1 ml-1">
                <img @click="aggiornaSchermataAnnunci(); visualizzandoDettagli=false" src="../assets/back.png" class="back mt-1" style="width:20px; margin-left:16px;">
            </div>

            <center>
                <div class="card border-success mt-2" style="width:460px">
                    <div class="card-body">
                    
                        <h5 class="card-title text-center"><b>DETTAGLI ANNUNCIO</b></h5>

                        <!--  CF  -->
                        <div class="row">
                            <div class="col">
                                <p><b>CF</b></p>
                            </div>
                               
                            <div class="col">
                                 {{annuncioDaVisualizzare.CF}}
                            </div>
                        </div>

                        <!--  Data inizio  -->
                        <div class="row">

                            <div class ="col">
                                <p><b>Data di inizio</b></p>
                            </div>

                            <div class="col">
                                {{annuncioDaVisualizzare.start}}
                            </div>

                        </div>

                        <!--  Data fine  -->
                        <div class="row">

                            <div class ="col">
                                <p><b>Data di fine</b></p>
                            </div>

                            <div class="col">
                                {{annuncioDaVisualizzare.end}}
                            </div>

                        </div>

                        <!--  Unica zona  -->
                        <div v-if="annuncioDaVisualizzare.zone.length == 1" class="row">
                            
                            <div class="col">
                                <p><b>Zona</b></p>
                            </div>

                            <div class="col">
                                {{annuncioDaVisualizzare.zone[0]}}
                            </div>

                        </div>
                        
                        <!--  Più zone  -->
                        <div v-else class="row" v-for="(zona, index) in annuncioDaVisualizzare.zone" :key="index">
                            <div class="col">
                                <p><b>Zona {{index+1}}</b></p>
                            </div>

                            <div class="col">
                                {{zona}}
                            </div>
                            
                        </div>

                        <!--  Descrizione  -->
                        <div class="row">
                            <div class="col">
                                <p><b>Descrizione</b></p>
                            </div>

                            <div class="col">
                                {{annuncioDaVisualizzare.description}}
                            </div>

                        </div>
                    
                    </div>
              
            
                </div>
           
           </center>

        </div>

        <!--  SCHERMATA DI MODIFICA DELL'ANNUNCIO  -->

        <div v-if="updating">
            <!--  Img back  -->
            <div class="row mt-1 ml-1">
                <img @click="tornaAllaSchermataPrecedenteDaModifica()" src="../assets/back.png" :id="idBack" class="back mt-1" style="width:20px; margin-left:16px;">
            </div>

            <center>
                <!--  DA PC E TUTTI GLI ALTRI DISPOSITIVI AD ECCEZIONE DEL TELEFONO  -->

                <div class="card card-signin border-success mt-2 d-none d-sm-block" style="width:520px;">
                    <div class="card-body">
                    
                    <h5 class="card-title text-center"><b>AGGIORNA L'ANNUNCIO</b></h5>
                    
                    <form @keyup.enter="aggiornaAnnuncio">
                        
                        <!--  CF  -->
                        <div class="row">
                            <div class="col mt-1">
                                <h6><b>CF</b></h6>
                            </div>
                            
                            <div class="col">
                                <input class="form-control border-success" v-model="CF" type="text" style="width:200px">
                            </div>

                            <div class="col">
                                <!--  Padding per bottoni + e -  -->
                            </div>
                        </div>
                        
                        <!--  Data inizio  -->
                        <div class="row">
                            <div class = "col mt-1">
                                <h6><b>Data inizio</b></h6>
                            </div>

                            <div class = "col">
                                <input class="form-control border-success mt-1" v-model="data_inizio" type="date" style="width:200px">
                            </div>

                            <div class="col">
                                <!--  Padding per bottoni + e -  -->
                            </div>
                        </div>

                        <!--  Data fine  -->
                        <div class="row">
                            <div class = "col mt-1">
                                <h6><b>Data fine</b></h6>
                            </div>

                            <div class = "col">
                                <input class="form-control border-success mt-1" v-model="data_fine" type="date" style="width:200px">
                            </div>

                            <div class="col">
                                <!--  Padding per bottoni + e -  -->
                            </div>
                        </div>

                        <!--  Zone  -->
                        <div class="row">
                            <div class = "col mt-1">
                                <h6><b>Zone</b></h6>
                            </div>

                            <div class = "col">
                                <input class="form-control border-success mt-1" v-model="newZona" placeholder="Aggiungi(+) / Rimuovi(-)" type="text" style="width:200px;">
                            </div>
                            
                            <!--  Bottoni inserimento(+) e rimozione(-) zone  -->
                            <div class="col">
                                <button @click="aggiungiZona()" class="btn border-success" type="button" style="width:35px; height:35px"><b>+</b></button>
                                <button @click="mostraZoneInserite=!mostraZoneInserite" class="btn border-danger ml-1" type="button" style="width:35px; height:35px"><b>-</b></button>
                            </div>

                        </div>

                        <!--  Zone inserite  -->
                        <div v-if="mostraZoneInserite">
                            <div v-for="(zona, index) in zone" :key="index">
                                <div class="row mt-2">
                                    
                                    <div class="col">
                                        {{zona}}
                                    </div>
                                    
                                    <div class="col">
                                        <button @click="rimuoviZona" :id="index" class="btn border-warning ml-1" type="button" style="width:35px; height:35px"><b>-</b></button>
                                    </div>
                                
                                </div>

                            </div>
                        </div>

                        <!--  Descrizione  -->
                        <div class="row">
                            <div class = "col mt-1">
                                <h6><b>Descrizione</b></h6>
                            </div>

                            <div class = "col">
                                <textarea class="form-control border-success mt-1" v-model="descrizione" type="textarea" maxlength="200" style="width:200px; height:200px"></textarea>
                            </div>

                            <div class="col">
                                <!--  Padding per bottoni + e -  -->
                            </div>
                        </div>

                        <div v-if="cliccatoSuAggiorna && (error == 'CF' || error == 'Data inizio' || error == 'Data fine' || error == 'Logica delle date' || error == 'Descrizione')" class="alert alert-danger mt-1" role="alert">
                            {{messaggioErrore}}
                        </div>

                        <div v-else-if="cliccatoSuAggiorna && error==''" class="alert alert-success mt-1" role="alert">
                            {{messaggioConferma}}
                        </div>

                        <!--  Bottone di aggiornamento annuncio  -->
                        <button @click="aggiornaAnnuncio()" type="button" class="btn btn-success mt-1">Aggiorna annuncio</button>

                    </form>
            
                    </div>
              
            
                </div>

                <!--  DA TELEFONO  -->

                <div class="card card-signin border-success mt-2 d-block d-sm-none" style="width:100%">
                    <div class="card-body">
                    
                    <h5 class="card-title text-center"><b>AGGIORNA L'ANNUNCIO</b></h5>
                    
                    <form @keyup.enter="aggiornaAnnuncio">
                        
                        <!--  CF  -->
                        <div class="row">
                            <div class="col">
                                <h6><b>CF</b></h6>
                            </div>
                            
                            <div class="col">
                                <input class="form-control border-success" v-model="CF" type="text" style="width:200px">
                            </div>
                        </div>

                        <!--  Data inizio  -->                        
                        <div class="row">
                            <div class = "col mt-1">
                                <h6><b>Data inizio</b></h6>
                            </div>

                            <div class = "col">
                                <input class="form-control border-success mt-1" v-model="data_inizio" type="date" style="width:200px">
                            </div>

                        </div>

                        <!--  Data fine  -->
                        <div class="row">
                            <div class = "col mt-1">
                                <h6><b>Data fine</b></h6>
                            </div>

                            <div class = "col">
                                <input class="form-control border-success mt-1" v-model="data_fine" type="date" style="width:200px">
                            </div>

                        </div>  

                        <!--  Zone  -->
                        <div class="row">
                            <div class = "col mt-1">
                                <h6><b>Zone</b></h6>
                            </div>

                            <div class = "col">
                                <input class="form-control border-success mt-1" v-model="newZona" placeholder="Aggiungi(+) / Rimuovi(-)" type="text" style="width:200px;">
                            </div>

                        </div>

                        <!--  Bottoni inserimento(+) e rimozione(-) zone  -->
                        <div class="row mt-1">
                             <div class="col">
                                 <!--  Padding  -->
                             </div>
                             
                             <div class="col">
                                 <button @click="aggiungiZona()" class="btn border-success" type="button" style="width:35px; height:35px"><b>+</b></button>
                                 <button @click="mostraZoneInserite=!mostraZoneInserite" class="btn border-danger ml-1" type="button" style="width:35px; height:35px"><b>-</b></button>
                             </div>

                        </div>

                        <!--  Zone inserite  -->
                        <div v-if="mostraZoneInserite">
                            <div v-for="(zona, index) in zone" :key="index">
                                <div class="row mt-2">
                                    
                                    <div class="col">
                                        {{zona}}
                                    </div>
                                    
                                    <div class="col">
                                        <button @click="rimuoviZona" :id="index" class="btn border-warning ml-1" type="button" style="width:35px; height:35px"><b>-</b></button>
                                    </div>
                                
                                </div>

                            </div>
                        </div>

                        <!--  Descrizione  -->
                        <div class="row">
                            <div class = "col mt-1">
                                <h6><b>Descrizione</b></h6>
                            </div>

                            <div class = "col">
                                <textarea class="form-control border-success mt-1" v-model="descrizione" type="textarea" maxlength="200" style="width:200px; height:200px"></textarea>
                            </div>

                        </div>

                        <div v-if="cliccatoSuAggiorna && (error == 'CF' || error == 'Data inizio' || error == 'Data fine' || error == 'Logica delle date' || error == 'Descrizione')" class="alert alert-danger mt-1" role="alert">
                            {{messaggioErrore}}
                        </div>

                        <div v-else-if="cliccatoSuAggiorna && error==''" class="alert alert-success mt-1" role="alert">
                            {{messaggioConferma}}
                        </div>

                        <!--  Bottone di aggiornamento annuncio  -->
                        <button @click="aggiornaAnnuncio()" type="button" class="btn btn-success mt-1">Aggiorna annuncio</button>

                    </form>
            
                    </div>
              
            
                </div>
           
           </center>
        
        </div>

        <!--  SCHERMATA FILTRI  --> 

        <div v-if="cliccatoSuFiltra">
            
            <!--  Img back  -->
            <div class="row mt-1 ml-1">
                <img @click="tornaAllaSchermataPrecedenteDaFiltri()" src="../assets/back.png" class="back mt-1" style="width:20px; margin-left:16px;">
            </div>

            <center>

                <!--  DA PC E TUTTI I DISPOSITIVI AD ECCEZIONE DEL TELEFONO  -->
                <div class="card card-signin border-success mt-2 d-none d-sm-block" style="width:520px;">
                    <div class="card-body">
                    
                    <h5 class="card-title text-center"><b>FILTRA ANNUNCI</b></h5>
                    
                    <form @keyup.enter="filtraAnnunci()">
                        
                        <!--  CF  -->
                        <div v-if="tipoUtente != 'cittadino'" class="row">
                            <div class="col mt-1">
                                <h6><b>CF</b></h6>
                            </div>
                            
                            <div class="col">
                                <input class="form-control border-success" v-model="CF" type="text" style="width:200px">
                            </div>

                            <div class="col">
                                <!--  Padding per bottoni + e -  -->
                            </div>
                        </div>
                        
                        <!--  Data inizio  -->
                        <div class="row">
                            <div class = "col mt-1">
                                <h6><b>Data inizio</b></h6>
                            </div>

                            <div class = "col">
                                <input class="form-control border-success mt-1" v-model="data_inizio" type="date" style="width:200px">
                            </div>

                            <div class="col">
                                <!--  Padding per bottoni + e -  -->
                            </div>
                        </div>

                        <!--  Data fine  -->
                        <div class="row mt-1">
                            <div class = "col mt-1">
                                <h6><b>Data fine</b></h6>
                            </div>

                            <div class = "col">
                                <input class="form-control border-success mt-1" v-model="data_fine" type="date" style="width:200px">
                            </div>

                            <div class="col">
                                <!--  Padding per bottoni + e -  -->
                            </div>
                        </div>

                        <!--  Zone  -->
                        <div class="row mt-1">
                            <div class = "col mt-1">
                                <h6><b>Zone</b></h6>
                            </div>

                            <div class = "col">
                                <input class="form-control border-success mt-1" v-model="newZona" placeholder="Aggiungi(+) / Rimuovi(-)" type="text" style="width:200px;">
                            </div>

                            <!--  Bottoni aggiunta(+) e rimozione(-) zone  -->
                            <div class="col">
                                <button @click="aggiungiZona()" class="btn border-success" type="button" style="width:35px; height:35px"><b>+</b></button>
                                <button @click="mostraZoneInserite=!mostraZoneInserite" class="btn border-danger ml-1" type="button" style="width:35px; height:35px"><b>-</b></button>
                            </div>

                        </div>

                        <!--  Zone inserite  -->
                        <div v-if="mostraZoneInserite">
                            <div v-for="(zona, index) in zone" :key="index">
                                <div class="row mt-2">
                                    
                                    <div class="col">
                                        {{zona}}
                                    </div>
                                    
                                    <div class="col">
                                        <button @click="rimuoviZona" :id="index" class="btn border-warning ml-1" type="button" style="width:35px; height:35px"><b>-</b></button>
                                    </div>
                                
                                </div>
                               
                            </div>
                        </div>
                        
                        <!--  Bottone di filtraggio annunci  -->
                        <button @click="filtraAnnunci()" type="button" class="btn btn-success mt-1">Filtra annunci</button>

                    </form>
            
                    </div>
              
            
                </div>

                <!--  DA TELEFONO  -->
                <div class="card card-signin border-success mt-2 d-block d-sm-none" style="width:100%;">
                    <div class="card-body">
                    
                    <h5 class="card-title text-center"><b>FILTRA ANNUNCI</b></h5>
                    
                    <form @keyup.enter="filtraAnnunci()">
                        
                        <!--  CF  -->
                        <div v-if="tipoUtente != 'cittadino'" class="row">
                            <div class="col mt-1">
                                <h6><b>CF</b></h6>
                            </div>
                            
                            <div class="col">
                                <input class="form-control border-success" v-model="CF" type="text" style="width:200px">
                            </div>
                        </div>
                        
                        <!--  Data inizio  -->
                        <div class="row">
                            <div class = "col mt-1">
                                <h6><b>Data inizio</b></h6>
                            </div>

                            <div class = "col">
                                <input class="form-control border-success mt-1" v-model="data_inizio" type="date" style="width:200px">
                            </div>
                        </div>

                        <!--  Data fine  -->
                        <div class="row mt-1">
                            <div class = "col mt-1">
                                <h6><b>Data fine</b></h6>
                            </div>

                            <div class = "col">
                                <input class="form-control border-success mt-1" v-model="data_fine" type="date" style="width:200px">
                            </div>
                        </div>

                        <!--  Zone  -->
                        <div class="row mt-1">
                            <div class = "col mt-1">
                                <h6><b>Zone</b></h6>
                            </div>

                            <div class = "col">
                                <input class="form-control border-success mt-1" v-model="newZona" placeholder="Aggiungi(+) / Rimuovi(-)" type="text" style="width:200px;">
                            </div>
                        </div>

                        <!--  Bottoni inserimento(+) e rimozione(-) zone  -->
                        <div class="row mt-1">
                            <div class = "col">
                                <!--  Padding  -->
                            </div>

                            <div class="col">
                                <button @click="aggiungiZona()" class="btn border-success" type="button" style="width:35px; height:35px"><b>+</b></button>
                                <button @click="mostraZoneInserite=!mostraZoneInserite" class="btn border-danger ml-1" type="button" style="width:35px; height:35px"><b>-</b></button>
                            </div>
                        </div>

                        <!--  Zone inserite  -->
                        <div v-if="mostraZoneInserite">
                            <div v-for="(zona, index) in zone" :key="index">
                                <div class="row mt-2">
                                    
                                    <div class="col">
                                        {{zona}}
                                    </div>
                                    
                                    <div class="col">
                                        <button @click="rimuoviZona" :id="index" class="btn border-warning ml-1" type="button" style="width:35px; height:35px"><b>-</b></button>
                                    </div>
                                
                                </div>
                               
                            </div>
                        </div>
                        
                        <!--  Bottone filtraggio annunci  -->
                        <button @click="filtraAnnunci()" type="button" class="btn btn-success mt-1">Filtra annunci</button>

                    </form>
            
                    </div>
              
            
                </div>
           
           </center>
            
        </div>

        <!--  SCHERMATA DI VISUALIZZAZIONE ANNUNCI FILTRATI  -->

        <div v-if="filtering && !visualizzandoDettagli">
            <div class="card border-success mt-3">
            <div class="card-body">
                <h5 class="card-title"><b>ANNUNCI FILTRATI</b></h5>
                
                <!--  TABELLA  -->
                
                <div class="table-responsive table-borderless" style="height:350px">
                    <table class="table">
                        <!--  Intestazione tabella  -->
                        <thead class="thead-light">
                            <tr>
                                <th scope="col">CF</th>
                                <th scope="col">Data inizio</th>
                                <th scope="col">Data fine</th>
                                <th scope="col">Dettagli</th>
                                <th scope="col"><img @click="rimuoviFiltri()" src="../assets/nofilter.png" data-title = "Vai ai filtri" class="filter" style="width:25px"></th>
                            </tr>
                        </thead>

                        <!--  Corpo tabella  -->
                        <tbody>
                            <tr v-for="annuncio in annunciFiltrati" :key="annuncio._id">
                                <td>{{annuncio.CF}}</td>
                                <td>{{annuncio.start}}</td>
                                <td>{{annuncio.end}}</td>
                                <td><p data-placement = "top" data-toggle = "tooltip" title = "Detail"><button :id="annuncio._id" @click="visualizzaDettagli" class = "btn btn-success btn-xs" data-title = "Detail" data-toggle = "modal" data-target = "#detail" style = "height:10px;width:20px;"><span class="glyphicon glyphicon-trash"></span></button></p></td>
                                <td><!--  Padding per img no filter  --></td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
                
            </div>
        </div>
      </div>
        
    </div>

</template>

<script>
import axios from 'axios'

export default {
  name : "Announcements",

  data(){
    return {
        tipoUtente : "",
        annunci : [],
        annunciFiltrati : [],
        loading : false,
        adding : false,
        visualizzandoDettagli : false,
        updating : false,
        cliccatoSuFiltra : false,
        filtering : false,
        CF : "",
        data_inizio : "",
        data_fine : "",
        descrizione : "",
        newZona : "",
        zone : [],
        error : "",
        messaggioErrore : "",
        cliccatoSuPubblica : false,
        cliccatoSuAggiorna : false,
        messaggioConferma : "",
        annuncioDaVisualizzare : {},
        annuncioDaModificare : {},
        mostraZoneInserite : false,
        idBack : ""
    }
  },

  created(){
    // Salvo il tipo di utente per il tipo di visualizzazione
    this.tipoUtente = localStorage.type

    // Aggiorno la schermata annunci
    this.aggiornaSchermataAnnunci()
  },

  methods : {
    
    // Permette di ottenere tutti gli annunci pubblicati finora
    aggiornaSchermataAnnunci(){
      this.annunci = []

      axios({
        method: 'get',
        url: 'http://localhost:8081/announcements',
        headers: {
          "x-eco-auth-token": localStorage.token
        }
      })
      .then((response) => {
      
        let i 
        const annunci = response.data
        const dim = annunci.length
        for(i=0;i<dim;i++){
        
          let data_inizio = annunci[i].start
          const ind_inizio = data_inizio.indexOf('T')
          let data_fine = annunci[i].end
          const ind_fine = data_fine.indexOf('T')

          data_inizio = data_inizio.substring(0, ind_inizio)
          data_fine = data_fine.substring(0, ind_fine)
        
          annunci[i].start = data_inizio
          annunci[i].end = data_fine

          if(annunci[i].zone[0] == "Everywhere") annunci[i].zone[0] = "Nessuna zona specificata"

          this.annunci.push(annunci[i])
        
        }
      })
      .catch((error) => {
        console.log(error)
      })
    },
    
    // Validazione CF
    controllaCF(){

      var regex = /^[A-Z]{6}[0-9]{2}[A-Z]{1}[0-9]{2}[A-Z]{1}[0-9]{3}[A-Z]{1}$/
      const res = regex.test(this.CF)
      
      if(!res){
          this.error = "CF"
          this.messaggioErrore = "Codice fiscale non valido"
          return false
      }

      return true
    },

    // Validazione data inizio e fine
    controllaDate(){

      if(this.data_inizio.length < 10){
        this.error = "Data inizio"
        this.messaggioErrore = "Data di inizio non valida"
        return false
      }

      if(this.data_fine.length < 10){
        this.error = "Data fine"
        this.messaggioErrore = "Data di fine non valida"
        return false  
      }

      if(this.data_fine < this.data_inizio){
        this.error = "Logica delle date"
        this.messaggioErrore = "La data di inizio non può essere maggiore di quella di fine"
        return false
      }

      return true
    },

    // Validazione descrizione
    controllaDescrizione(){
      if(this.descrizione == ""){
        this.error = "Descrizione"
        this.messaggioErrore = "La descrizione non può essere vuota"
        return false
      }

      return true
    },
    
    // Validazione complessiva campi
    campiOK(){
        return this.controllaCF() && this.controllaDate() && this.controllaDescrizione()
    },
    
    // Pubblicazione annuncio
    pubblicaAnnuncio(){
      this.cliccatoSuPubblica = true
      
      // Validazione campi
      if(!this.campiOK()){
        setTimeout(() => {this.cliccatoSuPubblica = false; this.error=""}, 2000)
        return
      }

      // Conferma di pubblicazione
      if(!confirm("Confermi la pubblicazione dell'annuncio? Ogni cittadino riceverà un'email.")){
        this.cliccatoSuPubblica = false
        return
      }
       
      
      this.error = ""
      
      axios({
        method: 'post',
        url: 'http://localhost:8081/announcements',
        headers: {
          "x-eco-auth-token": localStorage.token
        },
        data: {
          CF: this.CF,
          start: this.data_inizio,
          end : this.data_fine,
          description : this.descrizione,
          zone : this.zone
        }
      })
      .then((response) => {
          this.messaggioConferma = "Annuncio pubblicato con successo!"

          const ind_inizio = response.data.start.indexOf('T')
          const ind_fine = response.data.end.indexOf('T')
          response.data.start = response.data.start.substring(0, ind_inizio)
          response.data.end = response.data.end.substring(0, ind_fine)


          this.annunci.push(response.data)

          this.data_inizio = ""
          this.data_fine = ""
          this.descrizione = ""
          this.zone = []
          this.CF = ""

          
      })
      .catch((error) => {
          console.log(error)
      })

      setTimeout(() => {this.cliccatoSuPubblica = false}, 2000)
    },

    // Visualizzazione dettagli annuncio
    visualizzaDettagli(event){
      this.visualizzandoDettagli = true
      
      // Prendo l'id dell'annuncio tramite event
      const id_annuncio = event.target.id
      const annunci = this.annunci
      let i
      const dim = annunci.length
      
      // Cerco l'annuncio con tale id
      for(i=0;i<dim;i++){
        if(annunci[i]._id == id_annuncio){
          this.annuncioDaVisualizzare = annunci[i]
          break
        }
      }

    },

    cancellaAnnuncio(event){
      const id_annuncio = event.target.id
      
      // PROVO A SETTARE IL TOKEN
      axios({
        method: 'post',
        url: 'http://localhost:8081/token/setToken/announcement/'+id_annuncio,
        headers: {
          "x-eco-auth-token": localStorage.token
        }
      })

      // SE RIESCO POSSO ELIMINARE L'ANNUNCIO
      .then(() => {

        // SE NON CONFERMO DI ELIMINARE L'ANNUNCIO
        if(!confirm("Sei sicuro di voler rimuovere l'annuncio?")){
      
          // PROVO A RESETTARE IL TOKEN
          axios({
            method: 'delete',
            url: 'http://localhost:8081/token/deleteToken/announcement/'+id_annuncio,
            headers: {
              "x-eco-auth-token": localStorage.token
            }
          })

          // SE RIESCO TORNO INDIETRO
          .then(() => {
            this.aggiornaSchermataAnnunci()

            this.adding = false
            this.updating = false
            this.cliccatoSuFiltra = false
            this.mostraZoneInserite = false
      
            this.data_inizio = ""
            this.data_fine = ""
            this.descrizione = ""
            this.zone = []
            this.CF = ""
        
            this.idBack = ""
          })

          // SE NON RIESCO LA SESSIONE E' SCADUTA E TORNO INDIETRO
          .catch(() => {
            console.log('NESSUN TOKEN RIMUOVERE')
          
          })

          return
        }

        // ELIMINO L'ANNUNCIO
        axios({
          method: 'delete',
          url: 'http://localhost:8081/announcements/'+id_annuncio,
          headers: {
            "x-eco-auth-token": localStorage.token
          }
        })
        .then((response) => {
          this.aggiornaSchermataAnnunci()
          console.log("Eliminato: "+response.data)
        })
        .catch((error) => {
          alert("Sessione scaduta")
          console.log(error)

          this.aggiornaSchermataAnnunci()

          this.adding = false
          this.updating = false
          this.cliccatoSuFiltra = false
          this.mostraZoneInserite = false
      
          this.data_inizio = ""
          this.data_fine = ""
          this.descrizione = ""
          this.zone = []
          this.CF = ""
        
          this.idBack = ""
        })
      })

      // SE NON RIESCO NON POSSO ELIMINARE L'ANNUNCIO
      .catch(() => {
        alert("Token già settato: un altro operatore sta lavorando su questo annuncio!")
      })

      
    },

    // Aggiunta di una zona
    aggiungiZona(){
      if(this.newZona != "") this.zone.push(this.newZona)
      this.newZona = ""
    },

    // Rimozione di una zona
    rimuoviZona(event){
      const i = event.target.id
      this.zone.splice(i, 1)
    },

    settaCampiPerAggiornamentoAnnuncio(event){
      
      // Prendo l'id dell'annuncio che voglio modificare tramite event
      const id_annuncio = event.target.id
      this.idBack = id_annuncio
      
      // PROVO A SETTARE IL TOKEN
      axios({
        method: 'post',
        url: 'http://localhost:8081/token/setToken/announcement/'+id_annuncio,
        headers: {
          "x-eco-auth-token": localStorage.token
        }
      })

      // SE RIESCO POSSO MODIFICARE L'ANNUNCIO
      .then(() => {

        const annunci = this.annunci
        let i
        const dim = annunci.length

        // Cerco l'annuncio con l'id trovato
        for(i=0;i<dim;i++){
          if(annunci[i]._id == id_annuncio){
            this.annuncioDaModificare = annunci[i]
            break
          }
        }

        // Setto i campi di tale annuncio per la visualizzazione nella schermata di modifica
        this.CF = this.annuncioDaModificare.CF
        this.data_inizio = this.annuncioDaModificare.start
        this.data_fine = this.annuncioDaModificare.end
        this.zone = this.annuncioDaModificare.zone
        this.descrizione = this.annuncioDaModificare.description

        this.updating = true
      })

      // SE NON RIESCO NON POSSO MODIFICARE L'ANNUNCIO
      .catch(() => {
        alert("Token già settato: un altro operatore sta lavorando su questo annuncio!")
      })

    },

    // Aggiornamento annuncio
    aggiornaAnnuncio(){
      this.cliccatoSuAggiorna = true

      // Validazione campi
      if(!this.campiOK()){
        setTimeout(() => {this.cliccatoSuAggiorna = false}, 2000)
        return
      }

      // Conferma modifica annuncio
      if(!confirm("Sei sicuro di voler modificare l' annuncio?")){
        this.cliccatoSuAggiorna = false
        return
      } 

      this.error = "nessun errore"   // MESSAGGIO CONFERMA
      
      // AGGIORNAMENTO DELL'ANNUNCIO
      axios({
        method: 'put',
        url: 'http://localhost:8081/announcements/'+this.annuncioDaModificare._id,
        headers: {
          "x-eco-auth-token": localStorage.token
        },
        data: {
          CF: this.CF,
          start: this.data_inizio,
          end : this.data_fine,
          description : this.descrizione,
          zone : this.zone
        }
      })
      .then((response) => {
          this.error = ""
          this.messaggioConferma = "Annuncio aggiornato con successo!"

          const ind_inizio = response.data.start.indexOf('T')
          const ind_fine = response.data.end.indexOf('T')
          response.data.start = response.data.start.substring(0, ind_inizio)
          response.data.end = response.data.end.substring(0, ind_fine)

          let i
          const dim = this.annunci.length
          for(i=0;i<dim;i++){
            if(this.annuncioDaModificare._id == this.annunci[i]._id){
              this.annunci[i].CF = response.data.CF
              this.annunci[i].start = response.data.start
              this.annunci[i].end = response.data.end
              this.annunci[i].zone = response.data.zone
              this.annunci[i].description = response.data.description
              break
            }
          }

          // REFRESH DEL TOKEN
          axios({
            method: 'put',
            url: 'http://localhost:8081/token/refreshToken/announcement/'+this.annuncioDaModificare._id,
            headers: {
              "x-eco-auth-token": localStorage.token
            },
          })

          .then(() => {})
          .catch(() => {
            this.aggiornaSchermataAnnunci()
          
            this.adding = false
            this.updating = false
            this.cliccatoSuFiltra = false
            this.mostraZoneInserite = false
      
            this.data_inizio = ""
            this.data_fine = ""
            this.descrizione = ""
            this.zone = []
            this.CF = ""
        
            this.idBack = ""
          })
          
      })
      .catch((error) => {
          this.aggiornaSchermataAnnunci()
          
          alert("Sessione scaduta")
          console.log(error)

          this.adding = false
          this.updating = false
          this.cliccatoSuFiltra = false
          this.mostraZoneInserite = false
      
          this.data_inizio = ""
          this.data_fine = ""
          this.descrizione = ""
          this.zone = []
          this.CF = ""
        
          this.idBack = ""
      })

      setTimeout(() => {this.cliccatoSuAggiorna = false}, 2000)
    },

    // Filtri per gli annunci
    filtraAnnunci(){
      this.cliccatoSuFiltra = false
      
      // SOLO CF
      if(this.CF != "" && this.data_inizio == "" && this.data_fine == "" && this.zone.length == 0){
        this.filtering = true
        
        let i
        const dim = this.annunci.length
        const annunci = this.annunci
        for(i=0;i<dim;i++){
          if(annunci[i].CF == this.CF) this.annunciFiltrati.push(annunci[i])
        }
      }

      // SOLO DATA INIZIO
      else if(this.data_inizio != "" && this.CF == "" && this.data_fine == "" && this.zone.length == 0){
        this.filtering = true
        
        let i
        const dim = this.annunci.length
        const annunci = this.annunci
        for(i=0;i<dim;i++){
          if(annunci[i].start >= this.data_inizio) this.annunciFiltrati.push(annunci[i])
        }
      }

      //SOLO DATA FINE
      else if(this.data_fine != "" && this.CF == "" && this.data_inizio == "" && this.zone.length == 0){
          this.filtering = true
          
          let i
          const dim = this.annunci.length
          const annunci = this.annunci
          for(i=0;i<dim;i++){
            if(annunci[i].end <= this.data_fine) this.annunciFiltrati.push(annunci[i])
          }
        
      }

      //SOLO ZONA
      else if(this.zone.length > 0 && this.CF == "" && this.data_inizio == "" && this.data_fine == ""){
        this.filtering = true

        let i
        const dim = this.annunci.length
        const annunci = this.annunci
        for(i=0;i<dim;i++){  // Scorro gli annunci
          this.appoggioFiltri(annunci[i])
        }
        
      }

      // SOLO CF E DATA INIZIO
      if(this.CF != "" && this.data_inizio != "" && this.data_fine == "" && this.zone.length == 0){
        this.filtering = true
        
        let i
        const dim = this.annunci.length
        const annunci = this.annunci
        for(i=0;i<dim;i++){
          if(annunci[i].CF == this.CF && annunci[i].start >= this.data_inizio) this.annunciFiltrati.push(annunci[i])
        }
      }

      // SOLO CF E DATA FINE
      if(this.CF != "" && this.data_fine != "" && this.data_inizio == "" && this.zone.length == 0){
        this.filtering = true
        
        let i
        const dim = this.annunci.length
        const annunci = this.annunci
        for(i=0;i<dim;i++){
          if(annunci[i].CF == this.CF && annunci[i].end <= this.data_fine) this.annunciFiltrati.push(annunci[i])
        }
      }

      // SOLO DATA INIZIO E DATA FINE
      if(this.data_inizio != "" && this.data_fine != "" && this.CF == "" && this.zone.length == 0){
        this.filtering = true
        
        let i
        const dim = this.annunci.length
        const annunci = this.annunci
        for(i=0;i<dim;i++){
          if(annunci[i].start >= this.data_inizio && annunci[i].end <= this.data_fine) this.annunciFiltrati.push(annunci[i])
        }
      }

      // SOLO CF E ZONE
      if(this.CF != "" && this.zone.length > 0 && this.data_inizio == "" && this.data_fine == ""){
        this.filtering = true
        
        let i
        const dim = this.annunci.length
        const annunci = this.annunci
        for(i=0;i<dim;i++){  // Scorro gli annunci
          if(annunci[i].CF == this.CF){
            this.appoggioFiltri(annunci[i])
          }
        }
      }
      
      // SOLO DATA INIZIO E ZONE
      if(this.data_inizio != "" && this.zone.length > 0 && this.data_fine == "" && this.CF == ""){
        this.filtering = true
        
        let i
        const dim = this.annunci.length
        const annunci = this.annunci
        for(i=0;i<dim;i++){  // Scorro gli annunci
          if(annunci[i].start >= this.data_inizio){
            this.appoggioFiltri(annunci[i])
          }
        }
      }

      // SOLO DATA FINE E ZONE
      if(this.data_fine != "" && this.zone.length > 0 && this.data_inizio == "" && this.CF == ""){
        this.filtering = true
        
        let i
        const dim = this.annunci.length
        const annunci = this.annunci
        for(i=0;i<dim;i++){  // Scorro gli annunci
          if(annunci[i].end <= this.data_fine){
            this.appoggioFiltri(annunci[i])
          }
        }
      }

      // SOLO CF, DATA INIZIO E DATA FINE
      if(this.CF != "" && this.data_inizio != "" && this.data_fine != "" && this.zone.length == 0){
        this.filtering = true
        
        let i
        const dim = this.annunci.length
        const annunci = this.annunci
        for(i=0;i<dim;i++){
          if(annunci[i].CF == this.CF && annunci[i].start >= this.data_inizio && annunci[i].end <= this.data_fine) this.annunciFiltrati.push(annunci[i])
        }
      }

      // SOLO CF, DATA INIZIO E ZONE
      if(this.CF != "" && this.data_inizio != "" && this.zone.length > 0 && this.data_fine == ""){
        this.filtering = true
        
        let i
        const dim = this.annunci.length
        const annunci = this.annunci
        for(i=0;i<dim;i++){  // Scorro gli annunci
          if(annunci[i].CF == this.CF && annunci[i].start >= this.data_inizio){
            this.appoggioFiltri(annunci[i])
          }
        }
      }

      // SOLO CF, DATA FINE E ZONE
      if(this.CF != "" && this.data_fine != "" && this.zone.length > 0 && this.data_inizio == ""){
        this.filtering = true
        
        let i
        const dim = this.annunci.length
        const annunci = this.annunci
        for(i=0;i<dim;i++){  // Scorro gli annunci
          if(annunci[i].CF == this.CF && annunci[i].end <= this.data_fine){
            this.appoggioFiltri(annunci[i])
          }
        }
      }

      // SOLO DATA INIZIO, DATA FINE E ZONE
      if(this.data_inizio != "" && this.data_fine != "" && this.zone.length > 0 && this.CF == ""){
        this.filtering = true
        
        let i
        const dim = this.annunci.length
        const annunci = this.annunci
        for(i=0;i<dim;i++){  // Scorro gli annunci
          if(annunci[i].start >= this.data_inizio && annunci[i].end <= this.data_fine){
            this.appoggioFiltri(annunci[i])
          }
        }
      }

      // CF, DATA INIZIO, DATA FINE E ZONE
      if(this.CF != "" && this.data_inizio != "" && this.data_fine != "" && this.zone.length > 0){
        this.filtering = true
        
        let i
        const dim = this.annunci.length
        const annunci = this.annunci
        for(i=0;i<dim;i++){  // Scorro gli annunci
          if(annunci[i].CF == this.CF && annunci[i].start >= this.data_inizio && annunci[i].end <= this.data_fine){
            this.appoggioFiltri(annunci[i])
          }
        }
      }

    },
    
    // Funzione di appoggio per i filtri per zona
    appoggioFiltri(annuncio){
      const zone = annuncio.zone
      let j
      const size = zone.length
      for(j=0;j<size;j++){ // Per ogni annuncio scorro le zone inserite
        const zonaAnnuncio = zone[j].toLowerCase()
        let h
        const len = this.zone.length
        for(h=0;h<len;h++){  // Per ogni zona inserita di ogni annuncio vedo se corrisponde a qualcuna di quelle per cui sto filtrando
          const zonaFiltro = this.zone[h].toLowerCase()
          const res = zonaAnnuncio.match(zonaFiltro)
              
          if(res != null && !this.annunciFiltrati.includes(annuncio)){
              this.annunciFiltrati.push(annuncio)
          }
        }
      }
    },
    
    // Rimozione filtri
    rimuoviFiltri(){
      this.cliccatoSuFiltra = false
      this.filtering = false

      this.data_inizio = ""
      this.data_fine = ""
      this.descrizione = ""
      this.zone = []
      this.annunciFiltrati = []
      this.CF = ""
    },

    // Click su img back da modifica
    tornaAllaSchermataPrecedenteDaModifica(){
      const id_annuncio = this.idBack
      
      // PROVO A RESETTARE IL TOKEN
      axios({
        method: 'delete',
        url: 'http://localhost:8081/token/deleteToken/announcement/'+id_annuncio,
        headers: {
          "x-eco-auth-token": localStorage.token
        }
      })

      // SE RIESCO TORNO INDIETRO
      .then(() => {
        this.aggiornaSchermataAnnunci()

        this.adding = false
        this.updating = false
        this.cliccatoSuFiltra = false
        this.mostraZoneInserite = false
      
        this.data_inizio = ""
        this.data_fine = ""
        this.descrizione = ""
        this.zone = []
        this.CF = ""
        
        this.idBack = ""
      })

      // SE NON RIESCO LA SESSIONE E' SCADUTA E TORNO INDIETRO
      .catch(() => {
     

        this.aggiornaSchermataAnnunci()

        this.adding = false
        this.updating = false
        this.cliccatoSuFiltra = false
        this.mostraZoneInserite = false
      
        this.data_inizio = ""
        this.data_fine = ""
        this.descrizione = ""
        this.zone = []
        this.CF = ""
        
        this.idBack = ""
      })
    },

    // Click su img back da filtri
    tornaAllaSchermataPrecedenteDaFiltri(){
      
      this.aggiornaSchermataAnnunci()

      this.adding = false
      this.updating = false
      this.cliccatoSuFiltra = false
      this.mostraZoneInserite = false
      
      this.data_inizio = ""
      this.data_fine = ""
      this.descrizione = ""
      this.zone = []
      this.CF = ""
    },

    // Setta la classe a seconda del token
    cambiaClasse:function(annuncio){
      if(annuncio.token!='')
        return "bg-secondary"
      else
        return ""
    }
  },
}
</script>

<style scoped>

.back{
    cursor: pointer;
}

.filter{
    cursor: pointer;
}

.inserimento{
    border-color: green;
    border-width: 0.04rem;
    /*border-radius: 10px 10px 10px 10px;*/
}

.card{
    border-color: green;
    border-radius: 10px 10px 10px 10px;
}

  .form-signin .btn {
    font-size: 80%;
    border-radius: 1rem;
    letter-spacing: .1rem;
    font-weight: bold;
    padding: 1rem;
    transition: all 0.2s;
  }

</style>