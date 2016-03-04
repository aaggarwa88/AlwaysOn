import React, { PropTypes } from 'react';

import style from './BackgroundMask.scss';

const BackgroundMask = React.createClass({
  render () {
    return (
      <img className="videoMask" src="/img/video_mask.png" />
    )
  }
})

export default BackgroundMask;
