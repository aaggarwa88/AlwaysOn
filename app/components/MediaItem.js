import React, { PropTypes } from 'react';
import FlipCard from 'react-flipcard';

import {Container, Breakpoint, Grid, Span} from 'react-responsive-grid'
import moment from 'moment';
import cx from 'classnames';

import style from './MediaItem.scss';

const rootUrl = "https://dtvimages.hs.llnwd.net/e1/";

const MediaItem = React.createClass({

  hoverTimer: null,

  getInitialState: function() {
    return {
      isFlipped: false
    };
  },
  render () {
    const item = this.props.item;
    const meta = this.getFormattedMeta(item);

    return (
      <div  onMouseEnter={this.mouseHover} onMouseLeave={this.mouseHover}>
        <FlipCard  disabled={true} flipped={this.state.isFlipped} className="">
          <div className="mediaItemFront">
            <div >
              <div className="mediaItemPhoto">
                <img src={meta.imageUrl} />
                  {
                    !meta.isPosterImage ?
                      <div className="movieTitle">{item.title}</div> :
                      null
                  }
                <div className="mediaItemMeta">
                  <div className="channelImage">
                    {meta.logoStyle ? <div style={meta.logoStyle} className="img"></div> : <div></div>}
                  </div>
                  <div className={cx("channelInfo", meta.logoStyle.width ? '' : 'noLogo')}>
                    <div className="time">{meta.startTime}</div>
                    <div className="label">Channel {item.channel[0].majorChannelNumber}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="mediaItemBack">
              <div className="moreMeta">
                <Grid columns={12}>
                  <Breakpoint minWidth={100} widthMethod="componentWidth">
                    <Span className="smallPoster" columns={4}>
                      <img src={rootUrl + item.primaryImageUrl} />
                    </Span>
                    <Span className="categories" columns={7}>
                          <div onClick={this.dvr}>
                            <div className="record">Rec</div>
                          </div>
                          { item.trailer ?
                          <div onClick={this.props.showTrailer}>
                            <div className="trailer">Watch Trailer</div>
                          </div>
                          : null }
                    </Span>
                  </Breakpoint>
                </Grid>

                <div className="title">{item.title}</div>
                <div className="description">{item.description}</div>
                <div> {meta.categories} </div>
              </div>

            </div>
          </div>
        </FlipCard>
      </div>
    )
  },

  //post a record button
  dvr() {

  },

  /*
  All the business logic of a Media Poster item
  start time, duration, logo, channel, poster image
  */
  getFormattedMeta (item) {
    var ret = {}, logo, i, dimensions,
    channel = item.channel[0],
    logos = channel.logo,
    schedule = channel.linear[0].schedules[0];

    ret.startTime = moment(schedule.startTime).format('h:mm A');

    var deviceTypes = ["web_greyscale_light"];

    //get logo style Object
    ret.logoStyle = {};
    for(i = 0; i < deviceTypes.length; i++) {
      if(logo = this.getLogo(logos, deviceTypes[i])) {
        ret.logoStyle.WebkitMaskImage =  "url('" + rootUrl + logo.url + "')";

        dimensions = logo.dimensions.split("X");

        ret.logoStyle.width = dimensions[0] + "px";
        ret.logoStyle.height = dimensions[1] + "px";
        continue;
      }
    }

    ret.description = item.description;
    ret.categories = moment(item.releaseDate, "YYYY-MM-DD").format('YYYY') + " ";

    if(item.subCategory) {
      ret.categories += item.subCategory.join(', ');
    }

    var tempTime = moment.duration(schedule.duration, 'minutes');
    ret.duration = tempTime.hours() + 'h ' + tempTime.minutes() + 'm';

    //Poster image check
    if(item.primaryImageUrl.indexOf("/default/") == -1) {
      ret.imageUrl = rootUrl + item.primaryImageUrl;
      ret.isPosterImage = true;
    } else {
      ret.imageUrl = '/img/empty-poster.png';
      ret.isPosterImage = false;
    }

    return ret;
  },


  getLogo(logos, deviceType) {
    if(logos) {
      for(var i = 0; i < logos.length; i++) {
        if(logos[i].deviceType === deviceType) {
          return logos[i];
        }
      }
    } else {
      return null;
    }
  },

  //delay action hover flipcard
  mouseHover() {
    clearTimeout(this.hoverTimer);

    if (this.hoverTimer != null) {
      window.clearTimeout(this.hoverTimer);
      this.hoverTimer = null;
    }
    else {
      var time = !this.state.isFlipped ? 300 : 0;
      this.hoverTimer = setTimeout(() => {
        this.setState({
          isFlipped: !this.state.isFlipped
        })

        this.hoverTimer = null;

      }, time);
    }
  }
})

export default MediaItem
