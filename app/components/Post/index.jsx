import React              from 'react';
import styles             from './style.css';
import axios              from 'axios';

export default class Post extends React.Component {
  constructor (props) {
    super (props);

    console.log(this.props.post);
  }

  deletePost (e) {
    console.log(this.props.post);
    axios.post('/posts/delete', this.props.post)
    .then((res) => {
      console.log(res);
      location.reload();
    });
  }

  render () {
    return (
      <div>
        <div className={styles.post}>
        {this.props.post.name + ': ' + this.props.post.body}
        <span className={styles.delete} onClick={this.deletePost.bind(this)}> x </span>
        <div> 
         </div>

        </div>
      </div>
      )
  }
}

module.exports = Post;

