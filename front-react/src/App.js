import React from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Navbar from "./components/Menu/Navbar";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import JornadaInput from './components/Jornada/JornadaInput';
import JornadaList from './components/Jornada/JornadaList';
import FunilList from './components/Funil/FunilList';
import FunilInput from './components/Funil/FunilInput';
import TelasInput from './components/Telas/TelasInput';
import TelasList from './components/Telas/TelasList';
import GraphList from './components/Graph/GraphList';
import './App.css';

const App = () => {
  return (
    <Router>
    <Navbar />
      <Switch>
      <Route path='/jornada' component={JornadaInput} />
      <Route path='/jornadalist' component={JornadaList} />
      <Route path='/funil' component={FunilInput} />
      <Route path='/funillist' component={FunilList} />
      <Route path='/telas' component={TelasInput} />
      <Route path='/telaslist' component={TelasList} />
      <Route path='/graphlist' component={GraphList} />
      </Switch>
      </Router>
  )
}


export default App;


