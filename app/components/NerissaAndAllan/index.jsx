import React              from 'react';
import styles             from './style.css';
import axios              from 'axios';

/*
all members who are part of all clubs

*/


export default class NerissaAndAllan extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      allMembersWhoArePartOfAllClubs: []
    }
  }

  componentDidMount () {
    // axios.get('/clubs/allMembersWhoArePartOfAllClubs')
    // .then((res) => {
    //   console.log(res.data);
    //   context.setState({
    //     allMembersWhoArePartOfAllClubs: res.data
    //   });
    // })
    // .catch((err) => {
    //   console.error(err);
    // });
  }

  render () {
    return (
      <div>
        <div>
          All members who are part of all clubs:
          {this.state.allMembersWhoArePartOfAllClubs}
        </div>
      </div>
      )
  }
}

module.exports = NerissaAndAllan;