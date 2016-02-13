import React, { PropTypes } from 'react';
import FlipCard from 'react-flipcard';

import style from './MediaItem.scss';

let rootUrl = "https://dtvimages.hs.llnwd.net/e1";

const MediaItem = React.createClass({
  render () {
    let item = this.props.item;
    return (
      <div className="">
        <FlipCard >
          <div>
            <div className="mediaItem">
              <div className="mediaItemPhoto">
                <img src={rootUrl + item.primaryImageUrl} />
                <h3>Meta</h3>
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
  }
})

export default MediaItem
