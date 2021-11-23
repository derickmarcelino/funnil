import React, { Component } from "react";
import {
  TreeList,
  Scrolling,
  Editing,
  Paging,
  Pager,
  Column,
  Selection,
  FilterRow,
} from "devextreme-react/tree-list";
import DataGrid, {
  RowDragging, Sorting,
} from 'devextreme-react/data-grid';
import { Container } from "reactstrap";
import TelasService from "../../services/TelasService.js";
import FunilService from "../../services/FunilService.js";
import JornadaService from "../../services/JornadaService.js";
import { Lookup, DropDownOptions } from "devextreme-react/lookup";
import AcessosService from "../../services/AcessosService.js";

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
    this.onChangeNomeJornada = this.onChangeNomeJornada.bind(this);
    this.onChangeInicioJanela = this.onChangeInicioJanela.bind(this);
    this.onChangeFimJanela = this.onChangeFimJanela.bind(this);
    this.onChangeDiasJanela = this.onChangeDiasJanela.bind(this);
    this.onChangeMatricula = this.onChangeMatricula.bind(this);
    this.inserirTelas = this.inserirTelas.bind(this);
  

    this.state = {
      funis: [],
      selectedRowKeys: [],
      recursive: false,
      selectedEmployeeNames: emptySelectedText,
      selectionMode: "all",
      nomeJornada: null,
      inicioJanela: null,
      fimJanela: null,
      tipoJanela: null,
      diasJanela: null,
      idJornada: null,
      idTelas: null,
      ordemAcesso: null,
      status: null,
      rowSelected: [],
      acessos: 0,
      telas: [],
      errorMessage: null,
      periodoJanela: 0,
      matricula: null,
      telasFim: [],
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

  onChangeDiasJanela(e) {
    this.setState({
      diasJanela: e.target.value,
    });
  }

  onChangeMatricula(e) {
    this.setState({
      matricula: e.target.value,
    });
    
  }

  gravarJornada() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;

    var tipoJanelaInt;
  
    console.log(this.state);
    var datIni=new Date(this.state.inicioJanela);
    var datFim= new Date(this.state.fimJanela);
    
    
    
    console.log(this.state);
    console.log(tipoJanelaInt);
    var dataJornada = {
      nomeJornada: this.state.nomeJornada,
      inicioJanela: this.state.inicioJanela,
      fimJanela: this.state.fimJanela,
      status: "Pendente",
      matricula: this.state.matricula,
      diasJanela: 0,
    };
    console.log(dataJornada);
    console.log(this.state);

    JornadaService.create(dataJornada)
      .then((response) => {
        this.setState({
          idJornada: response.data.at(-1).idJornada,
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

  inserirTelas(){

  }

  gravarFunil() {
    let array = JSON.parse("[" + this.state.selectedRowKeys + "]");

    console.log(this.state);
    for (let index = 0; index < array.length; index++) {
      const element = array[index];

      var funilData = {
        idJornada: this.state.idJornada,
        idTelas: this.state.rowSelected[index].idTelas,
        ordemAcesso: this.state.rowSelected[index].ordem,
        acessos: 0,
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
        console.log(this.state);
        var dia= new Date(this.state.inicioJanela);
        var dd = String(dia.getDate()+1).padStart(2, '0');
        var mm = String(dia.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = dia.getFullYear();
      for (let i = 0; i <= this.state.periodoJanela; i++) {
        var diaTemp = String(++dd).padStart(2,0);
        console.log(diaTemp);
        dia = yyyy + '-' + mm + '-' + diaTemp+'Z';
        var dataAcesso = {
          idTelas: element,
          diaAcessos: dia,
        };
        console.log(this.state);
        console.log(dataAcesso);
        AcessosService.create(dataAcesso)
          .then((response) => {
            console.log(this.state);
          })
          .catch((e) => {
            this.setState({ errorMessage: e.message });
            console.log(e);
          });
          
          
      }
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
              <div className="long-title">
                <h3>Cadastro de Jornada</h3>
              </div>
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
            </div>

            <div>
              <div className="form-group">
                <label htmlFor="description">Inicio Consulta</label>
                <input
                  type="month"
                  className="form-control"
                  id="inicioJanela"
                  required
                  value={this.state.inicioJanela}
                  onChange={this.onChangeInicioJanela}
                  name="inicioJanela"
                />
              </div>
            </div>
            <label htmlFor="description">Telas</label>
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
              <Column dataField="idTelas" allowEditing={false} allowUpdating={false} />
              <Column dataField="urlAcesso" caption="UrlAcesso" allowEditing={false} allowUpdating={false}/>
              <Column dataField="nomeAmigavel"  allowUpdating={true} allowEditing={true}/>
            </TreeList>
            
          </div>
          
          <React.Fragment>
          <DataGrid
          height={440}
          dataSource={this.state.rowSelected}
          keyExpr="idTelas"
          defaultColumns={["ordem","idTelas","urlAcesso","nomeAmigavel"]}
          showBorders={true}
        >
          <Editing
            mode="row"
            allowUpdating={true}
            />
            <RowDragging
            allowReordering={true}
            onReorder={this.onReorder}
            showDragIcons={this.state.showDragIcons}
          />
        </DataGrid>
      </React.Fragment>
      <div>
            <button onClick={this.gravarCompleto} className="btn btn-success">
             Adicionar Telas 
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
    this.state.rowSelected = selectedData;
    if(selectedData.length>0)
    this.state.rowSelected[selectedData.length-1].ordem=selectedData.length;
    this.setState({
      selectedRowKeys: e.selectedRowKeys,
      selectedEmployeeNames: this.getEmployeeNames(selectedData),
    });
    console.log(e.selectedRowKeys);
    console.log(e);
  
    var ultimoClique = selectedData.slice(-1);
    console.log(ultimoClique);
    var addOrdem = {
      ordem:1,
      idTelas:null,
      urlAcesso:null,
      nomeAmigavel:null,
    };
    if(selectedData.length>0){
    addOrdem.ordem=selectedData.length;
    addOrdem.urlAcesso=ultimoClique[0].urlAcesso;
    addOrdem.nomeAmigavel="";
    addOrdem.idTelas=ultimoClique[0].idTelas;
    this.state.telasFim.push(addOrdem);
    }
    console.log(this.state);
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
