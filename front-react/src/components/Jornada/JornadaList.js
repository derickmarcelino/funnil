import React, { Component } from "react";
import DataGrid, { Column, Selection } from 'devextreme-react/data-grid';
import JornadaService from "../../services/JornadaService";
import { Container } from "reactstrap";
import Graph from "../Graph/Graph";
import FunilService from "../../services/FunilService";
import FunilHelper from "../Funil/FunilHelper";
import JornadaHelper from "./JornadaHelper";
import Form, {
  SimpleItem, GroupItem, TabbedItem, TabPanelOptions, Tab,
} from 'devextreme-react/form';
import Funnel, {
  Title,
  Margin,
  Export,
  Tooltip,
  Item,
  Border,
  Label,
} from "devextreme-react/funnel";
import Frame from 'react-frame-component';
import Box, {
  
} from 'devextreme-react/box';
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
    this.showGraph = this.showGraph.bind(this);
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.state = {
      jornadas: [],
      matricula: null,
      funil: [],
      titulo: null,
      graficos: [],
      result: [],
      graf: false
    };

  }

  componentDidMount() {
    this.retrieveJornadas();
  }

  
  showGraph(idJornadaTemp){
console.log(this.state);
return FunilHelper.FunisJornada(idJornadaTemp);

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
if(data != null){
    this.setState({
      titulo: data.nomeJornada,
      graficos: data,
      graf: !!data,
     
    });
    
    console.log(this.state);
    console.log(this.state.graficos);
    this.showGraph();
  }
  else{
    this.state.graf = false;
}

  }
  
  startEdit(e){
console.log(e);
var idJornadaTemp = e.data.idJornada;
this.showGraph(idJornadaTemp);

  
}

  retrieveJornadas() {
    console.log(this.state);
  var jorn= [];
    JornadaService.getByMatricula(this.state.matricula)
      .then((response) => {
        this.setState({
          jornadas: response.data,
        });
        console.log(response.data);
        this.state.graf = true;
      })
      .catch((e) => {
        console.log(e);
      });
      return 
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
        {
        
        
        this.state.graf 
        &&
        <div>
          <DataGrid
            dataSource={this.state.jornadas}
            keyExpr="idJornada"
            defaultColumns={columns}
            hoverStateEnabled={true}
            showBorders={true}
            onSelectionChanged={this.onSelectionChanged}
            onRowClick={this.startEdit}
          >
        <Selection mode="single" />
          </DataGrid>
         
          <div>
          
          <Container>{this.showGraph()}</Container>
      
        <Form
            colCount={2}
            id="form"
            formData={this.state}>
            <GroupItem caption="Funil">
              <SimpleItem dataField="titulo" />
              <SimpleItem dataField="matricula" />
            </GroupItem>
          </Form>
          </div>
        </div>
      }
      </Container>
    );
  }
}



function customizeColumns(columns) {
  columns[0].width = 70;
}

function formatLabel(arg) {
  return `<span class="label">${arg.percentText}</span><br/>${arg.item.argument}`;
}



export default JornadaList;
