import React              from 'react';
import styles             from './style.css';
import axios              from 'axios';

export default class Navbar extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      username: JSON.parse(localStorage['user']).username
    }
  }

  handleLinkClick (param, e) {
    // window.location = convertToRoute(clubName);
    if (param === 'allclubs') {
      window.location = '/clubs'
    } else if (param === 'logout') {
      localStorage.removeItem('user');
      location.reload(); 
    }
  }

  render () {
    return (
      <div>
        <div className="row">
          <div className={"col-md-12 " + styles.navbar}>
            <span>
              <a href="/stats">Statistics</a>
            </span>
            <span>
              <a href="/clubs">Clubs</a>
            </span>
            <span>
              <a href="/dashboard">Dashboard</a>
            </span>
          </div>
        </div>
      </div>
      )
  }
}

module.exports = Navbar;