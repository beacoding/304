import React            from 'react';
import styles           from './style.css';
import axios            from 'axios';

export default class Dashboard extends React.Component {
  constructor (props) {
    super (props);

    this.handleLogout = this.handleLogout.bind(this);

    this.state = {
      clubs: []
    }
  }

  componentWillMount() {
    axios.get('/clubs/allclubs', {params: {username: JSON.parse(localStorage.user).username}})
    .then((res) => {
      console.log(res);
    })
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
            <div className={styles.logout} onClick={this.handleLogout}>Logout</div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Dashboard;