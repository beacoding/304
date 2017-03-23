import React              from 'react';
import styles             from './style.css';
import axios              from 'axios';
import { convertToRoute } from '../../utilities/route';

export default class Dashboard extends React.Component {
  constructor (props) {
    super (props);

    this.handleLogout = this.handleLogout.bind(this);
    this.handleClubLinkClick = this.handleClubLinkClick.bind(this);

    this.state = {
      clubs: [],
      username: JSON.parse(localStorage['user']).username
    }
  }

  componentWillMount() {
    var context = this;
    axios.get('/clubs/allclubs', {params: {username: JSON.parse(localStorage.user).username}})
    .then((res) => {
      console.log(res.data);
      context.setState({
        clubs: res.data
      });
    })
    .catch((err) => {
      console.error(err);
    });
  }

  handleLogout () {
    localStorage.removeItem('user');
    location.reload();
  }

  handleClubLinkClick (clubId, e) {
    // window.location = convertToRoute(clubName);
    window.location = '/clubs/' + clubId;
  }

  render () {
    return (
      <div>
        <h1 className={styles.header}> Dashboard </h1>
        <div className={styles.links}>
          <div>
            <div className={styles.description}>Welcome {this.state.username}</div>
          </div>
	        <div>
            <div className={styles.link} onClick={this.handleLogout}>Logout</div>
          </div>
          <ul className={styles.description}>
          My Clubs
            {this.state.clubs.map((club, i) => {
              return <li key={i} onClick={this.handleClubLinkClick.bind(this, club.club_id)} className={styles.link}> {club.name} </li>
            })}
          </ul>
        </div>
      </div>
    );
  }
}

module.exports = Dashboard;