import React            from 'react';
import styles           from './style.css';

export default class Dashboard extends React.Component {
  constructor (props) {
    super (props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout () {
    localStorage.removeItem('user');
    location.reload();
  }

  render () {
    return (
      <div>
        <h1 className={styles.header}> Dashboard </h1>
        <div className={styles.links}>
	        <div>
	        	<div className={styles.description}>This is the dashboard</div>
            <div className={styles.logout} onClick={this.handleLogout}>Logout</div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Dashboard;