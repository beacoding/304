import React              from 'react';
import styles             from './style.css';
import axios              from 'axios';
import Navbar             from '../Navbar/index.jsx';

/*
all members who are part of all clubs

*/

export default class NerissaAndAllan extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
    allMembersWhoArePartOfAllClubs: [],
    numberOfClubs: [],
     count: 0,
      avgmember: '',
      maxmember: '',
      minmember: '',
      avgNest: '',
      maxNest: '',
      minNest: '', 
    }
  }

  componentDidMount () {
    // axios.get('/clubs/allMembersWhoArePartOfAllClubs', {params: {}})
    // .then((res) => {
    //   console.log(res.data);
    //   context.setState({
    //     allMembersWhoArePartOfAllClubs: res.data
    //   });
    // })
    // .catch((err) => {
    //   console.error(err);asd;laksd
    // });
  }

  componentWillMount () {
    this.avgMembersInClub();
    this.maxMembersInClub();
    this.minMembersInClub();
    this.avgNestQuery();
    this.maxNestQuery();
    this.minNestQuery();
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
    console.log('in component will mount');
  }

  avgMembersInClub (e) {
    var context = this;
    axios.post('/clubs/avgmember', {avgmember: this.state.avgmember})
    .then((res) => {
      context.setState({
        avgmember: res.data
      })
    });
  }

  maxMembersInClub (e) {
    var context = this;
    axios.post('/clubs/maxmember', {maxmember: this.state.maxmember})
    .then((res) => {
      context.setState({
        maxmember: res.data
      })
    });
  }

  minMembersInClub (e) {
    var context = this;
    axios.post('/clubs/minmember', {minmember: this.state.minmember})
    .then((res) => {
      context.setState({
        minmember: res.data
      })
    });
  }

  avgNestQuery (e) {
    var context = this;
    axios.post('/clubs/avgNest', {avgNest: this.state.avgNest})
    .then((res) => {
      context.setState({
        avgNest: res.data
      })
    });
  }

  maxNestQuery (e) {
    var context = this;
    axios.post('/clubs/maxNest', {maxNest: this.state.maxNest})
    .then((res) => {
      context.setState({
        maxNest: res.data
      })
    });
  }

  minNestQuery (e) {
    var context = this;
    axios.post('/clubs/minNest', {minNest: this.state.minNest})
    .then((res) => {
      context.setState({
        minNest: res.data
      })
    });
  }

  render () {
    if (this.state.minNest) {
      return (
        <div>
          <div className={styles.header}>Statistics</div>
          <Navbar />
          <div>
            The AVG, MAX and MIN of All the Clubs:
          </div>
             <br/>
            <div> AVG # of Members: {this.state.avgmember[0]["avg(total_members)"]} </div>
            <br/>
            <div> MAX # of Members: {this.state.maxmember[0]["max(total_members)"]} </div>
            <br/>
            <div> MIN # of Members: {this.state.minmember[0]["min(total_members)"]} </div>
             <br/>
            <div> The average # of members of all the clubs a user is part of  
            {this.state.avgNest.map((member) => {
              return <div> {member.username + ": " + member["avg(c.total_members)"]}</div>
            })}
           <br/>
            <div> The max # of members of all the clubs a user is part of    
            {this.state.maxNest.map((member) => {
              return <div> {member.username + ": " + member["max(c.total_members)"]}</div>
            })}
            </div>
            <br/>
            <div> The min # of members of all the clubs a user is part of    
            {this.state.minNest.map((member) => {
              console.log(member);
              return <div> {member.username + ": " + member["MIN(c.total_members)"]}</div>
            })}            
            </div>
            </div>
            <br/>
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
                  Total # of Clubs
                  <div>
                      {this.state.numberOfClubs}
                  </div>
              </div>
        </div>
        )
    } else {
      return <div> </div>
    }
  }
}

module.exports = NerissaAndAllan;
