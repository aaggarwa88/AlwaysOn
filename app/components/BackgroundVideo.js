import React, { PropTypes } from 'react'
import style from './BackgroundVideo.scss';
import BackgroundMask from './BackgroundMask';
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
      <div className={cx({'isActive': this.props.isActive})}>
        <div className="videoContainer">

          <Video  ref="video" id="bgVideo" className={cx('videoJs')} controls autoPlay loop muted
            poster="/">
            <source src={this.props.videoObj.video_url} type="video/mp4" />
            <Overlay />


          <div className="color-white">
            {
              !this.props.trailerMode ?
              null
              :
              <div>
                <div className="trailerModeExit">
                  <i onClick={this.props.exitTrailerMode}  className="ion-close-circled"></i>
                </div>
                <div className="trailerMeta">
                  <div>You're watching a Trailer for</div>
                  <h1>{this.props.videoObj.title} <i onClick={this.fullScreenClick} className="ion-arrow-expand" /></h1>

                </div>
              </div>

            }
          </div>
          </Video>
        </div>
        <BackgroundMask />
      </div>
    )
  },

  componentDidUpdate (prevProps, prevState) {
    if(this.state.muted) {
      this.refs.video.mute();
    } else {
      this.refs.video.unmute();
    }

    if(this.props.videoObj.video_url != prevProps.videoObj.video_url) {
      this.refs.video.load();
      this.refs.video.play();
    }


    if(this.props.trailerMode) {
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
      $("#bgVideo").bind('webkitlallsfchange mozfullscreenchange fullscreenchange', function(e) {
        var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
        if(!state) {
          _this.setState({muted: true, showFullScreen: false});
        }
      });
    },



    //Control actions
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
