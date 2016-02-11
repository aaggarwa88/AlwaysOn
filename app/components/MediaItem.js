import React, { PropTypes } from 'react';
import style from './MediaItem.scss';

let rootUrl = "https://dtvimages.hs.llnwd.net/e1";

const MediaItem = React.createClass({
  render () {
    let item = this.props.item;
    return (
      <div className="mediaItem">
        <div className="mediaItemPhoto"><img src={rootUrl + item.primaryImageUrl} /></div>
        <div className="mediaItemMeta">{item.title}</div>
      </div>
    )
  }
})

export default MediaItem
