import React from 'react';
import './style/App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Switch>
      <Route path="/carteira" render={ () => <Wallet /> } />
      <Route path="/" render={ () => <Login /> } />
    </Switch>
  );
}

export default App;
