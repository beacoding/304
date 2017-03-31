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
      allMembersWhoArePartOfAllClubs: [],
      numberOfClubs: [],
       count: 0

    }
  }

    componentWillMount () {
      let context = this;

            axios.get('/clubs/allMembersWhoArePartOfAllClubs')
                .then((res) => {
                    context.setState({
                        allMembersWhoArePartOfAllClubs: res.data
                    });
                })
                .catch((err) => {
                    console.error(err);
                });

            axios.get('/clubs/numberOfClubs')
                .then((res) => {
                console.log(res.data);
                    context.setState({
                        numberOfClubs: res.data[0]["COUNT(*)"]
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
            <div>
                <ul>
                    {this.state.allMembersWhoArePartOfAllClubs.map((member) => {
                        return <li className="list-class">{member.username}</li>
                    })}
                </ul>
            </div>
        </div>

          <div>
              How many Clubs?
              <div>
                  {this.state.numberOfClubs}
              </div>
          </div>
      </div>
      )
  }
}

module.exports = NerissaAndAllan;
