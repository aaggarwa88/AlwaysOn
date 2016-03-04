import React, { PropTypes } from 'react'

import Login from '../components/Login'
import CenterLoader from '../components/CenterLoader'
import App from './App'

import Auth from '../data/Auth';

const Root = React.createClass({
  getInitialState: function() {
    return {
      auth: false,
      loading: true
    };
  },
  render () {
    return (
      <div>
        {
          this.state.loading ?

            <CenterLoader /> :

            (!this.state.auth ?
              <Login onSuccess={this.loginSuccess}/> :
              <App auth={this.state.auth} onLogout={this.logoutSuccess} />
            )
        }
      </div>
    )
  },

  componentDidMount() {
    const _this = this;
    Auth.get(function(data) {
      _this.setState({loading: false, auth: data})
    })
  },

  loginSuccess(data) {
    const _this = this;
    Auth.store(data, function() {
      _this.setState({"auth": data});
    });
  },

  logoutSuccess() {
    const _this = this;
    Auth.logout(function() {
      _this.setState({"auth": false});
    });
  }
})

export default Root
