import React, { PropTypes } from 'react'

import style from "./HoverOverHeader.scss";

var hoverTimer = null;

const HoverOverHeader = React.createClass({
  render () {
    return (
      <div onMouseEnter={this.mouseHover} onMouseLeave={this.mouseHover} className="videoHoverOver">

      </div>
    )
  },

  //This determines to show the BG Video
  mouseHover() {
    if(!this.props.isDisabled) {
      //call back up to main app
      clearTimeout(hoverTimer);

      if (hoverTimer != null) {
        window.clearTimeout(hoverTimer);
        hoverTimer = null;
      }
      else {
        hoverTimer = setTimeout(() => {
          this.props.onHoverCallback(!this.props.isActive);

          hoverTimer = null;

        }, 200);
      }
    }
  }

})

export default HoverOverHeader
