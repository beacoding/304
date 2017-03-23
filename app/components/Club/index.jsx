import React              from 'react';
import styles             from './style.css';
import axios              from 'axios';
import Post               from '../Post/index.jsx';
import Event              from '../Event/index.jsx';

export default class Club extends React.Component {
  constructor (props) {
    super (props);

    this.state = {posts: [], events: []}
  }

  componentWillMount () {
    var context = this;
    axios.get('/clubs/club', {params: {id: window.location.pathname.split('/')[2]}})
    .then((res) => {
      context.setState(res.data);
    })
    .catch((err) => {
      console.error(err);
    });

    axios.get('/posts/allposts', {params: {id: window.location.pathname.split('/')[2]}})
    .then((res) => {
      console.log(res.data);
      context.setState({
        posts: res.data
      })
    })
    .catch((err) => {
      console.error(err);
    });

    axios.get('/events/allevents', {params: {id: window.location.pathname.split('/')[2]}})
    .then((res) => {
      context.setState({
        events: res.data
      })
    })
    .catch((err) => {
      console.error(err);
    });
  }

  render () {
    return (
      <div>
        <div className={styles.header}>{this.state.name}</div>
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
  }
}

module.exports = Club;