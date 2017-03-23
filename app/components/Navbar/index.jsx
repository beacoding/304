import React              from 'react';
import styles             from './style.css';
import axios              from 'axios';

export default class Navbar extends React.Component {
  constructor (props) {
    super (props);

    this.handleClick = this.handleClick.bind(this);

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
        <div>
          <div className={styles.description}>Welcome {this.state.username}</div>
        </div>
        <div>
          <div className={styles.link} onClick={this.handleLinkClick.bind(this, 'logout')}>Logout</div>
        </div>
        <div>
          <div className={styles.link} onClick={this.handleLinkClick.bind(this, 'allclubs')}>All Clubs</div>
        </div>
      </div>
      )
  }
}

module.exports = Navbar;