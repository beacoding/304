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
    console.log('this is AVG post', this.state.avgmember);
    console.log('this is AVG Nest post', this.state.avgNest);
    if (this.state.minmember) {
      return (
        <div>
          <div>
            The AVG, MAX and MIN of All the Clubs:
          </div>
             <br/>
            <span> AVG Member: {this.state.avgmember[0]["avg(total_members)"]} </span>
            <br/>
            <span> MAX Member: {this.state.maxmember[0]["max(total_members)"]} </span>
            <br/>
            <span> MIN Member: {this.state.minmember[0]["min(total_members)"]} </span>
             <br/>
            <span> AVG Nested Query:  {JSON.stringify(this.state.avgNest)}</span>
           <br/>
            <span> MAX Nested Query:  {JSON.stringify(this.state.maxNest)}</span>
            <br/>
            <span> MIN Nested Query:  {JSON.stringify(this.state.minNest)}</span>
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
                  How many Clubs?
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
