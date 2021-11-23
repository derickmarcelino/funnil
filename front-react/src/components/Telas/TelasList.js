import React, { Component } from "react";
import DataGrid, {
  FilterRow,Editing, Column
} from "devextreme-react/data-grid";
import TelasService from "../../services/TelasService";
import { Container } from "reactstrap";

const columns = ['idTelas', 'urlAcesso', 'nomeAmigavel'];

class TelasList extends Component {
    constructor(props) {
        super(props);
        this.retrieveTelas = this.retrieveTelas.bind(this);
    
        this.state = {
            telas: [],
        };
      }
    componentDidMount() {
        this.retrieveTelas();
      }

      retrieveTelas() {
        TelasService.getAll()
          .then(response => {
            this.setState({
              telas: response.data
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
                <div>
                <div className="long-title"><h3>Exibir Telas</h3></div>
          <DataGrid
            dataSource={this.state.telas}
            keyExpr="idTelas"
            defaultColumns={columns}
            allowColumnResizing={true}
            showBorders={true}
            >
          <FilterRow visible={true} />
          <Editing
            mode="cell"
            allowUpdating="true"
             />
             
          </DataGrid>
          <Column dataField="idTelas" allowEditing={false} allowUpdating={false} />
              <Column dataField="urlAcesso" caption="UrlAcesso" allowEditing={false} allowUpdating={false}/>
              <Column dataField="nomeAmigavel"  allowUpdating={true} allowEditing={true}/>
          </div>
          
            </Container>
        );
      }

}



export default TelasList;