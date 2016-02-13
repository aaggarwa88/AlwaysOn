import React, { PropTypes } from 'react'

import style from "./Shuffle.scss";

const Shuffle = React.createClass({
  render () {
    return (
      <div className="right shuffler">
        <img onClick={this.onClick} className="left" src="/img/shuffle.png" />
      </div>
    )
  },

  onClick() {
    this.props.onShuffle();
  }
})

export default Shuffle
