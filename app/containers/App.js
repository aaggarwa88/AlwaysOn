import React, { PropTypes, Component } from 'react';

import Header from './Header';
import MainLayout from './MainLayout';
import BackgroundVideo from '../components/BackgroundVideo';
import HoverOverHeader from '../components/HoverOverHeader';

import style from './App.scss';

const App = React.createClass({

  getInitialState: function() {
    return {
      videoUrl: "/videos/clouds.mp4",
      trailerMode: false,
      showBgVideo: false,
    };
  },

  render () {
    return (
      <div>
        <div className="background">
          <BackgroundVideo isActive={this.state.showBgVideo}
            trailerMode={this.state.trailerMode}
            videoUrl={this.state.videoUrl}
            fullScreenCallback={this.showFullScreen}
          />
          <HoverOverHeader isActive={this.state.showBgVideo} onHoverCallback={this.showFullScreen} />
        </div>

        <div className="frontApp">
          <Header />
          <MainLayout showTrailer={this.showTrailer}></MainLayout>
        </div>
      </div>
    )
  },

  showFullScreen (boolVal) {
    this.setState({
      showBgVideo: boolVal
    })
    if(boolVal) {
      TweenMax.to(".frontApp", .3, {opacity: 0, top: "50px"});
      TweenMax.set(".frontApp", {display: "none"}, .3);
    } else {
      TweenMax.to(".frontApp", .3, {opacity: 1, top: "0"});
      TweenMax.set(".frontApp", {display: "initial"}, .3);
    }
  },

  showTrailer (videoObj) {
    this.setState({
      trailerMode: true
    });

    this.showFullScreen(true);
  }

})

export default App
