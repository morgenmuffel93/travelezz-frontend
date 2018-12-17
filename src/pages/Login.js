import React, { Component } from 'react';
import auth from '../lib/auth-service';
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';

class Login extends Component {
  state = {
    username: "",
    password: "",
    error: '',
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state

    if(!username.includes('^[a-z, A-Z, 0-9,@]')){
      return this.setState({
            error: 'You cannot use special characters',
      })}
       else {
          auth.login({ username, password })
            .then((user) => {
              this.props.setUser(user);
            })
            .catch(error => 
              console.log(error)
              )
        }
  }

  handleChange = (event) => {
    
    const { name, value } = event.target;
    this.setState({
       [name]: value,
        error: '',
      
      });
  }

  render() {
    const { username, password } = this.state;
    return (
      <section className="login-signup-section">
        <div className="login-signup-container">
          <form onSubmit={this.handleFormSubmit} className="login-signup-form">
            <div className="username-container">
           
            <label>Username:</label>
            <input type="text" name="username" value={username} onChange={this.handleChange} className="login-signup-input" />
            </div>
            <div className="password-container">
            <label>Password:</label>
            <input type="password" name="password" value={password} onChange={this.handleChange} className="login-signup-input"/>
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
            <p className="error">{this.state.error}</p>
        <p className="account-change">Not a member? <br/><Link to="/signup">Sign up</Link></p>
      </section>
    )
  }
}

export default withAuth(Login);