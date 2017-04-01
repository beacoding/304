import React              from 'react';
import styles             from './style.css';
import axios              from 'axios';
import Navbar             from '../Navbar/index.jsx';

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
      <Navbar />
      <div className="row">
        <div className={"col-md-12 " + styles.clubscontainer}> 
          {this.state.clubs.map((club, i) => {
            return <div className={styles.clubs}><a className={styles.clubslink} href={"/clubs/" + club.id} className={styles.description} key={i}> {club.name} </a></div>
          })}
        </div>
      </div>
      </div>
      )
  }
}

module.exports = ClubsPage;