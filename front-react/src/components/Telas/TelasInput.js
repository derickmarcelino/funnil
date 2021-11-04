import React, { Component } from "react";
import JornadaService from "../../services/JornadaService";
import { Container } from "reactstrap";
import DataGrid, {
  Column,
  Selection,
  FilterRow,
  Paging,
} from "devextreme-react/data-grid";
import { SelectBox } from "devextreme-react/select-box";
import TelasService from "../../services/TelasService";

const showCheckBoxesModes = ["none", "onClick", "onLongTap", "always"];
const selectAllModes = ["allPages", "page"];



class TelasInput extends Component {
  constructor(props) {
    super(props);
    this.onChangeIdJornada = this.onChangeIdJornada.bind(this);
    this.onChangeInicioJanela = this.onChangeInicioJanela.bind(this);
    this.onChangeNomeJornada = this.onChangeNomeJornada.bind(this);
    this.onChangeFimJanela = this.onChangeFimJanela.bind(this);
    this.saveJornada = this.saveJornada.bind(this);
    this.newJornada = this.newJornada.bind(this);
    this.getLista = this.getLista.bind(this);
    this.onCheckBoxesModeChanged = this.onCheckBoxesModeChanged.bind(this);
    this.onAllModeChanged = this.onAllModeChanged.bind(this);

    this.state = {
      telas: [],
      idJornada: "",
      nomeJornada: "",
      inicioJanela: "",
      fimJanela: "",
    };
  }

  onChangeIdJornada(e) {
    this.setState({
      idJornada: e.target.value,
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

  saveJornada() {
    var data = {
      nomeJornada: this.state.nomeJornada,
      inicioJanela: this.state.inicioJanela,
      fimJanela: this.state.fimJanela,
    };

    JornadaService.createJornada(data)
      .then((response) => {
        this.setState({
          idJornada: response.data.idJornada.value,
          nomeJornada: response.data.nomeJornada,
          inicioJanela: response.data.inicioJanela,
          fimJanela: response.state.fimJanela,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newJornada() {
    this.setState({
      idJornada: null,
      nomeJornada: "",
      inicioJanela: "",
      fimJanela: "",
    });
  }

  getLista() {
    TelasService.getAll()
      .then((response) => {
        this.setState({
          telas: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { allMode, checkBoxesMode } = this.state;
    return (
      <Container>
      
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
            </div>
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

            <div>
              <button onClick={this.saveJornada} className="btn btn-success">
                Criar Jornada
              </button>
            </div>
            <div>
                <Container>
                  <div>
            <DataGrid
              dataSource={this.state.telas}
              keyExpr="idTela"
              showBorders={true}
            >
              <Selection
                mode="multiple"
                selectAllMode={selectAllModes}
                showCheckBoxesMode={checkBoxesMode}
              />
              <Paging defaultPageSize={20} />
              <Column dataField="idTela"  />
              <Column dataField="urlAcesso" />
              <Column dataField="nomeAmigavel" />
            </DataGrid>
            <div className="options">
          <div className="caption">Options</div>
          <div className="option">
            <span>Select All Mode </span>
            <SelectBox
              id="select-all-mode"
              dataSource={selectAllModes}
              value={allMode}
              disabled={checkBoxesMode === 'none'}
              onValueChanged={this.onAllModeChanged}
            />
          </div>
          <div className="option checkboxes-mode">
            <span>Show Checkboxes Mode </span>
            <SelectBox
              id="show-checkboxes-mode"
              dataSource={showCheckBoxesModes}
              value={checkBoxesMode}
              onValueChanged={this.onCheckBoxesModeChanged}
            />
          </div>
        </div>
        </div>
            </Container>
            </div>
            <div>
              <button onClick={this.getLista} className="btn btn-success">
                Listar Telas
              </button>
            </div>
           
      </Container>
    );
  }
  onCheckBoxesModeChanged({ value }) {
    this.setState({ checkBoxesMode: value });
  }

  onAllModeChanged({ value }) {
    this.setState({ allMode: value });
  }
}

export default TelasInput;
