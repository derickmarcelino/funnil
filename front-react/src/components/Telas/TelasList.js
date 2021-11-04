import React, { Component } from "react";
import DataGrid, {
  FilterRow,
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
          
          </DataGrid>
          </div>
          
            </Container>
        );
      }

}



export default TelasList;