import React, { Component } from "react";
import DataGrid, { Scrolling, Sorting, LoadPanel } from 'devextreme-react/data-grid';
import JornadaService from "../../services/JornadaService";
import { Container } from "reactstrap";

const columns = ['idJornada', 'inicioJanela', 'fimJanela', 'nomeJornada','status','diasJanela','tipoJanela'];

class JornadaList extends Component {
    constructor(props) {
        super(props);
        this.retrieveJornadas = this.retrieveJornadas.bind(this);
    
        this.state = {
            jornadas: [],
        };
      }
    componentDidMount() {
        this.retrieveJornadas();
      }

      retrieveJornadas() {
        JornadaService.getAll()
          .then(response => {
            this.setState({
              jornadas: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }


  
    render() {
        return (
            <Container>
              <div className="long-title"><h3>Exibir Jornadas</h3></div>
                <div>
          <DataGrid
            dataSource={this.state.jornadas}
            keyExpr="idJornada"
            defaultColumns={columns}
            showBorders={true}
          >
              <Sorting mode="none" />
        <Scrolling mode="infinite" />
        <LoadPanel enabled={false} />
        </DataGrid>
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