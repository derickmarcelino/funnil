import React, { Component } from "react";
import FunilService from "../../services/FunilService";
import TelasService from "../../services/TelasService";
import FunilHelper from "../Funil/FunilHelper";

class JornadaHelper extends Component  {

    jornadaComTelas(jornadas){
        console.log(jornadas);
          

         console.log( FunilHelper.FunisJornada(jornadas.idJornada));
         return FunilHelper.FunisJornada(jornadas.idJornada);
          
         

  
        }


    }
    export default new JornadaHelper();