import React from "react";
import Container from "react-bootstrap/esm/Container";
import FunilService from "../../services/FunilService.js";
import JornadaService from "../../services/JornadaService.js";
import TelasService from "../../services/TelasService.js";
import Graph from "./Graph.js";

class GraphList extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeJornadas = this.onChangeJornadas.bind(this);
    this.onChangeNomeJornada = this.onChangeNomeJornada.bind(this);
    this.onChangeFunis = this.onChangeFunis.bind(this);
    this.exibirGraficos = this.exibirGraficos.bind(this);
    this.getGraficos = this.getGraficos.bind(this);
    this.state = {
      jornadas: [],
      funis: [],
      telas: [],
      nomeJornadaLoop: null,
      element: [],
    };
  }

  componentDidMount() {
    this.getGraficos();
  }

  exibirGraficos() {

    let retorno = [];
    const funilGraph = [
      {
        nomeJornadaGraph: null,
        funisGraph: [
          {
            nomeFunil: null,
            acessos: null,
          },
        ],
      },
    ];

    const jornadasLoop = this.state.jornadas;

    for (let index = 0; index < jornadasLoop.length; index++) {
      this.element = jornadasLoop[index];
      if(this.element.status=="Pendente"){
        continue;
      }
      this.nomeJornadaLoop = this.element.nomeJornada;
      const funisLoop = this.state.funis;
      const telasLoop = this.state.telas;
      var funisConst = [];
      var element3;
      for (let index = 0; index < funisLoop.length; index++) {
        const element2 = funisLoop[index];
       
        var funisTemp = [];
        if (this.element.idJornada != element2.idJornada) {
          continue;
        } else {
          funisTemp = element2;
          funisConst.push(funisTemp);
          element3=element2.idJornada;
        }
      }
      
      if (this.element.idJornada == element3) {

        retorno.push(
          
      <Graph graficos={funisConst} titulo={this.nomeJornadaLoop} />
        );
         }
    }
    return retorno;
  }

  onChangeJornadas() {
    this.setState({
      jornadas: this.jornadas,
    });
  }

  onChangeNomeJornada(e) {
    this.setState({
      nomeJornada: this.nomeJornada,
    });
  }

  onChangeFunis() {
    this.setState({
      funis: this.funis,
    });
  }

  getGraficos() {
    JornadaService.getAll()
      .then((response) => {
        this.setState({
          jornadas: response.data,
        });
        console.log(response.data);
        FunilService.getAll()
          .then((response) => {
            this.setState({
              funis: response.data,
            });
            console.log(response.data);

            TelasService.getAll()
              .then((response) => {
                this.setState({
                  telas: response.data,
                });
                console.log(response.data);
                this.exibirGraficos();
              })
              .catch((e) => {
                console.log(e);
              });
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    return (
      <Container>
        <div></div>
        <Container>{this.exibirGraficos()}</Container>
      </Container>
    );
  }
}
export default GraphList;
