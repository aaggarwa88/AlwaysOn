import React, { PropTypes } from 'react'
import style from './BackgroundVideo.scss';
import cx from 'classnames';

import { default as Video, Controls, Play, Mute, Seek, Fullscreen, Time, Overlay } from 'react-html5video';

import $ from 'jquery';


const BackgroundVideo = React.createClass({

  getInitialState: function() {
    return {
      showFullScreen: false,
      muted: true
    };
  },
  render () {

    return (
      <div className={cx({'isFullScreen': this.props.isActive})}>
        <div className="videoContainer">

          <Video  ref="video" id="bgVideo" className={cx('videoJs')} controls autoPlay loop muted
            poster="/">
            <source src={this.props.videoUrl} type="video/mp4" />
            <Overlay />

          </Video>

        </div>

        <img className="videoMask" src="/img/video_mask.png" />

          <div className="videoControls">
            <i onClick={this.skipBackwardsClick}  className="ion-skip-backward"></i>
            {!this.state.muted ? <i onClick={this.soundControlClick}  className="ion-volume-medium"></i> : <i  onClick={this.soundControlClick}  className="ion-volume-mute"></i>}
            <i onClick={this.fullScreenClick} className="ion-arrow-expand" />
          </div>
      </div>
    )
  },

  componentDidUpdate(prevProps, prevState) {
    if(this.state.muted) {
      this.refs.video.mute();
    } else {
      this.refs.video.unmute();
    }

    //determines business logic when to mute on transition changes.
    if(this.props.isActive != prevProps.isActive &&
      !this.props.isActive &&
      !this.state.showFullScreen) {
      this.setState({muted: true});
    }

  },

  componentDidMount() {

    var _this = this;
    //capture onExit of full screen video
    $("#bgVideo").bind('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e) {
        var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
        if(!state) {
          _this.setState({muted: true, showFullScreen: false});
        }
    });

  },

  soundControlClick() {
    const newMuteState = !this.state.muted;
    this.setState({muted: newMuteState});
  },

  skipBackwardsClick() {
    this.setState({muted: false}, this.reloadVideo);
  },

  fullScreenClick() {
    this.setState({muted: false, showFullScreen: true}, this.fullscreen);
  },

  reloadVideo() {
    // When changing a HTML5 video, you have to reload it.
    this.refs.video.seek(0);
  },

  fullscreen() {
    this.refs.video.fullscreen();
  }

})

export default BackgroundVideo
