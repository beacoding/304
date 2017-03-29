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


  allMembersWhoArePartOfAllClubs(){
      axios.get('/clubs/allMembersWhoArePartOfAllClubs', {params: {member_id: this.state.member_id}})
      .then((res) => {
        console.log(res.data);
        context.setState({
          allMembersWhoArePartOfAllClubs: res.data
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

    numberOfMemberInTheClub(){
        axios.get('/clubs/numberOfMemberInTheClub', {params: {club_id: this.state.club_id}})
            .then((res) => {
                console.log(res.data);
                context.setState({
                    numberOfMemberInTheClub: res.data
                });
            })
            .catch((err) => {
                console.error(err);
            });
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
