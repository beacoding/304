import React              from 'react';
import styles             from './style.css';
import axios              from 'axios';

export default class ClubsPage extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      clubs: []
    }
  }

  componentDidMount () {
    const context = this;

    axios.get('/clubs/allclubs')
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

  render () {
    return (
      <div>
      <div className={styles.header}>ALL CLUBS</div>
      {this.state.clubs.map((club, i) => {
        return <li className={styles.description} key={i}> {club.name} </li>
      })}
      <div> -- END OF CLUBS --  </div>
      </div>

      )
  }
}

module.exports = ClubsPage;