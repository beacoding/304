import React              from 'react';
import styles             from './style.css';
import axios              from 'axios';
import Post               from '../Post/index.jsx';
import Event              from '../Event/index.jsx';
import Navbar             from '../Navbar/index.jsx';

export default class Club extends React.Component {
  constructor (props) {
    super (props);

    this.handleJoinClub = this.handleJoinClub.bind(this);

    this.state = {
      member_id: Number(JSON.parse(localStorage['user']).id),
      username: JSON.parse(localStorage['user']).username,
      posts: [], 
      events: [],
      club_id: window.location.pathname.split('/')[2],
      isMember: false,
      clubName: '',
      newPost: '',
      countpost: '', 
      avgmember: '',
      maxmember: '',
      minmember: '', 
      allmembers: []
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
      console.log(res.data);
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

    axios.post('/clubs/allmembers', {club_id: this.state.club_id})
    .then((res) => {
      context.setState({
        allmembers: res.data
      })
    })
    .catch((err) => {
      console.error(err);
    });

    this.countPost();
  }

  getBody() {
    console.log('this is AVG post', this.state.avgmember);
    if (this.state.countpost.length) {
      return (
        <div className="container">
            <div className="row">
              <div className="col-md-6" >
                <div className={styles.box}>
                <div className={styles.post}> Posts </div>
                <div>
                  {this.state.posts.map((post) => {
                    return <Post post={post} />
                  })}
                </div>
                <div> Create New Post: <input onChange={this.handlePostChange.bind(this)} onKeyPress={this._handleKeyPress.bind(this)} placeholder = "Write something here"/></div>
                </div>
              </div>
              <div className="col-md-6">
                <div className={styles.box}>
                <div className={styles.post}> Events </div>
                <div>
                  {this.state.events.map((event) => {
                    return <Event event={event} />
                  })}              
                </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className={styles.box}>
                  <div className={styles.post}> Statistics </div>
                  <div className={styles.post}> Number of posts you made: {this.state.countpost[0]["count(id)"]} </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className={styles.box}>
                <div className={styles.post}> Members </div>
                <div>
                  {this.state.allmembers.map((member) => {
                    return <div> {member.username} </div>
                  })}
                </div>
                </div>
              </div>
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
        <Navbar />
        {body}
      </div>
      )

  }

  handlePostChange (e)  {
    console.log(e.target.value);
    this.setState({
      newPost: e.target.value
    });
  }

  _handleKeyPress (e) {
    if (e.key === 'Enter') {
      axios.post('/posts/post', {body: this.state.newPost, member_id: this.state.member_id, club_id: this.state.club_id})
      .then((res) => {
        location.reload();
      });
    }
  }

  countPost (e) {
    var context = this;
    axios.post('/posts/countpost', {club_id: this.state.club_id, member_id: this.state.member_id})
    .then((res) => {
      context.setState({
        countpost: res.data
      })
    });
  }





}

module.exports = Club;