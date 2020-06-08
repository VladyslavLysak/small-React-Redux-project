import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Company from './pages/Company';
import Error from './pages/Error';

import './App.scss';

const App = () => {

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path="/company/:id" component={Company} />
          <Route component={Error} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
