import React, { PropTypes } from 'react'
import cx from 'classnames'

import BackgroundMask from './BackgroundMask';
import Header from '../containers/Header'
import SignIn from './Forms/SignIn';
import CenterLoader from './CenterLoader';

import style from './Login.scss';

const Login = React.createClass({

  getInitialState: function() {
    return {
      success: false
    };
  },
  render () {
    return (
      <div className="loginPage">
        <div className="background">
          <img src="img/clouds.png" />
          <BackgroundMask />
        </div>

        <div >
          {
            !this.state.success ?

            (
              <div className="front">
                <Header />
                <div className="tagline">Always discover What's On</div>

                <div className="fancy">
                  <div><img src="/img/alwayson.png" /></div>
                </div>

                <SignIn onAuth={this.onAuth} />
              </div>
            )
            :
            (
              <CenterLoader />
            )
          }

        </div>

      </div>
    )
  },

  onAuth (data) {
    var _this = this;
    this.setState( {
      success: true
    }, function() {
      //Get call initial Values
      setTimeout(function() {
        _this.props.onSuccess(data);
      }, 2000)
    })
  }

})

export default Login
