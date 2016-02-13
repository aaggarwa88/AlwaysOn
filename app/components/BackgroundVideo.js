import React, { PropTypes } from 'react'
import style from './BackgroundVideo.scss';

const BackgroundVideo = React.createClass({
  render () {
    return (
      <div>
      <div className="videoContainer">
        <video poster="/img/test.png" preload="" autoPlay="true" loop="true" className="videoJs ">
          <source src="/videos/clouds.mp4" type="video/mp4" />
        </video>
      </div>
      <img className="videoMask" src="/img/background-video-mask.png" />
      </div>
    )
  }
})

export default BackgroundVideo
