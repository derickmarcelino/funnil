import React, { Component } from "react";
import {
  TreeList,
  Scrolling,
  Paging,
  Pager,
  Column,
  Selection,
  FilterRow,
} from "devextreme-react/tree-list";
import { Container } from "reactstrap";
import TelasService from "../../services/TelasService.js";
import FunilService from "../../services/FunilService.js";
import JornadaService from "../../services/JornadaService.js";
import { Lookup, DropDownOptions } from 'devextreme-react/lookup';

const columns = ["idFunil", "idJornada", "idTela", "ordemAcesso", "acessos"];
const expandedRowKeys = [1, 2, 10];
const emptySelectedText = "Nobody has been selected";
const selectionModes = ["all", "excludeRecursive", "leavesOnly"];
const allowedPageSizes = [5, 10, 20];

class JornadaInput extends Component {
  constructor(props) {
    super(props);
    this.retrieveTelas = this.retrieveTelas.bind(this);
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.onRecursiveChanged = this.onRecursiveChanged.bind(this);
    this.onSelectionModeChanged = this.onSelectionModeChanged.bind(this);
    this.gravarFunil = this.gravarFunil.bind(this);
    this.gravarJornada = this.gravarJornada.bind(this);
    this.gravarCompleto = this.gravarCompleto.bind(this);
    this.onChangeNomeJornada =this.onChangeNomeJornada.bind(this);
    this.onChangeInicioJanela = this.onChangeInicioJanela.bind(this);
    this.onChangeFimJanela = this.onChangeFimJanela.bind(this);

    this.state = {
      funis: [],
      selectedRowKeys: [],
      recursive: false,
      selectedEmployeeNames: emptySelectedText,
      selectionMode: "all",
      nomeJornada: null,
      inicioJanela:null,
      fimJanela:null,
      tipoJanela:null,
      diasJanela:null,
      idJornada: null,
      idTelas: null,
      ordemAcesso: null,
      status:null,
      rowSelected: [],
      acessos: 0,
      telas: [],
      errorMessage: null,
    };
  }

  componentDidMount() {
    this.retrieveTelas();
  }

  retrieveTelas() {
    TelasService.getAll()
      .then((response) => {
        this.setState({
          funis: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        this.setState({ errorMessage: e.message });
        console.log(e);
      });
  }

  onChangeInicioJanela(e) {
    this.setState({
      inicioJanela: e.target.value,
    });
  }

  onChangeFimJanela(e) {
    this.setState({
      fimJanela: e.target.value,
    });
  }

  onChangeNomeJornada(e) {
    this.setState({
      nomeJornada: e.target.value,
    });
  }

  onChangeIdJornada(idJornada) {
    this.setState({
      idJornada: idJornada,
    });
  }


gravarJornada(){

  var dataJornada= {
    nomeJornada:  this.state.nomeJornada,
    inicioJanela: this.state.inicioJanela,
    fimJanela:this.state.fimJanela,
    status: "Pendente",
  };
console.log(dataJornada);
console.log(this.state);

JornadaService.create(dataJornada)
        .then((response) => {
          this.setState({
            idJornada: response.data.at(-1).idJornada
          });
          this.gravarFunil();
        })
        .catch((e) => {
          this.setState({ errorMessage: e.message });
          console.log(e);
        });
        
}


gravarCompleto() {

  this.gravarJornada();
  
}


  gravarFunil() {
    let array = JSON.parse("[" + this.state.selectedRowKeys + "]");
    
    console.log(this.state);
    for (let index = 0; index < array.length; index++) {
      const element = array[index];

      var funilData = {
        idJornada: this.state.idJornada,
        idTelas: element,
        ordemAcesso: index+1,
        acessos: 0,
        tipoJanela:1,
      };
      FunilService.create(funilData)
        .then((response) => {
          this.setState({
            idFunil: response.data.idFunil,
            idJornada: response.data.idJornada,
            idTelas: response.data.idTelas,
            ordemAcesso: response.data.ordemAcesso,
            acessos: response.data.acessos,
          });
          console.log(response);
        })
        .catch((e) => {
          this.setState({ errorMessage: e.message });
          console.log(e);
        });
    }
  }

  render() {
    const { selectedRowKeys, recursive, selectionMode, selectedEmployeeNames } =
      this.state;
    return (
        <React.Fragment>
      <Container>
      
        <div>
          <div>
          <div className="long-title"><h3>Cadastro de Jornada</h3></div>
          </div>
        </div>
        <div>
          <div className="form-group">
            <label htmlFor="title">Nome Jornada</label>
            <input
              type="text"
              className="form-control"
              id="nomeJornada"
              required
              value={this.state.nomeJornada}
              onChange={this.onChangeNomeJornada}
              name="nomeJornada"
            />
             <div className="form-group">
             <label htmlFor="description">Tipo Jornada</label>
          <Lookup
              items={['Inicio e Fim Definidos','Inicio Definido','Intervalo de Dias']}
              defaultValue={'Escolha'}
            >
              <DropDownOptions showTitle={false} />
            </Lookup>
          </div>
          </div>
         
          <div>
            <div className="form-group">
              <label htmlFor="description">Inicio Consulta</label>
              <input
                type="date"
                className="form-control"
                id="inicioJanela"
                required
                value={this.state.inicioJanela}
                onChange={this.onChangeInicioJanela}
                name="inicioJanela"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Fim Consulta</label>
              <input
                type="date"
                className="form-control"
                id="fimJanela"
                required
                value={this.state.fimJanela}
                onChange={this.onChangeFimJanela}
                name="fimJanela"
              />
            </div>
          
          </div>
          <TreeList
            id="idTelas"
            dataSource={this.state.funis}
            showRowLines={true}
            showBorders={true}
            columnAutoWidth={true}
            defaultExpandedRowKeys={expandedRowKeys}
            selectedRowKeys={selectedRowKeys}
            keyExpr="idTelas"
            parentIdExpr="Head_ID"
            onSelectionChanged={this.onSelectionChanged}
          >
            <FilterRow visible={true} />
            <Scrolling mode="standard" />
            <Paging enabled={true} defaultPageSize={10} />
            <Pager
              showPageSizeSelector={true}
              allowedPageSizes={allowedPageSizes}
              showInfo={true}
            />
            <Selection recursive={recursive} mode="multiple" />
            <Column dataField="idTelas" />
            <Column dataField="urlAcesso" caption="UrlAcesso" />
            <Column dataField="nomeAmigavel" />
          </TreeList>
          
        </div>
        <div>
          <button onClick={this.gravarCompleto} className="btn btn-success">
            Criar Jornada
          </button>
         

          
        </div>
      </Container>
      </React.Fragment>
    );
  }

  onSelectionChanged(e) {
    const selectedData = e.component.getSelectedRowsData(
      this.state.selectionMode
    );
this.state.rowSelected=selectedData;

    this.setState({
      selectedRowKeys: e.selectedRowKeys,
      selectedEmployeeNames: this.getEmployeeNames(selectedData),
    });
  }

  onRecursiveChanged(e) {
    this.setState({
      recursive: e.value,
      selectedRowKeys: [],
      selectedEmployeeNames: emptySelectedText,
    });
  }

  onSelectionModeChanged(e) {
    this.setState({
      selectionMode: e.value,
      selectedRowKeys: [],
      selectedEmployeeNames: emptySelectedText,
    });
  }

  getEmployeeNames(telas) {
    //telas = this.state.selectedRowKeys;
    if (telas.length > 0) {
      return telas.map((telas) => telas).join(", ");
    } else {
      return emptySelectedText;
    }
  }
}

export default JornadaInput;
