import React              from 'react';
import styles             from './style.css';
import axios              from 'axios';
import Post               from '../Post/index.jsx';
import Event              from '../Event/index.jsx';

export default class Club extends React.Component {
  constructor (props) {
    super (props);

    this.handleJoinClub = this.handleJoinClub.bind(this);

    this.state = {
      member_id: Number(JSON.parse(localStorage['user']).id),
      posts: [], 
      events: [],
      club_id: window.location.pathname.split('/')[2],
      isMember: false,
      clubName: '',
    }
  }

  componentWillMount () {
    var context = this;
    axios.get('/clubs/club', {params: {id: this.state.club_id, member_id: this.state.member_id}})
    .then((res) => {
      context.setState({
        isMember: res.data.isMember,
        clubName: res.data.club_name
      });
    })
    .catch((err) => {
      console.error(err);
    });

    axios.get('/posts/allposts', {params: {id: this.state.club_id}})
    .then((res) => {
      context.setState({
        posts: res.data
      })
    })
    .catch((err) => {
      console.error(err);
    });

    axios.get('/events/allevents', {params: {id: this.state.club_id}})
    .then((res) => {
      context.setState({
        events: res.data
      })
    })
    .catch((err) => {
      console.error(err);
    });
  }

  getBody() {
    if (this.state.isMember) {
      return (
        <div>
          <div className={styles.post}> Posts </div>
          <div>
            {this.state.posts.map((post) => {
              return <Post post={post} />
            })}
          </div><br/>

          <div className={styles.post}> Events </div>
          <div>
            {this.state.events.map((event) => {
              return <Event event={event} />
            })}
          </div>
        </div>
        )
    } else {
      return (<div onClick={this.handleJoinClub} className={styles.link}> Join this Club! </div>)
    }
  }

  handleJoinClub () {
    axios.post('/clubs/join', {club_id: this.state.club_id, member_id: this.state.member_id, admin: false})
    .then((res) => {
      location.reload();
    });
  }

  render () {
    const body = this.getBody();
    return (
      <div>
        <div className={styles.header}>{this.state.clubName}</div>
        {body}
      </div>
      )
  }
}

module.exports = Club;