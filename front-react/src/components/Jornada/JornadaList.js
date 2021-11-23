import React, { Component } from "react";
import DataGrid, { Column, Selection } from 'devextreme-react/data-grid';
import JornadaService from "../../services/JornadaService";
import { Container } from "reactstrap";
import Graph from "../Graph/Graph";
import FunilService from "../../services/FunilService";
import Funnel, {
  Title,
  Margin,
  Export,
  Tooltip,
  Item,
  Border,
  Label,
} from "devextreme-react/funnel";

const columns = [
  "inicioJanela",
  "fimJanela",
  "nomeJornada",
  "status",
  "diasJanela",
  "tipoJanela",
];

class JornadaList extends Component {
  constructor(props) {
    super(props);
    this.retrieveJornadas = this.retrieveJornadas.bind(this);
    this.onChangeMatricula = this.onChangeMatricula.bind(this);
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.state = {
      jornadas: [],
      matricula: null,
      funil: [],
      titulo: null,
    };
  }

  componentDidMount() {
    this.retrieveJornadas();
  }

  

  onChangeMatricula(e) {
    this.setState({
      matricula: e.target.value,
    });
    console.log(this.state);
    this.retrieveJornadas();
  }

  onSelectionChanged({ selectedRowsData }) {
    const data = selectedRowsData[0];
    console.log(data);
    console.log(this.state);
    this.setState({
      titulo: data.nomeJornada
    });
    FunilService.findByIdJornada(data.idJornada)
      .then((response) => {
        this.setState({
          funil: response.data,
        });
        console.log(response.data);
        console.log(this.state);
      })
      .catch((e) => {
        this.setState({ errorMessage: e.message });
        console.log(e);
      });
  }
    
  
 
 
  


  retrieveJornadas() {
    console.log(this.state);

    JornadaService.getByMatricula(this.state.matricula)
      .then((response) => {
        this.setState({
          jornadas: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    return (
      <Container>
        <div className="long-title">
          <h3>Minhas Jornadas</h3>
        </div>
        <div className="form-group">
          <label htmlFor="description">Matrícula</label>
          <input
            type="text"
            className="form-control"
            id="matricula"
            required
            value={this.state.matricula}
            onChange={this.onChangeMatricula}
            name="nomeJornada"
          />
        </div>
        <div>
          <DataGrid
            dataSource={this.state.jornadas}
            keyExpr="idJornada"
            defaultColumns={columns}
            hoverStateEnabled={true}
            showBorders={true}
            onSelectionChanged={this.onSelectionChanged}
         
          >
        <Selection mode="single" />
          </DataGrid>
          
          <Funnel
        id="funnel"
        dataSource={this.state.funil}
        argumentField="ordemAcesso"
        valueField="idTelas"
        sortData={false}
      
        
      ></Funnel>
        </div>
        <div>
          
        </div>
      </Container>
    );
  }
}
function customizeColumns(columns) {
  columns[0].width = 70;
}

export default JornadaList;
