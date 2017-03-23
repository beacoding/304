import React              from 'react';
import styles             from './style.css';
import axios              from 'axios';

export default class Messages extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      messages: [],
      user_id: JSON.parse(localStorage['user']).id
    }
  }

  //TODO: create a sql query that will give me the sender name, receiver id, and message body
  componentWillMount () {
    var context = this;
    axios.get('/messages/allmessages', {params: {username: JSON.parse(localStorage.user).username}})
    .then((res) => {
      context.setState({messages: res.data});
    })
    .catch((err) => {
      console.error(err);
    });
  }

  render () {
    console.log(this.state);
    return (
      <div>
        {this.state.messages.map((message) => {
        })}
      </div>
      )
  }
}

module.exports = Messages;