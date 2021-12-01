import React, { Component } from "react";
import FunilService from "../../services/FunilService";
import TelasService from "../../services/TelasService";
import Graph from "../Graph/Graph";

class FunilHelper    {
   


    FunisJornada(idJornada){
        var funil= [];
        var retorno = [];
    

    FunilService.findByIdJornada(idJornada)
    .then((response) => {
      
        funil= response.data;

        console.log(response.data);
        console.log(funil);
        
  
  
        
      for(let index =0; index < funil.length;index++){
          var funilLoop = funil[index];
          var funilElement = {
            idFunil: null,
            nomeFunil: null,
            acessos: null,
            color: "#FCF800",
          }
          funilElement.idFunil = funilLoop.idFunil;
         
      funilElement.nomeFunil = "Teste";
          funilElement.acessos = 100*(funil.length-index);
          retorno.push(funilElement);
          console.log(funilElement);
        }
        
        console.log(retorno);
        
    })
    .catch((e) => {
        console.log(e);
      });
    console.log(funil);
    return ( <Graph graficos={retorno} titulo={"Teste Graph"}/> );
    

    }
}
    export default new FunilHelper;
