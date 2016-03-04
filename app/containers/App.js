import React, { PropTypes, Component } from 'react';

import $ from 'jquery';

import Header from './Header';
import MainLayout from './MainLayout';
import BackgroundVideo from '../components/BackgroundVideo';
import HoverOverHeader from '../components/HoverOverHeader';

import style from './App.scss';

const bgVideoApi = "https://sheetsu.com/apis/b68c8178"

const App = React.createClass({

  isBgTrailer: 0, //Boolean to determine if initial load bg video is
  initVideoObj: {},

  getInitialState: function() {

    //this.isBgTrailer = Math.round(Math.random());
    this.initVideoObj = {"hover": "FALSE"}

    if(!this.isBgTrailer) {
      //If not a BG trailer, than default to show clouds.
      this.initVideoObj = {"video_url": "/videos/clouds.mp4", "hover": "FALSE"};
    }

    return {
      videoObj: this.initVideoObj,
      trailerMode: false,
      isBgVideoActive: false,
    };
  },

  loadBgVideos: function() {
    $.ajax({
     url: bgVideoApi,
     dataType: 'json',
     cache: true,
     success: function(data) {
       const randomSelect = Math.floor(Math.random() * (data.result.length));
       this.initVideoObj = data.result[randomSelect];

       this.setState({videoObj: this.initVideoObj});
     }.bind(this),
     error: function(xhr, status, err) {
       console.error(this.props.url, status, err.toString());
     }.bind(this)
   });
  },

  componentDidMount() {
    if(this.isBgTrailer) {
      this.loadBgVideos();
    }
  },

  render () {

    return (
      <div>
        <div className="background">
          <BackgroundVideo isActive={this.state.isBgVideoActive}
            trailerMode={this.state.trailerMode}
            exitTrailerMode={this.exitTrailerMode}
            videoObj={this.state.videoObj}
            fullScreenCallback={this.showBgVideo}
          />
          <HoverOverHeader isDisabled={this.state.videoObj.hover === "FALSE" || this.state.trailerMode} isActive={this.state.isBgVideoActive} onHoverCallback={this.showBgVideo} />
        </div>

        <div className="frontApp">
          <Header auth={this.props.auth} onLogout={this.props.onLogout} trailerDescription={this.state.videoObj.description} />
          <MainLayout showTrailer={this.showTrailer}></MainLayout>
        </div>
      </div>
    )
  },

  showBgVideo (boolVal) {

    this.animateBgVideo(boolVal);

    this.setState({
      isBgVideoActive: boolVal
    });
  },

  animateBgVideo (boolVal) {
    if(boolVal) {
      TweenMax.to(".frontApp", .3, {opacity: 0, top: "50px"});
      TweenMax.set(".frontApp", {display: "none"}, .3);
    } else {
      TweenMax.to(".frontApp", .3, {opacity: 1, top: "0"});
      TweenMax.set(".frontApp", {display: "initial"}, .3);
    }
  },

  showTrailer (videoObj) {

    videoObj.video_url = this.findMovieTrailer(videoObj);

    this.setState({
      trailerMode: true,
      isBgVideoActive: true,
      videoObj: videoObj,
    });

    this.animateBgVideo(true);
  },

  findMovieTrailer(videoObj) {
    console.log(videoObj)
    if(videoObj.trailer) {
      return videoObj.trailer[0].publishUrl;
    }
    return "/videos/clouds.mp4";
  },

  exitTrailerMode() {
    this.setState({
      trailerMode: false,
      isBgVideoActive: false,
      videoObj: this.initVideoObj,
    });

    this.animateBgVideo(false);
  },

})

export default App
