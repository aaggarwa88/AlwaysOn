import React, { PropTypes } from 'react'

import style from './MenuUnderline.scss';

const MediaUnderline = React.createClass({
  render () {
    return (
      <div className="menuUnderline"></div>
    )
  },

  componentDidMount: function() {
	//	TweenMax.to(".menuTrackingBar", .6, { width: this.props.width, opacity: 1, left: this.props.left, ease:Power2.easeOut, delay: 1.7});
	},

	componentWillReceiveProps: function(nextProps) {
		this.centerMenuBar(nextProps.activePos.left, nextProps.activePos.width);
	},



  centerMenuBar(left, width) {
    TweenMax.to(".menuUnderline", .6, { left: nextProps.activePos.left, ease:Power2.easeOut});
  }

})

export default MediaUnderline
