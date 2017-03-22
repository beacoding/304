import React            						from 'react';
import ReactDOM									from 'react-dom';
import { Router, Route, Link, browserHistory }  from 'react-router';
import Registration                     		from './Registration/index.jsx';
import App 										from './App/index.jsx';

ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/" component={App}></Route>
      <Route path="/registration" component={Registration}></Route>
  	</Router>
), document.getElementById('app'));