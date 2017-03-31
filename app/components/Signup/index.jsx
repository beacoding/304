import React            from 'react';
import styles           from './style.css';
import axios            from 'axios';

class Signup extends React.Component {
  constructor (props) {
    super (props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeInput = this.changeInput.bind(this);

    this.state = {
        username: '',
        password: '',
        name: '',
        department: '',
        student_id: ''
    };
  }

  changeInput(event) {
    const type = event.target.dataset.type;
    const value = event.target.value;

    this.setState({
      [type]: value
    });
  }

  handleSubmit(e) {
    const context = this;

    axios.post('/members/signup', {
       username: context.state.username,
       password: context.state.password,
       name: context.state.name,
       department: context.state.department,
       student_id: context.state.student_id
    })
    .then((response) => {
      console.log(response);
    })
  }

  render() {
    return (
      <div className={styles.container}>
        <form onSubmit={this.handleSubmit}>
          <div className="form-inputs">
            <input 
              onChange={this.changeInput}
              className="login-input"
              type='text'
              placeholder='username'
              data-type='username'
              />
            <span id="username"></span>
            <input 
              onChange={this.changeInput}
              className="login-input"
              type='password' 
              placeholder='password'
              data-type='password'
              />
            <span id="password"></span>
            <input 
              onChange={this.changeInput}
              className="login-input"
              type='text' 
              placeholder='name'
              data-type='name'
              />
            <span id="name"></span>
            <input 
              onChange={this.changeInput}
              className="login-input"
              type='text' 
              placeholder='department'
              data-type='department'
              />
            <span id="department"></span>
            <input 
              onChange={this.changeInput}
              className="login-input"
              type='text' 
              placeholder='student_id'
              data-type='student_id'
              />
            <span id="student_id"></span>
            <div className="submit">
              <button id="submit" type="submit" className="btn btn-success">Sign Up</button>
            </div>
          </div>
        </form>
        <div id="error">
        </div>
      </div>
    );
  }
}

module.exports = Signup;  