import React, { PropTypes } from 'react'

import style from "./Shuffle.scss";

const Shuffle = React.createClass({
  render () {
    return (
      <div  onClick={this.onClick} className="shuffler">
        shuffle
      </div>
    )
  },

  onClick() {
    this.props.onShuffle();
  }
})

export default Shuffle
