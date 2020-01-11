import React,{Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './components/classComponents/Login'
import Register from './components/classComponents/Register'
import PageNotFound from './components/classComponents/PageNotFound'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Welcome to My Website</h1>
        <BrowserRouter basename={process.env.REACT_APP_BASE_HREF || ''}>
          <Switch>
            <Route path='/' component={Login} exact/>
            <Route path='/login' component={Login} exact/>
            <Route path='/register' component={Register} exact/>
            <Route component={PageNotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
