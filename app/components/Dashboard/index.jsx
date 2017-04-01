import React              from 'react';
import styles             from './style.css';
import axios              from 'axios';
import { convertToRoute } from '../../utilities/route';
import Navbar             from '../Navbar/index.jsx';

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
    axios.get('/clubs/allclubswithmember', {params: {username: this.state.username}})
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

  showModalForChangeUserId (e) {
    this.setState({
      modal: !this.state.modal
    })    
  }

  render () {
      return (
        <div>
          <h1 className={styles.header}> Dashboard </h1>
          <Navbar/>
          <div className="row">
            <div className={"col-md-12" + " " + styles.userinfo}>
              <div className="row">
                <div className="col-md-12">
                  Welcome {this.state.username}
                </div>
              </div>
              <div className="row">
                <div className={"col-md-12" + " " + styles.link} onClick={this.showModalForChangeUserId.bind(this)}>
                  {this.state.current_student_id}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  {this.state.modal ? <div> <input onChange={this.changeUsernameHandler.bind(this)} onKeyPress={this.handleKeyPress.bind(this)} placeholder="Change student_id here" /></div> : null}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className={styles.link} onClick={this.handleLogout}>Logout</div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className={"col-md-6" + " " + styles.clubs}>
              <div className={styles.boxheader}> My Clubs </div>
              <div className={styles.description}>
                <form onSubmit={this.handleSubmit}>
                  <input onChange={this.handleInputChange} placeholder="New Club" />
                </form>
              </div>
              <div className={styles.description}>
                {this.state.clubs.map((club, i) => {
                  return <div key={i} onClick={this.handleLinkClick.bind(this, club.club_id)} className={styles.link}> {club.name} </div>
                })}
              </div>
            </div>
          </div>
        </div>
    );
  }
}

module.exports = Dashboard;