import React, { Component } from "react";
import DataGrid, { Scrolling, Sorting, LoadPanel } from 'devextreme-react/data-grid';

import { Container } from "reactstrap";
import FunilService from "../../services/FunilService";

const columns = ['idFunil', 'idJornada', 'idTelas', 'ordemAcesso','acessos'];

class FunilList extends Component {
    constructor(props) {
        super(props);
        this.retrieveFunis = this.retrieveFunis.bind(this);
    
        this.state = {
            funis: [],
        };
      }
    componentDidMount() {
        this.retrieveFunis();
      }

      retrieveFunis() {
        FunilService.getAll()
          .then(response => {
            this.setState({
              funis: response.data
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
               <div className="long-title"><h3>Exibir Funis</h3></div>
                <div>
          <DataGrid
            dataSource={this.state.funis}
            keyExpr="idFunil"
            defaultColumns={columns}
            showBorders={true}
          >
              <Sorting mode="none" />
        <Scrolling mode="infinite" />
        <LoadPanel enabled={false} />
        </DataGrid>
          </div>

            </Container>
        );
      }
     
}
function customizeColumns(columns) {
    columns[0].width = 70;
  }


export default FunilList;