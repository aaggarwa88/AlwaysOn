import React, { PropTypes } from 'react'
import MediaItem from './MediaItem';
import style from './Carousel.scss';

const Carousel = React.createClass({

  getInitialState: function() {
    return {
      items: []
    };
  },

  render () {
    return (
      
      // <ul className="CarouselList">
      // {
      //   this.props.items.map(function(item) {
      //     return (
      //       <li>
      //         <MediaItem item={item}></MediaItem>
      //       </li>
      //     )
      //   })
      // }
      // </ul>
    )
  }
})

export default Carousel
