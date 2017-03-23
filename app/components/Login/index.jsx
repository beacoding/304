import React            from 'react';
import styles           from './style.css';
import axios            from 'axios';

class Login extends React.Component {
  constructor (props) {
    super (props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeInput = this.changeInput.bind(this);

    this.state = {
        username: '',
        password: ''
    }
  }

  changeInput(event) {
    console.log(event.target.value);
    const type = event.target.dataset.type;
    const value = event.target.value;

    this.setState({
      [type]: value
    });
  }

  handleSubmit(e) {
    const context = this;

    axios.post('/members/login', {
       username: context.state.username,
       password: context.state.password,
    })
    .then((response) => {
      localStorage['user'] = JSON.stringify(response.data);
      window.location = '/dashboard';
    })
    .catch((err) => {
      console.error('Wrong Password');
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
            <div className="submit">
              <button id="submit" type="submit" className="btn btn-success">Login</button>
            </div>
          </div>
        </form>
        <div id="error">
        </div>
      </div>
    );
  }
}

module.exports = Login;  