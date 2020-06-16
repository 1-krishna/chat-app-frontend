import React from 'react';
import './App.css';
import Home from './pages/home/home.component';
import { Switch, Route } from 'react-router-dom';

class App extends React.Component {

  render() {
    return (
      <Switch>
        <Route path='/' exact component={Home} />
      </Switch>
    );
  }
}

export default App;
