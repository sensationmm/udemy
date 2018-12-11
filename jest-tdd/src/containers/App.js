import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../components/Home';
import Counter from '../components/Counter';

import '../styles/css/app.css';

const App = () => (
  <div data-test="component-app">
    <main>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/counter" component={Counter} />
      </Switch>
    </main>
  </div>
);

export default App;
