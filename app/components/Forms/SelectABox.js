import React, { PropTypes } from 'react'

const SelectABox = React.createClass({
  getInitialState: function() {
    return {
      boxList:  []
    };
  },
  componentWillMount() {

  },
  render () {
    return (
      <div>
        <div className="description">Select the box you would like to record to? </div>
        <form className="loginForm" onSubmit={this.handleSubmit}>
          test
        </form>
      </div>
    )
  }
})

export default SelectABox
