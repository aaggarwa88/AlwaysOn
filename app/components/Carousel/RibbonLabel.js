import React, { PropTypes } from 'react'

import style from './RibbonLabel.scss';

const RibbonLabel = React.createClass({
  render () {
    return (
      <div className="ribbonLabel">{this.props.text}</div>
    )
  }
})

export default RibbonLabel
