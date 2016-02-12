import React, { PropTypes } from 'react'

import API from '../data/API';
import Filters from '../components/Carousel/Filters';
import MediaItem from '../components/MediaItem';

import style from './Carousel.scss';


const Carousel = React.createClass({

  getInitialState: function() {
    return {
      items: []
    };
  },

  render () {
    return (
      <div>
      <div className="CarouselHeader">
        <div className="label">{this.props.config.label}</div>
        <Filters onSelectFilter={this.onSelectFilter} filters={this.props.config.filters} />
      </div>
      <div>
        <ul className="CarouselList">
        {
          this.state.items.map(function(item) {
            return (
              <li key={item.tmsId}>
                <MediaItem item={item}/>
              </li>
            )
          })
        }
        </ul>
      </div>
    </div>

    )
  },

  onSelectFilter (filterValue) {
    var movieParams =  {"programType": "movies", "starttime": filterValue};
    API('cards', movieParams, (data) => {
      console.log('test');
      this.setState({"items": data.content});
    });
  }

});

export default Carousel
