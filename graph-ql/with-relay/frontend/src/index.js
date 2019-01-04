import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch } from 'react-router-dom';

import App from './App';
import CreatePost from './components/CreatePost';
import Login from './components/Login';

import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <App path="/" exact={true} />
      <CreatePost path="/create-post" exact={true} />
      <Login path="/login" exact={true} />
    </Switch>
  </BrowserRouter>, 
  document.getElementById('root')
);

serviceWorker.unregister();
