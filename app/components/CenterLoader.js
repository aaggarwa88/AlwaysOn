import React, { PropTypes } from 'react'

import style from './CenterLoader.scss';

const CenterLoader = React.createClass({
  render () {
    return (
      <div className="inersitial">
        <img src="/img/loader.gif"></img>
      </div>
    )
  }
})

export default CenterLoader
