import React, { PropTypes } from 'react'

import API from '../../data/API'
import Auth from '../../data/Auth'

const SignIn = React.createClass({
  getInitialState: function() {
    return {
      email: '',
      password: '',
      err: false,
      loading: false
    };
  },

  render () {
    return (
      <div>
        <div className="description">To use this extension, please sign in to your DIRECTV account.</div>
        <form className="loginForm" onSubmit={this.handleSubmit}>
          <input type="email" value={this.state.email} placeholder="Email or AT&T Access ID" onChange={this.handleEmailChange} />
          <br />
          <input type="password" value={this.state.pass} placeholder="Password" onChange={this.handlePasswordChange}/>
          <br />
          <div className="submit">
              <button type="submit" className={ this.state.loading ? "sending" : ''} value="Post">
                SIGN IN
                <div className="loaderContainer"><div className="loader"></div></div>
              </button>
          </div>
        </form>
      </div>
    )
  },

  handleEmailChange: function(event) {
    this.setState({email: event.target.value});
  },
  handlePasswordChange: function(event) {
    this.setState({password: event.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var _this = this;

    this.setState({ "loading": true});

    API('login', this.state, (err, data) => {
      if(err) {
        alert(err)
        _this.setState({"err": true, "loading": false, "password": ""});
      } else {
        data.email = this.state.email;
        _this.props.onAuth(data);
      }
    });
  }

})

export default SignIn
