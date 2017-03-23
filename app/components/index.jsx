import React            						            from 'react';
import ReactDOM									                from 'react-dom';
import { Router, Route, Link, browserHistory }  from 'react-router';
import Signup                     				      from './SignUp/index.jsx';
import Login                     				        from './Login/index.jsx';
import App 										                  from './App/index.jsx';
import Dashboard								                from './Dashboard/index.jsx';
import Club                                     from './Club/index.jsx';
import Messages                                 from './Messages/index.jsx'
import { requireAuth, isAuthenticated }         from '../utilities/auth';
import ClubsPage                                from './ClubsPage/index.jsx';
import Navbar                                   from './Navbar/index.jsx';
import NerissaAndAllan                          from './NerissaAndAllan/index.jsx';

ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/" component={App} onEnter={isAuthenticated.bind(this)}></Route>
      <Route path="/signup" component={Signup}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path='/dashboard' component={Dashboard} onEnter={requireAuth.bind(this)}></Route>
      <Route path='/messages' component={Messages} onEnter={requireAuth.bind(this)}></Route>
      <Route path='/clubs/:club' component={Club} onEnter={requireAuth.bind(this)}></Route>
      <Route path='/clubs' component={ClubsPage} onEnter={requireAuth.bind(this)}></Route>
      <Route path='/nerissa' component={NerissaAndAllan} onEnter={requireAuth.bind(this)}></Route>
  	</Router>
), document.getElementById('app'));