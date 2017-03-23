import React              from 'react';
import styles             from './style.css';
import axios              from 'axios';

export default class Post extends React.Component {
  constructor (props) {
    super (props);

    console.log(this.props.post);
  }

  render () {
    return (
      <div>
        <div className={styles.post}>
        {this.props.post.name + ': ' + this.props.post.body}
        </div>
      </div>
      )
  }
}

module.exports = Post;
