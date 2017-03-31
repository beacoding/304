import React              from 'react';
import styles             from './style.css';
import axios              from 'axios';
import { convertToRoute } from '../../utilities/route';

export default class Dashboard extends React.Component {
  constructor (props) {
    super (props);

    this.handleLogout = this.handleLogout.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      clubs: [],
      username: JSON.parse(localStorage['user']).username,
      user_id: JSON.parse(localStorage['user']).id,
        current_student_id: JSON.parse(localStorage['user']).student_id,
      newClubVal: '',
        updateStudentId: 0
    }
  }

  componentWillMount() {
    var context = this;
    axios.get('/clubs/allclubswithmember', {params: {username: JSON.parse(localStorage.user).username}})
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

  handleLinkClick (param, e) {
    // window.location = convertToRoute(clubName);
    if (param === 'allclubs') {
      window.location = '/clubs'
    } else {
      window.location = '/clubs/' + param;
    }
  }

  handleSubmit(e) {
    axios.post('/clubs/create', {club_name: this.state.newClubVal, member_id: this.state.user_id})
    .then((res) => {
      console.log(res.data);
    });
  }

  handleInputChange(e) {
    this.setState({
      newClubVal: e.target.value
    })
  }

  changeUsernameHandler(e) {
    this.setState({
      modifiedStudentId: e.target.value
    });
  }

  handleKeyPress(e) {
    var context = this;
    if (e.charCode === 13) {
      console.log(this.state.modifiedStudentId);
      axios.post('/members/updateStudentId', {current_student_id: this.state.current_student_id,  modified_student_id: this.state.modifiedStudentId})
          .then((res) => {
        console.log('this is res data', res.data);
              context.setState({
              current_student_id: this.state.modifiedStudentId
              });
              var user = JSON.parse(localStorage['user']);
              user.student_id = this.state.modifiedStudentId;
              localStorage['user'] = JSON.stringify(user);
          })
          .catch((err) => {
              console.error(err);
          });
    }
  }

  render () {
    return (
      <div>
        <h1 className={styles.header}> Dashboard </h1>
        <div className={styles.links}>
          <div>
            <div className={styles.description}>Welcome {this.state.username}</div>
            <div>
              Student Id: {this.state.current_student_id}
            </div>
            <div>
              Change student_id:
              <input onChange={this.changeUsernameHandler.bind(this)} onKeyPress={this.handleKeyPress.bind(this)} placeholder="Change student_id here" />
            </div>
          </div>
	        <div>
            <div className={styles.link} onClick={this.handleLogout}>Logout</div>
          </div>
          <div>
            <div className={styles.link} onClick={this.handleLinkClick.bind(this,'allclubs')}>All Clubs</div>
          </div>
          <ul className={styles.description}>
          My Clubs
            {this.state.clubs.map((club, i) => {
              return <li key={i} onClick={this.handleLinkClick.bind(this, club.club_id)} className={styles.link}> {club.name} </li>
            })}
          </ul>
          <div className={styles.description}>
            <form onSubmit={this.handleSubmit}>
              <input onChange={this.handleInputChange} placeholder="New Club" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Dashboard;