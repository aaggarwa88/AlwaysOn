import React, { PropTypes } from 'react';
import FlipCard from 'react-flipcard';
import {Container, Grid, Breakpoint, Span} from 'react-responsive-grid'
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
        <FlipCard >
          <div>
            <div className="mediaItem">
              <div className="mediaItemPhoto">
                <img src={rootUrl + item.primaryImageUrl} />
                <div className="mediaItemMeta">
                  <div className="channelImage">
                    {meta.logoUrl ? <img src={rootUrl + meta.logoUrl} /> : <div></div>}
                  </div>
                  <div className={cx("channelInfo", meta.logoUrl ? '' : 'noLogo')}>
                    <div className="time">{meta.startTime}</div>
                    <div className="label">Channel {item.channel[0].majorChannelNumber}</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div>
            <div className="mediaItem">
              <div className="mediaItemBack">
                More Meta
              </div>
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
    var ret = {}, logoUrl, i,
        channel = item.channel[0],
        logos = channel.logo,
        schedule = channel.linear[0].schedules[0];

    ret.startTime = moment(schedule.startTime).format('h:mm A');

    var deviceTypes = ["web_greyscale_light"]

    for(i = 0; i < deviceTypes.length; i++) {
      if(logoUrl = this.getLogo(logos, deviceTypes[i])) {
        ret.logoUrl = logoUrl;
        continue;
      }
    }

    return ret;
  },

  getLogo(logos, deviceType) {
    if(logos) {
      for(var i = 0; i < logos.length; i++) {
        if(logos[i].deviceType === deviceType) {
            return logos[i].url;
        }
      }
    }
  }
})

export default MediaItem
