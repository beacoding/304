import React              from 'react';
import styles             from './style.css';
import axios              from 'axios';

export default class Event extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    return (
      <div>
        <div className={styles.post}>{this.props.event.description}</div>
        <div className={styles.post}>{this.props.event.event_date}</div>
      </div>
      )
  }
}

module.exports = Event;