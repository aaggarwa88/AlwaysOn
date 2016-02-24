import React, { PropTypes } from 'react';
import FlipCard from 'react-flipcard';
import {Container, Grid, Span} from 'react-responsive-grid'
import moment from 'moment';
import cx from 'classnames';

import style from './MediaItem.scss';

let rootUrl = "https://dtvimages.hs.llnwd.net/e1/";

const MediaItem = React.createClass({
  render () {
    var item = this.props.item;
    var meta = this.getFormattedMeta(item);

    return (
      <div className="">
        <FlipCard className="mediaItem">
          <div>
            <div className="mediaItem">
              <div className="mediaItemPhoto">
                <img src={rootUrl + item.primaryImageUrl} />
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
                <Grid columns={12}>
                  <Span className="smallPoster" columns={4}>
                    <img src={rootUrl + item.primaryImageUrl} />
                  </Span>
                  <Span columns={7}>
                    <div onClick={this.props.showTrailer}>
                      <img src="./img/watch_trailer.png" />
                      <br />
                      Watch Trailer
                    </div>
                  </Span>
                </Grid>

              </div>
          </div>
        </FlipCard>
      </div>
    )
  },

  /*
    start time, duration, logo, channel
  */
  getFormattedMeta (item) {
    var ret = {}, logo, i, dimensions,
        channel = item.channel[0],
        logos = channel.logo,
        schedule = channel.linear[0].schedules[0];

    ret.startTime = moment(schedule.startTime).format('h:mm A');

    var deviceTypes = ["web_greyscale_light"]
    // console.log(item);

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
  }
})

export default MediaItem
